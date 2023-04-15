import CreateTeam from '../pages/team/CreateTeam';
import TeamIndex from '../pages/team/TeamIndex';
import { Route } from '../types';

export const teamRouter: Route[] = [
  {
    path: 'team',
    children: [
      {
        index: true,
        element: <TeamIndex />,
      },
      {
        path: 'create',
        element: <CreateTeam />,
      },
    ],
  },
];
