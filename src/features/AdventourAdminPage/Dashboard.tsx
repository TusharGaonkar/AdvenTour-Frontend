/* eslint-disable arrow-body-style */
import { FaBusinessTime } from 'react-icons/fa';
import { MdOutlineVerified } from 'react-icons/md';
import { AiOutlineRise } from 'react-icons/ai';
import { Divider } from '@nextui-org/react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import StatsCard from './StatsCard';
import TourVerificationTable from './TourVerificationTable';
import { useGetStatsQuery } from '../../redux/slices/admin-statsSlice';
import formatToINR from '../../utils/currencyFormatter';

const Dashboard = () => {
  const { data: statsData, isFetching, isError, refetch } = useGetStatsQuery();
  const { isLoggedIn, user } = useSelector((state: any) => state.userInfo);

  useEffect(() => {
    if (isError) {
      toast.error('Something went wrong while fetching stats', {
        className: 'text-xs font-medium',
      });
    }
  }, [isError]);

  if (!isLoggedIn || user?.role !== 'admin') {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <main className="flex flex-col gap-9">
      <section className="flex flex-col gap-5 p-2">
        <h1 className="font-bold text-primary text-2xl">Overview</h1>

        <div className="grid grid-cols-1 gap-3 sm:grid sm:grid-cols-3 sm:gap-3">
          <StatsCard
            title="Total Sales"
            value={formatToINR(statsData?.data?.totalSales || 0)}
            style={{ backgroundColor: '#3FC1C9', color: 'white' }}
            isLoaded={!isFetching}
            icon={<AiOutlineRise />}
          />

          <StatsCard
            title="Verified Guides"
            value={statsData?.data?.totalVerifiedGuides || 0}
            isLoaded={!isFetching}
            icon={<MdOutlineVerified className="text-black text-2xl" />}
          />
          <StatsCard
            title="Upcoming Bookings"
            value={statsData?.data?.upcomingBookings || 0}
            isLoaded={!isFetching}
            style={{ backgroundColor: '#FC5185', color: 'white' }}
            icon={<FaBusinessTime />}
          />
        </div>
      </section>
      <Divider />
      <section>
        <TourVerificationTable refetchStats={refetch} />
      </section>
    </main>
  );
};

export default Dashboard;
