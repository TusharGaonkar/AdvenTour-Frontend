import { Button, Progress } from '@nextui-org/react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { MdAutoDelete } from 'react-icons/md';
import NavBar from '../common/Navbar';
import FindTours from '../features/Tours/FindTours';
import Filters from '../features/Tours/Filters';
import TourCard from '../features/Tours/TourCard';
import { useGetAllToursQuery } from '../redux/slices/getToursSlice';
import noResults from '/noResults.gif';
import AdventourApiClientQueryBuilder from '../utils/adventourApiQueryBuilder';
import { resetToursQueryString } from '../redux/slices/filterToursSlice';
import CustomMobileNavigation from '../common/CustomMobileNavigation';
import { RootState } from '../app/store';
import toast from 'react-hot-toast';

const RenderTourSkeleton = ({ count }: { count: number }) => (
  <>
    {Array.from({ length: count }).map((_, index) => (
      <div
        key={index}
        role="status"
        className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center bg-secondary p-2"
      >
        <div className="flex items-center justify-center h-48 p-10 w-full bg-gray-300 rounded sm:w-96" />
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
  const [tours, setTours] = useState<null | []>(null);
  const [queryString, setQueryString] = useState('');
  const filters = useSelector((state: RootState) => state.filterToursQueryString);
  const { data: tourData, status, isError, error } = useGetAllToursQuery(queryString);
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
      setQueryString(
        AdventourApiClientQueryBuilder({ ...filters, tourCategory: [...filters.tourCategory] })
      );
    }
  }, [filters]);

  useEffect(() => {
    if (status === 'fulfilled') {
      setTours(tourData?.data?.tours);
    }
  }, [status, tourData]);

  return (
    <>
      <Progress
        isIndeterminate={status === 'pending'}
        className="w-full overflow-hidden"
        aria-label="progress"
        size="sm"
        color="danger"
      />
      <NavBar />
      <div className="max-w-6xl mx-auto mb-32 lg:mb-0">
        <FindTours />
        <div className="flex lg:flex-row flex-col">
          <Filters />
          <div className="flex flex-col w-full h-full gap-6 mt-4">
            {status === 'pending' && <RenderTourSkeleton count={3} />}
            {status === 'fulfilled' &&
              tours?.map((tour) => <TourCard key={tour._id} tour={tour} />)}
            {status === 'fulfilled' && tours?.length === 0 && (
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
