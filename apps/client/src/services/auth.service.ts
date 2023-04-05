import axios from 'axios';
import { TAuthResponse, TSignIn, TSignUp } from '../types/auth.type';

export const authService = {
  signIn: async (data: TSignIn) => {
    return axios.post<TAuthResponse>(
      'http://localhost:3000/api/auth/sign-in',
      data,
    );
  },
  signUp: async (data: TSignUp) => {
    return axios.post<TAuthResponse>(
      'http://localhost:3000/api/auth/sign-up',
      data,
    );
  },
};
