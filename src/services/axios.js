import axios from 'axios';
import { toast } from 'react-toastify';
// import { alertError } from '../utils/alerts';

// const baseURL = import.meta.env.VITE_API_URL;

const baseURL = "http://89.116.121.48:3008/v1" //pet vet staging server
// const baseURL = "http://localhost:3001/v1" //pet vet staging server

const axiosApi = axios.create({
  baseURL,
});

const privateAxios = axios.create({
  baseURL,
});

privateAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accesstoken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

privateAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axiosApi.post('/v1/auth/refresh-token', { refreshToken });
        const { accessToken } = response.data;
        localStorage.setItem('accesstoken', accessToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return privateAxios(originalRequest);
      } catch (error) {
        window.localStorage.clear()
          // alert("Your login session has expired. Please log in again.")
          toast.error("Your login session has expired. Please log in again.")
          setTimeout(() => {
            window.location.href = '/login';
          }, 3000);
      }
    }

    return Promise.reject(error);
  }
);

export {
  privateAxios,
  axiosApi
};