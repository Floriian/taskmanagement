import React, { ReactNode, useEffect, useState } from 'react';
import { Navigate, Outlet, redirect, useNavigate } from 'react-router-dom';
import { authInstance } from '../../services/auth.instance';
import { AxiosError } from 'axios';
import Menu from './Menu';
import Sidebar from './Sidebar';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { setToken } from '../../features/auth/authSlice';
import { teamService } from '../../services/team.service';
import { setTeam } from '../../features/team/teamSlice';

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
      {token ? (
        <>
          {/* <Sidebar> */}
          <Menu />
          <Outlet />
          {/* </Sidebar> */}
        </>
      ) : (
        <Navigate to="/auth/sign-in" />
      )}
    </>
  );
}
