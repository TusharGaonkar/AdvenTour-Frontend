/* eslint-disable no-underscore-dangle */
import { Button, Progress } from '@nextui-org/react';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { MdAutoDelete } from 'react-icons/md';
import toast from 'react-hot-toast';
import NavBar from '../common/Navbar';
import FindTours from '../features/Tours/FindTours';
import Filters from '../features/Tours/Filters';
import TourCard from '../features/Tours/TourCard';
import noResults from '/noResults.gif';
import AdventourApiClientQueryBuilder from '../utils/adventourApiQueryBuilder';
import { resetToursQueryString } from '../redux/slices/filterToursSlice';
import CustomMobileNavigation from '../common/CustomMobileNavigation';
import { RootState } from '../app/store';
import useInfiniteToursScroll from '../hooks/useInfiniteToursScroll';

const RenderTourSkeleton = ({ count }: { count: number }) => (
  <>
    {Array.from({ length: count }).map((_, index) => (
      <div
        key={index}
        role="status"
        className="p-2 space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center bg-secondary"
      >
        <div className="flex items-center justify-center w-full h-48 p-10 bg-gray-300 rounded sm:w-96" />
        <div className="w-full">
          <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4" />
          <div className="h-2 bg-gray-200 rounded-full max-w-[480px] mb-2.5" />
          <div className="h-2 bg-gray-200 rounded-full mb-2.5" />
          <div className="h-2 bg-gray-200 rounded-full max-w-[440px] mb-2.5" />
          <div className="h-2 bg-gray-200 rounded-full max-w-[460px] mb-2.5" />
          <div className="h-2 bg-gray-200 rounded-full max-w-[360px]" />
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    ))}
  </>
);

const ToursPage = () => {
  const filters = useSelector((state: RootState) => state.filterToursQueryString);

  const getQueryString = useCallback(
    () =>
      AdventourApiClientQueryBuilder({
        ...filters,
        tourCategory: [...filters.tourCategory],
      }),
    [filters]
  );

  const [queryString, setQueryString] = useState(getQueryString || '');
  const [toursData, { page, isLoading, isSuccess, isError, error, handleScrollToBottom }] =
    useInfiniteToursScroll(queryString);

  const dispatch = useDispatch();

  useEffect(() => console.log(queryString));

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message || 'Something went wrong while fetching tours', {
        className: 'font-medium text-xs',
      });
    }
  }, [error?.data?.message, isError]);

  useEffect(() => {
    if (filters) {
      setQueryString(getQueryString);
    }
  }, [getQueryString, filters]);

  return (
    <>
      <Progress
        isIndeterminate={isLoading}
        className="w-full overflow-hidden"
        aria-label="progress"
        size="sm"
        color="danger"
      />
      <NavBar />
      <div className="max-w-6xl mx-auto mb-32 lg:mb-0">
        <FindTours />
        <div className="flex flex-col lg:flex-row">
          <Filters />
          <div className="flex flex-col w-full h-full gap-6 mt-4">
            {isLoading && !isSuccess && <RenderTourSkeleton count={3} />}
            {isSuccess &&
              toursData?.map(
                (
                  tour: Record<string, unknown>,
                  index: number,
                  tours: Array<Record<string, unknown>>
                ) => {
                  if (index === tours.length - 1) {
                    return (
                      // if it's the last tour in the list forward the ref
                      <TourCard key={tour._id as string} tour={tour} ref={handleScrollToBottom} />
                    );
                  }
                  return <TourCard key={tour._id as string} tour={tour} />;
                }
              )}
            {isSuccess && page == 1 && toursData?.length === 0 && (
              <div className="flex flex-col items-center justify-center w-full h-full gap-5 mx-auto ">
                <img src={noResults} className="object-cover h-[300px] w-full" alt="no results" />
                <p className="text-xs font-semibold text-slate-400">
                  No tours found , try changing some filters...
                </p>
                <Button
                  radius="full"
                  className="bg-[#1C107D] text-white"
                  onPress={() => dispatch(resetToursQueryString())}
                >
                  <MdAutoDelete size={20} />
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
        <CustomMobileNavigation />
      </div>
    </>
  );
};
export default ToursPage;
