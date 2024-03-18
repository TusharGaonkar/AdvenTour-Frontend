/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable arrow-body-style */

// Custom implementation of responsive carousel for multi images for Adventour, no libraries used!
import { useRef } from 'react';
import { IoChevronBackCircleSharp, IoChevronForwardCircleSharp } from 'react-icons/io5';
import { VscVerifiedFilled } from 'react-icons/vsc';
import { MdStars } from 'react-icons/md';

interface MultiCarouselProps {
  title: string;
  mainCoverImage: string;
  ratingsAverage: number;
  commonCategories?: number;
}

const MultiCarousel = ({ similarTours }: { similarTours: MultiCarouselProps[] }) => {
  const containerRef = useRef<null | HTMLDivElement>(null);
  const cloudinaryImageOptimizeConfig = 'upload/w_1000/q_auto:low/f_auto';

  const gap = 12; // gap of 12 px between each image (gap-3)

  const calculateScrollDistance = () => {
    const containerWidth = containerRef?.current?.clientWidth as number;
    // targeting tailwind default layout responsive widths!
    if (containerWidth) {
      if (containerWidth < 640) {
        return containerWidth;
      }
      if (containerWidth >= 640 && containerWidth < 768) {
        return containerWidth + gap + 2;
      }
      if (containerWidth >= 768) {
        return containerWidth + 2 * gap + 2;
      }
      return containerWidth;
    }

    return 0;
  };

  const handleNextClick = () => {
    if (containerRef.current) {
      const scrollDistance = calculateScrollDistance();

      containerRef.current.scrollBy({
        left: scrollDistance,
        behavior: 'smooth',
      });
    }
  };

  const handlePrevClick = () => {
    if (containerRef.current) {
      const scrollDistance = calculateScrollDistance();

      containerRef.current.scrollBy({
        left: -scrollDistance,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="p-4">
      <h1 className="md:text-lg font-semibold mb-6"> Similar experiences</h1>
      <div className="mx-auto relative">
        <div
          ref={containerRef}
          className="flex overflow-hidden gap-3 flex-grow flex-shrink items-start"
        >
          {similarTours &&
            similarTours.map(
              ({
                title,
                mainCoverImage,
                ratingsAverage,
                commonCategories = 0,
              }: MultiCarouselProps) => (
                <div
                  className="w-full sm:w-[calc(50%-12px)] md:w-[calc(33.34%-12px)] rounded-full flex-grow flex flex-col gap-1"
                  key={title}
                >
                  <img
                    src={mainCoverImage?.replace('url', cloudinaryImageOptimizeConfig)}
                    className=" bg-no-repeat h-[140px] sm:h-[200px] md:h-[300px] object-cover rounded-xl"
                    loading="lazy"
                  />

                  <p className="font-semibold text-medium mx-1 text-slate-800 truncate">{title}</p>
                  <div className="flex flex-col text-sm font-semibold gap-1">
                    <p className=" text-slate-600 flex items-center gap-1">
                      <span>
                        <MdStars size={26} className="text-orange-600" />
                      </span>
                      {ratingsAverage === 0 ? 'No Ratings yet' : ratingsAverage}
                    </p>
                    {commonCategories > 0 && (
                      <p className="text-slate-600 flex items-center gap-1">
                        <span>
                          <VscVerifiedFilled size={26} className="text-blue-400" />
                        </span>
                        {`Matched in ${commonCategories} categories`}
                      </p>
                    )}
                  </div>
                </div>
              )
            )}
        </div>

        <button
          className="absolute top-[30%] md:top-[35%] left-0  -translate-x-1/2  bg-white h-[40px] w-[40px] rounded-full hover:scale-110"
          onClick={handlePrevClick}
        >
          <IoChevronBackCircleSharp className="h-[40px] w-[40px]  text-primary" />
        </button>
        <button
          className="absolute top-[30%] md:top-[35%] right-0 translate-x-1/2 h-[40px] w-[40px] rounded-full bg-white shadow-2xl hover:scale-105"
          onClick={handleNextClick}
        >
          <IoChevronForwardCircleSharp className="h-[40px] w-[40px] text-primary" />
        </button>
      </div>
    </div>
  );
};

export default MultiCarousel;
