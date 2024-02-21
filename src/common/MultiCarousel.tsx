/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable arrow-body-style */

// Custom implementation of responsive carousel for multi images for Adventour, no libraries used!
import { useRef } from 'react';
import { IoChevronBackCircleSharp, IoChevronForwardCircleSharp } from 'react-icons/io5';

interface MultiCarouselProps {
  title: string;
  image: string;
}

const MultiCarousel = ({ similarTours }: { similarTours: MultiCarouselProps[] }) => {
  const containerRef = useRef<null | HTMLDivElement>(null);

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
      <h1 className="text-2xl font-semibold mb-6"> Similar Tours </h1>
      <div className="mx-auto relative flex flex-grow flex-shrink">
        <div
          ref={containerRef}
          className="flex overflow-hidden h-[300px] gap-3 flex-grow flex-shrink"
        >
          {similarTours &&
            similarTours.map(({ title, image }: MultiCarouselProps) => (
              <div
                className="w-full sm:w-[calc(50%-12px)] md:w-[calc(33.34%-12px)] flex-shrink-0 rounded-full flex-grow flex flex-col gap-2"
                key="title"
              >
                <img src={image} className=" bg-no-repeat w-full h-full object-cover rounded-xl" />
                <p className="font-semibold leading-relaxed text-medium mx-1 text-slate-800 truncate">
                  {title}
                </p>
              </div>
            ))}
        </div>

        <button
          className="absolute top-1/2 left-2 -translate-x-[50%] -translate-y-[60%] bg-white h-[40px] w-[40px] rounded-full hover:scale-110"
          onClick={handlePrevClick}
        >
          <IoChevronBackCircleSharp className="h-[40px] w-[40px]  text-primary" />
        </button>
        <button
          className="absolute top-1/2 right-1 translate-x-[45%] -translate-y-[60%] h-[40px] w-[40px] rounded-full bg-white shadow-2xl hover:scale-105"
          onClick={handleNextClick}
        >
          <IoChevronForwardCircleSharp className="h-[40px] w-[40px] text-primary" />
        </button>
      </div>
    </div>
  );
};

export default MultiCarousel;
