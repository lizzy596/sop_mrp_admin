import { Navigate } from 'react-router';
import { DashboardLayout } from '../layouts';
import Users from '../../User/Users.view'
import DbBackups from '../../DbBackups/DbBackups.view';
import KnowledgeBase from '../../AI/KnowledgeBase.view';
import ChatLogs from '../../AI/ChatLogs.view';
import DashboardMain from '../../DashboardMain.view';
import ServerStats from '../../Server/ServerStats.view';
import ServerErrors from '../../Server/ServerErrors.view';
import ServerLogs from '../../Server/ServerLogs.view';
import Items from '../../Item/Items.view';

const protectedRoutes = [
  {
    path: '/dashboard',
    exact: true,
    layout: DashboardLayout,
    roles: ['systemAdmin', 'admin'],
    element: DashboardMain,
  },
  {
    path: '/users',
    exact: true,
    layout: DashboardLayout,
    roles: ['systemAdmin', 'admin'],
    element: Users,
  },
    {
    path: '/items',
    exact: true,
    layout: DashboardLayout,
    roles: ['systemAdmin', 'admin'],
    element: Items,
  },
  {
    path: '/ai',
    exact: true,
    layout: DashboardLayout,
    roles: ['systemAdmin', 'admin'],
    element: KnowledgeBase,
  },
  {
    path: '/ai/chat-logs',
    exact: true,
    layout: DashboardLayout,
    roles: ['systemAdmin', 'admin'],
    element: ChatLogs,
  },
  {
    path: '/ai/knowledge-base',
    exact: true,
    layout: DashboardLayout,
    roles: ['systemAdmin', 'admin'],
    element: KnowledgeBase,
  },
  // {
  //   path: '/logs',
  //   exact: true,
  //   layout: DashboardLayout,
  //   roles: ['systemAdmin', 'admin'],
  //   element: Logs,
  // },
  {
    path: '/server',
    exact: true,
    layout: DashboardLayout,
    roles: ['systemAdmin', 'admin'],
    element: ServerStats,
  },
  {
    path: '/server/server-errors',
    exact: true,
    layout: DashboardLayout,
    roles: ['systemAdmin', 'admin'],
    element: ServerErrors,
  },
  {
    path: '/server/server-logs',
    exact: true,
    layout: DashboardLayout,
    roles: ['systemAdmin', 'admin'],
    element: ServerLogs,
  },
  {
    path: '/db-backups',
    exact: true,
    layout: DashboardLayout,
    roles: ['systemAdmin', 'admin'],
    element: () => <Navigate to={'/db-backups/pro'} />,
  },
  {
    path: '/db-backups/:db',
    exact: true,
    layout: DashboardLayout,
    roles: ['systemAdmin', 'admin'],
    element: DbBackups,
  },
];

export default protectedRoutes;