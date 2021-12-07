import axios from 'axios';

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

const applicationApi = axios.create({
	baseURL : 'http://3.140.181.237:8083/api',
	headers : {
		'Content-Type'                : 'application/json',
		'Access-Control-Allow-Origin' : '*'
	}
});

export const getApplications = () => {
	return applicationApi
		.get('/getAllAppliers', { cancelToken: source.token })
		.then((res) => {
			console.log(`getAllAppliers success\n${res}`);
			return res;
		})
		.catch((err) => {
			console.log(`getAllAppliers failure\n${err}`);
			return err;
		});
};

export const getAvalibleTime = (weekday = '') => {
	return applicationApi
		.get(`/getAvailableTime/${weekday.toUpperCase()}`, { cancelToken: source.token })
		.then((res) => {
			console.log(`getAvailableTime success\n${res}`);
			return res;
		})
		.catch((err) => {
			console.log(`getAvailableTime failure\n${err}`);
			return err;
		});
};

export const deleteApplication = (_id) => {
	return applicationApi
		.get(`/deleteApplication/${_id}`, { cancelToken: source.token })
		.then((res) => {
			console.log(`deleteApplication success\n${res}`);
			return res;
		})
		.catch((err) => {
			console.log(`deleteApplication failure\n${err}`);
			return err;
		});
};

export const newApplication = (date, name, time) => {
	return applicationApi
		.get(`/newApplication/${date}/${name}/${time}`, { date, name, time }, { cancelToken: source.token })
		.then((res) => {
			console.log(`newApplication success\n${res}`);
			return res;
		})
		.catch((err) => {
			console.log(`newApplication failure\n${err}`);
			return err;
		});
};
