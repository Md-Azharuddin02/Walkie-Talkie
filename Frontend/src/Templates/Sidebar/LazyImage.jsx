import React, { useState } from "react";
import img from '../../assets/images/dummy.avif';

const LazyImage = ({ src, alt, className, ...props }) => {
  const [imageSrc, setImageSrc] = useState(src || img);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleError = () => {
    setImageSrc(img);
  };

  const handleLoad = () => {
    setImageLoaded(true);
  };

  return (
    <>
      {!imageLoaded && (
        <div className={`bg-gray-300 animate-pulse ${className}`} />
      )}
      <img
        {...props}
        src={imageSrc}
        alt={alt}
        className={`${className} ${!imageLoaded ? 'hidden' : 'block'}`}
        onError={handleError}
        onLoad={handleLoad}
        loading="lazy"
      />
    </>
  );
};

export default React.memo(LazyImage);