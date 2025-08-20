"use client"

import * as React from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/common/lib/utils"


const CarouselContext = React.createContext(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

const Carousel = ({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  className,
  children,
  ref,
  ...props
}) => {
  const [carouselRef, api] = useEmblaCarousel({
    ...opts,
    axis: orientation === "horizontal" ? "x" : "y",
  }, plugins)
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [scrollSnaps, setScrollSnaps] = React.useState([])

  const onSelect = React.useCallback((api) => {
    if (!api) {
      return
    }

    setCanScrollPrev(api.canScrollPrev())
    setCanScrollNext(api.canScrollNext())
    setSelectedIndex(api.selectedScrollSnap())
  }, [])

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev()
  }, [api])

  const scrollNext = React.useCallback(() => {
    api?.scrollNext()
  }, [api])

  const handleKeyDown = React.useCallback((event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault()
      scrollPrev()
    } else if (event.key === "ArrowRight") {
      event.preventDefault()
      scrollNext()
    }
  }, [scrollPrev, scrollNext])

  React.useEffect(() => {
    if (!api || !setApi) {
      return
    }

    setApi(api)
  }, [api, setApi])

  React.useEffect(() => {
    if (!api) {
      return
    }

    onSelect(api)
    setScrollSnaps(api.scrollSnapList())
    api.on("reInit", onSelect)
    api.on("select", onSelect)

    return () => {
      api?.off("select", onSelect)
    }
  }, [api, onSelect])

  const scrollTo = React.useCallback((index) => {
    api?.scrollTo(index)
  }, [api])

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api: api,
        opts,
        orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
        selectedIndex,
        scrollSnaps,
        scrollTo,
      }}
    >
      <div
        ref={ref}
        onKeyDownCapture={handleKeyDown}
        className={cn("relative", className)}
        role="region"
        aria-roledescription="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  )
}
Carousel.displayName = "Carousel"

const CarouselContent = ({ className, ref, ...props }) => {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  )
}
CarouselContent.displayName = "CarouselContent"

const CarouselItem = ({ className, ref, ...props }) => {
  const { orientation } = useCarousel()

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props}
    />
  )
}
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = ({ className, _variant = "outline", _size = "icon", ref, ...props }) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <button
      ref={ref}
      className={cn(
        "absolute h-10 w-10 rounded-full flex items-center justify-center z-10 transition-all duration-200",
        "bg-white/80 hover:bg-white border-none shadow-lg backdrop-blur-sm",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        orientation === "horizontal"
          ? "left-4 top-1/2 -translate-y-1/2"
          : "top-4 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ChevronLeft className="h-5 w-5 text-gray-700" />
      <span className="sr-only">Previous slide</span>
    </button>
  )
}
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = ({ className, _variant = "outline", _size = "icon", ref, ...props }) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <button
      ref={ref}
      className={cn(
        "absolute h-10 w-10 rounded-full flex items-center justify-center z-10 transition-all duration-200",
        "bg-white/80 hover:bg-white border-none shadow-lg backdrop-blur-sm",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        orientation === "horizontal"
          ? "right-4 top-1/2 -translate-y-1/2"
          : "bottom-4 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ChevronRight className="h-5 w-5 text-gray-700" />
      <span className="sr-only">Next slide</span>
    </button>
  )
}
CarouselNext.displayName = "CarouselNext"

const CarouselDots = ({ className, dotClassName, activeDotClassName, ...props }) => {
  const { scrollSnaps, selectedIndex, scrollTo } = useCarousel()

  return (
    <div
      className={cn(
        "absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10",
        "flex justify-center space-x-2",
        className
      )}
      {...props}
    >
      {scrollSnaps.map((_, index) => (
        <button
          key={index}
          className={cn(
            "w-2 h-2 rounded-full transition-all duration-300 ease-in-out",
            "bg-white/60 hover:bg-white/80 backdrop-blur-sm",
            selectedIndex === index && "bg-white scale-125 shadow-lg",
            dotClassName,
            selectedIndex === index && activeDotClassName
          )}
          onClick={() => scrollTo(index)}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  )
}
CarouselDots.displayName = "CarouselDots"

const CarouselOverlay = ({ className, children, ...props }) => {
  return (
    <div
      className={cn(
        "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent",
        "flex items-end justify-center",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
CarouselOverlay.displayName = "CarouselOverlay"

const CarouselTextContent = ({ className, children, ...props }) => {
  return (
    <div
      className={cn(
        "absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10",
        "text-center text-white px-6 max-w-4xl",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
CarouselTextContent.displayName = "CarouselTextContent"

const CarouselTitle = ({ className, children, ...props }) => {
  return (
    <h2
      className={cn(
        "text-2xl md:text-3xl lg:text-4xl font-bold mb-2 drop-shadow-lg",
        className
      )}
      {...props}
    >
      {children}
    </h2>
  )
}
CarouselTitle.displayName = "CarouselTitle"

const CarouselDescription = ({ className, children, ...props }) => {
  return (
    <p
      className={cn(
        "text-sm md:text-base lg:text-lg opacity-90 mb-4 drop-shadow-md",
        className
      )}
      {...props}
    >
      {children}
    </p>
  )
}
CarouselDescription.displayName = "CarouselDescription"

const CarouselButton = ({ className, children, as = 'button', ...props }) => {
  const Component = as;
  
  return (
    <Component
      className={cn(
        "px-6 py-2 bg-white text-black rounded-lg font-medium",
        "hover:bg-gray-100 transition-colors shadow-lg",
        "focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50",
        as === 'a' && "inline-block text-center no-underline",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}
CarouselButton.displayName = "CarouselButton"

export {
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
}
