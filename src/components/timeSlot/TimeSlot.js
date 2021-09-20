import './timeSlot.css'
import React, { useEffect, useState } from 'react'
import { avalibleTime, data } from '../../service/data';
import ApplierList from '../applierList/ApplierList';

export default function({ selectedDate }) {
  const [selectedTime, setSelectedTime] = useState()
	let timeSlot

  const onChange = (event) => {
    setSelectedTime(event.target.value)
  }

	if (avalibleTime) {
		let today = avalibleTime.filter((slot) => slot.date.toDateString() === selectedDate.toDateString());

		timeSlot = today[0]?.time?.map((slot, index) => {
			return (
        <>
          <input id={slot+index} type="radio" name="timeSlot" className="timeSlot" value={slot} checked={selectedTime===slot} onChange={onChange}/>
          <label htmlFor={slot+index}>{slot}</label>
        </>
      );
		});
	}
	return (
    <>
      <ul className="timeSlotList" align="left">{timeSlot}</ul>
      <ApplierList selectedDate={selectedDate} selectedTime={selectedTime}/>
    </>
  )
}
