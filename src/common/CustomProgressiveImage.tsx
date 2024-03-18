/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import { useState, useEffect, HTMLProps } from 'react';

type ImageAttributesType = HTMLProps<HTMLImageElement>;

interface CustomProgressiveImageProps extends ImageAttributesType {
  src: string;
  alt: string;
  className?: string;
}

// Enable smooth loading of images for better user experience
const CustomProgressiveImage = ({
  src,
  alt,
  className = '',
  ...props
}: CustomProgressiveImageProps) => {
  const [imgSrc, setImgSrc] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImgSrc(src);
      setIsLoaded(true);
    };
  }, [src]);

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={`${className} ${
        isLoaded ? ' opacity-1 transition-all ease-in' : 'opacity-0 transition-all ease-in'
      }`}
      {...props}
    />
  );
};

export default CustomProgressiveImage;
