"use client";

import ImageGallery from "@/common/components/ui/ImageGallery";

const ProductImageGallery = ({ product }) => {
    const allImages = product?.thumbnailImage ?
        [product.thumbnailImage, ...(product?.images?.map(img => img.image) || [])] :
        (product?.images?.map(img => img.image) || []);

    return (
        <ImageGallery
            images={allImages}
            orientation="responsive"
        />
    );
};

export default ProductImageGallery;
