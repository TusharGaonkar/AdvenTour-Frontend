import { useCallback, useRef, useState, useEffect } from 'react';
import { useGetAllToursQuery } from '../redux/slices/getToursSlice';

type TourDataType = Record<string, any>;

export default function useInfiniteToursScroll(queryString: string) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [toursData, setToursData] = useState<TourDataType>([]);

  const { data, isSuccess, isLoading, isError, error } = useGetAllToursQuery({
    queryString,
    page,
    limit,
  });

  useEffect(() => {
    if (isSuccess && data) {
      console.log('called', page);
      setToursData((prevTours: TourDataType[]) => [
        ...prevTours,
        ...(data.data?.tours as TourDataType[]),
      ]);

      setHasMoreData((data.totalResults || 0) > 0);
    }
  }, [page, isSuccess, data]);

  const observerRef = useRef<IntersectionObserver>();

  const handleScrollToBottom = useCallback(
    (node: HTMLElement) => {
      if (observerRef.current) {
        observerRef.current.disconnect(); // remove all previous observers
      }
      if (hasMoreData && !isLoading && !isError) {
        observerRef.current = new IntersectionObserver((entries) => {
          const entry = entries[0];
          if (entry.isIntersecting) {
            setPage((prevPage) => prevPage + 1);
          }
        });

        if (node) observerRef.current.observe(node);
      }
    },
    [isLoading, isError, hasMoreData]
  );

  return [toursData, { page, isLoading, isError, error, isSuccess, handleScrollToBottom }];
}
