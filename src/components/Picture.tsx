interface PictureProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  loading?: "lazy" | "eager";
  decoding?: "async" | "sync" | "auto";
  sizes?: string;
}

export default function Picture({
  src,
  alt,
  className,
  imgClassName,
  loading = "lazy",
  decoding = "async",
  sizes,
}: PictureProps) {
  const avif = src.replace(/\.jpe?g$/i, ".avif");
  const webp = src.replace(/\.jpe?g$/i, ".webp");

  return (
    <picture className={className}>
      <source srcSet={avif} type="image/avif" sizes={sizes} />
      <source srcSet={webp} type="image/webp" sizes={sizes} />
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding={decoding}
        sizes={sizes}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = "none";
        }}
        className={imgClassName}
      />
    </picture>
  );
}
