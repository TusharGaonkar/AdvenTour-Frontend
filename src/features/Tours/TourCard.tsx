import { Button, Chip } from '@nextui-org/react';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import getDistance from 'geolib/es/getDistance';
import { useSelector } from 'react-redux';
import formatToINR from '../../utils/currencyFormatter';
import {
  useCreateBookmarkMutation,
  useDeleteBookmarkMutation,
} from '../../redux/slices/bookmarkTourSlice';
import CustomProgressiveImage from '../../common/CustomProgressiveImage';

const TourCard = ({ tour }: { tour: Record<string, unknown> }) => {
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState<boolean>(
    () => (tour?.isBookmarked as boolean) || false
  );
  const [createBookmark] = useCreateBookmarkMutation();
  const [deleteBookmark] = useDeleteBookmarkMutation();
  const [distanceFromUser, setDistanceFromUser] = useState<null | number>(null);

  const handleCreateBookmark = async () => {
    try {
      setIsBookmarked(true);
      const response = await createBookmark(tour._id as string);
      if (response?.error) throw new Error('Something went wrong while creating bookmark');
      toast.success('Bookmarked successfully..', {
        className: 'text-xs font-semibold',
      });
    } catch (error) {
      toast.error((error as Error).message, {
        className: 'text-xs font-semibold',
      });
      setIsBookmarked(false);
    }
  };

  const handleDeleteBookmark = async () => {
    try {
      setIsBookmarked(false);
      const response = await deleteBookmark({
        tourId: tour._id as string,
        invalidate: ['Bookmarks'],
      });

      if (response?.error) throw new Error('Something went wrong while deleting bookmark');
      toast.success('Removed tour from bookmark..', {
        className: 'text-xs font-semibold',
      });
    } catch (error) {
      setIsBookmarked(true);
      toast.error((error as Error).message, {
        className: 'text-xs font-semibold',
      });
    }
  };

  const { getNearbyTours } = useSelector((state) => state.filterToursQueryString);

  useEffect(() => {
    if (tour && getNearbyTours && getNearbyTours[0] && getNearbyTours[1]) {
      const distance = getDistance(
        { latitude: getNearbyTours[1], longitude: getNearbyTours[0] },
        {
          longitude: tour?.tourLocation?.coordinates[0],
          latitude: tour?.tourLocation?.coordinates[1],
        }
      );

      setDistanceFromUser(distance);
    }
  }, [tour, getNearbyTours]);

  const handleClickOnBookmark = () => {
    if (isBookmarked) {
      handleDeleteBookmark();
    } else {
      handleCreateBookmark();
    }
  };

  const label = {
    '1': 'Awful',
    '2': 'Bad',
    '3': 'Okay',
    '4': 'Good',
    '5': 'Excellent',
  };

  return (
    <div className="sm:rounded-tl-xl sm:rounded-bl-xl sm:grid sm:grid-cols-6 sm:grid-rows-6 sm:w-full sm:h-[225px] bg-secondary sm:items-start sm:space-x-2 sm:space-y-3 sm:p-2 block p-2">
      <CustomProgressiveImage
        src={tour.mainCoverImage as string}
        alt="tour-main-cover"
        className="object-cover w-full sm:h-full col-span-2 row-span-full sm:rounded-tl-xl sm:rounded-bl-xl rounded-xl"
      />

      <div className="flex flex-col gap-1 p-2 sm:col-span-3 w-full h-full">
        <p className="lg:text-lg sm:text-xl font-semibold">{tour.title}</p>
        <p className="sm:text-sm text-xs text-slate-600 ">{tour?.tourLocation?.address}</p>
        {getNearbyTours && (
          <Chip size="sm" variant="flat" className="break-words">
            {`Around ${(distanceFromUser / 1000).toFixed(2).toLocaleString()} kms away from you`}
          </Chip>
        )}
        <StarRatings
          rating={Math.floor(tour?.ratingsAverage as number) || 0}
          starRatedColor="green"
          numberOfStars={5}
          name="rating"
          starSpacing="4px"
          starDimension="20px"
        />

        <div className="border-1.5 border-green-200 max-w-max p-0.5 font-semibold rounded-lg mt-1 flex items-center gap-1">
          <p className="text-xs">
            {tour?.ratingsAverage === 0 ? 'Unrated' : tour?.ratingsAverage.toFixed(1)}
          </p>
          <p className="text-xs font-semibold">
            {label[Math.round(tour?.ratingsAverage as number).toString()]}
          </p>
        </div>
      </div>
      <div className="p-1 sm:text-white break-words sm:bg-neutral/90 flex flex-row gap-1 lg:gap-0 md:items-start items-center md:flex-col rounded-tl-xl rounded-bl-xl col-start-6 sm:row-start-1">
        <p className="text-sm">starting from</p>
        <p className="lg:text-xl font-semibold">{`${formatToINR(tour.priceInRupees)}/-`}</p>
      </div>
      <div className="flex flex-row items-center p-1 sm:col-span-3 sm:col-start-3 sm:row-start-5 sm:gap-3 gap-2">
        <Button
          className="flex items-center bg-transparent rounded-md border-1.5"
          onClick={handleClickOnBookmark}
        >
          {isBookmarked ? (
            <FaHeart className="text-xl text-primary hover:scale-[1.6] transition-all" />
          ) : (
            <FaRegHeart className="transition-all hover:scale-[1.6]" />
          )}
        </Button>
        <Button
          color="primary"
          onClick={() => navigate(`/tours/${tour._id}`)}
          className="w-full rounded-md bg-accent"
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

export default TourCard;
