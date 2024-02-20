/* eslint-disable jsx-a11y/anchor-is-valid */
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from '@nextui-org/react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import logo from '/advenTourLogo.png';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useLogoutUserMutation } from '../../redux/slices/authSlice';
import { logoutUser } from '../../redux/slices/userSlice';

const items = [
  {
    label: 'Dashboard',
    link: '/admin',
  },
  {
    label: 'Users',
    link: '/admin/users',
  },
  {
    label: 'Bookings',
    link: '/admin/bookings',
  },
];

export default function AdminNavbar() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logout] = useLogoutUserMutation();
  const handleLogout = async () => {
    const toastID = toast.loading('Logging out user...', { className: 'text-xs font-medium' });
    try {
      const response = await logout();
      if (!response || response?.error) {
        throw new Error('Failed to logout user');
      }
      dispatch(logoutUser());
      toast.dismiss(toastID);
      toast.success('Logged out successfully', { className: 'text-xs font-medium' });
      navigate('/admin/login');
    } catch (error) {
      toast.error(error?.message || 'Failed to logout user', { className: 'text-xs font-medium' });
    } finally {
      toast.dismiss(toastID);
    }
  };
  return (
    <Navbar className="bg-secondary mb-6">
      <NavbarBrand>
        <p className="font-bold text-inherit">
          <NavLink to="/admin">
            <div className="flex items-center justify-end gap-1 p-1">
              <img className="h-[45px] rounded-full bg-[#c8ffb8]" src={logo} alt="logo" />
              <span className="text-medium font-bold text-slate-700">AdvenTour</span>
            </div>
          </NavLink>
        </p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {items.map((item) => (
          <NavbarItem key={item.label} isActive={pathname === item.link}>
            <NavLink to={item.link}>{item.label}</NavLink>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat" onClick={() => handleLogout()}>
            Logout
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
