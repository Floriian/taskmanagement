import { createBrowserRouter } from 'react-router-dom';
import { authRouter } from './auth.router';
import { Route } from '../types';
import Home from '../pages/Home';
import Layout from '../components/Layout/Layout';

const indexRouter: Route[] = [
  {
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: '/',
            element: <Home />,
          },
        ],
      },
    ],
  },
];

const routes = [...authRouter, ...indexRouter];

export const router = createBrowserRouter(routes);
