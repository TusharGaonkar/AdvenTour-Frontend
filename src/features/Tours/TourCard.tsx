import { Button, Chip, Divider } from '@nextui-org/react';
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
          latitude: tour?.tourLocation?.coordinates[1],
          longitude: tour?.tourLocation?.coordinates[0],
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

  return (
    <div className="rounded-tl-xl rounded-bl-xl grid grid-cols-6 grid-rows-3 w-full h-[225px] bg-secondary items-start space-x-2 space-y-3">
      <img
        className="object-cover w-full h-full col-span-2 row-span-full rounded-tl-xl rounded-bl-xl"
        src={tour.mainCoverImage}
        alt=""
      />

      <div className="flex flex-col col-span-3 row-span-2 gap-1 p-2">
        <p className="text-xl font-semibold">{tour.title}</p>
        <p className="text-sm text-slate-600">Karwar, Karnataka, India</p>
        {distanceFromUser && (
          <Chip size="sm" variant="flat">{`~ Approx ${(distanceFromUser / 1000)
            .toFixed(2)
            .toLocaleString()} kms from your location`}</Chip>
        )}
        <StarRatings
          rating={4}
          starRatedColor="green"
          numberOfStars={5}
          name="rating"
          starDimension="20px"
        />
        <div className="flex items-center gap-2">
          <div className="border-1.5 border-green-200 max-w-max p-0.5 text-xs font-semibold rounded-lg">
            <p>4.2</p>
          </div>
          <p className="text-xs font-semibold">Excellent</p>
        </div>
      </div>
      <div className="flex flex-row items-center col-span-3 col-start-3 row-start-3 gap-2">
        <Button
          className="flex items-center bg-transparent rounded-md border-1.5 "
          onClick={handleClickOnBookmark}
        >
          {isBookmarked ? <FaHeart className="text-xl text-primary" /> : <FaRegHeart />}
        </Button>
        <Button
          color="primary"
          onClick={() => navigate(`/tours/${tour._id}`)}
          className="w-full rounded-md bg-accent"
        >
          View Details
        </Button>
      </div>
      <div className="p-1 text-white break-words bg-neutral/90 rounded-tl-xl rounded-bl-xl">
        <p className="text-sm">starting from</p>
        <p className="text-xl font-semibold">{`${formatToINR(tour.priceInRupees)}/-`}</p>
      </div>
    </div>
  );
};

export default TourCard;
