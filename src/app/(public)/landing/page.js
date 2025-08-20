import Container from "@/common/components/common/Container";
// import { getProductFilterList } from "@/common/services/productService";
import HomePageComponent from "@/sections/home";
import SliderBanner from "@/sections/landing/SliderBanner";
import { getProductData } from "@/data/dataUtils";

const Home = async ({ searchParams }) => {
    // Fetch the filtered product list on the server-side
    // For development, we'll use sample data. In production, uncomment the line below:
    // const productList = await getProductFilterList(searchParams);

    // Using sample data for development
    const productList = getProductData(1, searchParams);

    // Sample slides for the new SliderBanner
    const bannerSlides = [
        {
            image: '/images/image_placeholder.png',
            title: 'Categories you might like',
            description: 'Explore trending categories packed with bestsellers and top-rated picks!',
            alt: 'Trending categories showcase',
        },
        {
            image: '/images/image_placeholder.png',
            title: 'Handcrafted with Love',
            description: 'Discover authentic handicrafts made by skilled artisans from Northern regions',
            alt: 'Handcrafted products',
        },
        {
            image: '/images/image_placeholder.png',
            title: 'Premium Quality',
            description: 'Each piece is carefully selected for quality and authenticity',
            alt: 'Quality products',
        }
    ];

    return (
        <div className="">
            {/* New SliderBanner Component */}
            <SliderBanner
                slides={bannerSlides}
                autoPlay={true}
                autoPlayDelay={4000}
                className="mb-8"
                showNavigation={false}
            />

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
