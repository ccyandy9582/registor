import {useState} from "react";
import {newApplication} from "../../service/data";

export default function ApplyEvent({selectedTime, selectedDate}) {
  const [name, setName] = useState()

  const onChange = (event) => {
    setName(event.target.value)
  }

  const apply = async (event) => {
    if (window.confirm(`你確定要參加這個活動?\n
      你的名字: ${name}\n
      日期: ${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}\n
      時間: ${selectedTime.slice(0, 11)}`)) {
      let correctDate = `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`
      const result = await newApplication(correctDate, name, selectedTime.slice(0, 11))
      console.log(result)
    } else {
      selectedTime()
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
