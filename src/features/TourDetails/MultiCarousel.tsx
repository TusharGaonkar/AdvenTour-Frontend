/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable arrow-body-style */

// Custom implementation of responsive carousel for multi images for Adventour, no libraries used!
import { useEffect, useRef, useState } from 'react';
import { IoChevronBackCircleSharp, IoChevronForwardCircleSharp } from 'react-icons/io5';
import { VscVerifiedFilled } from 'react-icons/vsc';
import { MdStars } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

interface MultiCarouselProps {
  _id: string;
  title: string;
  mainCoverImage: string;
  ratingsAverage: number;
  commonCategories?: number;
}

const MultiCarousel = ({ similarTours }: { similarTours: MultiCarouselProps[] }) => {
  const navigate = useNavigate();
  const containerRef = useRef<null | HTMLUListElement>(null);
  const [isNextDisabled, setNextDisabled] = useState(false);
  const [isPrevDisabled, setPrevDisabled] = useState(true);

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

  useEffect(() => {
    if (containerRef.current) {
      const { clientWidth, scrollWidth } = containerRef.current;
      if (clientWidth === scrollWidth) {
        setNextDisabled(true);
        setPrevDisabled(true);
      }
    }

    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollLeft, clientWidth, scrollWidth } = containerRef.current;

        if (scrollLeft + clientWidth >= scrollWidth) {
          setNextDisabled(true);
          setPrevDisabled(false);
        } else if (scrollLeft === 0) {
          setNextDisabled(false);
          setPrevDisabled(true);
        } else {
          setNextDisabled(false);
          setPrevDisabled(false);
        }
      }
    };

    if (containerRef.current) {
      containerRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [containerRef]);

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
    <>
      <h1 className="md:text-lg font-semibold p-2 mb-2">Similar experiences</h1>
      <div className="md:px-12 px-6">
        <div className="mx-auto relative">
          <ul
            ref={containerRef}
            className="flex overflow-hidden gap-3 flex-grow flex-shrink items-start"
          >
            {similarTours &&
              similarTours.map(
                ({
                  _id,
                  title,
                  mainCoverImage,
                  ratingsAverage,
                  commonCategories = 0,
                }: MultiCarouselProps) => (
                  <li
                    className="min-w-[calc(100%-12px)] sm:min-w-[calc(50%)] md:min-w-[calc(33.34%-12px)] rounded-full flex-grow flex flex-col sm:gap-1 hover:cursor-pointer"
                    key={title}
                    onClick={() => navigate(`/tours/${_id}`, { replace: true })}
                  >
                    <img
                      src={mainCoverImage?.replace('url', cloudinaryImageOptimizeConfig)}
                      className=" bg-no-repeat h-[140px] sm:h-[200px] md:h-[300px] object-cover rounded-xl"
                      loading="lazy"
                    />

                    <p className="font-semibold text-medium mx-1 text-slate-800 truncate">
                      {title}
                    </p>
                    <div className="flex flex-col text-sm font-semibold gap-1">
                      <p className=" text-slate-600 flex items-center gap-1">
                        <span>
                          <MdStars size={18} className="text-orange-600" />
                        </span>
                        {ratingsAverage === 0 ? 'No Ratings yet' : ratingsAverage.toFixed(2)}
                      </p>
                      {commonCategories > 0 && (
                        <p className="text-slate-600 flex items-center gap-1">
                          <span>
                            <VscVerifiedFilled size={18} className="text-blue-400" />
                          </span>
                          {`Matched in ${commonCategories} categories`}
                        </p>
                      )}
                    </div>
                  </li>
                )
              )}
          </ul>

          {!isPrevDisabled && (
            <button
              className="absolute top-[30%] md:top-[35%] left-2 sm:left-0 -translate-x-1/2  bg-white h-[40px] w-[40px] rounded-full hover:scale-110"
              onClick={handlePrevClick}
            >
              <IoChevronBackCircleSharp className="h-[40px] w-[40px]  text-primary" />
            </button>
          )}
          {!isNextDisabled && (
            <button
              className="absolute top-[30%] md:top-[35%] right-2 sm:right-0 translate-x-1/2 h-[40px] w-[40px] rounded-full bg-white hover:scale-110"
              onClick={handleNextClick}
            >
              <IoChevronForwardCircleSharp className="h-[40px] w-[40px] text-primary" />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default MultiCarousel;
