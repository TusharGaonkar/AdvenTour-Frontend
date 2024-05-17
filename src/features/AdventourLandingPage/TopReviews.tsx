import Marquee from 'react-fast-marquee';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import TourReviewCard from '../TourDetails/TourReviewCard';
import { useTopReviewsQuery } from '../../redux/slices/landingPageSlice';

type Review = {
  _id: string;
  tour: string;
  user: {
    userName: string;
    avatar: string;
  };
  createdAt: Date;
  title: string;
  rating: number;
  description: string;
  travelGroup: string;
};

const TopReviews = () => {
  const { data, isLoading, isSuccess, isError, error } = useTopReviewsQuery({ limit: 10 });

  useEffect(() => {
    if (isError) {
      toast.error(error?.message || 'Something went wrong while fetching top reviews', {
        className: 'text-xs font-medium',
      });
    }
  }, [isError, error]);

  return (
    isSuccess && (
      <section className="flex flex-col gap-1 p-6 mt-5 shadow-lg bg-gradient-to-r from-slate-50 to-slate-200 rounded-xl">
        <h2 className="p-6 mb-2 text-3xl lg:text-4xl font-semibold text-slate-600">
          What Our Explorers Say
        </h2>
        <Marquee gradient speed={30} direction="right" pauseOnHover>
          {data?.topReviews?.map((review: Review) => (
            <div className="mr-2 md:w-[360px]" key={review._id}>
              <TourReviewCard
                title={review.title}
                userName={review.user.userName}
                avatar={review.user.avatar}
                rating={review.rating}
                createdAt={review.createdAt}
                travelGroup={review.travelGroup}
                isLoading={isLoading}
              />
            </div>
          ))}
        </Marquee>
      </section>
    )
  );
};

export default TopReviews;
