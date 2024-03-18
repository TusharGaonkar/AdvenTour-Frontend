/* eslint-disable no-underscore-dangle */
import { Tabs, Tab, Pagination, Skeleton, Progress } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import NavBar from '../common/Navbar';
import BookingCard from '../features/Bookings/BookingCard';
import { useGetUserBookingsQuery } from '../redux/slices/bookingSlice';
import noResults from '/juicy-girl-and-boy-searching-for-the-right-files.gif';
import CustomProgressiveImage from '../common/CustomProgressiveImage';
import CustomMobileNavigation from '../common/CustomMobileNavigation';

const RenderSkeleton = () => (
  <>
    {Array.from({ length: 3 }).map((_, index) => (
      <Skeleton className="w-full min-w-[305px] h-[270px] mx-auto rounded-xl" key={index} />
    ))}
  </>
);

const BookingsPage = () => {
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [bookingType, setBookingType] = useState<'upcoming' | 'past'>('upcoming');
  const {
    data: bookingsData,
    isSuccess,
    isFetching,
  } = useGetUserBookingsQuery({ page, type: bookingType });

  useEffect(() => {
    if (isSuccess) {
      const { totalPages = 1, currentPage = 1 } = bookingsData?.pagination || {};
      if (currentPage <= totalPages) {
        setMaxPage(totalPages);
        setPage(currentPage);
      } else {
        setMaxPage(1);
        setPage(1);
      }
    }
  }, [isSuccess, bookingsData?.pagination]);

  const handleTabChange = (key: 'upcoming' | 'past') => {
    setMaxPage(1);
    setPage(1);
    setBookingType(key);
  };

  return (
    <>
      <Progress
        size="sm"
        isIndeterminate={isFetching}
        aria-label="Loading..."
        className="w-full overflow-hidden"
        color="danger"
      />
      <NavBar />
      <div className="flex flex-col max-w-5xl gap-7 w-full mx-auto items-start p-2 mb-24">
        <p className="font-semibold text-xl self-start">My Bookings</p>
        <Tabs
          aria-label="bookings-tab"
          selectedKey={bookingType}
          onSelectionChange={handleTabChange}
        >
          <Tab key="upcoming" title="Upcoming Tours" />
          <Tab key="past" title="Past Tours" />
        </Tabs>
        {isFetching && <RenderSkeleton />}

        {isSuccess && (
          <p className="text-gray-500 font-semibold text-sm -mt-4 mx-1">
            Found {bookingsData?.totalBookings} bookings
          </p>
        )}

        {isSuccess && !isFetching && bookingsData?.data?.bookings?.length === 0 && (
          <div className="flex flex-col gap-1 items-center w-full">
            <p className="font-semibold sm:text-xl">No bookings found!</p>
            <CustomProgressiveImage src={noResults} alt="no-results" />
          </div>
        )}
        {isSuccess &&
          !isFetching &&
          bookingsData?.data?.bookings?.map((bookingInfo) => (
            <BookingCard key={bookingInfo?._id as string} bookingInfo={bookingInfo} />
          ))}
        <Pagination
          page={page}
          showControls
          onPageChange={setPage}
          total={maxPage}
          className="mx-auto"
        />
      </div>

      <CustomMobileNavigation />
    </>
  );
};

export default BookingsPage;
