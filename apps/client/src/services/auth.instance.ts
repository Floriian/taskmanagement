import axios from 'axios';

const token = localStorage.getItem('access_token');

export const authInstance = axios.create({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
