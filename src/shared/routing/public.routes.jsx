import { Navigate } from 'react-router';
import { DefaultLayout, LoginLayout, DashboardLayout } from '../layouts';
import LoginEmail from '../../Auth/LoginEmail.view'
import Register from '../../Auth/Register.view'
import Dev from '../../Dev/Dev.view'
import LoginGoogle from '../../Auth/LoginGoogle.view'
import config from "../../../config.json"

const publicRoutes = [
  {
    path: '/',
    exact: true,
    layout: DefaultLayout,
    element: () => <Navigate to={config.homeUrl} />,
  },
  {
    path: '/login',
    exact: true,
    layout: LoginLayout,
    element: LoginEmail,
  },
   {
    path: '/register',
    exact: true,
    layout: LoginLayout,
    element: Register,
  },
  {
    path: '/login-google',
    exact: true,
    layout: LoginLayout,
    element: LoginGoogle,
  },
  {
    path: '/dev',
    exact: true,
    layout: DashboardLayout,
    element: Dev,
  },
];

export default publicRoutes;