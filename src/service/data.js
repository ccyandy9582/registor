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
	return applicationApi.get('/getAllAppliers');
	// return new Promise((resolve, reject) => {
	//   axios({
	//     method: 'get',
	//     url: baseURL + 'getAllAppliers'
	//   })
	//     .then((res) => {
	//       resolve(res);
	//     })
	//     .catch((err) => {
	//       reject(err);
	//     });
	// });
};

export const getAvalibleTime = (weekday = '') => {
	return applicationApi.get(`/getAvailableTime/${weekday.toUpperCase()}`);
	// return new Promise((resolve, reject) => {
	//   axios({
	//     url: baseURL + 'getAvailableTime/' + weekday.toUpperCase(),
	//     method: 'get'
	//   })
	//     .then((res) => {
	//       resolve(res);
	//     })
	//     .catch((err) => {
	//       reject(err);
	//     });
	// });
};

// export const getApplicationsByDate = (date) => {
// return new Promise((resolve, reject) => {
//   axios({
//     url: baseURL + 'getApplierByDate/' + date,
//     method: 'get'
//   })
//     .then((res) => {
//       resolve(res);
//     })
//     .catch((err) => {
//       reject(err);
//     });
// });
// };

export const deleteApplication = (_id) => {
	return applicationApi.delete(`/deleteApplication/${_id}`, {
		cancelToken : source.token
	});
	// return new Promise((resolve, reject) => {
	//   axios({
	//     url: baseURL + 'deleteApplication/' + _id,
	//     method: 'delete'
	//   })
	//     .then((res) => {
	//       resolve(res);
	//     })
	//     .catch((err) => {
	//       reject(err);
	//     });
	// });
};

export const newApplication = (date, name, time) => {
	return applicationApi.post('/newApplication', { date, name, time });
	// alert(`/newApplication\n${date}\n${name}\n${time}`);
	// return new Promise((resolve, reject) => {
	//   axios({
	//     url: baseURL + 'newApplication/',
	//     method: 'POST',
	//     data: {
	//       date,
	//       name,
	//       time
	//     }
	//   })
	//     .then((res) => {
	//       resolve(res);
	//     })
	//     .catch((err) => {
	//       reject(err);
	//     });
	// });
};
