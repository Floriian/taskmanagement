import CreateTeam from '../pages/team/CreateTeam';
import { Route } from '../types';

export const teamRouter: Route[] = [
  {
    path: 'team',
    children: [
      {
        path: 'create',
        element: <CreateTeam />,
      },
    ],
  },
];
