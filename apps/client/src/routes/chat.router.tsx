import ChatPage from '../pages/chat/ChatPage';
import { Route } from '../types';

export const chatRouter: Route[] = [
  {
    path: '/chat',
    children: [
      {
        index: true,
        element: <ChatPage />,
      },
    ],
  },
];
