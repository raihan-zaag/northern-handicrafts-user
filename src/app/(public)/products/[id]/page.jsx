import Container from "@/common/components/shared/Container";
import ProductDetailsPage from "@/sections/productDetails";
import PeopleAlsoLikeProduct from "@/sections/productDetails/PeopleAlsoLikeProduct";
import ProductDescriptionSection from "@/sections/productDetails/ProductDescriptionSection";
import { dummyProducts, simulateApiDelay } from "@/data/dummyProductData";


const ProductDetails = async ({ params }) => {
    const { id: productId } = params;

    try {
        // Simulate API delay for realistic behavior
        await simulateApiDelay();
        
        // Find product from dummy data
        const foundProduct = dummyProducts.find(product => product.id === parseInt(productId));
        
        // Create product response structure to match expected format
        const product = foundProduct ? { content: [foundProduct] } : { content: [] };

        // If no product is found, show "Not Found" section
        if (!product?.content.length) {
            return (
                <Container>
                    <div className="text-center text-lg font-semibold py-10">
                        Product not found!
                    </div>
                </Container>
            );
        }

        // Render product details
        return (
            <Container>
                <ProductDetailsPage product={product?.content[0]} />

                {/* description */}
                <ProductDescriptionSection data={product?.content[0]} />

                {/* You may also like. */}
                <div className="mt-8">
                    <PeopleAlsoLikeProduct productId={product?.content[0]?.id} />
                </div>
            </Container>
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