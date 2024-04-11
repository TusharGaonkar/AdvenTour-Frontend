import { Button, Card, CardBody, CardFooter, Image } from '@nextui-org/react';

const TopToursCard = () => (
  <Card className="">
    <CardBody className="p-0">
      <Image
        src="https://res.cloudinary.com/dyjbjmpqy/image/upload/v1706961565/adventour-tour-images/7c8b56c65a2bf64c_snkwfa.jpg"
        alt="adventour top-3 tours"
        className="rounded-none"
      />
    </CardBody>
    <CardFooter className="flex flex-col gap-1 items-start">
      <p className="text-sm font-medium">Manali Adventure Expedition</p>
      <p className="text-sm font-medium">Rated 4.5</p>

      <p className="text-xs font-medium mt-2">Starting from ₹ 1,000</p>
      <Button className="mt-4">Book Now</Button>
    </CardFooter>
  </Card>
);

const TopTours = () => (
  <section className="flex flex-col gap-2 items-center p-6">
    <h3 className="uppercase text-sm">Top rated</h3>
    <h2 className="text-4xl font-bold text-slate-600">Adventure Tours</h2>

    <div className="grid grid-cols-3 grid-flow-row gap-6  p-6">
      <TopToursCard />
      <TopToursCard />
      <TopToursCard />
    </div>
  </section>
);

export default TopTours;
