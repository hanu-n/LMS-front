import axios from "axios";

const axiosInstance = axios.create({
   baseURL: "http://localhost:5000/api"
  // "https://lms-vx2w.onrender.com"
 ,
  
});

// Automatically attach token
axiosInstance.interceptors.request.use((config) => {
  // Support both legacy key "token" and the auth key used in this app "sms-token"
  const token = localStorage.getItem("token") || localStorage.getItem("sms-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    // helpful debug when requests are failing due to missing token
    // (comment out in production if noisy)
    // console.debug('axiosInstance: no auth token found in localStorage');
  }
  return config;
});

export default axiosInstance;
