import React, {useEffect, useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import TimeSlot from './components/timeSlot/TimeSlot';
import {getAvalibleTime, newApplication} from './service/data';
import './App.css';
import {AppStateContext} from "./context/AppStateContext";
import {useForm, Controller} from 'react-hook-form'
import ApplierList from "./components/applierList/ApplierList";

export default function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState([]);
  const [selectedTime, setSelectedTime] = useState();
  const [applierList, setApplierList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {handleSubmit, register, formState: {errors}, control} = useForm()

  const applicationContext = {
    selectedDate, setSelectedDate,
    selectedTime, setSelectedTime,
    timeSlot, setTimeSlot,
    applierList, setApplierList,
    isLoading, setIsLoading
  }

  const timeSlotOnChange = (event) => {
    console.log(event.target.value);
    setSelectedTime(event.target.value);
  };

  useEffect(() => {
    console.log("component did mount")
  })

  // useEffect(() => {
  //     async function getAvailableTimeData(weekday) {
  //       return await getAvalibleTime(weekday);
  //     }
  //
  //     setTimeSlot([]);
  //     setIsLoading(true);
  //     let weekday = selectedDate.toDateString().slice(0, 3).trim();
  //     getAvailableTimeData(weekday).then(tempAvailable => {
  //       setTimeSlot(
  //         tempAvailable.data[0].time.map((slot, index) => {
  //           return (
  //             <>
  //               <input
  //                 id={slot + index}
  //                 type="radio"
  //                 name="timeSlot"
  //                 className="timeSlot"
  //                 value={slot + selectedDate}
  //                 checked={selectedTime === slot + selectedDate}
  //                 onChange={timeSlotOnChange}
  //               />
  //               <label htmlFor={slot + index}>{slot}</label>
  //             </>
  //           );
  //         })
  //       );
  //     })
  //     setIsLoading(false);
  //   },
  //   [selectedDate, selectedTime]
  // );


  function sendPOSTRequest() {
    const temp = async () => {
      return await newApplication(new Date("2021-12-13"), 'testing 791', '1930 - 2100')
    }
    temp().then(res => console.log(res))
  }

  const onSubmit = (value) => {
    console.log(value)
    sendPOSTRequest()
  }

  const calendarHandleChange = (value) => {
    console.log(value.toISOString())
    setApplierList([])
    setSelectedDate(value)
  }

  return <AppStateContext.Provider value={applicationContext}>
    <h1 className={"App-header"}>金剛棒</h1>
    <form onSubmit={handleSubmit(onSubmit)}>
      <Calendar
        className={"myCal"}
        minDetail="year"
        calendarType={'US'}
        value={selectedDate}
        onChange={calendarHandleChange}
      />
      <p></p>
      {isLoading ? "等下啦⋯⋯" : (<div>
        <input {...register("name", {required: true, minLength: 1})} placeholder={"請輸入你個名"}/>
        <button type={"submit"}>提交</button>
        <button type={"reset"}>取消</button>
        {console.log(errors)}
        {errors.name && errors.name?.type === 'required' ? <p className={"errorMessage"}>請輸名你個大名</p> : ""}
        <TimeSlot/>
      </div>)}
    </form>
  </AppStateContext.Provider>
}
