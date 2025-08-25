"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/common/lib/utils";

const ImageGallery = ({
    images = [],
    className = "",
    thumbnailSize = { desktop: "h-full", mobile: "h-16" },
    showThumbnails = true,
    showNavigation = true,
    orientation = "responsive", // "responsive", "vertical", "horizontal"
    onImageChange = null,
    ...props
}) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    // Size variables for better maintainability
    const sizes = {
        thumbnailWidth: "w-30",
        galleryHeight: {
            responsive: "h-auto lg:h-[500px] xl:h-[664px]",
            vertical: "h-[400px] lg:h-[500px] xl:h-[664px]",
        },
        maxHeight: {
            mobile: "h-[300px]",
            tablet: "md:h-[400px]",
            desktop: "lg:h-[500px]",
            xl: "xl:h-[664px]"
        },
        thumbnailGrid: {
            verticalHeight: "calc(20% - 6px)",
            horizontalWidth: "20%"
        },
        navigation: {
            button: "size-15",
            icon: "size-6"
        },
        spacing: {
            gap: "gap-2",
            marginLeft: "-ml-2",
            marginTop: "-mt-2",
            paddingLeft: "pl-2",
            paddingTop: "pt-2"
        }
    };

    // Main carousel
    const [emblaMainRef, emblaMainApi] = useEmblaCarousel({ loop: true });

    // Thumbnail carousels
    const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
        containScroll: 'keepSnaps',
        dragFree: true
    });

    const [emblaThumbsVerticalRef, emblaThumbsVerticalApi] = useEmblaCarousel({
        containScroll: 'keepSnaps',
        dragFree: true,
        axis: 'y'
    });

    const onThumbClick = useCallback((index) => {
        if (!emblaMainApi) return;
        emblaMainApi.scrollTo(index);
    }, [emblaMainApi]);

    const onSelect = useCallback(() => {
        if (!emblaMainApi) return;
        const newIndex = emblaMainApi.selectedScrollSnap();
        setSelectedImageIndex(newIndex);
        if (emblaThumbsApi) emblaThumbsApi.scrollTo(newIndex);
        if (emblaThumbsVerticalApi) emblaThumbsVerticalApi.scrollTo(newIndex);

        // Call external callback if provided
        if (onImageChange) onImageChange(newIndex, images[newIndex]);
    }, [emblaMainApi, emblaThumbsApi, emblaThumbsVerticalApi, onImageChange, images]);

    useEffect(() => {
        if (!emblaMainApi) return;
        onSelect();
        emblaMainApi.on('select', onSelect).on('reInit', onSelect);
    }, [emblaMainApi, onSelect]);

    if (!images.length) {
        return (
            <div className={cn("w-full bg-background rounded-xl flex items-center justify-center", className)} {...props}>
                <span className="text-secondary">No images available</span>
            </div>
        );
    }

    const isResponsive = orientation === "responsive";
    const isVertical = orientation === "vertical";
    const isHorizontal = orientation === "horizontal";

    return (
        <div className={cn(
            "flex w-full",
            sizes.spacing.gap,
            isResponsive && `flex-col lg:flex-row ${sizes.galleryHeight.responsive}`,
            isVertical && `flex-row ${sizes.galleryHeight.vertical}`,
            isHorizontal && "flex-col",
            className
        )} {...props}>

            {/* Desktop - Vertical Thumbnails */}
            {showThumbnails && images.length > 1 && (isResponsive || isVertical) && (
                <div className={cn(
                    sizes.thumbnailWidth,
                    "flex-shrink-0",
                    isResponsive && "hidden lg:block",
                    isVertical && "block"
                )}>
                    <div className={cn(
                        "h-full overflow-hidden",
                        sizes.maxHeight.mobile,
                        sizes.maxHeight.tablet,
                        sizes.maxHeight.desktop,
                        sizes.maxHeight.xl
                    )}>
                        <div ref={emblaThumbsVerticalRef} className="h-full">
                            <div className={cn("flex flex-col h-full", sizes.spacing.marginTop)}>
                                {images.map((image, index) => (
                                    <div key={index} className={cn(sizes.spacing.paddingTop, "flex-shrink-0")} style={{ height: sizes.thumbnailGrid.verticalHeight }}>
                                        <button
                                            className={cn(
                                                "relative w-full h-full bg-background rounded-lg overflow-hidden border-2 transition-all duration-300",
                                                index === selectedImageIndex
                                                    ? "border-primary shadow-lg"
                                                    : "border-border hover:border-border-dark"
                                            )}
                                            onClick={() => onThumbClick(index)}
                                        >
                                            <Image
                                                src={image || "/images/image_placeholder.png"}
                                                alt={`Thumbnail ${index + 1}`}
                                                fill
                                                className="object-cover"
                                            />
                                            {index === selectedImageIndex && (
                                                <div className="absolute inset-0 bg-primary/10" />
                                            )}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Mobile/Horizontal Thumbnails */}
            {showThumbnails && images.length > 1 && (isResponsive || isHorizontal) && (
                <div className={cn(
                    "mt-4",
                    isResponsive && "lg:hidden order-2",
                    isHorizontal && "order-2"
                )}>
                    <div className="overflow-hidden">
                        <div ref={emblaThumbsRef}>
                            <div className={cn("flex", sizes.spacing.marginLeft)}>
                                {images.map((image, index) => (
                                    <div key={index} className={cn("flex-shrink-0", sizes.spacing.paddingLeft)} style={{ width: sizes.thumbnailGrid.horizontalWidth }}>
                                        <button
                                            className={cn(
                                                "relative w-full bg-background rounded-lg overflow-hidden border-2 transition-all duration-300",
                                                thumbnailSize.mobile,
                                                index === selectedImageIndex
                                                    ? "border-primary shadow-lg"
                                                    : "border-border hover:border-border-dark"
                                            )}
                                            onClick={() => onThumbClick(index)}
                                        >
                                            <Image
                                                src={image || "/images/image_placeholder.png"}
                                                alt={`Thumbnail ${index + 1}`}
                                                fill
                                                className="object-cover"
                                            />
                                            {index === selectedImageIndex && (
                                                <div className="absolute inset-0 bg-primary/10" />
                                            )}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Image Carousel */}
            <div className={cn(
                "flex-1 h-full",
                isResponsive && "order-1 lg:order-2",
                isVertical && "order-2",
                isHorizontal && "order-1"
            )}>
                <div className="w-full h-full relative group overflow-hidden">
                    <div ref={emblaMainRef} className="h-full">
                        <div className="flex h-full">
                            {images.map((image, index) => (
                                <div key={index} className="flex-shrink-0 w-full h-full">
                                    <div className={cn(
                                        "relative bg-background rounded-xl overflow-hidden w-full",
                                        sizes.maxHeight.mobile,
                                        sizes.maxHeight.tablet,
                                        sizes.maxHeight.desktop,
                                        sizes.maxHeight.xl
                                    )}>
                                        <Image
                                            src={image || "/images/image_placeholder.png"}
                                            alt={`Image ${index + 1}`}
                                            fill
                                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                                            priority={index === 0}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Arrows */}
                    {showNavigation && images.length > 1 && (
                        <>
                            <button
                                className={cn(
                                    "absolute left-4 top-1/2 -translate-y-1/2 rounded-full flex items-center justify-center z-10 transition-all duration-200 bg-white/80 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100",
                                    sizes.navigation.button
                                )}
                                onClick={() => emblaMainApi?.scrollPrev()}
                            >
                                <ChevronLeft className={cn("text-gray-700", sizes.navigation.icon)} />
                            </button>
                            <button
                                className={cn(
                                    "absolute right-4 top-1/2 -translate-y-1/2 rounded-full flex items-center justify-center z-10 transition-all duration-200 bg-white/80 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100",
                                    sizes.navigation.button
                                )}
                                onClick={() => emblaMainApi?.scrollNext()}
                            >
                                <ChevronRight className={cn("text-gray-700", sizes.navigation.icon)} />
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ImageGallery;
