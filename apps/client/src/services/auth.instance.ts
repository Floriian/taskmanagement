import axios from 'axios';

const token = () =>
  localStorage.getItem('access_token')
    ? localStorage.getItem('access_token')
    : null;

export const authInstance = axios.create({
  baseURL: '/api',
});
authInstance.interceptors.request.use((conf) => {
  const _token = localStorage.getItem('access_token');
  conf.headers['Authorization'] = 'Bearer ' + _token;
  return conf;
});
