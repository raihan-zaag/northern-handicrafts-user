import Container from "@/common/components/shared/Container";
import ProductDetailsPage from "@/sections/productDetails";
import PeopleAlsoLikeProduct from "@/sections/productDetails/PeopleAlsoLikeProduct";
import ProductDescriptionSection from "@/sections/productDetails/ProductDescriptionSection";
import { dummyProducts, dummyColors, simulateApiDelay } from "@/data/dummyProductData";
import BreadcrumbWrapper from "@/common/components/layout/breadcrumb/BreadcrumbWrapper";


const ProductDetails = async ({ params }) => {
    const { id: productId } = params;
    console.log("Fetching details for product ID:", productId);

    try {
        // Simulate API delay for realistic behavior
        await simulateApiDelay();

        // Find product from dummy data
        const foundProduct = dummyProducts.find(product => product.id === parseInt(productId));

        if (!foundProduct) {
            return (
                <Container>
                    <div className="text-center text-lg font-semibold py-10">
                        Product not found!
                    </div>
                </Container>
            );
        }

        // Enhanced product data with images, colors, and sizes for the design
        const enhancedProduct = {
            ...foundProduct,
            // Add multiple images for gallery
            images: [
                // { image: foundProduct.image },
                { image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
                { image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1099&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
                { image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=704&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
                { image: "https://images.unsplash.com/photo-1615396899839-c99c121888b0?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
                { image: "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
                { image: "https://images.unsplash.com/photo-1560343090-f0409e92791a?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
                { image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=715&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
                { image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=684&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }

            ],
            // thumbnailImage: foundProduct.image,
            thumbnailImage: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            // Add enhanced color options
            colorList: dummyColors.slice(0, 4).map((color, index) => ({
                id: index + 1,
                color: {
                    id: color.id,
                    name: color.label,
                    value: color.color,
                    active: true
                }
            })),
            // Add category structure
            categoryList: [{ name: foundProduct.category }],
            // Add pricing structure
            regularPrice: foundProduct.price + 10,
            priceAfterDiscount: foundProduct.price,
            discount: 25,
            availableQty: foundProduct.inStock ? 6 : 0,
            // Add additional fields for enhanced experience
            productOverview: foundProduct.description,
            productDetails: `
                <p><strong>Material:</strong> 100% Natural Laminated Jute</p>
                <p><strong>Sizes Available:</strong> Small (12x10 in), Medium (15x12 in), Large (18x14 in)</p>
                <p><strong>Handle:</strong> Soft padded cotton/jute handles for comfort</p>
                <p><strong>Usage:</strong> Grocery shopping, office, school, beach, or daily use</p>
                <p><strong>Eco Benefits:</strong> Biodegradable, reusable, sustainable</p>
            `,
            // Add review data
            averageRating: foundProduct.rating,
            totalReviewCount: foundProduct.reviews
        };

        // Render product details
        return (
            <>
                <BreadcrumbWrapper />
                <Container>
                    <div className="flex flex-col gap-8 lg:gap-12 py-4 lg:py-6">
                        <ProductDetailsPage product={enhancedProduct} />
                        <ProductDescriptionSection data={enhancedProduct} />
                        <PeopleAlsoLikeProduct productId={enhancedProduct.id} />
                    </div>
                </Container>
            </>
        );
    } catch {
        // Handle any errors and show fallback UI
        return (
            <Container>
                <div className="text-center text-lg font-semibold py-10 text-red-500">
                    Something went wrong while loading the product details. Please try
                    again later.
                </div>
            </Container>
        );
    }
};


export default ProductDetails;