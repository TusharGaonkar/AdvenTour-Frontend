import NavBar from '../common/Navbar';
import FindTours from '../features/Tours/FindTours';
import Filters from '../features/Tours/Filters';
import TourCard from '../features/Tours/TourCard';
import { useGetAllToursQuery } from '../redux/slices/getToursSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Progress } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { Spinner } from '@nextui-org/react';
import noResults from '/noResults.gif';
import customApiQueryBuilder from '../utils/customApiQueryBuilder';

const ToursPage = () => {
  const [tours, setTours] = useState<null | []>(null);
  const [queryString, setQueryString] = useState('');
  const filters = useSelector((state) => state.filterToursQueryString);
  const { data: tourData, status, isError, error } = useGetAllToursQuery(queryString);

  useEffect(() => console.log(queryString));
  useEffect(() => {
    setQueryString(customApiQueryBuilder(filters));
  }, [filters]);

  useEffect(() => {
    if (status === 'fulfilled') {
      setTours(tourData?.data.tours);
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
      <div className="max-w-6xl mx-auto">
        <NavBar />
        <FindTours />
        <div className="flex flex-row gap-12">
          <Filters />
          <div className="flex flex-col w-full h-full gap-6 mt-4">
            {status === 'pending' && (
              <Spinner color="danger" size="lg" className="mt-48" aria-label="loading" />
            )}
            {status === 'fulfilled' &&
              tours?.map((tour) => <TourCard key={tour._id} tour={tour} />)}
            {status === 'fulfilled' && tours?.length === 0 && (
              <div className="flex flex-col items-center justify-center w-full h-full gap-5 mx-auto ">
                <img src={noResults} className="object-cover h-[300px] w-full" alt="" />
                <p className="text-xs font-semibold text-slate-400">
                  No tours found , try changing some filters...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default ToursPage;
