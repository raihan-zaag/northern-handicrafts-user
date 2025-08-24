"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import useGetCategories from "@/common/hooks/categories/useGetCategories";
import useGetSize from "@/common/hooks/singleProduct/useGetSizes";
import useGetAllColors from "@/common/hooks/color/useGetAllColors";
import { Checkbox } from "@/common/components/ui/checkbox";
import { Label } from "@/common/components/ui/label";
import { Slider } from "@/common/components/ui/slider";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/common/components/ui/accordion";
import { RadioGroup, RadioGroupItem } from "@/common/components/ui/radio-group";
import { cn } from "@/common/lib/utils";

const Filter = ({
    categoryList,
    selectedCategories,
    selectedSize,
    selectedColors,
    availabilityFilter,
    priceFilter,
    onCategoryChange,
    onSizeChange,
    onColorChange,
    onAvailabilityChange,
    onPriceChange,
}) => {
    const [filterHeight, setFilterHeight] = useState("auto");
    const filterRef = useRef(null);

    const { categories, loading } = useGetCategories();
    const { sizeList, loading: sizeLoading } = useGetSize();
    const { colors, loading: colorLoading } = useGetAllColors();

    const categoryMap = useMemo(() => {
        return categories?.content?.map((item) => {
            return { key: item?.id, label: item?.name };
        });
    }, [categories]);

    // Calculate dynamic height for large devices
    useEffect(() => {
        const calculateHeight = () => {
            if (typeof window !== 'undefined' && filterRef.current) {
                const viewportHeight = window.innerHeight;
                const headerHeight = 80; // Approximate header height
                const padding = 40; // Top and bottom padding
                const maxHeight = viewportHeight - headerHeight - padding;

                // Only apply calculated height on large devices
                if (window.innerWidth >= 1024) {
                    setFilterHeight(`${maxHeight}px`);
                } else {
                    setFilterHeight("auto");
                }
            }
        };

        calculateHeight();
        window.addEventListener('resize', calculateHeight);

        return () => window.removeEventListener('resize', calculateHeight);
    }, []);

    useEffect(() => {
        if (categoryMap && categoryMap.length > 0) {
            categoryList(categoryMap);
        }
    }, [categoryMap, categoryList]);

    // Handle category checkbox changes
    const handleCheckboxChange = (key, checked) => {
        let newCategories;
        if (checked) {
            newCategories = [...selectedCategories, key];
        } else {
            newCategories = selectedCategories.filter(id => id !== key);
        }
        onCategoryChange(newCategories);
    };

    // Handle size selection
    const handleSizeSelect = (size) => {
        const newSize = selectedSize === size ? "" : size;
        onSizeChange(newSize);
    };

    // Handle color selection
    const handleColorChange = (color, checked) => {
        const newColors = checked
            ? [...selectedColors, color]
            : selectedColors.filter(c => c !== color);
        onColorChange(newColors);
    };

    // Handle availability filter
    const handleAvailabilityChange = (availability) => {
        onAvailabilityChange(availability);
    };

    // Handle price range change
    const handleSliderChange = (value) => {
        onPriceChange(value);
    };

    // Category section skeleton loader
    const CategorySkeleton = () => (
        <div className="animate-pulse space-y-2">
            {[...Array(6)].map((_, index) => (
                <div key={index} className="flex items-center space-x-2">
                    <div className="bg-gray-200 rounded h-4 w-4" />
                    <div className="bg-gray-200 rounded h-4 flex-1" />
                </div>
            ))}
        </div>
    );

    return (
        <div
            ref={filterRef}
            className="w-full bg-background lg:sticky lg:top-4 lg:pr-4"
            style={{
                maxHeight: filterHeight,
                overflowY: filterHeight !== "auto" ? "auto" : "visible"
            }}
        >
            {/* Filter Header */}
            <div className="pb-3 border-b border-border">
                <h3 className="text-xl font-bold text-text-primary">Filter by</h3>
            </div>

            <div className="pt-3 space-y-4 overflow-x-hidden">
                {/* Availability Section */}
                <Accordion
                    type="multiple"
                    defaultValue={["availability", "categories", "size", "color", "price"]}
                    className="space-y-0"
                >
                    <AccordionItem value="availability" className="border-none">
                        <AccordionTrigger>
                            <span className="text-base font-bold text-text-primary">Availability</span>
                        </AccordionTrigger>
                        <AccordionContent>
                            <RadioGroup
                                value={availabilityFilter}
                                onValueChange={handleAvailabilityChange}
                                className=""
                            >
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="in-stock" id="availability-in-stock" />
                                    <Label
                                        htmlFor="availability-in-stock"
                                        className="text-sm font-medium cursor-pointer"
                                    >
                                        In Stock
                                    </Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="out-of-stock" id="availability-out-of-stock" />
                                    <Label htmlFor="availability-out-of-stock">
                                        Out of Stock
                                    </Label>
                                </div>
                            </RadioGroup>
                        </AccordionContent>
                    </AccordionItem>

                    {/* Categories Section */}
                    <AccordionItem value="categories" className="border-none">
                        <AccordionTrigger>
                            <span className="text-base font-bold text-text-primary">Categories</span>
                        </AccordionTrigger>
                        <AccordionContent>
                            {loading ? (
                                <CategorySkeleton />
                            ) : (
                                <div className="space-y-0">
                                    {/* <div className="flex items-center gap-2.5">
                                        <Checkbox
                                            id="all-materials"
                                            checked={selectedCategories.includes('all-materials')}
                                            onCheckedChange={(checked) => handleCheckboxChange('all-materials', checked)}
                                        />
                                        <Label
                                            htmlFor="all-materials"
                                            className="text-sm font-normal cursor-pointer flex-1"
                                        >
                                            All Materials
                                        </Label>
                                    </div> */}

                                    {categoryMap?.map((item) => (
                                        <div key={item.key} className="flex items-center gap-2.5 py-2">
                                            <Checkbox
                                                id={`category-${item.key}`}
                                                checked={selectedCategories.includes(item.key)}
                                                onCheckedChange={(checked) =>
                                                    handleCheckboxChange(item.key, checked)
                                                }
                                            />
                                            <Label
                                                htmlFor={`category-${item.key}`}
                                                className="text-sm font-normal cursor-pointer flex-1"
                                            >
                                                {item.label}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </AccordionContent>
                    </AccordionItem>

                    {/* Size Section */}
                    <AccordionItem value="size" className="border-none">
                        <AccordionTrigger>
                            <span className="text-base font-bold text-text-primary">Size</span>
                        </AccordionTrigger>
                        <AccordionContent>
                            {sizeLoading ? (
                                <div className="animate-pulse flex flex-wrap gap-2">
                                    {[...Array(5)].map((_, index) => (
                                        <div key={index} className="bg-gray-200 rounded-xl h-9 w-12" />
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-wrap gap-2">
                                    {sizeList?.map((size) => (
                                        <button
                                            key={size.value}
                                            onClick={() => handleSizeSelect(size.value)}
                                            className={cn(
                                                "h-9 px-3 text-sm font-medium border rounded-xl transition-all duration-200 focus:outline-none",
                                                selectedSize === size.value
                                                    ? 'border-[var(--color-primary)] text-[var(--color-text-primary)] bg-[var(--color-background)]'
                                                    : 'border-[var(--color-border)] text-[var(--color-text-secondary)] bg-[var(--color-background)] hover:border-[var(--color-primary)]'
                                            )}
                                        >
                                            {size.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </AccordionContent>
                    </AccordionItem>

                    {/* Color Section */}
                    <AccordionItem value="color" className="border-none">
                        <AccordionTrigger>
                            <span className="text-base font-bold text-text-primary">Color</span>
                        </AccordionTrigger>
                        <AccordionContent className="pb-2">
                            {colorLoading ? (
                                <div className="animate-pulse flex flex-wrap gap-2">
                                    {[...Array(5)].map((_, index) => (
                                        <div key={index} className="bg-gray-200 rounded-xl h-9 w-24" />
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-wrap gap-2">
                                    {colors?.map((color) => (
                                        <button
                                            key={color.id}
                                            onClick={() => handleColorChange(color.id, !selectedColors.includes(color.id))}
                                            className={cn(
                                                "h-9 px-3 text-sm font-medium border rounded-xl transition-all duration-200 focus:outline-none flex items-center gap-2",
                                                selectedColors.includes(color.id)
                                                    ? 'border-[var(--color-primary)] text-[var(--color-text-secondary)] bg-[var(--color-background)]'
                                                    : 'border-[var(--color-border)] text-[var(--color-text-secondary)] bg-[var(--color-background)] hover:border-[var(--color-primary)]'
                                            )}
                                        >
                                            <div
                                                className={cn(
                                                    "w-5 h-5 rounded-full border",
                                                    color.id === 'white' ? 'border-black' : 'border-transparent'
                                                )}
                                                style={{ backgroundColor: color.color }}
                                            />
                                            {color.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </AccordionContent>
                    </AccordionItem>

                    {/* Price Section */}
                    <AccordionItem value="price" className="border-none">
                        <AccordionTrigger>
                            <span className="text-base font-bold text-text-primary">Price</span>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-2 pt-4">
                                <Slider
                                    value={priceFilter}
                                    onValueChange={handleSliderChange}
                                    min={0}
                                    max={400}
                                    step={1}
                                    className="w-full"
                                />
                                <div className="flex items-center justify-between px-3 text-sm font-normal">
                                    <span>$ {priceFilter?.[0] || 0}</span>
                                    <span>$ {priceFilter?.[1] || 400}</span>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    );
};

export default Filter;
