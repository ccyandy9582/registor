import { data } from "../../service/data";

export default function ApplyEvent({selectedTime}) {
  let name = "ccy"

  const apply = (event) => {
    if (window.confirm(`Do you  want to join the event?\n
      name: ${name}\n
      at ${selectedTime}`)) {
      alert("hi")
    } else {
      selectedTime()
    }
  }

	return (
  <>
    {selectedTime?(
      <><input type="text" placeholder="Your name"></input>
      <button onClick={(event)=>{apply(event)}}>Join</button><button>Cancel</button></>
    ):null}
  </>
  );
}
