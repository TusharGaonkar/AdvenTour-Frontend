import { Button, Card, CardBody, CardFooter, Image } from '@nextui-org/react';
import { FaStar } from 'react-icons/fa';
import formatToINR from '../../utils/currencyFormatter';

const TopToursCard = () => (
  <Card>
    <CardBody className="p-0">
      <Image
        src="https://res.cloudinary.com/dyjbjmpqy/image/upload/v1706961565/adventour-tour-images/7c8b56c65a2bf64c_snkwfa.jpg"
        alt="adventour top-3 tours"
        className="rounded-none"
      />
    </CardBody>
    <CardFooter className="flex flex-col items-start gap-1 p-4">
      <p className="text-sm font-medium">Manali Adventure Expedition</p>
      <div className="flex items-center gap-1">
        <FaStar className="text-yellow-400 text-[14px]" />
        <p className="text-sm font-medium">Rated 4.5</p>
      </div>

      <p className="mt-2 text-xs font-medium">{`Starting from ${formatToINR(5000)}`}</p>
      <Button variant="flat" color="primary" className="mt-4">
        Book Now
      </Button>
    </CardFooter>
  </Card>
);

const TopTours = () => (
  <section className="flex flex-col items-center gap-2 p-6">
    <h3 className="text-sm uppercase">Top rated</h3>
    <h2 className="text-4xl font-bold text-slate-600">Adventure Tours</h2>

    <div className="grid grid-flow-row grid-cols-3 gap-6 p-6">
      <TopToursCard />
      <TopToursCard />
      <TopToursCard />
    </div>
  </section>
);

export default TopTours;
