import { Navigate, Outlet } from 'react-router-dom';
import AdminNavigation from '../features/AdventourAdminPage/AdminNav';
import { useSelector } from 'react-redux';

const AdminLayout = () => {
  const { isLoggedIn, user } = useSelector((state: any) => state.userInfo);

  if (!isLoggedIn || user?.role !== 'admin') {
    return <Navigate to="/admin/login" replace />;
  }
  return (
    <>
      <AdminNavigation />
      <div className="max-w-7xl mx-auto flex flex-col gap-2 w-full">
        <Outlet />
      </div>
    </>
  );
};

export default AdminLayout;