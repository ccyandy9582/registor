import './timeSlot.css'
import React, {useContext} from 'react'
import ApplierList from '../applierList/ApplierList';
import {AppStateContext} from "../../context/AppStateContext";

export default function () {
  const {timeSlot, selectedTime, setSelectedTime} = useContext(AppStateContext)

  const onChange = (event) => {
    setSelectedTime(event.target.value)
  }

  return (
    <div>
      {timeSlot && timeSlot.length > 0 ?
        <div className="timeSlotList" align="left"
             onChange={onChange}>{timeSlot}</div> : (!selectedTime ? "沒有時段可以報名" : "")}
      <ol>
        <ApplierList/>
      </ol>
    </div>
  )
}
