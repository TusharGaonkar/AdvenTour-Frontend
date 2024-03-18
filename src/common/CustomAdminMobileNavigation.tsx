import { NavLink, useLocation } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { RiStockFill } from 'react-icons/ri';
import { IoBagCheck } from 'react-icons/io5';

const pages = [
  {
    label: 'Dashboard',
    path: '/admin',
    Icon: RiStockFill,
  },
  {
    label: 'Users',
    path: '/admin/users',
    Icon: FaUser,
  },

  {
    label: 'All Bookings',
    path: '/admin/bookings',
    Icon: IoBagCheck,
  },
];

const CustomAdminMobileNavigation = () => {
  const { pathname } = useLocation();

  return (
    <div className="sm:hidden grid grid-cols-3 gap-1 items-center fixed bottom-0 justify-center w-full text-white bg-gradient-to-r from-gray-700 to-gray-600 p-1 h-[70px] z-[999]">
      {pages.map((page) => (
        <div className="flex flex-col items-center gap-0.5" key={page.label}>
          <page.Icon className={pathname === page.path ? 'text-blue-400' : 'text-white'} />
          <NavLink to={page.path}>
            <p
              className={
                pathname === page.path
                  ? 'text-blue-400 text-xs tracking-wide'
                  : 'text-white text-xs tracking-wide'
              }
            >
              {page.label}
            </p>
          </NavLink>
        </div>
      ))}
    </div>
  );
};

export default CustomAdminMobileNavigation;
