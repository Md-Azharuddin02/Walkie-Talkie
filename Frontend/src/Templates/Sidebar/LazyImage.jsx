import React, { useState } from "react";
import fallbackImg from "../../assets/images/dummy.avif";

const LazyImage = ({ src, alt, className = "", ...props }) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 animate-pulse rounded-full" />
      )}

      <img
        {...props}
        src={imageSrc}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => setImageSrc(fallbackImg)}
        className={`absolute inset-0 w-full h-full object-cover rounded-full transition-opacity duration-200 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        loading="lazy"
      />
    </div>
  );
};

export default React.memo(LazyImage);
