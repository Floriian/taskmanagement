import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { CssBaseline } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/store/redux-hooks';
import { setToken } from '../../app/store/features/auth/auth.slice';

export default function Layout() {
  const token = localStorage.getItem('access_token');

  const auth = useAppSelector((state) => state.auth);
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
