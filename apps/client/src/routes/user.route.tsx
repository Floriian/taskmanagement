import Profile from '../pages/user/Profile';
import { Route } from '../types';

export const userRouter: Route[] = [
  {
    path: '/profile',
    children: [
      {
        index: true,
        element: <Profile />,
      },
      {
        path: ':username',
        element: <Profile />,
      },
    ],
  },
];
