import { Chip } from '@nextui-org/react';
import { IoIosPeople, IoMdTime } from 'react-icons/io';
import { MdOutlineTimeline, MdOutlineTour } from 'react-icons/md';
import { RiSpeakFill } from 'react-icons/ri';

const TourQuickInfo = ({ tour }: { tour: Record<string, unknown> }) => (
  <div className="flex flex-col items-start gap-3">
    <Chip variant="flat" color="default" startContent={<IoIosPeople className="text-2xl" />}>
      {`Age group: ${tour?.ageGroups?.minAge as number} - ${tour?.ageGroups?.maxAge as number}`}
    </Chip>
    <Chip color="default" variant="flat" startContent={<MdOutlineTimeline className="text-2xl" />}>
      {`Tour duration : ${tour?.tourDurationInDays} Days`}
    </Chip>
    <Chip variant="flat" color="default" startContent={<MdOutlineTour className="text-2xl" />}>
      {`Tour difficulty: ${tour?.tourDifficulty}`}
    </Chip>
    <Chip color="default" variant="flat" startContent={<IoMdTime className="text-2xl" />}>
      {`Tour start time : ${tour?.tourStartTime}`}
    </Chip>
    <Chip
      color="default"
      className="text-wrap py-5 sm:py-0"
      variant="flat"
      startContent={<RiSpeakFill className="text-xl" />}
    >
      Tour Guide Languages : {(tour?.liveGuideLanguages as string[]).join(', ')}
    </Chip>
  </div>
);

export default TourQuickInfo;
