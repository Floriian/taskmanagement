import { createBrowserRouter } from 'react-router-dom';
import { authRouter } from './auth.router';
import { Route } from '../types';
import Home from '../pages/Home';
import Layout from '../components/Layout/Layout';
import { teamRouter } from './team.router';

const indexRouter: Route[] = [
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      ...teamRouter,
    ],
  },
];

const routes = [...authRouter, ...indexRouter];

export const router = createBrowserRouter(routes);
