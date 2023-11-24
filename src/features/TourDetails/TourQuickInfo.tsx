import { Chip } from '@nextui-org/react';
import { IoIosPeople, IoMdTime } from 'react-icons/io';
import { MdOutlineTimeline, MdOutlineTour } from 'react-icons/md';
import { RiSpeakFill } from 'react-icons/ri';
import { tour } from '../../pages/test';

const TourQuickInfo = () => (
  <div className="flex flex-col items-start gap-3">
    <Chip variant="flat" color="default" startContent={<IoIosPeople className="text-2xl" />}>
      {`Age group: ${tour.ageGroups.minAge} - ${tour.ageGroups.maxAge}`}
    </Chip>
    <Chip color="default" variant="flat" startContent={<MdOutlineTimeline className="text-2xl" />}>
      {`Tour duration : ${tour.duration} Days`}
    </Chip>
    <Chip variant="flat" color="default" startContent={<MdOutlineTour className="text-2xl" />}>
      {`Tour difficulty: ${tour.tourDifficulty}`}
    </Chip>
    <Chip color="default" variant="flat" startContent={<IoMdTime className="text-2xl" />}>
      {`Tour start time : ${tour.tourStartTime}`}
    </Chip>
    <Chip color="default" variant="flat" startContent={<RiSpeakFill className="text-2xl" />}>
      {`Tour guide languages : ${tour.liveGuideLanguages.join(', ')}`}
    </Chip>
  </div>
);

export default TourQuickInfo;
