import Container from "@/common/components/common/Container";
import SliderComponent from "@/common/components/common/Slider";
import HomePageComponent from "@/sections/home";

const Products = async ({ searchParams }) => {
  // const productList = await getProductFilterList(searchParams);

  // Using sample data for development
  const productList = getProductData(1, searchParams);

  return (
    <div className="">
      <SliderComponent />
      <Container classname={""}>
        <HomePageComponent
          product={productList?.data?.content}
          pageSize={productList?.data?.totalPages}
        />
      </Container>
    </div>
  );
};

export default Products;
