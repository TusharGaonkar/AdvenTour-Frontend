/* eslint-disable eqeqeq */
import { Chip, Divider } from '@nextui-org/react';
import React, { SetStateAction } from 'react';
import dot from '/dot.png';
import dottedLine from '/noun-dotted-line-19125.png';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import CustomProgressiveImage from '../../common/CustomProgressiveImage';

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
  const cloudinaryImageOptimizeConfig = 'upload/w_1000/q_auto/f_avif';

  return (
    <div className="flex flex-col items-start gap-1">
      {tour?.itinerary?.map((day) => (
        <div key={day.day} className="relative mt-3">
          <h1 className="absolute font-bold text-md p-2">Day {day.day}</h1>
          <p className="mt-8 p-2 text-xs text-slate-600">{day.description}</p>
          <PhotoProvider>
            {day.activities.map((activity, index, array) => (
              <div
                className="flex flex-row justify-start items-stretch"
                key={activity.activityName}
                onMouseEnter={() =>
                  setViewState({
                    longitude: activity.location.coordinates.at(0),
                    latitude: activity.location.coordinates.at(1),
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
                      className="object-cover h-full"
                      alt="activity-line"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2 flex-1">
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
                    <div className="flex flex-col overflow-hidden rounded-xl w-full items-start">
                      <PhotoView key={activity.image} src={activity.image}>
                        <CustomProgressiveImage
                          src={activity.image.replace('upload', cloudinaryImageOptimizeConfig)}
                          alt={activity.activityName}
                          className="object-cover h-[150px] sm:h-[250px] lg:h-full lg:w-full rounded-xl cursor-pointer"
                          loading="lazy"
                        />
                      </PhotoView>
                    </div>
                  )}
                  <Divider className="my-2" />
                </div>
              </div>
            ))}
          </PhotoProvider>
          <div className="flex flex-col gap-1.5 justify-start items-start mx-[34px] w-full">
            <Chip
              variant="flat"
              size="sm"
              classNames={{ base: 'bg-accent text-white', content: 'font-semibold' }}
            >
              Accommodation included
            </Chip>
            <p className="text-xs font-semibold">{day.accommodationIncluded}</p>

            <Chip
              variant="flat"
              size="sm"
              classNames={{ base: 'bg-neutral text-white', content: 'font-semibold' }}
            >
              Food included
            </Chip>
            <p className="text-xs font-semibold">{day.foodIncluded}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
