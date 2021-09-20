import { data } from '../../service/data';

export default function ApplierList({ selectedDate, selectedTime }) {
	if (selectedDate && selectedTime) {
		let selectedData = data.filter((data) => data.date.toDateString() === selectedDate.toDateString());
		let applierList = [];
		selectedData.forEach((appliers) => {
			appliers.applier.forEach((applier) => {
				if (applier.time === selectedTime) applierList.push(applier.name);
			});
		});

		return applierList.map((name, index) => {
			return <li key={name + index}>{name}</li>;
		});
	} else {
		return null;
	}
}
