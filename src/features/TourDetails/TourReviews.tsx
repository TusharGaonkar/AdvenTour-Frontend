/* eslint-disable react/jsx-props-no-spreading */
import { Button, Pagination, Skeleton, Tab, Tabs } from '@nextui-org/react';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import StatsProvider from '../../common/StatsProvider';
import { useGetTourReviewsQuery } from '../../redux/slices/getTourReviewsSlice';
import ReviewModal from './ReviewModal';
import TourRatingDistribution from './TourRatingDistribution';
import TourReviewCard from './TourReviewCard';

const TourReviews = ({ tourID }: { tourID: string }) => {
  const [sortBy, setSortBy] = useState<'highest' | 'lowest'>('highest');

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const reviewRef = useRef<HTMLDivElement>(null);

  const {
    data: tourReviewsData,
    isSuccess,
    isFetching,
    isError,
    error,
  } = useGetTourReviewsQuery({ tourID, sortBy, page: currentPage });

  const handleScrollToTop = () => {
    if (reviewRef.current) {
      reviewRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message || 'Something went wrong while fetching reviews', {
        className: 'font-medium text-xs',
      });
    }
  }, [isError, error?.data?.message]);

  useEffect(() => {
    if (tourReviewsData) {
      const { page = 1, totalPageCount = 1 } = tourReviewsData?.pagination || {};
      setTotalPages(totalPageCount);
      setCurrentPage(page);
    }
  }, [tourReviewsData]);

  const handlePageChange = (page: number) => {
    handleScrollToTop();
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col gap-6 mb-24" ref={reviewRef}>
      <h1 className="font-semibold md:text-lg p-2">Reviews</h1>
      {isSuccess && tourReviewsData?.data?.tourReviews?.length === 0 && (
        <div className="flex gap-2 items-center px-2">
          <Button
            variant="flat"
            color="secondary"
            size="md"
            className="rounded-full bg-gradient-to-r from-amber-500 to-pink-500"
          >
            No reviews found
          </Button>
          <ReviewModal tourID={tourID} />
        </div>
      )}
      {isSuccess && tourReviewsData?.data?.tourReviews?.length > 0 && (
        <>
          <div className="flex lg:flex-row flex-col">
            <div className="flex gap-2 -mt-5 p-2">
              {/* using render prop pattern to get stats data */}
              <StatsProvider tourID={tourID}>
                {(statsFetchResponse) => {
                  const { data: statsData, isFetching: isStatsFetching } = statsFetchResponse;
                  return (
                    <Skeleton className="rounded-full" isLoaded={isSuccess && !isStatsFetching}>
                      <Button
                        variant="flat"
                        color="secondary"
                        size="md"
                        className="rounded-full bg-gradient-to-r from-amber-500 to-pink-500"
                      >
                        {`Average Rating ${statsData?.data?.averageRating.toFixed(1) || 'N/A'}`}
                      </Button>
                    </Skeleton>
                  );
                }}
              </StatsProvider>
              <ReviewModal tourID={tourID} />
            </div>
          </div>
          <div className="lg:grid lg:grid-cols-4 lg:gap-16 mt-10 sm:mt-0 sm:px-2">
            {/* Render prop here */}
            <StatsProvider tourID={tourID}>
              {(statsFetchResponse) => (
                <TourRatingDistribution statsFetchResponse={statsFetchResponse} />
              )}
            </StatsProvider>
            <div className="flex flex-col col-span-3 gap-4 mt-6 p-3">
              <div className="md:self-end">
                <p className="text-xs mb-[2px] mx-1">Sort by</p>
                <Tabs
                  selectedKey={sortBy}
                  onSelectionChange={(key) => setSortBy(key as 'highest' | 'lowest')}
                  aria-label="Sort by tab"
                >
                  <Tab key="highest" title="Highest Rated" />
                  <Tab key="lowest" title="Lowest Rated" />
                </Tabs>
              </div>
              {isSuccess &&
                tourReviewsData?.data?.tourReviews?.map(
                  ({
                    _id,
                    title,
                    user,
                    description,
                    rating,
                    createdAt,
                    travelGroup,
                    reviewImages,
                  }) => (
                    <TourReviewCard
                      key={_id}
                      title={title}
                      avatar={user.avatar}
                      userName={user.userName}
                      description={description}
                      rating={rating}
                      createdAt={createdAt}
                      travelGroup={travelGroup}
                      reviewImages={reviewImages}
                      isLoading={isFetching}
                    />
                  )
                )}
              <Pagination
                total={totalPages}
                page={currentPage}
                className="self-center p-4"
                onChange={handlePageChange}
                showControls
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TourReviews;
