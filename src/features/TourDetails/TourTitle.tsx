import { Chip, Skeleton } from '@nextui-org/react';
import { MdOutlineRecommend } from 'react-icons/md';
import StarRating from 'react-star-ratings';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import BookMarkTour from './BookMarkTour';

const TourTitle = ({
  tourTitle,
  createdBy,
  statsData,
}: {
  tourTitle: string;
  createdBy: { userName: string; avatar: string };
  statsData: any;
}) => {
  const { data: stats, isError, isSuccess } = statsData;

  useEffect(() => {
    if (isError) {
      toast.error('Something went wrong while fetching stats', {
        className: 'text-xs font-medium',
      });
    }
  });

  let totalRecommendations = 0;

  if (isSuccess && stats) {
    totalRecommendations = stats?.data?.ratingsDistribution?.reduce((acc, curr) => {
      if (curr?._id?.rated === 4 || curr?._id?.rated === 5) {
        return acc + curr.count;
      }
      return acc;
    }, 0);
  }

  return (
    <div className="grid grid-cols-3 items-start justify-items-start w-full">
      <div className="col-span-2 flex flex-col items-start gap-2 p-1">
        <div className="break-all">
          <Skeleton isLoaded={isSuccess}>
            <p className="text-xl sm:text-3xl font-semibold">{tourTitle}</p>
            <p className="text-sm underline text-slate-400">{`By ${createdBy?.userName}`}</p>
          </Skeleton>
        </div>
        <Skeleton isLoaded={isSuccess}>
          <div className="sm:grid sm:grid-cols-[repeat(4,_minmax(0,_max-content))] flex flex-col sm:flex-row gap-1 sm:items-center justify-start w-full">
            <div className="flex items-center gap-2">
              <Chip size="sm" color="success" variant="solid">
                <span className="tracking-wide leading-relaxed font-semibold text-white">
                  {`${stats?.data?.averageRating?.toFixed(1)}/5`}
                </span>
              </Chip>

              <div className="mb-1 sm:block w-full">
                <StarRating
                  rating={Math.floor(stats?.data?.averageRating || 0)}
                  starRatedColor="orange"
                  starDimension="20px"
                  starSpacing="1px"
                />
              </div>
            </div>

            <div className="w-full max-w-max p-1 sm:block hidden">
              <a
                href="#reviews"
                className="text-sm sm:text-sm underline underline-offset-2 min-w-max"
              >
                {`Based on ${stats?.data?.totalRatings} reviews`}
              </a>
            </div>

            <div className="flex justify-start items-center w-full p-1 gap-1 sm:gap-0">
              <MdOutlineRecommend className="text-xl text-red-500" />
              <a
                href="#reviews"
                className="text-sm sm:text-sm underline underline-offset-2 min-w-max"
              >
                {`Recommended by ${totalRecommendations}`}
              </a>
            </div>
          </div>
        </Skeleton>
      </div>

      <div className="p-3 justify-self-end">
        <BookMarkTour />
      </div>
    </div>
  );
};

export default TourTitle;
