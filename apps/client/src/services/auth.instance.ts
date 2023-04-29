import axios, { AxiosError, AxiosResponse } from 'axios';
import { TNestError } from '../types';
import { authService } from './auth.service';
import { store } from '../app/store/store';
import { removeToken } from '../app/store/features/auth/auth.slice';

const token = () =>
  localStorage.getItem('access_token')
    ? localStorage.getItem('access_token')
    : null;

export const authInstance = axios.create({
  baseURL: '/api',
});
authInstance.interceptors.request.use((conf) => {
  const _token = store.getState().auth.userToken;
  conf.headers['Authorization'] = 'Bearer ' + _token;
  return conf;
});

authInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error instanceof AxiosError) {
      if (
        error.response?.status === 401 &&
        error.response.data.message === 'Invalid Token!'
      ) {
        store.dispatch(removeToken());
      }
    }

    return Promise.reject(error);
  },
);
