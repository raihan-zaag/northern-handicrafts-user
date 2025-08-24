"use client"

import React from 'react';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselDots,
  CarouselOverlay,
  CarouselTextContent,
  CarouselTitle,
  CarouselDescription,
  CarouselButton,
} from '@/common/components/ui/carousel';
import SliderSkeleton from '@/common/components/skeletons/SliderSkeleton';
import { cn } from '@/common/lib/utils';

const SliderBanner = ({
  slides = [],
  autoPlay = true,
  autoPlayDelay = 3000,
  showNavigation = true,
  showDots = true,
  loading = false,
  className,
  contentClassName,
  slideClassName,
  ...props
}) => {
  const [api, setApi] = React.useState(null);

  // Auto-play functionality
  React.useEffect(() => {
    if (!api || !autoPlay) return;

    const intervalId = setInterval(() => {
      api.scrollNext();
    }, autoPlayDelay);

    return () => clearInterval(intervalId);
  }, [api, autoPlay, autoPlayDelay]);

  // Show skeleton while loading
  if (loading) {
    return <SliderSkeleton />;
  }

  if (!slides || slides.length === 0) {
    return (
      <div className="w-full h-64 bg-gray-100  flex items-center justify-center">
        <p className="text-gray-500">No slides available</p>
      </div>
    );
  }

  return (
    <Carousel
      setApi={setApi}
      opts={{
        align: "start",
        loop: true,
      }}
      className={className}
      {...props}
    >
      <CarouselContent >
        {slides.map((slide, index) => (
          <CarouselItem key={index} className={slideClassName}>
            <div className={cn("relative w-full h-64 md:h-80 lg:h-96 overflow-hidden", contentClassName)}>
              {/* Image */}
              <Image
                src={slide.image || slide}
                alt={slide.alt || `Slide ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              {/* Overlay and Content */}
              {(slide.title || slide.description || slide.button) && (
                <>
                  <CarouselOverlay />
                  <CarouselTextContent>
                    {slide.title && (
                      <CarouselTitle>{slide.title}</CarouselTitle>
                    )}
                    {slide.description && (
                      <CarouselDescription>{slide.description}</CarouselDescription>
                    )}
                    {slide.button && (
                      <CarouselButton
                        onClick={slide.button.onClick}
                        {...(slide.button.href && { as: 'a', href: slide.button.href })}
                      >
                        {slide.button.text}
                      </CarouselButton>
                    )}
                  </CarouselTextContent>
                </>
              )}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Navigation */}
      {showNavigation && (
        <>
          <CarouselPrevious />
          <CarouselNext />
        </>
      )}

      {/* Dots */}
      {showDots && <CarouselDots />}
    </Carousel>
  );
};

// Individual compound components for custom usage
SliderBanner.Carousel = Carousel;
SliderBanner.Content = CarouselContent;
SliderBanner.Item = CarouselItem;
SliderBanner.Previous = CarouselPrevious;
SliderBanner.Next = CarouselNext;
SliderBanner.Dots = CarouselDots;
SliderBanner.Overlay = CarouselOverlay;
SliderBanner.TextContent = CarouselTextContent;
SliderBanner.Title = CarouselTitle;
SliderBanner.Description = CarouselDescription;
SliderBanner.Button = CarouselButton;

export default SliderBanner;
