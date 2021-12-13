import {useContext, useEffect, useState} from 'react';
import {getApplications} from '../../service/data';
import {AppStateContext} from "../../context/AppStateContext";

export default function ApplierList() {
  const [isLoading, setIsLoading] = useState(true);
  const {selectedDate, selectedTime, applierList, setApplierList, deleteBtnOnclick} = useContext(AppStateContext)

  useEffect(
    () => {
      if (selectedDate) {
        async function getApplicationsData() {
          return await getApplications();
        }

        let day = '0' + selectedDate.getDate();
        const correctDate = `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${day.slice(-2)}`;
        setIsLoading(true);
        setApplierList([]);

        getApplicationsData().then(applications => {
          let tempList = [];
          setIsLoading(false);
          applications.data.forEach((application) => {
            if (selectedTime) {
              if (
                correctDate === application.date.split('T')[0] &&
                selectedTime.slice(0, 11) === application.time
              )
                tempList.push(application.name + ',' + application._id);
            }
          });
          setApplierList(tempList);
        });
      }
    },
    [selectedTime, selectedDate, setApplierList]
  );

  const updateApplierList = (event) => {
    const updatedApplierList = applierList.map(applier => {
      let id = applier.split(',')[1]
      if (id !== event.target.id) return applier
    })
    setApplierList(updatedApplierList)
  }

  const handleRemove = (event) => {
    deleteBtnOnclick(event.target.id).then(() => {
      alert(`${event.target.name}已成功退出在${selectedDate.toISOString().split("T")[0]} ${selectedTime.slice(0, 11)}的課堂`)
      updateApplierList(event)
    }).catch(err => console.log(err))
  }

  if (!isLoading) {
    if (selectedDate && selectedTime) {
      if (applierList.length > 0) {
        return applierList.map((details, index) => {
          if (details) {
            let name = details.split(',')[0];
            let id = details.split(',')[1];
            return (
              <div align={'left'} key={name + id + index}>
                <li>
                  {name}&emsp;
                  <button type={"button"} name={name} id={id} onClick={handleRemove}>
                    刪除
                  </button>
                </li>
              </div>
            );
          }
        });
      } else return '尚未有人報名';
    } else {
      return null;
    }
  } else return 'loading...';
}
