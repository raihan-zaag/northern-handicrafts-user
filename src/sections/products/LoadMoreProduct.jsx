"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import ProductList from "./ProductList";
import ProductCardSkeleton from "@/skeleton/ProductCardSkeleton";
import { MdFilterAlt } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { CgClose } from "react-icons/cg";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/common/components/ui/select";
import { Button } from "@/common/components/ui/button";
import Typography from "@/common/components/Typography";
import Filter from "./Filter";

const LoadMoreProduct = ({
    productList,
    categoryList,
    totalPages,
    currentPage,
    loading,
    selectedCategories,
    selectedSize,
    selectedColors,
    availabilityFilter,
    priceFilter,
    sortBy,
    onLoadMore,
    onSortChange,
    onClearAllFilters,
    // Filter handlers for mobile drawer
    onCategoryChange,
    onSizeChange,
    onColorChange,
    onAvailabilityChange,
    onPriceChange,
    handleSpreadCategory,
}) => {
    const [openFilterDrawer, setOpenFilterDrawer] = useState(false);
    const { ref, inView } = useInView({
        threshold: 0.1,
        rootMargin: '100px',
        triggerOnce: false,
    });

    // Trigger load more when in view
    useEffect(() => {
        if (inView && currentPage < totalPages && !loading) {
            onLoadMore();
        }
    }, [inView, currentPage, totalPages, loading, onLoadMore]);

    // Build filtered items for display
    const getFilteredItems = () => {
        const filteredItems = [];

        // Add category filters
        const categoryLabels = categoryList?.reduce((acc, cat) => {
            acc[cat.key] = cat.label;
            return acc;
        }, {});

        selectedCategories.forEach(categoryId => {
            if (categoryId !== 'all-materials' && categoryLabels?.[categoryId]) {
                filteredItems.push({
                    key: categoryId,
                    label: categoryLabels[categoryId],
                    type: 'category'
                });
            }
        });

        // Add size filter
        if (selectedSize) {
            filteredItems.push({
                key: `size-${selectedSize}`,
                label: `Size: ${selectedSize}`,
                type: 'size',
                value: selectedSize
            });
        }

        // Add color filters
        if (selectedColors.length > 0) {
            const colorLabels = {
                'natural-beige': 'Natural Beige',
                'olive-green': 'Olive Green',
                'white': 'White',
                'pink': 'Pink',
                'grey': 'Grey'
            };
            selectedColors.forEach(color => {
                filteredItems.push({
                    key: `color-${color}`,
                    label: `Color: ${colorLabels[color] || color}`,
                    type: 'color',
                    value: color
                });
            });
        }

        // Add availability filter
        if (availabilityFilter && availabilityFilter !== 'all') {
            const availabilityLabel = availabilityFilter === 'in-stock' ? 'In Stock' : 'Out of Stock';
            filteredItems.push({
                key: `availability-${availabilityFilter}`,
                label: `Availability: ${availabilityLabel}`,
                type: 'availability',
                value: availabilityFilter
            });
        }

        return filteredItems;
    };

    const filteredItems = getFilteredItems();
    const hasPrice = priceFilter[0] !== 0 || priceFilter[1] !== 9999;
    const isNotRecommended = sortBy !== "RECOMMENDED";

    // Remove a single filter
    const handleRemoveFilter = (filterItem) => {
        switch (filterItem.type) {
            case 'category': {
                const newCategories = selectedCategories.filter(id => id !== filterItem.key);
                onCategoryChange(newCategories);
                break;
            }
            case 'size': {
                onSizeChange("");
                break;
            }
            case 'color': {
                const newColors = selectedColors.filter(color => color !== filterItem.value);
                onColorChange(newColors);
                break;
            }
            case 'availability': {
                onAvailabilityChange("all");
                break;
            }
        }
    };

    const resetPriceFilter = () => {
        onPriceChange([0, 9999]);
    };

    const resetRecommended = () => {
        onSortChange("RECOMMENDED");
    };

    const sortByItems = [
        { key: "RECOMMENDED", label: "Recommended" },
        { key: "LOW_TO_HIGH", label: "Price (Low to high)" },
        { key: "HIGH_TO_LOW", label: "Price (High to low)" },
        { key: "NEWEST", label: "Newest" },
        { key: "A_Z", label: "Name (A-Z)" },
        { key: "Z_A", label: "Name (Z-A)" },
    ];

    const sortByLabel = sortByItems.find((item) => item.key === sortBy)?.label || "Recommended";

    return (
        <div>
            <div className="flex items-center justify-between mb-6 py-2">
                <Typography.Paragraph className="font-semibold">
                    {productList?.length} Products
                </Typography.Paragraph>
                <div className="flex items-center gap-2 mx-1">
                    <Typography.Paragraph className="font-semibold">
                        Sort by
                    </Typography.Paragraph>
                    <Select
                        value={sortBy}
                        onValueChange={onSortChange}
                    >
                        <SelectTrigger className="w-48">
                            <SelectValue placeholder="Sort by..." />
                        </SelectTrigger>
                        <SelectContent>
                            {sortByItems.map((item) => (
                                <SelectItem key={item.key} value={item.key}>
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-start md:items-start lg:items-center justify-between mb-6">
                <div
                    className={`${filteredItems?.length || hasPrice || isNotRecommended
                        ? "flex flex-row"
                        : "hidden"
                        } items-start justify-between w-full`}
                >
                    <div className="flex flex-row flex-wrap items-center gap-4">
                        {filteredItems?.map((filterItem, index) => (
                            <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                className="px-2.5 py-2.5 text-sm h-auto gap-2"
                                onClick={() => handleRemoveFilter(filterItem)}
                            >
                                {filterItem.label}
                                <IoClose className="h-4 w-4" />
                            </Button>
                        ))}

                        {isNotRecommended && (
                            <Button
                                variant="outline"
                                size="sm"
                                className="px-2.5 py-2.5 text-sm h-auto gap-2"
                                onClick={resetRecommended}
                            >
                                {sortByLabel}
                                <IoClose className="h-4 w-4" />
                            </Button>
                        )}

                        {hasPrice && (
                            <Button
                                variant="outline"
                                size="sm"
                                className="px-2.5 py-2.5 text-sm h-auto gap-2"
                                onClick={resetPriceFilter}
                            >
                                ${priceFilter[0]} - ${priceFilter[1]}
                                <IoClose className="h-4 w-4" />
                            </Button>
                        )}

                        {(filteredItems?.length || hasPrice || isNotRecommended) && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={onClearAllFilters}
                                className="px-2.5 py-2.5 text-primary text-sm h-auto"
                            >
                                Clear All
                            </Button>
                        )}
                    </div>

                    <div
                        className="md:hidden border p-2 border-primary ml-auto flex items-center justify-center"
                        onClick={() => setOpenFilterDrawer(true)}
                    >
                        <MdFilterAlt className="h-5 w-5 text-primary" />
                        <p className="text-primary">Filter</p>
                    </div>
                </div>
            </div>

            <ProductList productList={productList} categories={categoryList} />

            {/* Loading Skeletons */}
            <div ref={ref}>
                {loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
                        <ProductCardSkeleton />
                        <ProductCardSkeleton />
                        <ProductCardSkeleton />
                        <ProductCardSkeleton />
                        <ProductCardSkeleton />
                        <ProductCardSkeleton />
                    </div>
                )}

                {/* Show "No more products" message when reached end */}
                {!loading && currentPage >= totalPages && productList?.length > 0 && (
                    <div className="text-center py-8">
                        <Typography.Paragraph className="text-muted-foreground">
                            You&apos;ve reached the end of the products
                        </Typography.Paragraph>
                    </div>
                )}
            </div>

            {/* Mobile Filter Drawer */}
            <Sheet open={openFilterDrawer} onOpenChange={setOpenFilterDrawer}>
                <SheetContent side="left" className="w-full max-w-400px sm:max-w-540px">
                    <SheetHeader>
                        <div className="flex items-center justify-between">
                            <SheetTitle className="text-primary">Product Filter</SheetTitle>
                            <div onClick={() => setOpenFilterDrawer(false)}>
                                <CgClose className="h-5 w-5 cursor-pointer" />
                            </div>
                        </div>
                    </SheetHeader>
                    <div className="mt-4">
                        <Filter
                            categoryList={handleSpreadCategory}
                            selectedCategories={selectedCategories}
                            selectedSize={selectedSize}
                            selectedColors={selectedColors}
                            availabilityFilter={availabilityFilter}
                            priceFilter={priceFilter}
                            onCategoryChange={onCategoryChange}
                            onSizeChange={onSizeChange}
                            onColorChange={onColorChange}
                            onAvailabilityChange={onAvailabilityChange}
                            onPriceChange={onPriceChange}
                        />
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default LoadMoreProduct;
