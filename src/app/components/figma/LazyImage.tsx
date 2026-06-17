/**
 * LazyImage — drop-in replacement for <img> that:
 *  • Adds loading="lazy" by default (override with loading="eager" for above-fold)
 *  • Adds decoding="async" so image decode doesn't block the main thread
 *  • Falls back to a neutral placeholder on error (same as ImageWithFallback)
 *
 * Usage:
 *   import LazyImage from "@/components/figma/LazyImage";
 *   <LazyImage src={imgHero} alt="Hero" className="w-full h-full object-cover" />
 *   <LazyImage src={imgLogo} alt="Logo" loading="eager" />
 */

import { useState, memo } from "react";

const ERROR_IMG_SRC =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==";

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Override to "eager" for logos / above-fold images */
  loading?: "lazy" | "eager";
}

const LazyImage = memo(function LazyImage({
  loading = "lazy",
  decoding = "async",
  src,
  alt = "",
  className,
  style,
  ...rest
}: LazyImageProps) {
  const [didError, setDidError] = useState(false);

  if (didError) {
    return (
      <div
        className={`inline-block bg-gray-100 text-center align-middle ${className ?? ""}`}
        style={style}
      >
        <div className="flex items-center justify-center w-full h-full">
          <img decoding="async" src={ERROR_IMG_SRC} alt="Error loading image" data-original-url={src} />
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      decoding={decoding}
      className={className}
      style={style}
      onError={() => setDidError(true)}
      {...rest}
    />
  );
});

export default LazyImage;
