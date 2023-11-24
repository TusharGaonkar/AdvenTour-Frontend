import { Button, Chip, Progress } from '@nextui-org/react';
import TourReviewCard from './TourReviewCard';

const TourReviews = () => {
  const reviews = [
    {
      userName: 'Himanshu',
      userAvatar: 'https://i.pravatar.cc/150?u=a04258114e29026302d',
      ratings: 3,
      reviewTitle: 'Amazing Experience',
      reviewText:
        'I would highly recommend this tour. Prashant messaged me the day before and arranged my travel to the start location. On the way to Mysore, Prashant went over the history and the meaning behind many of the the symbols and customs. We made several stops to local sights and Prashant highlighted points of interest. After visiting the palace, we went to lunch where we shared a delicious meal eaten in the custom of the locals (served on a banana leaf and eaten with the hands). After lunch we went on a tour of the market and tasted local fruit, watched the flower vendors weave beautiful arrangements and saw how incense was made. It is a full day packed with lots of memories.',
      date: '22 November 2023',
      image:
        'https://res.cloudinary.com/dwzmsvp7f/image/fetch/q_75,f_auto,w_1316/https%3A%2F%2Fmedia.insider.in%2Fimage%2Fupload%2Fc_crop%2Cg_custom%2Fv1679416718%2Fwlfluohedh1ec0rkzhpu.png',
    },
  ];
  return (
    <div className="flex flex-col gap-10 p-8">
      <h1 className="text-2xl font-semibold">Reviews</h1>
      <div className="flex flex-row items-start gap-4">
        <Button variant="flat" size="lg" color="secondary" className="rounded-full">
          Average Rating 4.5
        </Button>
        <Button size="lg" variant="flat" color="success" className="rounded-full">
          Write a review
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-16">
        <div className="flex flex-col items-start justify-start gap-1">
          {['Excellent', 'Very Good', 'Okay', 'Bad', 'Awful'].map((rating) => (
            <div className="grid items-center justify-center grid-cols-3 gap-1">
              <div className="flex flex-col items-end">
                <Chip size="sm" variant="flat">
                  <p className="font-semibold leading-none">{rating}</p>
                </Chip>
              </div>

              <Progress value={Math.floor(Math.random() * 100)} size="md" color="warning" />

              <p className="text-xs min-w-max">{`Rated by ${Math.floor(
                Math.random() * 100
              )} users`}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col col-span-3 gap-4">
          <TourReviewCard review={reviews[0]} />
          <TourReviewCard review={reviews[0]} />
          <TourReviewCard review={reviews[0]} />
        </div>
      </div>
    </div>
  );
};

export default TourReviews;
