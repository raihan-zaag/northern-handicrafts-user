import Image from 'next/image';
import Typography from "@/common/components/Typography";
import { Button } from "@/common/components/ui/button";
import Container from '@/common/components/shared/Container';

const HeroSection = ({
  backgroundImage = "/images/hero-background.jpg",
  title = "Bring Nature Into Your Home",
  description = "Discover handcrafted decor made by empowered women — sustainably made to brighten your space and support a greener future.",
  buttonText = "View all product",
  onButtonClick,
  className = ""
}) => {
  return (
    <section className={`relative w-full min-h-[600px] md:min-h-[700px] lg:min-h-[800px] overflow-hidden ${className}`}>
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt="Natural handicraft products - bamboo baskets and plant pots"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20" />
      </div>

      {/* Content Container */}
      <Container className="relative z-10 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[600px] md:min-h-[700px] lg:min-h-[800px] py-12 md:py-16 lg:py-20">
          {/* Left Column - Text Content */}
          <div className="flex flex-col justify-center space-y-6 md:space-y-8 lg:space-y-10">
            {/* Main Title */}
            <Typography.Title1 className="text-white leading-tight">
              {title}
            </Typography.Title1>

            {/* Description */}
            <Typography.Paragraph className="text-white/90 leading-relaxed text-lg md:text-xl max-w-lg">
              {description}
            </Typography.Paragraph>

            {/* Call to Action Button */}
            <div className="pt-2">
              <Button
                onClick={onButtonClick}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 text-base md:text-lg rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105 focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-black/20"
              >
                {buttonText}
              </Button>
            </div>
          </div>

          {/* Right Column - Reserved for product showcase (handled by background image)
          <div className="hidden lg:block">
          </div> */}
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
