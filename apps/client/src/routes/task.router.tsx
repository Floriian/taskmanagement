import TaskIndex from '../pages/task/TaskIndex';
import TaskPageById from '../pages/task/TaskPageById';
import { Route } from '../types';

export const taskRouter: Route[] = [
  {
    path: '/tasks',
    children: [
      {
        index: true,
        element: <TaskIndex />,
      },
      {
        path: ':id',
        element: <TaskPageById />,
      },
    ],
  },
];
