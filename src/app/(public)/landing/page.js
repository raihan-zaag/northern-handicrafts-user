import Container from "@/common/components/common/Container";
import { getProductFilterList } from "@/common/services/productService";
import HomePageComponent from "@/sections/home";
import SliderComponent from "@/common/components/common/Slider";
import { getProductData } from "@/data/dataUtils";

const Home = async ({ searchParams }) => {
    // Fetch the filtered product list on the server-side
    // For development, we'll use sample data. In production, uncomment the line below:
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

export default Home;
