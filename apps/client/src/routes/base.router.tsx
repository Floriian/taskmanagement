import { createBrowserRouter } from 'react-router-dom';
import { authRouter } from './auth.router';
import { Route } from '../types';
import Home from '../pages/Home';
import Layout from '../components/Layout/Layout';
import { teamRouter } from './team.router';
import { userRouter } from './user.route';
import { taskRouter } from './task.router';
import { chatRouter } from './chat.router';
import NotFound from '../pages/404';

const indexRouter: Route[] = [
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      ...teamRouter,
      ...userRouter,
      ...taskRouter,
      ...chatRouter,
    ],
  },
];
const notFoundRoute: Route = {
  path: '*',
  element: <NotFound />,
};

const routes = [...authRouter, notFoundRoute, ...indexRouter];

export const router = createBrowserRouter(routes);
