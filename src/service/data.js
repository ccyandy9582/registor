import axios from 'axios';

const baseURL = 'http://3.140.181.237:8083/';

export const getApplications = () => {
	return new Promise((resolve, reject) => {
		axios({
			method : 'get',
			url    : baseURL + 'getAllAppliers'
		})
			.then((res) => {
				resolve(res);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

export const getAvalibleTime = (weekday = '') => {
	return new Promise((resolve, reject) => {
		axios({
			url    : baseURL + 'getAvailableTime/' + weekday.toUpperCase(),
			method : 'get'
		})
			.then((res) => {
				resolve(res);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

export const getApplicationsByDate = (date) => {
	return new Promise((resolve, reject) => {
		axios({
			url    : baseURL + 'getApplierByDate/' + date,
			method : 'get'
		})
			.then((res) => {
				resolve(res);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

export const deleteApplication = (_id) => {
	return new Promise((resolve, reject) => {
		axios({
			url    : baseURL + 'deleteApplication/' + _id,
			method : 'delete',
			params : {
				_id : _id
			}
		})
			.then((res) => {
				resolve(res);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

export const newApplication = (date, name, time) => {
	alert(`/newApplication\n${date}\n${name}\n${time}`);
	return new Promise((resolve, reject) => {
		axios({
			url    : baseURL + 'newApplication/',
			method : 'POST',
			data   : {
				date,
				name,
				time
			}
		})
			.then((res) => {
				resolve(res);
			})
			.catch((err) => {
				reject(err);
			});
	});
};
