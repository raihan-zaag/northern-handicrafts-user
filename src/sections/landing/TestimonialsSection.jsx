import Container from '@/common/components/shared/Container';
import Typography from '@/common/components/Typography';
import Image from 'next/image';

const TestimonialsSection = ({ testimonials = [] }) => {
  // Default testimonials data if none provided
  const defaultTestimonials = [
    {
      id: 1,
      name: "Ayesha R.",
      location: "Dubai",
      rating: 4.0,
      avatar: "/images/image_placeholder.png",
      review: "I ordered a handwoven jute basket and was blown away by the craftsmanship. You can feel the care and tradition in every detail. It's not just a product — it's a piece of culture. Knowing that it supports rural women artisans makes it even more special."
    },
    {
      id: 2,
      name: "Liam M.",
      location: "Toronto",
      rating: 4.0,
      avatar: "/images/image_placeholder.png",
      review: "I love how these jute items blend natural texture with modern style. The laminated jute folder I bought is sturdy and looks fantastic on my desk. Plus, the green values behind the brand align with what I stand for."
    },
    {
      id: 3,
      name: "Farzana B.",
      location: "London",
      rating: 4.0,
      avatar: "/images/image_placeholder.png",
      review: "This is not just shopping — it's supporting lives. The stitching, colors, and materials are all premium. My jute bag arrived beautifully packaged and you can tell it's ethically made. Highly recommend for conscious buyers!"
    }
  ];

  const testimonialsData = testimonials.length > 0 ? testimonials : defaultTestimonials;

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Image
          key={i}
          src="/icons/rating.svg"
          alt="star"
          width={14}
          height={13}
          className={`w-3.5 h-3 ${i < fullStars ? 'opacity-100' : 'opacity-30'}`}
        />
      );
    }
    return stars;
  };

  return (
    <Container className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
      {/* Header Section */}
      <div className="text-center mb-8 md:mb-12 lg:mb-16">
        <Typography.Title1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 md:mb-4">
          Customer Say!
        </Typography.Title1>
        
        <Typography.Paragraph className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
          Our customers adore our products, and we constantly aim to delight them.
        </Typography.Paragraph>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {testimonialsData.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white rounded-lg p-6 md:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
          >
            {/* Review Text */}
            <Typography.Paragraph className="text-gray-700 mb-6 leading-relaxed line-clamp-6">
              {testimonial.review}
            </Typography.Paragraph>

            {/* Customer Info */}
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Name, Location, and Rating */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <Typography.Title3 className="text-sm font-semibold text-gray-900">
                    {testimonial.name}, {testimonial.location}
                  </Typography.Title3>
                </div>
                
                {/* Rating Stars */}
                <div className="flex items-center gap-1">
                  {renderStars(testimonial.rating)}
                  <Typography.SmallText className="ml-2 text-gray-500">
                    {testimonial.rating.toFixed(1)}
                  </Typography.SmallText>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default TestimonialsSection;
