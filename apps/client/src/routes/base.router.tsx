import { createBrowserRouter } from 'react-router-dom';
import { authRouter } from './auth.router';

const routes = [...authRouter];
export const router = createBrowserRouter(routes);
