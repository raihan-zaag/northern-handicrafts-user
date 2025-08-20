import Container from '@/common/components/common/Container';
import Typography from '@/common/components/Typography';
import Image from 'next/image';

const CategorySections = ({ categories }) => {
  return (
    <Container
      className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-120px"
    >
      <div className='flex flex-col space-y-6 md:space-y-8 lg:flex-row lg:items-center lg:justify-between lg:space-y-0'>
        <div className='text-center lg:text-left lg:max-w-md'>
          <Typography.Title1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 md:mb-4">
            Categories
          </Typography.Title1>

          <Typography.Paragraph className="text-sm sm:text-base md:text-lg text-gray-600">
            Explore trending categories packed with bestsellers and top-rated picks!
          </Typography.Paragraph>

        </div>

        <div className='flex justify-center lg:justify-end'>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:flex gap-4 md:gap-6 lg:gap-0">
            {categories.map((category) => (
              <div
                key={category.id}
                className="lg:-ml-6 xl:-ml-10 group cursor-pointer transition-transform duration-300 hover:scale-105 hover:z-10 relative"
              >
                {/* Category Image Container */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 2xl:w-200px 2xl:h-200px rounded-full mx-auto ring-4 ring-white shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <Image
                    src={category.image}
                    alt={category.name}
                    layout="fill"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                {/* Category Info */}
                <div className="text-center space-y-1 sm:space-y-2 lg:space-y-3 p-2 sm:p-3 lg:p-4">
                  <Typography.Paragraph
                    className='font-medium text-xs sm:text-sm md:text-base truncate'
                  >
                    {category.name}
                  </Typography.Paragraph>
                  <Typography.SmallText className="text-xs sm:text-sm text-gray-500">
                    {category.itemCount} Items
                  </Typography.SmallText>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CategorySections;


