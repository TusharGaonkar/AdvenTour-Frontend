/* eslint-disable eqeqeq */
import { Chip, Divider } from '@nextui-org/react';
import React, { SetStateAction, useCallback, useEffect, useRef } from 'react';
import dot from '/dot.png';
import dottedLine from '/noun-dotted-line-19125.png';

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
      {tour?.itinerary?.map((day) => (
        <div key={day.day} className="relative">
          <h1 className="absolute font-bold top-1 -left-3 text-md">Day {day.day}</h1>
          <p className="mt-8 p-2 text-xs text-slate-600">{day.description}</p>
          {day.activities.map((activity, index, array) => (
            <div
              className="flex flex-row ml-4"
              key={activity.activityName}
              onMouseEnter={() =>
                setViewState({
                  latitude: activity.location.coordinates.at(0),
                  longitude: activity.location.coordinates.at(1),
                  zoom: 13,
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
                    className="object-cover w-auto h-full"
                    alt=""
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 max-h-[300px] w-[280px]">
                <div className="flex flex-col items-start justify-center gap-2">
                  <Chip
                    variant="shadow"
                    classNames={{
                      base: 'bg-gradient-to-br from-indigo-400 to-pink-500 border-small border-white/50 shadow-pink-500/30',
                      content: 'drop-shadow shadow-black text-white font-semibold',
                    }}
                  >
                    {activity.place}
                  </Chip>

                  <p className="text-sm font-semibold leading-relaxed text-slate-700">
                    {activity.activityName}
                  </p>
                </div>
                {activity.image && (
                  <div className="flex flex-col h-[160px] overflow-hidden rounded-xl">
                    <img
                      id={activity.activityName}
                      src={activity.image}
                      alt={activity.activityName}
                      className="object-cover h-full"
                    />
                  </div>
                )}
                <Divider className="my-2" />
              </div>
            </div>
          ))}

          <div className="flex flex-col gap-2 mt-2 justify-center items-center">
            <p className="text-xs break-words">
              <Chip
                variant="flat"
                size="sm"
                classNames={{ base: 'bg-accent text-white', content: 'font-semibold' }}
              >
                Accommodation included
              </Chip>
              <span className="ml-1">{day.accommodationIncluded}</span>
            </p>
            <p className="text-xs break-words">
              <Chip
                variant="flat"
                size="sm"
                classNames={{ base: 'bg-neutral text-white', content: 'font-semibold' }}
              >
                Food included
              </Chip>
              <span className="ml-1">{day.foodIncluded}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
