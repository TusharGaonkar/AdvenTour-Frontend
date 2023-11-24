import { Chip, Image } from '@nextui-org/react';
import { tour } from '../../pages/test';
import dot from '/dot.png';
import dottedLine from '/noun-dotted-line-19125.png';

const Timeline = () => {
  let activityCount = 0;
  return (
    <div className="flex flex-col items-start">
      {tour.itinerary.map((day) => (
        <>
          <h1 className="font-bold text-md">Day {day.day}</h1>
          {day.activities.map((activity, index, array) => (
            // eslint-disable-next-line react/jsx-key
            <div className="flex flex-row ml-4">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center">
                  <div className="flex items-center justify-center w-10 h-10 text-white bg-black rounded-full">
                    <h1 className="text-xl">{++activityCount}</h1>
                  </div>
                </div>
                <div className="w-[80px] h-full">
                  <img
                    src={index == array.length - 1 ? dot : dottedLine}
                    className="object-cover w-auto h-full "
                  />
                </div>
              </div>
              <div className="mt-1">
                <h1 className="text-sm font-semibold">{activity.place}</h1>
                <p>{activity.activityName}</p>
                {activity.image && (
                  <div className="h-[120px] overflow-hidden rounded-xl">
                    <Image
                      src={activity.image}
                      alt={activity.activityName}
                      className="object-cover"
                    />
                  </div>
                )}

                {index == array.length - 1 && (
                  <div className="flex flex-col gap-2 mt-2">
                    <Chip size="sm" className="text-white bg-green-700" variant="flat">
                      <p className="font-semibold">{`Accommodation for Day ${day.day} : ${day.accommodationIncluded}`}</p>
                    </Chip>
                    <Chip size="sm" variant="flat">
                      <p className="font-semibold">{`Food included:${day.foodIncluded}`}</p>
                    </Chip>
                  </div>
                )}
              </div>
            </div>
          ))}
        </>
      ))}
    </div>
  );
};

export default Timeline;
