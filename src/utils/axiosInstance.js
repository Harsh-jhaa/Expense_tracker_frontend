import axios from 'axios';
import { BASE_URL } from './apiPaths.js';

// Create an Axios instance with default settings
// This instance can be used throughout the application to make API requests
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Add a request interceptor to include the token in the headers
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('token');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access, e.g., redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login'; // Redirect to login page
    } else if (error.response && error.response.status === 403) {
      // Handle forbidden access, e.g., show a message
      console.error(
        'Access forbidden: You do not have permission to perform this action.'
      );
    } else if (error.response && error.response.status === 404) {
      // Handle not found error
      console.error('Resource not found.');
    } else if (error.response && error.response.status === 500) {
      // Handle server error
      console.error('Internal server error. Please try again later.');
    } else if (error.code === 'ECONNABORTED') {
      // Handle bad request error
      console.error('Request timed out. Please try again later.');
    }

    return Promise.reject(error);
  }
);

// Export the configured Axios instance for use in other parts of the application
export default axiosInstance;
