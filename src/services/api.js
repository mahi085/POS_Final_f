// import axios from "axios";
// import baseUrl from "./baseUrl";


// const API = axios.create({
//   baseURL: baseUrl
// });

// API.interceptors.request.use((req) => {

//   const token = localStorage.getItem("token");

//   if (token) {
//     req.headers.Authorization = `Bearer ${token}`;
//   }

//   return req;
// });

// export default API;

import axios from "axios";
import baseUrl from "./baseUrl";

const API = axios.create({
  baseURL: baseUrl,
  timeout: 10000, // prevent hanging requests
  withCredentials: true, // important if using cookies (safe to include)
});

// ✅ Request interceptor (attach token)
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  },
  (error) => Promise.reject(error)
);

// ✅ Response interceptor (handle errors globally)
API.interceptors.response.use(
  (res) => res,
  (error) => {
    if (!error.response) {
      console.error("🚨 Network Error / CORS issue");
    } else {
      const { status } = error.response;

      if (status === 401) {
        console.warn("🔒 Unauthorized - logging out");
        localStorage.removeItem("token");
        window.location.href = "/login";
      }

      if (status === 500) {
        console.error("🔥 Server error");
      }
    }

    return Promise.reject(error);
  }
);

export default API;
