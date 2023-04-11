import React, { ReactNode, useEffect, useState } from 'react';
import { Navigate, Outlet, redirect, useNavigate } from 'react-router-dom';
import { authInstance } from '../../services/auth.instance';
import { AxiosError } from 'axios';
import Menu from './Menu';
import Sidebar from './Sidebar';

export default function Layout() {
  //const [valid, setValid] = useState<boolean>();
  const token = localStorage.getItem('access_token');
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const fetch = async () => {
  //     try {
  //       const data = await authInstance('/api/user');
  //     } catch (e) {
  //       if (e instanceof AxiosError) {
  //         if (e.response?.data.statusCode! === 401) {
  //           setValid(false);
  //         }
  //       }
  //       console.log(e);
  //     }
  //   };
  //   fetch();
  // });

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
