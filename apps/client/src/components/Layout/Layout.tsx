import React, { useEffect, useMemo } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { CssBaseline, createTheme, ThemeProvider } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/store/redux-hooks';
import { setToken } from '../../app/store/features/auth/auth.slice';
import { darkTheme, lightTheme } from '../../themes';

export default function Layout() {
  const token = useAppSelector((state) => state.auth.userToken);

  const ui = useAppSelector((state) => state.ui);

  return (
    <ThemeProvider theme={ui.lightMode ? lightTheme : darkTheme}>
      <CssBaseline />
      {token != '' ? (
        <>
          <Sidebar>
            <Outlet />
          </Sidebar>
        </>
      ) : (
        <Navigate to="/auth/sign-in" />
      )}
    </ThemeProvider>
  );
}
