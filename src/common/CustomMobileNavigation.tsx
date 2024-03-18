import { NavLink, useLocation } from 'react-router-dom';
import { BiSolidDonateHeart } from 'react-icons/bi';
import { IoBookmarkSharp } from 'react-icons/io5';
import { MdOutlineTravelExplore } from 'react-icons/md';
import { FaHome } from 'react-icons/fa';
import { IoBagCheck } from 'react-icons/io5';

const pages = [
  {
    label: 'Home',
    path: '/',
    Icon: FaHome,
  },
  {
    label: 'All Tours',
    path: '/tours',
    Icon: MdOutlineTravelExplore,
  },

  {
    label: 'Bookmarks',
    path: '/bookmarks',
    Icon: IoBookmarkSharp,
  },
  {
    label: 'Bookings',
    path: '/bookings',
    Icon: IoBagCheck,
  },
  {
    label: 'Contribute',
    path: '/contribute',
    Icon: BiSolidDonateHeart,
  },
];
const CustomMobileNavigation = () => {
  const { pathname } = useLocation();

  return (
    <div className="lg:hidden grid grid-cols-5 gap-1 items-center fixed bottom-0 justify-center w-full text-white bg-gradient-to-r from-gray-700 to-gray-600 p-1 h-[70px] z-[999]">
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

export default CustomMobileNavigation;
