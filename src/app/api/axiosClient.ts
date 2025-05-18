import axios from 'axios';

// Function to get the token from local storage
const getToken = () => {
  return localStorage.getItem("token"); // Replace 'your_token_key' with the actual key you use to store the token
};

// Create an axios instance with a default header
const axiosInstance = axios.create({
  // baseURL: "https://api.brandsquare.store/api", // Replace with your API base URL
  baseURL: "http://localhost:8080/api", 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the JWT token to the header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default axiosInstance;