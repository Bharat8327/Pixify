import axios from 'axios';
import {
  getItem,
  KEY_ACCESS_TOKEN,
  removeItem,
  setItem,
} from './localStorageManager';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8696',
  withCredentials: true /*without this not send the cookies fonted to backend without this  */,
});

// when api call from fronted  interceptores throw send the token automatic token send
axiosClient.interceptors.request.use((request) => {
  const accessToken = getItem(KEY_ACCESS_TOKEN);
  request.headers['Authorization'] = `Bearer ${accessToken}`;
  return request;
});

axiosClient.interceptors.response.use(async (response) => {
  const data = response.data;
  if (data.status === 'ok') {
    return data;
  }
  const originalRequest = response.config; // give to u original request where are u send the request to the server
  const statusCode = data.statusCode;
  const error = data.error;

  // refresh token are expired and say to user to login again
  if (statusCode === 401 && !originalRequest._retry) {
    // means the access token has expired
    originalRequest._retry = true;

    const response = await axios
      .create({
        withCredentials: true,
      })
      .get(`http://localhost:8696/auth/refresh`);

    if (response.data.status === 'ok') {
      setItem(KEY_ACCESS_TOKEN, response.data.result.accessToken);
      originalRequest.headers[
        'Authorization'
      ] = `Bearer ${response.data.result.accessToken}`;
      return axios(originalRequest);
    } else {
      removeItem(KEY_ACCESS_TOKEN);
      window.location.replace('/login', '_self');
      return Promise.reject(error);
    }
  }
  return Promise.reject(error);
});

export default axiosClient;
