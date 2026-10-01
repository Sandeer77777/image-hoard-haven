import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Shirt } from "lucide-react";

interface Props {
  images: string[];
  alt: string;
  /** altura/proporção da área da foto */
  className?: string;
}

/** Carrossel de fotos: setas no desktop, swipe no mobile, dots sempre. */
export function ProductCarousel({ images, alt, className = "aspect-square" }: Props) {
  const [index, setIndex] = useState(0);
  const startX = useRef<number | null>(null);
  const total = images.length;

  const go = (dir: number) => {
    if (total < 2) return;
    setIndex((i) => (i + dir + total) % total);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current === null) return;
    const dx = (e.changedTouches[0]?.clientX ?? 0) - startX.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    startX.current = null;
  };

  return (
    <div className="carousel-root">
      <div
          className={`product-media relative flex ${className} touch-pan-y items-center justify-center overflow-hidden`}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {total === 0 ? (
          <div className="product-placeholder flex flex-col items-center gap-2">
            <Shirt className="h-10 w-10" strokeWidth={1} />
            <span className="text-[13px]">Foto do produto</span>
          </div>
        ) : (
          <div
            className="carousel-track flex h-full w-full"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {images.map((src, i) => (
              <img
                key={`${src}-${i}`}
                src={src}
                alt={`${alt} — foto ${i + 1}`}
                loading="lazy"
                className="h-full w-full flex-shrink-0 object-contain"
              />
            ))}
          </div>
        )}

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                go(-1);
              }}
              className="carousel-arrow left-2"
              aria-label="Foto anterior"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                go(1);
              }}
              className="carousel-arrow right-2"
              aria-label="Próxima foto"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}
      </div>

      {total > 1 && (
        <div className="mt-2 flex justify-center gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIndex(i);
              }}
              className={`carousel-dot ${i === index ? "active" : ""}`}
              aria-label={`Ver foto ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
