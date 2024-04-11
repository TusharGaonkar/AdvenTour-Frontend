import Marquee from 'react-fast-marquee';
import adventureActivities from '../../utils/adventureGenres';
import { Button } from '@nextui-org/react';

const CallToAction = () => (
  <section className="flex flex-col gap-4 items-center">
    <h2 className="uppercase text-sm">Select Tours from</h2>
    <p className="text-4xl font-bold text-slate-600">30+ adventure activities</p>
    <Marquee speed={25}>
      {adventureActivities.map((activity) => (
        <p key={activity} className="text-xl font-semibold rounded-lg mr-5 text-slate-600/60 p-2">
          {activity}
        </p>
      ))}
    </Marquee>
    <Button variant="flat" color="success" size="lg" className="rounded-full">
      Explore Tours
    </Button>
  </section>
);

export default CallToAction;
