"use client";

import { useState, useEffect } from 'react';
import Container from '@/common/components/common/Container';
import Typography from '@/common/components/Typography';
import SingleProduct from '@/sections/home/SingleProduct';
import ProductCardSkeleton from '@/skeleton/ProductCardSkeleton';
import { sampleProductService } from '@/common/services/sampleProductService';
import Link from 'next/link';
import { Button } from '@/common/components/ui';
import { cn } from '@/common/lib/utils';

const TopListedProductSections = ({
    title = "Jute Materials",
    _subtitle = "",
    limit = 8,
    showViewAllButton = true,
    viewAllLink = "/products",
    categories = [
        { id: 1, name: "Jute Materials", isActive: true },
        { id: 2, name: "Seagrass Materials", isActive: false },
        { id: 3, name: "Keisa Materials", isActive: false },
        { id: 4, name: "Bamboo Materials", isActive: false }
    ]
}) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeCategory, setActiveCategory] = useState(categories[0]);

    useEffect(() => {
        const fetchTopProducts = async () => {
            try {
                setLoading(true);
                setError(null);

                // Get featured products (products with discounts) as top listed
                const response = await sampleProductService.getFeaturedProducts(limit);

                if (response?.data) {
                    setProducts(response.data);
                } else {
                    throw new Error('No products data received');
                }
            } catch (err) {
                setError(err.message || 'Failed to load products');
                console.error('Error fetching top listed products:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchTopProducts();
    }, [limit, activeCategory]);

    const handleCategoryChange = (category) => {
        setActiveCategory(category);
    };

    // Loading state
    if (loading) {
        return (
            <Container className="py-8 sm:py-12 md:py-16 lg:py-20">
                {/* Header with skeleton */}
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 lg:gap-0">
                    <div className="bg-gray-300 h-8 w-48 rounded animate-pulse mb-6"></div>

                    {/* Category tabs skeleton */}
                    <div className="flex gap-6 mb-8">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div key={index} className="bg-gray-300 h-6 w-24 rounded animate-pulse"></div>
                        ))}
                    </div>
                </div>

                {/* Products grid skeleton */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Array.from({ length: limit }).map((_, index) => (
                        <ProductCardSkeleton key={index} />
                    ))}
                </div>
            </Container>
        );
    }

    // Error state
    if (error) {
        return (
            <Container className="py-8 sm:py-12 md:py-16 lg:py-20">
                <div className="text-center">
                    <Typography.Title2 className="text-red-600 mb-4">
                        Oops! Something went wrong
                    </Typography.Title2>
                    <Typography.Paragraph className="text-gray-600 mb-6">
                        {error}
                    </Typography.Paragraph>
                    <Button
                        onClick={() => window.location.reload()}
                        className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                    >
                        Try Again
                    </Button>
                </div>
            </Container>
        );
    }

    // Empty state
    if (!products || products.length === 0) {
        return (
            <Container className="py-8 sm:py-12 md:py-16 lg:py-20">
                <div className="text-center">
                    <Typography.Title2 className="text-gray-600 mb-4">
                        No Products Available
                    </Typography.Title2>
                    <Typography.Paragraph className="text-gray-500">
                        We&apos;re working on adding amazing products. Check back soon!
                    </Typography.Paragraph>
                </div>
            </Container>
        );
    }

    return (
        <Container className="py-8 sm:py-12 md:py-16 lg:py-20">
            {/* Section Header */}
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 lg:gap-0">
                {/* Title */}
                <Typography.Title1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 lg:mb-6">
                    {title}
                </Typography.Title1>

                {/* Category Tabs */}
                <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-5 mb-6 sm:mb-8">
                    {categories.map((category) => (
                        <Button
                            key={category.id}
                            onClick={() => handleCategoryChange(category)}
                            variant="text"
                            className={cn(
                                "text-sm sm:text-base font-medium transition-all duration-200 px-2 py-1 relative",
                                activeCategory.id === category.id
                                    ? "text-primary underline decoration-2 underline-offset-4 hover:text-primary/80"
                                    : "text-gray-600 hover:text-primary hover:underline hover:decoration-1 hover:underline-offset-4"
                            )}
                        >
                            {category.name}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
                {products.map((product) => (
                    <div key={product.id} className="relative group">
                        <SingleProduct
                            product={product}
                            defaultSizePrice={0}
                        />
                    </div>
                ))}
            </div>

            {/* View All Button */}
            {showViewAllButton && (
                <div className='text-center mt-8 sm:mt-12 md:mt-16 lg:mt-20'>
                    <Button
                        className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 text-sm sm:text-base"
                    >
                        View all product
                    </Button>
                </div>
            )}
        </Container>
    );
};

export default TopListedProductSections;