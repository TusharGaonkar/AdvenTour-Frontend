import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedAdminRoute = () => {
  const redirectURL = window.location.pathname;
  const { isLoggedIn, user } = useSelector((state: any) => state.userInfo);

  if (isLoggedIn && user?.role === 'admin') {
    return <Outlet />;
  }
  return <Navigate to="/admin/login" state={{ redirectURL }} replace />;
};

export default ProtectedAdminRoute;
