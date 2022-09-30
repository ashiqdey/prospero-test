import axios from 'axios';
// config
import { urls } from '../config';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: urls.BASEURL,
});

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;
