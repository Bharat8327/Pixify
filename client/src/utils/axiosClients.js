import axios from 'axios';
import {
  getItem,
  KEY_ACCESS_TOKEN,
  removeItem,
  setItem,
} from './localStorageManager';
import { TOAST_FAILURE } from '../App';
import { setLoading, showToast } from '../redux/slice/appConfigSlice';

const baseURL =
  'https://cashinp-plbackend.onrender.com' || 'http://localhost:8696';

const axiosClient = axios.create({
  baseURL,
  withCredentials: true,
});

// when api call from fronted  interceptores throw send the token automatic token send
axiosClient.interceptors.request.use((request) => {
  const accessToken = getItem(KEY_ACCESS_TOKEN);
  if (accessToken) {
    request.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  import('../redux/store/store').then(({ default: store }) => {
    store.dispatch(setLoading(true));
  });
  return request;
});

axiosClient.interceptors.response.use(
  async (response) => {
    import('../redux/store/store').then(({ default: store }) => {
      store.dispatch(setLoading(false));
    });
    const data = response.data;
    if (data.status === 'ok') {
      return data;
    }
    const originalRequest = response.config; // give to u original request where are u send the request to the server
    const statusCode = data.statusCode;
    const error = data.message;

    import('../redux/store/store').then(({ default: store }) => {
      store.dispatch(
        showToast({
          type: TOAST_FAILURE,
          message: error,
        }),
      );
    });

    // refresh token are expired and say to user to login again
    if (statusCode === 401 && !originalRequest._retry) {
      // means the access token has expired
      originalRequest._retry = true;
      try {
        const response = await axios
          .create({
            withCredentials: true,
          })
          .get(`${baseURL}/auth/refresh`);

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
      } catch (refreshError) {
        removeItem(KEY_ACCESS_TOKEN);
        window.location.replace('/login', '_self');
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
  async (error) => {
    import('../redux/store/store').then(({ default: store }) => {
      store.dispatch(setLoading(false));
      store.dispatch(
        showToast({
          type: TOAST_FAILURE,
          message: error.message,
        }),
      );
    });
    return Promise.reject(error);
  },
);

export default axiosClient;
