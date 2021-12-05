import React, {useEffect, useState} from 'react';
// import { Auth } from './index';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import ApplyEvent from './components/applyEvent/applyEvent';
import TimeSlot from './components/timeSlot/TimeSlot';
import {getAvalibleTime} from "./service/data";
import './App.css'

export default function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState([]);
  const [selectedTime, setSelectedTime] = useState();
  const [applierList, setApplierList] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const timeSlotOnChange = (event) => {
    console.log(event.target.value)
    setSelectedTime(event.target.value)
  }

  useEffect(async () => {
    setTimeSlot([])
    setIsLoading(true)
    console.log(`selectedDate: ${selectedDate}`)
    const weekday = selectedDate.toDateString().slice(0, 3).trim()
    const tempAvailable = await getAvalibleTime(weekday)
    console.log(tempAvailable)
    setTimeSlot(tempAvailable.data[0].time.map((slot, index) => {
      return (
        <>
          <input
            id={slot + index}
            type="radio"
            name="timeSlot"
            className="timeSlot"
            value={slot + selectedDate}
            checked={selectedTime === slot + selectedDate}
            onChange={timeSlotOnChange}/>
          <label htmlFor={slot + index}>{slot}</label>
        </>
      );
    }))
    setIsLoading(false)
  }, [selectedDate])

  if (isLoading) {
    return (
      <form>
        <Calendar
          className="myCal"
          minDetail="year"
          calendarType={'US'}
          value={selectedDate}
          onChange={(value) => {
            setApplierList([])
            setSelectedDate(value)
          }}
        />
        <ApplyEvent selectedTime={selectedTime} setSelectedTime={setSelectedTime} style={{marginTop: "10px"}}/>
        <br/>
        loading ...
      </form>
    );
  } else {
    return (
      <form align={"center"}>
        <h1>金剛棒</h1>
        <Calendar
          className="myCal"
          minDetail="year"
          calendarType={'US'}
          value={selectedDate}
          onChange={(value) => {
            setApplierList([])
            setSelectedTime()
            setSelectedDate(value)
          }}
        />
        <ApplyEvent selectedDate={selectedDate} selectedTime={selectedTime}/>
        <br/>
        <TimeSlot
          selectedDate={selectedDate}
          timeSlot={timeSlot}
          setTimeSlot={setTimeSlot}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
          applierList={applierList}
          setApplierList={setApplierList}
        />
      </form>
    );
  }
}