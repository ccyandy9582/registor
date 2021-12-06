import {useEffect, useState} from 'react';
import {deleteApplication, getApplications} from '../../service/data';

export default function ApplierList({selectedDate, selectedTime, applierList, setApplierList}) {
  const [isLoading, setIsLoading] = useState(true);

  const deleteBtnOnclick = (event) => {
    if (window.confirm(`你確定要退出嗎？`)) {
      deleteApplication(event.target.id).then(r => alert(r));
    }
  };

  useEffect(
    () => {
      async function getApplicationsData() {
        let day = '0' + selectedDate.getDate();
        const correctDate = `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${day.slice(-2)}`;
        setIsLoading(true);
        setApplierList([]);
        const applications = await getApplications();
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
      }

      getApplicationsData();
    },
    [selectedTime]
  );

  if (!isLoading) {
    if (selectedDate && selectedTime) {
      if (applierList.length > 0) {
        return applierList.map((details, index) => {
          let name = details.split(',')[0];
          let id = details.split(',')[1];
          return (
            <div align={'left'} key={name + id + index}>
              <li>
                {name}&emsp;
                <button id={id} onClick={deleteBtnOnclick}>
                  刪除
                </button>
              </li>
            </div>
          );
        });
      } else return '尚未有人報名';
    } else {
      return null;
    }
  } else return 'loading...';
}
