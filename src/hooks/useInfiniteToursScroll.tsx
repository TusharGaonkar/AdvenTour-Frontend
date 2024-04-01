// Custom implementation of infinite scroll hook for tours using RTK query
import { useCallback, useRef, useState, useEffect } from 'react';
import { useGetAllToursQuery } from '../redux/slices/getToursSlice';

type TourDataType = Record<string, any>;

export default function useInfiniteToursScroll(queryString: string) {
  const [page, setPage] = useState(1);
  const [limit] = useState(3); // Limit doesn't need to be stateful unless it changes dynamically
  const [hasMoreData, setHasMoreData] = useState(true);
  const [noResultsFound, setNoResultsFound] = useState(false);
  const [toursData, setToursData] = useState<TourDataType[]>([]);

  const { data, isSuccess, isLoading, isFetching, isError, error, status } = useGetAllToursQuery({
    queryString,
    page,
    limit,
  });

  useEffect(() => {
    setToursData([]);
    setHasMoreData(true);
    setNoResultsFound(false);
    setPage(1);
  }, [queryString]); // Reset the page when the query string changes

  useEffect(() => {
    const scrollPosition = window.scrollY;
    if (data && status === 'fulfilled') {
      const newTourData = data.data?.tours || [];
      if (newTourData.length === 0 && page === 1) {
        setNoResultsFound(true);
        return;
      }
      setToursData((prevTours: TourDataType[]) => [...prevTours, ...newTourData]);
      const isEnd = (data.totalResults || 0) < limit;
      setHasMoreData(!isEnd);
    }
    window.scrollTo(0, scrollPosition); // prevent scrolling to top when new data is fetched
  }, [data, limit, page, status]);

  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleScrollToBottom = useCallback(
    (node: HTMLElement | null) => {
      if (observerRef.current) {
        observerRef.current.disconnect(); // remove all previous observers
      }
      if (node && hasMoreData && !isFetching) {
        observerRef.current = new IntersectionObserver((entries) => {
          const entry = entries[0];
          if (entry.isIntersecting) {
            setPage((prevPage) => prevPage + 1);
          }
        });

        observerRef.current.observe(node);
      }
    },
    [hasMoreData, isFetching]
  );

  return [
    toursData,
    {
      page,
      isSuccess,
      isLoading,
      isFetching,
      isError,
      error,
      handleScrollToBottom,
      noResultsFound,
    },
  ];
}
