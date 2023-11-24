import { PhotoProvider, PhotoView } from 'react-photo-view';
import { Image } from '@nextui-org/react';
import React from 'react';

const RenderTourImages = () => {
  const images = [
    'https://media2.thrillophilia.com/images/photos/000/050/054/original/1539406781_original_1072567361.jpg?gravity=center&width=1280&height=642&crop=fill&quality=auto&fetch_format=auto&flags=strip_profile&format=jpg&sign_url=true',
    'https://qph.cf2.quoracdn.net/main-qimg-7c1241976e1c427f600b2c7c5c244a3b-lq',
    'https://www.fabhotels.com/blog/wp-content/uploads/2018/02/shutterstock_780660901.jpg',
  ];

  return (
    <PhotoProvider>
      <div className="flex flex-row gap-3 h-[440px] cursor-pointer ">
        <div className="overflow-hidden rounded-xl">
          <PhotoView key={Math.random()} src={images[0]}>
            <Image src={images[0]} alt="" className="w-full object-cover h-[440px]" />
          </PhotoView>
        </div>

        <div className="flex flex-col gap-2 h-[440px]">
          <div className="overflow-hidden rounded-xl">
            <PhotoView key={Math.random()} src={images[1]}>
              <Image src={images[1]} alt="" className="object-cover " />
            </PhotoView>
          </div>
          <div className="overflow-hidden rounded-xl">
            <PhotoView key={Math.random()} src={images[2]}>
              <img src={images[2]} alt="" className="object-cover" />
            </PhotoView>
          </div>
        </div>
      </div>
    </PhotoProvider>
  );
};

export default RenderTourImages;
