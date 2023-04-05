import { SignIn } from '../pages/auth/SignIn';
import { Signup } from '../pages/auth/SignUp';
import { Route } from '../types';

export const authRouter: Route[] = [
  {
    path: 'auth',
    children: [
      {
        path: 'sign-up',
        element: <Signup />,
      },
      {
        path: 'sign-in',
        element: <SignIn />,
      },
    ],
  },
];
