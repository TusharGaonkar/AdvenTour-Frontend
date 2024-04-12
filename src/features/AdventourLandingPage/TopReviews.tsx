import Marquee from 'react-fast-marquee';
import TourReviewCard from '../TourDetails/TourReviewCard';

const reviewData = {
  _id: '65daf5bdece77be8bb54c88b',
  tour: '65be2acef1a276eced58ebc0',
  user: {
    userName: 'Arjun',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
  },
  createdAt: '2024-02-25T08:09:33.573Z',
  title: 'this is work i am sure ok',
  rating: 4,
  description: 'dfdfdfdffdfdfdfdfdfdfdfdfdffdfdfdfdfdfdfd',
  travelGroup: 'Solo',
  reviewImages: [],
  __v: 0,
};

const TopReviews = () => (
  <section className="flex flex-col gap-1 p-6 mt-5 shadow-lg bg-gradient-to-r from-slate-50 to-slate-200 rounded-xl">
    <h2 className="p-6 mb-2 text-3xl font-semibold text-slate-600">What Our Explorers Say</h2>
    <Marquee gradient speed={30} direction="right">
      <div className="mr-2">
        <TourReviewCard
          title={reviewData.title}
          userName={reviewData.user.userName}
          avatar={reviewData.user.avatar}
          description={reviewData.description}
          rating={reviewData.rating}
          createdAt={reviewData.createdAt}
          travelGroup={reviewData.travelGroup}
          reviewImages={reviewData.reviewImages}
        />
      </div>
      <div className="mr-2">
        <TourReviewCard
          title={reviewData.title}
          userName={reviewData.user.userName}
          avatar={reviewData.user.avatar}
          description={reviewData.description}
          rating={reviewData.rating}
          createdAt={reviewData.createdAt}
          travelGroup={reviewData.travelGroup}
          reviewImages={reviewData.reviewImages}
        />
      </div>
      <div className="mr-2">
        <TourReviewCard
          title={reviewData.title}
          userName={reviewData.user.userName}
          avatar={reviewData.user.avatar}
          description={reviewData.description}
          rating={reviewData.rating}
          createdAt={reviewData.createdAt}
          travelGroup={reviewData.travelGroup}
          reviewImages={reviewData.reviewImages}
        />
      </div>
      <div className="mr-2">
        <TourReviewCard
          title={reviewData.title}
          userName={reviewData.user.userName}
          avatar={reviewData.user.avatar}
          description={reviewData.description}
          rating={reviewData.rating}
          createdAt={reviewData.createdAt}
          travelGroup={reviewData.travelGroup}
          reviewImages={reviewData.reviewImages}
        />
      </div>
      <div className="mr-2">
        <TourReviewCard
          title={reviewData.title}
          userName={reviewData.user.userName}
          avatar={reviewData.user.avatar}
          description={reviewData.description}
          rating={reviewData.rating}
          createdAt={reviewData.createdAt}
          travelGroup={reviewData.travelGroup}
          reviewImages={reviewData.reviewImages}
        />
      </div>
    </Marquee>
  </section>
);

export default TopReviews;
