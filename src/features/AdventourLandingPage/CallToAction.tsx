import Marquee from 'react-fast-marquee';
import adventureActivities from '../../utils/adventureGenres';
import { Button } from '@nextui-org/react';

const CallToActionSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    xmlns:svgjs="http://svgjs.dev/svgjs"
    viewBox="0 0 800 800"
  >
    <g transform="matrix(1,0,0,1,0,0)">
      <polygon
        points="684,634 634,734 734,734"
        stroke-width="4"
        stroke="#00ff33"
        fill="none"
        opacity="0.1"
        transform="rotate(100, 400, 400)"
      ></polygon>
      <polygon
        points="627.2000122070312,557.2 557.2000122070312,697.2 697.2000122070312,697.2"
        stroke-width="6.4"
        stroke="#30f57b"
        fill="none"
        opacity="0.28"
        transform="rotate(80, 400, 400)"
      ></polygon>
      <polygon
        points="570.3999938964844,480.4 480.3999938964844,660.4 660.3999938964844,660.4"
        stroke-width="8.8"
        stroke="#44eaa6"
        fill="none"
        opacity="0.45999999999999996"
        transform="rotate(60, 400, 400)"
      ></polygon>
      <polygon
        points="513.6000061035156,403.6 403.6000061035156,623.6 623.6000061035156,623.6"
        stroke-width="11.2"
        stroke="#53dfc8"
        fill="none"
        opacity="0.64"
        transform="rotate(40, 400, 400)"
      ></polygon>
    </g>
  </svg>
);

const CallToAction = () => (
  <section className="relative flex flex-col items-center gap-4 p-4 mb-6">
    <div className="absolute bottom-12 w-[300px] z-[-99]">
      <CallToActionSVG />
    </div>
    <h2 className="text-sm uppercase">Select Tours from</h2>
    <p className="text-4xl font-bold text-slate-600">30+ adventure activities</p>
    <Marquee speed={25} gradient={true}>
      {adventureActivities.map((activity) => (
        <p key={activity} className="p-2 mr-5 text-xl font-semibold rounded-lg text-slate-600/60">
          {activity}
        </p>
      ))}
    </Marquee>
    <Button
      variant="shadow"
      color="success"
      size="lg"
      className="mt-1 font-medium uppercase bg-green-300 rounded-full text-slate-800 border-1 border-slate-400"
    >
      Explore Tours
    </Button>
  </section>
);

export default CallToAction;
