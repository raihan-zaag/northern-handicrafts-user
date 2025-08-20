import SliderBanner from "@/sections/landing/SliderBanner";
import { getProductData } from "@/data/dataUtils";
import CategorySections from "@/sections/landing/CategorySections";
import VideoPlaybackSection from "@/sections/landing/VideoPlaybackSection";
import TextContentSection from "@/sections/landing/TextContentSection";
import TopListedProductSections from "@/sections/landing/TopListedProductSections";
import LandingHero from "@/sections/landing/LandingHero";
import TestimonialsSection from "@/sections/landing/TestimonialsSection";
import EmpoweringWomenSection from "@/sections/landing/EmpoweringWomenSection";
import ServiceSections from "@/sections/landing/ServiceSections";

const Home = async ({ searchParams }) => {
    // Fetch the filtered product list on the server-side
    // For development, we'll use sample data. In production, uncomment the line below:
    // const productList = await getProductFilterList(searchParams);

    // Using sample data for development
    const _productList = getProductData(1, searchParams);

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


    // Sample categories data - Updated to match Figma design
    const categories = [
        {
            id: 1,
            name: "Raw Jute Fibers",
            count: "129 Items",
            image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=center",
            href: "/categories/raw-jute-fibers"
        },
        {
            id: 2,
            name: "Golden Jute",
            count: "120 Items",
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center",
            href: "/categories/golden-jute"
        },
        {
            id: 3,
            name: "White Jute",
            count: "120 Items",
            image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop&crop=center",
            href: "/categories/white-jute"
        },
        {
            id: 4,
            name: "Jute Yarn",
            count: "120 Items",
            image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=center",
            href: "/categories/jute-yarn"
        }
    ];

    const _handleCategoryClick = (_category) => {
        // Handle category click logic here
        // You can navigate to category page, update state, etc.
    };


    // Sample data for Empowering Women Section
    const empoweringWomenData = {
        title: (
            <>
                Empowering Women,{" "}
                <span className="block">Preserving Tradition</span>
            </>
        ),
        description: "At Local Women&apos;s Handicrafts, our mission is to provide fair wages, education, and empowerment to women artisans. Through our sustainable and ethical entrepreneurial model, we create job opportunities in some of the world&apos;s most underprivileged communities. Our vision is to build a textile industry rooted in dignity, human rights, and environmental responsibility — where every product tells a story of resilience and hope.",
        images: [
            {
                src: "/images/image_placeholder.png",
                alt: "Woman artisan working on handicrafts"
            },
            {
                src: "/images/image_placeholder.png",
                alt: "Woman artisan crafting traditional items"
            },
            {
                src: "/images/image_placeholder.png",
                alt: "Woman artisan at work"
            },
            {
                src: "/images/image_placeholder.png",
                alt: "Woman artisan weaving"
            },
            {
                src: "/images/image_placeholder.png",
                alt: "Woman artisan creating handicrafts"
            },
            {
                src: "/images/image_placeholder.png",
                alt: "Woman artisan working with textiles"
            },
            {
                src: "/images/image_placeholder.png",
                alt: "Woman artisan in traditional dress working"
            },
            {
                src: "/images/image_placeholder.png",
                alt: "Woman artisan crafting traditional products"
            },
            {
                src: "/images/image_placeholder.png",
                alt: "Woman artisan working on handicrafts"
            }
        ]
    };


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

            <TextContentSection />

            <CategorySections
                categories={categories}
            />

            <EmpoweringWomenSection data={empoweringWomenData} />

            <VideoPlaybackSection />
            <TopListedProductSections />
            <LandingHero />
            <TestimonialsSection/>
            {/* <ServiceSections /> */}
        </div>
    );
};

export default Home;
