import Container from "@/common/components/common/Container";
import Typography from "@/common/components/Typography";

const TextContentSection = () => {
    return (
        <Container
            className='text-center py-120px space-y-8'
        >
            <Typography.Title1 >
                Crafted by Culture. Inspired by Nature.
            </Typography.Title1>

            <Typography.Paragraph >
                Northern Handicraft is a brand rooted in the heart of Swedish culture — celebrating generations of craftsmanship,
                sustainability, and indigenous pride. Every product we create is handcrafted using natural jute and eco-friendly
                materials, supporting local artisans and empowering rural communities.
            </Typography.Paragraph>

            <Typography.Paragraph>
                Our mission is to preserve traditional techniques while reimagining them for the modern world. Through thoughtful
                design and ethical production, we bring you timeless, earth-conscious products that tell a story — one woven by
                hand, heart, and heritage.
            </Typography.Paragraph>
        </Container>
    );
};

export default TextContentSection;