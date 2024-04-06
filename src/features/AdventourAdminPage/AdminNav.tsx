/* eslint-disable jsx-a11y/anchor-is-valid */
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from '@nextui-org/react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import logo from '/advenTourLogo.png';
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
    const response = await logout();
    if (!response || response?.error) {
      throw new Error('Failed to logout user');
    }
    dispatch(logoutUser());
    navigate('/admin/login');
  };

  return (
    <Navbar className="mb-6 bg-secondary">
      <NavbarBrand>
        <p className="font-bold text-inherit">
          <NavLink to="/admin">
            <div className="flex items-center justify-end gap-1 p-1">
              <img className="h-[45px] rounded-full bg-[#c8ffb8]" src={logo} alt="logo" />
              <span className="font-bold text-medium text-slate-700">AdvenTour</span>
            </div>
          </NavLink>
        </p>
      </NavbarBrand>
      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
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
