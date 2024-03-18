/* eslint-disable react/no-unknown-property */
import { PhotoProvider, PhotoView } from 'react-photo-view';
import CustomProgressiveImage from '../../common/CustomProgressiveImage';

const RenderTourImages = ({ tour }: { tour: Record<string, unknown> }) => {
  // Boost LCP score compresses the images 2x the original size
  const cloudinaryImageOptimizeConfig = 'upload/w_1000/q_auto/f_avif';
  return (
    <PhotoProvider>
      <div className="grid grid-cols-2 grid-rows-2 lg:h-[500px] cursor-pointer p-2 gap-2 -mt-4">
        <PhotoView key={tour?.mainCoverImage as string} src={tour?.mainCoverImage as string}>
          <CustomProgressiveImage
            src={(tour?.mainCoverImage as string)?.replace('upload', cloudinaryImageOptimizeConfig)}
            alt="tour-main-cover"
            className="object-cover w-full h-full rounded-xl col-span-2 row-span-2 md:col-span-1"
            fetchpriority="high"
          />
        </PhotoView>

        {tour?.additionalCoverImages?.map((image: string, index: number) =>
          index < 2 ? (
            <div className="w-full overflow-hidden rounded-xl" key={image}>
              <PhotoView src={image}>
                <CustomProgressiveImage
                  src={(image as string).replace('upload', cloudinaryImageOptimizeConfig)}
                  alt="additional-images-tour"
                  className="object-cover w-full"
                  loading="lazy"
                />
              </PhotoView>
            </div>
          ) : null
        )}
      </div>
    </PhotoProvider>
  );
};

export default RenderTourImages;
