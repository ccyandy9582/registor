import React, {useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import TimeSlot from './components/timeSlot/TimeSlot';
import {deleteApplication, newApplication} from './service/data';
import './App.css';
import {AppStateContext} from "./context/AppStateContext";
import {useForm} from 'react-hook-form'

export default function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState([]);
  const [selectedTime, setSelectedTime] = useState();
  const [applierList, setApplierList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorTime, setErrorTime] = useState(false)
  const [checkedValue, setCheckedValue] = useState("")
  const {handleSubmit, register, formState: {errors}} = useForm()

  function deleteBtnOnclick(_id, name) {
    if (window.confirm(`你(${name})確定要退出嗎？`)) {
      return deleteApplication(_id)
    }
  }

  const applicationContext = {
    selectedDate, setSelectedDate,
    selectedTime, setSelectedTime,
    timeSlot, setTimeSlot,
    applierList, setApplierList,
    isLoading, setIsLoading,
    checkedValue, setCheckedValue,
    setErrorTime,
    deleteBtnOnclick
  }

  function sendPOSTRequest(date, name, time) {
    const temp = async () => {
      return await newApplication(date, name, time)
    }
    return temp
  }

  const onSubmit = (value) => {
    if (!selectedTime) setErrorTime(true)
    else {
      let correctDate = selectedDate.toISOString().split("T")[0]
      if (window.confirm(`你(${value.name})確定要參加\n係${selectedDate.getFullYear()}年${selectedDate.getUTCMonth() + 1}月${selectedDate.getDate()}日\n${selectedTime.slice(0, 11)}的活動嗎？`)) {
        const postResult = sendPOSTRequest(new Date(correctDate), value.name, selectedTime.slice(0, 11))
        postResult().then(res => {
          setApplierList([...applierList, `${res.data.name},${res.data._id}`])
          alert(`${value.name}已成功參加在${selectedDate.toISOString().split('T')[0]} ${selectedTime.slice(0, 11)}的課堂`)
        })
      }
    }
  }

  const calendarHandleChange = (value) => {
    console.log(value.toISOString())
    setApplierList([])
    setSelectedDate(value)
    setErrorTime(true)
  }

  return <AppStateContext.Provider value={applicationContext}>
    <h1 className={"App-header"}>金剛棒</h1>
    <form onSubmit={handleSubmit(onSubmit)}>
      <Calendar
        className={"myCal"}
        minDetail="year"
        value={selectedDate}
        onChange={calendarHandleChange}
      />
      {isLoading ? "等下啦⋯⋯" : (<div>
        <input {...register("name", {required: true, minLength: 1})} placeholder={"請輸入你個名"}/>
        <button type={"submit"}>提交</button>
        <button type={"reset"}>取消</button>
        {errors.name && errors.name?.type === 'required' ? <p className={"errorMessage"}>請輸名你個大名</p> : ""}
        <TimeSlot/>
        {errorTime ? <p className={"errorMessage"}>揀返個時段丫唔該</p> : ""}
      </div>)}
    </form>
  </AppStateContext.Provider>
}
