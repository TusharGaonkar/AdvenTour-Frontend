import { PhotoProvider, PhotoView } from 'react-photo-view';
import { Image } from '@nextui-org/react';

const RenderTourImages = ({ tour }: { tour: Record<string, unknown> }) => (
  <PhotoProvider>
    <div className="grid grid-cols-2 grid-rows-2  h-[440px] cursor-pointer gap-3 justify-center cursor-pointer">
      <div className="w-full h-full row-span-2 overflow-hidden rounded-xl">
        <PhotoView key={tour?.mainCoverImage} src={tour?.mainCoverImage as string}>
          <img src={tour?.mainCoverImage as string} alt="" className="object-cover w-full h-full" />
        </PhotoView>
      </div>

      {tour?.additionalImages?.map((image: string, index: number) =>
        index < 2 ? (
          <div className="w-full h-full overflow-hidden rounded-xl">
            <PhotoView key={image} src={image}>
              <Image
                src={image}
                alt="additional-images-tour"
                className="object-cover w-full h-full"
              />
            </PhotoView>
          </div>
        ) : null
      )}
    </div>
  </PhotoProvider>
);

export default RenderTourImages;
