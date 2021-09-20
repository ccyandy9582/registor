import React, { useState, useEffect } from 'react';
// import { Auth } from './index';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import TimeSlot from './components/timeSlot/TimeSlot';

export default function App() {
	const [ selectedDate, setSelectedDate ] = useState(new Date());

	return (
		<form>
			<Calendar
				className="myCal"
				minDetail="year"
				calendarType={'US'}
				onChange={setSelectedDate}
				value={selectedDate}
			/>
			<TimeSlot selectedDate={selectedDate} />
		</form>
	);
}
