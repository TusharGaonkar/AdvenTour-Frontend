/* eslint-disable no-underscore-dangle */
import { Button, Card, CardBody, CardFooter, Image } from '@nextui-org/react';
import { FaStar } from 'react-icons/fa';
import formatToINR from '../../utils/currencyFormatter';
import { useTopToursQuery } from '../../redux/slices/landingPageSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

type TourInfo = {
  _id: string;
  title: string;
  mainCoverImage: string;
  ratingsAverage: number;
  totalRatings: number;
  priceInRupees: number;
};

const TopToursCard = ({ tourInfo }: { tourInfo: TourInfo }) => {
  const navigate = useNavigate();
  return (
    <Card>
      <CardBody className="p-0">
        <Image
          src={tourInfo?.mainCoverImage}
          alt="AdvenTour top-3 tours"
          className="rounded-none"
        />
      </CardBody>
      <CardFooter className="flex flex-col items-start gap-1 p-4">
        <p className="text-sm font-semibold">{tourInfo?.title}</p>
        <div className="flex items-center gap-1">
          <FaStar className="text-[#ffa534] text-[14px]" />
          <p className="text-sm font-medium">{`Rated ${tourInfo?.ratingsAverage?.toFixed(2)}`}</p>
          <p className="text-sm font-medium text-slate-500">({tourInfo?.totalRatings})</p>
        </div>

        <p className="mt-2 text-xs font-semibold text-slate-600">
          {`Starting from ${formatToINR(tourInfo?.priceInRupees)}`}
        </p>
        <Button
          variant="flat"
          color="primary"
          className="mt-4"
          onClick={() => navigate(`/tours/${tourInfo?._id}`)}
        >
          Book Now
        </Button>
      </CardFooter>
    </Card>
  );
};

const TopTours = () => {
  const { data, isSuccess, isError, error } = useTopToursQuery({ limit: 3 });

  useEffect(() => {
    if (isError) {
      toast.error(error?.message || 'Something went wrong while fetching top tours', {
        className: 'text-xs font-medium',
      });
    }
  }, [isError, error]);

  return (
    <section className="flex flex-col items-center gap-2 p-6">
      <h3 className="text-sm uppercase">Top rated</h3>
      <h2 className="text-3xl lg:text-4xl font-bold text-slate-600">Adventure Tours</h2>

      <div className="grid md:grid-flow-row md:grid-cols-3 gap-6 p-6">
        {isSuccess &&
          data?.topTours.map((tour: TourInfo) => <TopToursCard key={tour._id} tourInfo={tour} />)}
      </div>
    </section>
  );
};

export default TopTours;
