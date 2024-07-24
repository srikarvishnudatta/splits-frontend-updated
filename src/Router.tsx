import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import GroupsPage from './pages/Groups.page';
import TransactionsPage from './pages/Transactions.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path:"/user/groups",
    element: <GroupsPage />
  },
  {
    path:"/:groupId/transactions",
    element: <TransactionsPage />
  }
]);

export function Router() {
  return <RouterProvider router={router} />;
}
