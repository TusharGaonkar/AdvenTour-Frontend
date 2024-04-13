import {
  Avatar,
  Card,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
  Image,
  Skeleton,
} from '@nextui-org/react';
import { format } from 'date-fns';
import { useState } from 'react';
import StarRating from 'react-star-ratings';

type TourReviewCardProps = {
  title: string;
  userName: string;
  avatar: string;
  description?: string;
  rating: number;
  createdAt: Date;
  travelGroup: string;
  isLoading: boolean;
  reviewImages?: string[];
};

const TourReviewCard = ({
  title,
  userName,
  avatar,
  description = '',
  rating,
  createdAt,
  travelGroup,
  reviewImages = [],
  isLoading,
}: TourReviewCardProps) => {
  if (!title || !userName || !rating || !createdAt) {
    return null;
  }
  const descriptionLengthLimit = 300;
  const [descriptionSliced, setDescriptionSliced] = useState(
    description?.slice(0, descriptionLengthLimit) || ''
  );
  const maxCharExceeded = description.length > descriptionLengthLimit;
  const [isReadMore, setIsReadMore] = useState<boolean>(maxCharExceeded);

  const handleTextSlice = () => {
    if (isReadMore) {
      setDescriptionSliced(description); // reset to original length
    } else {
      setDescriptionSliced(description.slice(0, descriptionLengthLimit));
    }
    setIsReadMore(!isReadMore);
  };

  return (
    <Skeleton className="rounded-2xl border-1 shadow-lg" isLoaded={!isLoading}>
      <Card className="flex flex-col gap-2 p-4">
        <CardHeader className="flex flex-col items-start gap-2">
          <div className="flex flex-row items-center justify-start gap-2">
            <Avatar src={avatar} size="lg" showFallback isBordered name={userName} />
            <p className="mx-1">{userName}</p>
          </div>
          <StarRating
            rating={rating}
            starRatedColor="#008000"
            starDimension="20px"
            starSpacing="01px"
          />

          <div className="flex gap-1 items-center">
            <Chip
              size="sm"
              variant="flat"
              className="bg-gradient-to-r from-neutral-300 to-stone-400"
            >
              Rated
              <span className="mx-1 font-semibold text-sm">{`${rating}/5`}</span>
            </Chip>
            <Chip
              size="sm"
              variant="flat"
              className="bg-gradient-to-r from-neutral-300 to-stone-400"
            >
              {travelGroup}
            </Chip>
          </div>
          <h1 className="text-sm font-semibold tracking-tight mt-1">{title}</h1>
          <Divider />

          <p className="text-sm leading-tight tracking-tight w-full break-words">
            {descriptionSliced}
          </p>
          {description.length > 500 && (
            <button
              className="font-semibold text-xs underline"
              onClick={() => {
                handleTextSlice();
              }}
            >
              {isReadMore ? 'Read More' : 'Read Less'}
            </button>
          )}
          {reviewImages && reviewImages.length > 0 && (
            <div className="flex gap-1 items-center">
              {reviewImages?.map((image: string) => (
                <Image
                  key={image}
                  src={image}
                  alt={title}
                  className="object-cover rounded-xl w-[105px] p-1"
                />
              ))}
            </div>
          )}
        </CardHeader>

        <CardFooter>
          <p className="text-xs text-slate-500">
            {`Written on ${format(new Date(createdAt), 'dd MMM yyyy')}`}
          </p>
        </CardFooter>
      </Card>
    </Skeleton>
  );
};

export default TourReviewCard;
