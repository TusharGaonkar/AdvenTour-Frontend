import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaClockRotateLeft } from 'react-icons/fa6';
import { FaCalendarCheck } from 'react-icons/fa';
import { AiOutlineStock } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { Button } from '@nextui-org/react';
import NavBar from '../common/Navbar';
import StatsCard from '../features/AdventourAdminPage/StatsCard';
import GuideDisplayBookings from '../features/GuideDashboard/GuideDisplayBookings';
import { useGetStatsForGuideQuery } from '../redux/slices/guide-getBookingsStats';
import formatToINR from '../utils/currencyFormatter';
import { RootState } from '../app/store';

const BecomeGuide = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="absolute z-10 top-[40%] left-[50%] translate-y-[-50%] translate-x-[-50%]">
        <p className="font-semibold text-gray-700">
          Explore, guide, and be a part of our vibrant community!
          <br />
          Contribute your local places with us...
        </p>
        <Button
          variant="shadow"
          radius="lg"
          className="bg-indigo-400 text-white mt-2 font-semibold tracking-wide"
          onClick={() => {
            navigate('/contribute');
          }}
        >
          Contribute to AdvenTour
        </Button>
      </div>
      <div className="bg-[url('/dashboardsample.png')] blur-md max-w-7xl mx-auto h-[800px]" />
    </>
  );
};

const RenderGuideDashboard = () => {
  const { data: statsData, isFetching, isSuccess, refetch } = useGetStatsForGuideQuery({});
  const [refreshData, setRefreshData] = useState(false);
  const { user } = useSelector((state: RootState) => state.userInfo) || {};

  useEffect(() => {
    if (refreshData) {
      refetch();
      setRefreshData(false);
    }
  }, [refreshData, refetch]);

  return (
    <div className="max-w-7xl flex flex-col items-start mx-auto">
      {isSuccess && (
        <h1 className="text-lg font-semibold text-primary p-2">{`${user?.userName}'s Dashboard`}</h1>
      )}
      <div className="grid grid-cols-3 w-full gap-4 p-2">
        <StatsCard
          title="Past Bookings"
          value={statsData?.data?.pastTours || 0}
          isLoaded={!isFetching}
          icon={<FaClockRotateLeft />}
          style={{
            background: 'linear-gradient(to right, #ece9e6, #ffffff)',
            color: 'rgba(0 , 0 , 0 , 0.7)',
          }}
        />
        <StatsCard
          title="Upcoming Bookings"
          value={statsData?.data?.upcomingTours || 0}
          isLoaded={!isFetching}
          icon={<FaCalendarCheck />}
          style={{
            background: 'linear-gradient(to left, #c9d6ff, #e2e2e2)',
            color: 'rgba(0 , 0 , 0 , 0.7)',
          }}
        />
        <StatsCard
          title="Total Sales"
          value={formatToINR(statsData?.data?.totalSales || 0)}
          isLoaded={!isFetching}
          icon={<AiOutlineStock />}
          style={{
            background: 'linear-gradient(to right, #ece9e6, #ffffff)',
            color: 'rgba(0 , 0 , 0 , 0.7)',
          }}
        />
      </div>

      <div className="mx-auto w-full mt-3">
        <GuideDisplayBookings setIsRefreshing={setRefreshData} />
      </div>
    </div>
  );
};

const GuideDashboard = () => {
  const { user } = useSelector((state: RootState) => state.userInfo);
  const isGuide = user?.role === 'local-guide';
  return (
    <>
      <NavBar />
      {isGuide ? <RenderGuideDashboard /> : <BecomeGuide />}
    </>
  );
};

export default GuideDashboard;
