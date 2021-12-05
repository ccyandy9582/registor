import './timeSlot.css'
import React from 'react'
import ApplierList from '../applierList/ApplierList';

export default function ({selectedDate, timeSlot, selectedTime, setSelectedTime, applierList, setApplierList}) {
  const onChange = (event) => {
    setSelectedTime(event.target.value)
  }

  return (
    <>
      {timeSlot.length > 0 ?
        <div className="timeSlotList" align="left" onChange={onChange}>{timeSlot}</div> : "沒有時段可以報名"}
      <ol>
        <ApplierList
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          applierList={applierList}
          setApplierList={setApplierList}/>
      </ol>
    </>
  )
}
