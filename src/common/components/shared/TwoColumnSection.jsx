import Typography from "@/common/components/Typography";
import Image from "next/image";
import { cn } from "@/common/lib/utils";
import Container from "./Container";

const TwoColumnSection = ({ 
    title, 
    description, 
    images = [], 
    reverse = false, 
    className = "",
    gridCols = 3,
    showImageGrid = true,
    singleImage = null,
    containerClassName = "",
    titleClassName = "",
    descriptionClassName = "",
    imageGridClassName = ""
}) => {
    return (
        <Container className={cn("py-8 sm:py-12 md:py-16 lg:py-24", containerClassName)}>
            <div className={cn(
                "grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 items-center",
                reverse && "lg:grid-flow-col-dense",
                className
            )}>
                {/* Content Section */}
                <div className={cn(
                    "space-y-4 sm:space-y-6",
                    reverse && "lg:col-start-2"
                )}>
                    {title && (
                        <Typography.Title1 className={cn("text-left", titleClassName)}>
                            {title}
                        </Typography.Title1>
                    )}
                    
                    {description && (
                        <Typography.Paragraph className={cn("text-left", descriptionClassName)}>
                            {description}
                        </Typography.Paragraph>
                    )}
                </div>

                {/* Image Section */}
                <div className={cn(
                    "w-full",
                    reverse && "lg:col-start-1"
                )}>
                    {showImageGrid && images.length > 0 ? (
                        /* Image Grid */
                        <div className={cn(
                            `grid gap-2 sm:gap-3`,
                            gridCols === 2 && "grid-cols-2",
                            gridCols === 3 && "grid-cols-3",
                            gridCols === 4 && "grid-cols-2 sm:grid-cols-4",
                            imageGridClassName
                        )}>
                            {images.map((image, index) => (
                                <div 
                                    key={index}
                                    className="aspect-square relative overflow-hidden rounded-lg bg-gray-200 hover:scale-105 transition-transform duration-300"
                                >
                                    <Image
                                        src={image.src || "/images/image_placeholder.png"}
                                        alt={image.alt || `Image ${index + 1}`}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
                                        priority={index < 4} // Prioritize first 4 images
                                    />
                                </div>
                            ))}
                        </div>
                    ) : singleImage ? (
                        /* Single Image */
                        <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[400px] xl:h-[500px] overflow-hidden rounded-lg bg-gray-200">
                            <Image
                                src={singleImage.src || "/images/image_placeholder.png"}
                                alt={singleImage.alt || "Featured image"}
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-300"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                                priority
                            />
                        </div>
                    ) : null}
                </div>
            </div>
        </Container>
    );
};

export default TwoColumnSection;
