/* eslint-disable react/jsx-props-no-spreading */
import { Chip, Progress, Skeleton } from '@nextui-org/react';

import { useEffect, useMemo, useState } from 'react';

const TourRatingDistribution = ({ statsFetchResponse }: { statsFetchResponse: any }) => {
  const { data: statsData, isSuccess, isFetching } = statsFetchResponse;

  const [ratingsMap, setRatingsMap] = useState(new Map([]));

  const labelRating = useMemo(
    () => [
      {
        label: 'Excellent',
        rating: 5,
      },
      {
        label: 'Very Good',
        rating: 4,
      },
      {
        label: 'Okay',
        rating: 3,
      },
      {
        label: 'Bad',
        rating: 2,
      },
      {
        label: 'Awful',
        rating: 1,
      },
    ],
    []
  );

  useEffect(() => {
    if (statsData) {
      const newRatingsMap = new Map();
      statsData?.data?.ratingsDistribution?.forEach(
        (rating: { _id: { rated: number }; count: number }) => {
          newRatingsMap.set(rating._id.rated, rating.count);
        }
      );

      for (let i = 0; i < labelRating.length; i++) {
        if (!newRatingsMap.get(labelRating[i].rating)) {
          newRatingsMap.set(labelRating[i].rating, 0);
        }
      }
      setRatingsMap(newRatingsMap);
    }
  }, [statsData, labelRating]);

  return (
    <>
      {isFetching && !isSuccess && (
        <Skeleton className="rounded-2xl border-1 shadow-lg" isLoaded={!isFetching && !isSuccess} />
      )}

      {isSuccess && !isFetching && (
        <div className="flex flex-col gap-4 items-start -mt-4">
          <Chip size="sm" variant="flat" className="mx-3 sm:mx-0 sm:mt-4">
            {`Total ${statsData?.data?.totalRatings} reviews`}
          </Chip>
          <div className="flex flex-col items-center justify-center gap-1 sm:p-1">
            {labelRating.map(({ label, rating }) => (
              <div
                className="grid items-center justify-items-center sm:justify-items-end grid-cols-[1fr,1fr,1fr] gap-1"
                key={label}
              >
                <div className="flex flex-col items-center">
                  <Chip size="sm" variant="flat">
                    <p className="font-semibold leading-none">{label}</p>
                  </Chip>
                </div>

                <Progress
                  value={ratingsMap.get(rating) as number}
                  maxValue={statsData?.data?.totalRatings}
                  size="md"
                  color="warning"
                />

                <p className="text-xs min-w-max">{`Rated by ${ratingsMap.get(rating)} users`}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default TourRatingDistribution;
