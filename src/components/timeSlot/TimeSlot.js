import './timeSlot.css'
import React, {useContext, useEffect} from 'react'
import ApplierList from '../applierList/ApplierList';
import {AppStateContext} from "../../context/AppStateContext";
import {getAvalibleTime} from "../../service/data";

export default function TimeSlot() {
  const {
    timeSlot,
    selectedTime,
    setSelectedTime,
    setIsLoading,
    selectedDate,
    setTimeSlot,
    setErrorTime,
    checkedValue,
    setCheckedValue
  } = useContext(AppStateContext)

  const handleChange = (event) => {
    setSelectedTime(event.target.value)
    setCheckedValue(event.target.value)
    setErrorTime(false)
  }

  useEffect(() => {
    setCheckedValue("")
  }, [selectedDate, setCheckedValue])

  useEffect(() => {
    setIsLoading(true)
    const getTimeSlotData = async (weekday) => {
      return await getAvalibleTime(weekday)
    }
    let weekday = selectedDate.toString().slice(0, 3)
    getTimeSlotData(weekday).then(res => {
      let timeArr = res.data[0]?.time
      let availableTime = []
      if (timeArr && timeArr.length > 0) {
        availableTime = timeArr.map((slot, index) => {
          return (
            <>
              <div>slot + selectedDate: {slot + selectedDate}</div>
              <div>checkedValue: {checkedValue}</div>
              <input id={slot + index} type="radio" name="timeSlot" className="timeSlot" value={slot + selectedDate}
                     checked={selectedTime === checkedValue} onChange={handleChange}/>
              <label htmlFor={slot + index}>{slot}</label>
            </>
          )
        })
      }
      setTimeSlot(availableTime)
    }).catch(err => console.log(err))
    setIsLoading(false)
  }, [selectedDate, checkedValue, handleChange, selectedTime, setCheckedValue, setIsLoading, setTimeSlot])

  return (
    <div>
      {timeSlot && timeSlot.length > 0 ?
        <div className="timeSlotList" align="left">{timeSlot}</div> : (!selectedTime ? "沒有時段可以報名" : "")}
      <ol>
        <ApplierList/>
      </ol>
    </div>
  )
}
