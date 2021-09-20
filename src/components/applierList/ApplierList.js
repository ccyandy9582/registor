import { data } from '../../service/data';

export default function ApplierList({ selectedDate, selectedTime }) {
	if (selectedDate && selectedTime) {
		let selectedData = data.filter((data) => data.date.toDateString() === selectedDate.toDateString());
		let applierList = [];
		selectedData.forEach((appliers) => {
			appliers.applier.forEach((applier) => {
				console.log(applier.time === selectedTime, applier.time, "    " ,selectedTime.slice(0,11), '   ', ""+selectedDate)
				if (applier.time === selectedTime.slice(0,11)) applierList.push(applier.name);
			});
		});

		return applierList.map((name, index) => {
			return <li key={name + index}>{name}</li>;
		});
	} else {
		return null;
	}
}
