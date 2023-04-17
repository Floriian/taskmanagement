import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { setToken } from '../../features/auth/authSlice';
import { Container, CssBaseline } from '@mui/material';

export default function Layout() {
  const token = localStorage.getItem('access_token');

  const auth = useAppSelector((state) => state.auth.userToken);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token) {
      dispatch(setToken(token));
    }
  }, [token, auth]);

  return (
    <>
      <CssBaseline />
      {token ? (
        <>
          <Sidebar>
            <Outlet />
          </Sidebar>
        </>
      ) : (
        <Navigate to="/auth/sign-in" />
      )}
    </>
  );
}
