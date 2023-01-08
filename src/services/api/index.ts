import axios from "axios";
import { APP_BASE_URL } from "../../constants/config";

import store from "../../redux/store";

import { logout } from "../../redux/reducers/authenticationSlice";

// eslint-disable-next-line
const axiosInstance = axios.create({
  baseURL: APP_BASE_URL,
  headers: { "Content-Type": "application/json" },
});


// const cometAxiosInstance = axios.create({
//   baseURL:COMET_BASE_URL,
//   headers:{
//      "Content-Type": "application/json",
//      'Accept': "application/json",
//      "apiKey":process.env.REACT_APP_COMET_APP_API_KEY
//   }
// })

axiosInstance.interceptors.request.use(
  function (config) {
    let token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status } = error.response;
    if (status === 401) {
      store.dispatch(logout());
    }
    return Promise.reject(error);
  }
);

export { axiosInstance };
