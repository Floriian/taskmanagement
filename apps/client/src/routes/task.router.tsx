import TaskIndex from '../pages/task/TaskIndex';
import { Route } from '../types';

export const taskRouter: Route[] = [
  {
    path: '/tasks',
    children: [
      {
        index: true,
        element: <TaskIndex />,
      },
    ],
  },
];
