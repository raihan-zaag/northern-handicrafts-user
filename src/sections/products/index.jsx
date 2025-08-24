"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import LoadMoreProduct from "./LoadMoreProduct";
import Filter from "./Filter";
import { Spinner } from "@/components/ui/spinner";
// TODO: Uncomment when backend is ready
// import { getProductFilterList } from "@/common/services/productService";
import { PRODUCTS_URL } from "@/common/config/constants/routes";
import { getPaginatedProducts, simulateApiDelay } from "@/data/dummyProductData";

// Debounce utility function
const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

// Custom hook for smooth scrolling to element
const useScrollToElement = () => {
    const scrollToElement = useCallback((element, offset = -20) => {
        if (!element) return;

        const scrollToTarget = () => {
            const y = element.getBoundingClientRect().top + window.pageYOffset + offset;

            window.scrollTo({
                top: y,
                behavior: 'smooth'
            });
        };

        // Try multiple times for maximum reliability
        const attempts = [0, 50, 150, 300]; // Different timing attempts

        attempts.forEach((delay) => {
            setTimeout(scrollToTarget, delay);
        });
    }, []);

    return scrollToElement;
};

const ProductListed = ({ product: initialProduct, pageSize: initialPageSize }) => {
    // Ref for the product listing section
    const productSectionRef = useRef(null);

    // Custom scroll hook
    const scrollToElement = useScrollToElement();

    // Filter states
    const [categories, setCategories] = useState([]);
    const [priceFilter, setPriceFilter] = useState([0, 9999]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColors, setSelectedColors] = useState([]);
    const [availabilityFilter, setAvailabilityFilter] = useState("all");
    const [sortBy, setSortBy] = useState("RECOMMENDED");

    // Product data states
    const [products, setProducts] = useState(initialProduct || []);
    const [totalPages, setTotalPages] = useState(initialPageSize || 0);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [isFiltering, setIsFiltering] = useState(false);

    const router = useRouter();
    const searchParams = useSearchParams();

    // Disable browser scroll restoration for this page to prevent conflicts
    useEffect(() => {
        if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }

        return () => {
            if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
                window.history.scrollRestoration = 'auto';
            }
        };
    }, []);

    // Debounce price filter to avoid too many API calls
    const debouncedPriceFilter = useDebounce(priceFilter, 500);

    // Initialize filters from URL parameters
    useEffect(() => {
        const categoryIds = searchParams.getAll("category");
        const size = searchParams.get("size");
        const colors = searchParams.getAll("color");
        const availability = searchParams.get("availability") || "all";
        const priceFrom = searchParams.get("priceFrom");
        const priceTo = searchParams.get("priceTo");
        const sort = searchParams.get("sortBy") || "RECOMMENDED";

        setSelectedCategories(categoryIds);
        setSelectedSize(size || "");
        setSelectedColors(colors);
        setAvailabilityFilter(availability);
        setSortBy(sort);

        if (priceFrom && priceTo) {
            setPriceFilter([Number(priceFrom), Number(priceTo)]);
        }
    }, [searchParams]);

    // Handle scrolling when URL changes (for consistency)
    useEffect(() => {
        // Only scroll if there are filter parameters in the URL
        const hasFilters = searchParams.toString().length > 0;

        if (hasFilters && productSectionRef.current) {
            // Small delay to ensure the component has rendered
            setTimeout(() => {
                scrollToElement(productSectionRef.current);
            }, 100);
        }
    }, [searchParams, scrollToElement]);

    // Build filter parameters
    // TODO: Uncomment when backend is ready
    // const buildFilterParams = useCallback((page = 1) => {
    //     const params = {
    //         page,
    //         size: 5, // pageLimit
    //         sortBy,
    //     };

    //     if (selectedCategories.length > 0) {
    //         params.category = selectedCategories.length > 1 ? selectedCategories : selectedCategories[0];
    //     }

    //     if (selectedSize) {
    //         params.size = selectedSize;
    //     }

    //     if (selectedColors.length > 0) {
    //         params.colors = selectedColors;
    //     }

    //     if (availabilityFilter && availabilityFilter !== "all") {
    //         params.availability = availabilityFilter;
    //     }

    //     if (debouncedPriceFilter[0] !== 0 || debouncedPriceFilter[1] !== 9999) {
    //         params.priceFrom = debouncedPriceFilter[0];
    //         params.priceTo = debouncedPriceFilter[1];
    //     }

    //     const name = searchParams.get("name");
    //     if (name) {
    //         params.name = name;
    //     }

    //     return params;
    // }, [selectedCategories, selectedSize, selectedColors, availabilityFilter, sortBy, debouncedPriceFilter, searchParams]);

    // Fetch products based on filters
    const fetchProducts = useCallback(async (page = 1, append = false) => {
        if (append) {
            setLoading(true);
        } else {
            setIsFiltering(true);
        }

        try {
            // TODO: Uncomment when backend is ready
            // const params = buildFilterParams(page);
            // const response = await getProductFilterList(params);

            // Using dummy data for now since backend is not ready
            await simulateApiDelay(800);
            const paginatedData = getPaginatedProducts(page, 5);

            if (append) {
                setProducts(prev => {
                    const filteredNewProducts = paginatedData.content.filter(
                        newItem => !prev.some(prevItem => prevItem.id === newItem.id)
                    );
                    return [...prev, ...filteredNewProducts];
                });
            } else {
                setProducts(paginatedData.content);
                setCurrentPage(1);
            }

            setTotalPages(paginatedData.totalPages);

        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
            setIsFiltering(false);
        }
    }, []);

    // Effect to trigger filtering when debounced price changes
    useEffect(() => {
        // Only trigger if this is not the initial render and debounced value has actually changed
        const isInitialRender = debouncedPriceFilter[0] === 0 && debouncedPriceFilter[1] === 9999;
        if (!isInitialRender) {
            fetchProducts(1, false);
        }
    }, [debouncedPriceFilter, fetchProducts]);

    // Load more products for infinite scroll
    const loadMoreProducts = useCallback(() => {
        if (currentPage < totalPages && !loading) {
            const nextPage = currentPage + 1;
            setCurrentPage(nextPage);
            fetchProducts(nextPage, true);
        }
    }, [currentPage, totalPages, loading, fetchProducts]);

    // Update URL when filters change
    const updateURL = useCallback((newFilters) => {
        const url = new URL(window.location.href);
        const searchParams = new URLSearchParams(url.search);

        // Clear existing filter params
        searchParams.delete("category");
        searchParams.delete("size");
        searchParams.delete("color");
        searchParams.delete("availability");
        searchParams.delete("priceFrom");
        searchParams.delete("priceTo");
        searchParams.delete("sortBy");

        // Add new filter params
        if (newFilters.categories?.length > 0) {
            newFilters.categories.forEach(cat => searchParams.append("category", cat));
        }

        if (newFilters.size) {
            searchParams.set("size", newFilters.size);
        }

        if (newFilters.colors?.length > 0) {
            newFilters.colors.forEach(color => searchParams.append("color", color));
        }

        if (newFilters.availability && newFilters.availability !== "all") {
            searchParams.set("availability", newFilters.availability);
        }

        if (newFilters.priceRange && (newFilters.priceRange[0] !== 0 || newFilters.priceRange[1] !== 9999)) {
            searchParams.set("priceFrom", newFilters.priceRange[0]);
            searchParams.set("priceTo", newFilters.priceRange[1]);
        }

        if (newFilters.sortBy && newFilters.sortBy !== "RECOMMENDED") {
            searchParams.set("sortBy", newFilters.sortBy);
        }

        // Push the URL change first
        router.push(`${PRODUCTS_URL}/?${searchParams.toString()}`, { shallow: true });

        // Use the reliable scroll function
        scrollToElement(productSectionRef.current);

    }, [router, scrollToElement]);

    // Filter change handlers
    const handleCategoryChange = useCallback((categoryIds) => {
        setSelectedCategories(categoryIds);
        const newFilters = {
            categories: categoryIds,
            size: selectedSize,
            colors: selectedColors,
            availability: availabilityFilter,
            priceRange: priceFilter,
            sortBy
        };
        updateURL(newFilters);
        fetchProducts(1, false);
    }, [selectedSize, selectedColors, availabilityFilter, priceFilter, sortBy, updateURL, fetchProducts]);

    const handleSizeChange = useCallback((size) => {
        setSelectedSize(size);
        const newFilters = {
            categories: selectedCategories,
            size,
            colors: selectedColors,
            availability: availabilityFilter,
            priceRange: priceFilter,
            sortBy
        };
        updateURL(newFilters);
        fetchProducts(1, false);
    }, [selectedCategories, selectedColors, availabilityFilter, priceFilter, sortBy, updateURL, fetchProducts]);

    const handleColorChange = useCallback((colors) => {
        setSelectedColors(colors);
        const newFilters = {
            categories: selectedCategories,
            size: selectedSize,
            colors,
            availability: availabilityFilter,
            priceRange: priceFilter,
            sortBy
        };
        updateURL(newFilters);
        fetchProducts(1, false);
    }, [selectedCategories, selectedSize, availabilityFilter, priceFilter, sortBy, updateURL, fetchProducts]);

    const handleAvailabilityChange = useCallback((availability) => {
        setAvailabilityFilter(availability);
        const newFilters = {
            categories: selectedCategories,
            size: selectedSize,
            colors: selectedColors,
            availability,
            priceRange: priceFilter,
            sortBy
        };
        updateURL(newFilters);
        fetchProducts(1, false);
    }, [selectedCategories, selectedSize, selectedColors, priceFilter, sortBy, updateURL, fetchProducts]);

    const handlePriceChange = useCallback((priceRange) => {
        setPriceFilter(priceRange);
        const newFilters = {
            categories: selectedCategories,
            size: selectedSize,
            colors: selectedColors,
            availability: availabilityFilter,
            priceRange,
            sortBy
        };
        updateURL(newFilters);
        // Don't call fetchProducts here - let debounced effect handle it
    }, [selectedCategories, selectedSize, selectedColors, availabilityFilter, sortBy, updateURL]);

    const handleSortChange = useCallback((newSortBy) => {
        setSortBy(newSortBy);
        const newFilters = {
            categories: selectedCategories,
            size: selectedSize,
            colors: selectedColors,
            availability: availabilityFilter,
            priceRange: priceFilter,
            sortBy: newSortBy
        };
        updateURL(newFilters);
        fetchProducts(1, false);
    }, [selectedCategories, selectedSize, selectedColors, availabilityFilter, priceFilter, updateURL, fetchProducts]);

    const handleClearAllFilters = useCallback(() => {
        setSelectedCategories([]);
        setSelectedSize("");
        setSelectedColors([]);
        setAvailabilityFilter("all");
        setPriceFilter([0, 9999]);
        setSortBy("RECOMMENDED");

        router.push(PRODUCTS_URL, { shallow: true });
        fetchProducts(1, false);
    }, [router, fetchProducts]);

    const handleSpreadCategory = useCallback((categories) => {
        setCategories(categories);
    }, []);

    return (
        <div className="relative min-h-screen scroll-mt-5"
            ref={productSectionRef}
        >
            {isFiltering && (
                <div className="w-full absolute inset-0 grid place-items-center bg-background/80 backdrop-blur-sm z-50">
                    <div className="flex items-center gap-3 text-sm text-foreground bg-background/90 p-4 rounded-lg ">
                        <Spinner className="text-primary" />
                        <span>Applying filter...</span>
                    </div>
                </div>
            )}

            {/* Container with proper padding and max-width */}
            <div className="container" >
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 w-full">
                    {/* Sidebar - Fixed on desktop, responsive on mobile */}
                    <aside className="hidden lg:block lg:w-[220px]">
                        <Filter
                            categoryList={handleSpreadCategory}
                            selectedCategories={selectedCategories}
                            selectedSize={selectedSize}
                            selectedColors={selectedColors}
                            availabilityFilter={availabilityFilter}
                            priceFilter={priceFilter}
                            onCategoryChange={handleCategoryChange}
                            onSizeChange={handleSizeChange}
                            onColorChange={handleColorChange}
                            onAvailabilityChange={handleAvailabilityChange}
                            onPriceChange={handlePriceChange}
                        />
                    </aside>

                    {/* Main Content - Takes remaining space */}
                    <main className="flex-1">
                        <LoadMoreProduct
                            productList={products}
                            categoryList={categories}
                            totalPages={totalPages}
                            currentPage={currentPage}
                            loading={loading}
                            selectedCategories={selectedCategories}
                            selectedSize={selectedSize}
                            selectedColors={selectedColors}
                            availabilityFilter={availabilityFilter}
                            priceFilter={priceFilter}
                            sortBy={sortBy}
                            onLoadMore={loadMoreProducts}
                            onSortChange={handleSortChange}
                            onClearAllFilters={handleClearAllFilters}
                            onCategoryChange={handleCategoryChange}
                            onSizeChange={handleSizeChange}
                            onColorChange={handleColorChange}
                            onAvailabilityChange={handleAvailabilityChange}
                            onPriceChange={handlePriceChange}
                            handleSpreadCategory={handleSpreadCategory}
                        />
                    </main>
                </div>
            </div>
        </div>
    );
};

export default ProductListed;
