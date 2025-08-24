import BreadcrumbWrapper from "@/common/components/layout/breadcrumb/BreadcrumbWrapper";
import Container from "@/common/components/shared/Container";
import SliderComponent from "@/common/components/shared/Slider";
import { getProductData } from "@/data/dataUtils";
import SliderBanner from "@/sections/landing/SliderBanner";
import ProductListed from "@/sections/products";

const Products = async ({ searchParams }) => {
  // const productList = await getProductFilterList(searchParams);

  // Using sample data for development
  const productList = getProductData(1, searchParams);

  const bannerSlides = [
    {
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop&crop=center',
    },
    {
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=center',
    },
    {
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=center',
    }
  ];

  return (
    <div>
      <BreadcrumbWrapper />
      <Container classname={""}>
        <SliderBanner
          slides={bannerSlides}
          autoPlay={true}
          autoPlayDelay={4000}
          className="mb-8"
          showNavigation={false}
          contentClassName="rounded-xl"
          slideClassName="rounded-xl"
        />
        <ProductListed
          product={productList?.data?.content}
          pageSize={productList?.data?.totalPages}
        />
      </Container>
    </div>
  );
};

export default Products;
