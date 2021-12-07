import axios from 'axios';

const applicationApi = axios.create({
	baseURL : 'http://3.140.181.237:8083/api',
	headers : {
		'Content-Type'                : 'application/json',
		'Access-Control-Allow-Origin' : '*'
	}
});

export const getApplications = () => {
	return applicationApi
		.get('/getAllAppliers')
		.then((res) => {
			console.log(`getAllAppliers success\n${res}`);
		})
		.catch((err) => {
			console.log(`getAllAppliers failure\n${err}`);
		});
};

export const getAvalibleTime = (weekday = '') => {
	return applicationApi
		.get(`/getAvailableTime/${weekday.toUpperCase()}`)
		.then((res) => {
			console.log(`getAvailableTime success\n${res}`);
		})
		.catch((err) => {
			console.log(`getAvailableTime failure\n${err}`);
		});
};

export const deleteApplication = (_id) => {
	return applicationApi
		.delete(`/deleteApplication/${_id}`)
		.then((res) => {
			console.log(`deleteApplication success\n${res}`);
		})
		.catch((err) => {
			console.log(`deleteApplication failure\n${err}`);
		});
};

export const newApplication = (date, name, time) => {
	return applicationApi
		.post('/newApplication', { date, name, time })
		.then((res) => {
			console.log(`newApplication success\n${res}`);
		})
		.catch((err) => {
			console.log(`newApplication failure\n${err}`);
		});
};
