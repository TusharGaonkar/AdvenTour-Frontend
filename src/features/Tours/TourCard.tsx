import { Button, Divider } from '@nextui-org/react';
import { FaRegHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import formatToINR from '../../utils/currencyFormatter';

const TourCard = ({ tour }: { tour: any }) => {
  const navigate = useNavigate();
  return (
    <div className="rounded-tl-xl rounded-bl-xl grid grid-cols-6 grid-rows-3 w-full h-[220px] bg-secondary items-start space-x-2 space-y-2">
      <img
        className="object-cover w-full h-full col-span-2 row-span-full rounded-tl-xl rounded-bl-xl"
        src={tour.mainCoverImage}
      />

      <div className="flex flex-col col-span-3 row-span-2 gap-2 p-2">
        <p className="text-xl font-semibold">{tour.title}</p>
        <p className="text-sm text-slate-600">Karwar, Karnataka, India</p>
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
        <Divider />
      </div>
      <div className="flex flex-row col-span-3 col-start-3 row-start-3 gap-1">
        <Button className="flex items-center bg-transparent rounded-md border-1.5 ">
          <FaRegHeart />
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
