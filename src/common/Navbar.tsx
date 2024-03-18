import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } from '@nextui-org/react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, User } from '@nextui-org/react';
import { useDisclosure } from '@nextui-org/react';
import { logoutUser } from '../redux/slices/userSlice';
import logo from '/advenTourLogo.png';
import ProfileSettings from '../pages/ProfileSettings';
import SearchBar from '../features/Tours/SearchBar';
import { RootState } from '../app/store';

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
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <ProfileSettings isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange} />
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              src: avatar,
              showFallback: true,
              name: userName,
            }}
            className="transition-transform "
            name={
              userRole === 'local-guide' ? 'Local Guide' : userRole === 'admin' ? 'Admin' : 'User'
            }
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem key="user-profile" className="gap-2 h-14">
            <p className="font-bold">Signed in as</p>
            <p className="font-bold">{userName}</p>
          </DropdownItem>
          <DropdownItem key="settings" onClick={() => onOpen()}>
            Profile Settings
          </DropdownItem>
          <DropdownItem key="logout" color="danger" onClick={() => dispatch(logoutUser())}>
            Logout
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  );
};

const NavBar = () => {
  const { pathname } = useLocation();
  const { user, isLoggedIn } = useSelector((state: RootState) => state.userInfo);

  return (
    <Navbar className="text-xs mb-4" isBordered>
      <NavbarBrand className="flex items-center justify-between gap-2">
        <NavLink to="/">
          <div className="flex flex-col sm:flex-row items-center justify-end gap-1 sm:p-2">
            <img className="h-[45px] rounded-full bg-[#c8ffb8] ml-2" src={logo} alt="logo" />
            <span className="text-sm font-bold text-slate-700 hidden sm:block">AdvenTour</span>
          </div>
        </NavLink>
        {pathname !== '/' && (
          <div className="md:w-[400px] flex items-center gap-4">
            <NavbarItem key="search" className="w-full">
              <SearchBar />
            </NavbarItem>
            <NavbarItem key="user-profile" className="lg:hidden mt-1">
              <UserDropDown userName={user?.userName} userRole={user?.role} avatar={user?.avatar} />
            </NavbarItem>
          </div>
        )}
      </NavbarBrand>

      <NavbarContent as="div" justify="end" className="hidden lg:flex">
        {isLoggedIn ? (
          <>
            <NavbarItem
              key="All tours"
              className={
                pathname.includes('/tours') ? 'hidden lg:block font-semibold' : 'hidden lg:block'
              }
            >
              <NavLink to="/tours">All Tours</NavLink>
            </NavbarItem>

            <NavbarItem
              key="Bookmarked Tours"
              className={
                pathname?.includes('/bookmarks')
                  ? 'hidden lg:block font-semibold'
                  : 'hidden lg:block'
              }
            >
              <NavLink to="/bookmarks">Bookmarks</NavLink>
            </NavbarItem>
            <NavbarItem
              key="bookings"
              className={
                pathname?.includes('/bookings')
                  ? 'hidden lg:block font-semibold'
                  : 'hidden lg:block'
              }
            >
              <NavLink to="/bookings">My bookings</NavLink>
            </NavbarItem>
            <NavbarItem
              key="Dashboard"
              className={
                pathname?.includes('/dashboard')
                  ? 'hidden lg:block font-semibold'
                  : 'hidden lg:block'
              }
            >
              <NavLink to="/dashboard">Dashboard</NavLink>
            </NavbarItem>
            <NavbarItem
              key="profile"
              className="lg:flex lg:items-center lg:justify-start lg:pr-2 lg:ml-2 lg:text-white lg:rounded-full lg:bg-slate-500 hidden"
            >
              <div className="hidden md:flex">
                <UserDropDown
                  userName={user?.userName}
                  userRole={user?.role}
                  avatar={user?.avatar}
                />
              </div>
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
