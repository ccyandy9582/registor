import {useState} from "react";
import {newApplication} from "../../service/data";

export default function ApplyEvent({selectedTime, selectedDate}) {
  const [name, setName] = useState()

  const onChange = (event) => {
    setName(event.target.value)
  }

  const newApplicationPost = async (correctDate, name, time) => {
    const result = await newApplication(new Date(correctDate), name, time.slice(0, 11))
  }

  const apply = (event) => {
    if (name) {
      let day = `0${selectedDate.getDate()}`.slice(-2)
      if (window.confirm(`你確定要參加這個活動?\n
      你的名字: ${name}\n
      日期: ${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${day}\n
      時間: ${selectedTime.slice(0, 11)}`)) {
        let correctDate = `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${day}`
        newApplicationPost(correctDate, name, selectedTime)
      } else {
        selectedTime()
      }
    }
  }

  return (
    <>
      {selectedTime ? (
        <div style={{margin: "5px 0 0"}}><input type="text" placeholder="你的名字" onChange={onChange}></input>
          <button onClick={(event) => {
            apply(event)
          }}>參加
          </button>
          <button>取消</button>
        </div>
      ) : null}
    </>
  );
}
