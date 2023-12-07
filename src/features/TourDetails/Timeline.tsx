/* eslint-disable eqeqeq */
import { Chip, Divider, Image } from '@nextui-org/react';
import dot from '/dot.png';
import dottedLine from '/noun-dotted-line-19125.png';
import React, { SetStateAction } from 'react';

const Timeline = ({
  tour,
  setViewState,
}: {
  tour: Record<string, unknown>;
  setViewState: React.Dispatch<
    SetStateAction<{ longitude: number; latitude: number; zoom: number }>
  >;
}) => {
  let activityCount = 0;
  return (
    <div className="flex flex-col items-start gap-1">
      {tour.itinerary.map((day) => (
        <div key={day.day} className="relative">
          <h1 className="absolute font-bold top-1 -left-3 text-md">Day {day.day}</h1>
          {day.activities.map((activity, index, array) => (
            // eslint-disable-next-line react/jsx-key
            <div
              className="flex flex-row ml-4"
              onMouseEnter={() =>
                setViewState({
                  longitude: activity.location.coordinates.at(0),
                  latitude: activity.location.coordinates.at(1),
                  zoom: 14,
                })
              }
            >
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center">
                  <div className="flex items-center justify-center w-10 h-10 text-white rounded-full bg-primary">
                    <h1 className="text-xl">{++activityCount}</h1>
                  </div>
                </div>
                <div className="w-[80px] h-full">
                  <img
                    src={index == array.length - 1 ? dot : dottedLine}
                    className="object-cover w-auto h-full "
                    alt=""
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1 max-h-[300px] w-[280px]">
                <div className="flex flex-col items-start justify-center gap-1">
                  <Chip variant="flat" className="text-sm bg-neutral">
                    <p className="font-semibold text-white">{activity.place}</p>
                  </Chip>
                  <p className="text-sm">{activity.activityName}</p>
                </div>
                {activity.image && (
                  <div className="flex flex-col h-[160px] overflow-hidden rounded-xl">
                    <img
                      src={activity.image}
                      alt={activity.activityName}
                      className="object-cover h-full"
                    />
                  </div>
                )}
                <p className="mt-1 text-xs text-slate-600">{day.description}</p>
                <div>
                  {index === array.length - 1 && (
                    <div className="flex flex-col gap-2 mt-2">
                      <Chip size="sm" className="text-black" variant="flat">
                        <p className="font-semibold">{`Accommodation for Day ${day.day} : ${day.accommodationIncluded}`}</p>
                      </Chip>
                      <Chip size="sm" variant="flat" className="text-white bg-accent">
                        <p className="font-semibold">{`Food included:${day.foodIncluded}`}</p>
                      </Chip>
                    </div>
                  )}
                </div>

                <Divider className="my-2" />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Timeline;
