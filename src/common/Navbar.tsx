import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } from '@nextui-org/react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { logoutUser } from '../redux/slices/userSlice';
import logo from '/advenTourLogo.png';

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  User,
} from '@nextui-org/react';
import SearchBar from '../features/Tours/SearchBar';

const landingPageLinks = [
  {
    label: 'All tours',
    link: '/tours',
  },

  {
    label: 'Spotlight',
    link: '#',
  },
];

const UserDropDown = ({
  userName,
  userRole,
  avatar,
}: {
  userName: string;
  userRole: string;
  avatar: string;
}) => {
  const dispatch = useDispatch();
  return (
    <Dropdown placement="bottom-start">
      <DropdownTrigger>
        <User
          as="button"
          avatarProps={{
            isBordered: true,
            src: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
          }}
          className="transition-transform"
          name={userName}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="User Actions" variant="flat">
        <DropdownItem key="user-profile" className="gap-2 h-14">
          <p className="font-bold">Signed in as</p>
          <p className="font-bold">{userName}</p>
        </DropdownItem>
        <DropdownItem key="settings">Profile Settings</DropdownItem>
        <DropdownItem key="logout" color="danger" onClick={() => dispatch(logoutUser())}>
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

const NavBar = () => {
  const { pathname } = useLocation();

  const { user, isLoggedIn } = useSelector((state) => state.userInfo);

  return (
    <Navbar className="text-xs mb-4" isBordered>
      <NavbarBrand>
        <p className="font-bold text-inherit">
          <NavLink to="/">
            <div className="flex items-center justify-end gap-1 p-1">
              <img className="h-[45px] rounded-full bg-[#c8ffb8]" src={logo} alt="logo" />
              <span className="text-medium font-bold text-slate-700">AdvenTour</span>
            </div>
          </NavLink>
        </p>
      </NavbarBrand>
      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        {pathname === '/' &&
          landingPageLinks.map((item) => (
            <NavbarItem key={item.label}>
              <NavLink to={item.link} className={pathname === item.link ? 'font-semibold' : ''}>
                {item.label}
              </NavLink>
            </NavbarItem>
          ))}
      </NavbarContent>
      <NavbarContent justify="end" className="">
        {isLoggedIn ? (
          <>
            {pathname != '/' && (
              <NavbarItem key="search" className="w-[400px]">
                <SearchBar />
              </NavbarItem>
            )}
            <NavbarItem key="contribute">
              <NavLink to="/contribute">Contribute</NavLink>
            </NavbarItem>
            <NavbarItem key="Bookmarked Tours">
              <NavLink to="/bookmarks">Bookmarks</NavLink>
            </NavbarItem>
            <NavbarItem key="bookings">
              <NavLink to="#">My bookings</NavLink>
            </NavbarItem>
            <NavbarItem
              key="profile"
              className="flex items-center justify-start pr-2 ml-2 text-white rounded-full bg-slate-500"
            >
              <UserDropDown userName={user?.userName} userRole={user?.role} avatar={user?.avatar} />
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem className="hidden lg:flex">
              <NavLink to="/login">Login</NavLink>
            </NavbarItem>
            <NavbarItem>
              <Button color="primary" variant="flat">
                <NavLink to="/register">Register</NavLink>
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
};

export default NavBar;
