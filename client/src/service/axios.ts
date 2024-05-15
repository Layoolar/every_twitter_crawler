import axios from 'axios';

const instance = axios.create({
	baseURL: import.meta.env.VITE_BACKEND_URL,
	timeout: 10000,
	withCredentials: true,
});

instance.interceptors.request.use((config) => {
	// Modify request config before sending
	console.log(config);
	return config;
});

instance.interceptors.response.use(
	(response) => {
		// Modify response before returning
		console.log(response.status);
		console.log(response.statusText);
		console.log(response.data);
		return response;
	},
	(error) => {
		// Handle errors
		throw error;
	}
);

export default instance;
