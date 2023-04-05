import { createBrowserRouter } from 'react-router-dom';
import { Route } from '../types';

const testRouter: Route[] = [
  {
    title: 'Főoldal',
    path: '/',
    element: <h1>hello world</h1>,
  },
];
export const router = createBrowserRouter(testRouter);
