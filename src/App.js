import React, { useState, useEffect } from 'react';
// import { Auth } from './index';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import ApplyEvent from './components/applyEvent/applyEvent';
import TimeSlot from './components/timeSlot/TimeSlot';

export default function App() {
	const [ selectedDate, setSelectedDate ] = useState(new Date());
	const [ timeSlot, setTimeSlot ] = useState();
	const [ selectedTime, setSelectedTime ] = useState();

	return (
		<form>
			<Calendar
				className="myCal"
				minDetail="year"
				calendarType={'US'}
				onChange={setSelectedDate}
				value={selectedDate}
			/>
			<ApplyEvent selectedTime={selectedTime} setSelectedTime={setSelectedTime} />
			<br />
			<TimeSlot
				selectedDate={selectedDate}
				timeSlot={timeSlot}
				setTimeSlot={setTimeSlot}
				selectedTime={selectedTime}
				setSelectedTime={setSelectedTime}
			/>
		</form>
	);
}
