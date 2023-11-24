import { Card, CardHeader, CardFooter, Avatar, Divider, Image } from '@nextui-org/react';
import StarRating from 'react-star-ratings';

const TourReviewCard: React.FC<{ review: any }> = ({ review }) => {
  const { userAvatar, userName, ratings, reviewTitle, reviewText, date, image } = review;
  return (
    <Card className="flex flex-col gap-2 p-4">
      <CardHeader className="flex flex-col items-start gap-2">
        <div className="flex flex-row items-center gap-2">
          <Avatar
            isBordered
            color="success"
            src="https://i.pravatar.cc/150?u=a04258114e29026302d"
          />
          <p>{userName}</p>
        </div>
        <StarRating
          key={ratings}
          rating={ratings}
          starRatedColor="green"
          starDimension="18px"
          starSpacing="3px"
        />
        <h1 className="text-sm font-semibold tracking-tight">{reviewTitle}</h1>
        <Divider />

        <p className="text-sm leading-tight tracking-tight ">{reviewText}</p>
        <Image
          src={image}
          alt={reviewTitle}
          className="object-cover p-1 rounded-sm"
          width={100}
          height={100}
        />
      </CardHeader>

      <CardFooter>
        <p className="text-xs text-slate-500">{`Written on ${date}`}</p>
      </CardFooter>
    </Card>
  );
};

export default TourReviewCard;
