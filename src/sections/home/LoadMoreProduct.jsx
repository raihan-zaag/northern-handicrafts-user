"use client";

import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import ProductList from "./ProductList";
import { getProductFilterList } from "@/common/services/productService";
import { useRouter, useSearchParams } from "next/navigation";
import ProductCardSkeleton from "@/skeleton/ProductCardSkeleton";
import { MdFilterAlt } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Filter from "./Filter";
import { CgClose } from "react-icons/cg";

const LoadMoreProduct = ({
    productList,
    categoryList,
    totalPages,
    handleSpreadCategory,
    setPriceFilter,
    priceFilter,
}) => {
    const router = useRouter();

    const [params, setParams] = useState({});
    const [product, setProduct] = useState(productList || []);
    const [page, setPage] = useState(1);

    const [pageLimit, setPageLimit] = useState(5);
    const [loading, setLoading] = useState(false);
    const [totalPage, setTotalPage] = useState(totalPages);
    const [filteredItems, setFilteredItems] = useState([]);
    const [hasPrice, setHasPrice] = useState(false);

    const [openFilterDrawer, setOpenFilterDrawer] = useState(false);

    const searchParams = useSearchParams();
    const { ref, inView } = useInView();

    useEffect(() => {
        setProduct(productList);
        setTotalPage(totalPages);
        setPage(1);
        return () => {
            setProduct([]);
        };
    }, [productList]);

    useEffect(() => {
        // Get all existing page params
        const sortBy = searchParams.get("sortBy");
        const categoryIds = searchParams.getAll("category");
        const priceFrom = searchParams.getAll("priceFrom");
        const priceTo = searchParams.getAll("priceTo");
        const name = searchParams.get("name");

        setParams({
            name: name,
            sortBy: sortBy || null,
            category:
                categoryIds.length > 1 ? categoryIds : categoryIds[0] || null,
            page: page,
            size: pageLimit,
            ...(priceFrom[0] && { priceFrom: Number(priceFrom[0]) }),
            ...(priceTo[0] && { priceTo: Number(priceTo[0]) }),
        });

        if (priceTo[0] || priceFrom[1]) {
            setHasPrice(true);
        }
    }, [searchParams, pageLimit]);

    useEffect(() => {
        // Only execute this code on the client
        const url = new URL(window.location.href);
        const searchParams = new URLSearchParams(url.search);

        // Get all `categoryId` values as an array
        const categoryIds = searchParams.getAll("category");

        // Filter itemsArray to include only items with keys in filteredCategoryIds
        const filtered = categoryList?.filter((item) =>
            categoryIds.includes(item.key)
        );
        setFilteredItems(filtered);

        // console.log({ filteredItems, categoryList, categoryIds });
    }, [categoryList, searchParams]);

    // Remove a single filter from URL and state
    const handleRemoveFilter = (key) => {
        const url = new URL(window.location.href);
        const searchParams = new URLSearchParams(url.search);

        searchParams.delete("category"); // Clear all categoryId params
        filteredItems
            .filter((item) => item.key !== key) // Keep only the items that aren't being removed
            .forEach((item) => searchParams.append("category", item.key)); // Re-add remaining category IDs

        router.push(`/?${searchParams.toString()}`, undefined, {
            shallow: true,
        });
        setFilteredItems((prev) => prev.filter((item) => item.key !== key)); // Update state
    };

    // Clear all filters from URL and state
    const handleClearAllFilters = () => {
        const url = new URL(window.location.href);
        const searchParams = new URLSearchParams(url.search);

        // Remove all category filters from the URL
        searchParams.delete("category");
        searchParams.set("sortBy", "RECOMMENDED");
        searchParams.delete("priceFrom");
        searchParams.delete("priceTo");
        setPriceFilter([0, 9999]);
        setHasPrice(false);

        router.push(`/?${searchParams.toString()}`, undefined, {
            shallow: true,
        });
        setFilteredItems([]); // Clear all filters from state
    };

    const loadMoreProducts = async () => {
        setLoading(true);

        // Update params with the current page value
        const currentParams = { ...params, page };

        const response = await getProductFilterList(currentParams);

        if (response?.status === 200) {
            const newProduct = response?.data?.content;
            setProduct((prev) => {
                // Filter out any products that are already in the current state
                const filteredNewProduct = newProduct.filter(
                    (newItem) =>
                        !prev.some((prevItem) => prevItem.id === newItem.id)
                );
                return [...prev, ...filteredNewProduct];
            });
            // setTotalPage(response?.data?.totalPages);
        }

        setLoading(false);
    };

    useEffect(() => {
        if (inView && page <= totalPages) {
            loadMoreProducts();
            setPage((prevPage) => prevPage + 1); // Increment the page count after loading more products
        }
    }, [inView, totalPages]);

    const resetPriceFilter = () => {
        const url = new URL(window.location.href);
        const searchParams = new URLSearchParams(url.search);

        // Remove priceFrom and priceTo params
        searchParams.delete("priceFrom");
        searchParams.delete("priceTo");

        // Update the priceFilter state to its default values
        setPriceFilter([0, 9999]);
        setHasPrice(false);

        // Push the updated URL with modified search params
        router.push(`/?${searchParams.toString()}`, undefined, {
            shallow: true,
        });
    };

    const resetRecommended = () => {
        const url = new URL(window.location.href);
        const searchParams = new URLSearchParams(url.search);

        // Remove priceFrom and priceTo params
        searchParams.set("sortBy", "RECOMMENDED");

        // Push the updated URL with modified search params
        router.push(`/?${searchParams.toString()}`, undefined, {
            shallow: true,
        });
    };

    const sortByItems = [
        { key: "RECOMMENDED", label: "Recommended" },
        { key: "LOW_TO_HIGH", label: "Price (Low to high)" },
        { key: "HIGH_TO_LOW", label: "Price (High to low)" },
        { key: "NEWEST", label: "Newest" },
        { key: "A_Z", label: "Name (A-Z)" },
        { key: "Z_A", label: "Name (Z-A)" },
    ];

    // Get the sortBy value from the query params
    const sortByKey = searchParams.get("sortBy");

    // Find the corresponding label from the sortByItems
    const sortByLabel =
        sortByItems.find((item) => item.key === sortByKey)?.label ||
        "Recommended"; // Default to "Recommended" if no match

    // console.log("product", product);

    return (
        <div>
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-start lg:items-center justify-between mb-6">
                <div
                    className={`${
                        filteredItems ? "flex flex-row" : "hidden"
                    } items-start justify-between w-full`}
                >
                    <div className="flex flex-row flex-wrap items-center gap-4 ">
                        {filteredItems?.map((category, index) => {
                            return (
                                <div
                                    key={index}
                                    className="border border-[#8A8A8A] p-[10px] flex gap-2 items-center"
                                >
                                    <p className="text-primary text-sm">
                                        {category.label}
                                    </p>
                                    <IoClose
                                        className="text-primary h-5 w-5 cursor-pointer"
                                        onClick={() =>
                                            handleRemoveFilter(category.key)
                                        }
                                    />
                                </div>
                            );
                        })}

                        {searchParams.get("sortBy") !== "RECOMMENDED" ? (
                            <>
                                <div className="border border-[#8A8A8A] p-[10px] flex gap-2 items-center">
                                    <p className="text-primary text-sm">
                                        {/* {searchParams.get("sortBy")} */}
                                        {sortByLabel}
                                    </p>
                                    <IoClose
                                        className="text-primary h-5 w-5 cursor-pointer"
                                        onClick={resetRecommended}
                                    />
                                </div>
                            </>
                        ) : null}

                        {hasPrice ? (
                            <>
                                <div className="border border-[#8A8A8A] p-[10px] flex gap-2 items-center">
                                    <p className="text-primary text-sm">
                                        Price ({priceFilter[0]}-{priceFilter[1]}
                                        )
                                    </p>
                                    <IoClose
                                        className="text-primary h-5 w-5 cursor-pointer"
                                        onClick={resetPriceFilter}
                                    />
                                </div>
                            </>
                        ) : null}

                        {filteredItems?.length ||
                        (hasPrice && searchParams.get("sortBy")) ? (
                            <div
                                className="p-[10px] flex gap-2 items-center cursor-pointer"
                                onClick={handleClearAllFilters}
                            >
                                <p className="text-primary text-sm cursor-pointer underline">
                                    Clear All
                                </p>
                            </div>
                        ) : null}
                    </div>

                    <div
                        className="md:hidden border p-2 border-primary w- ml-auto flex items-center justify-center"
                        onClick={() => {
                            setOpenFilterDrawer(true);
                        }}
                    >
                        <MdFilterAlt className=" h-5 w-5 text-primary" />
                        <p className="text-primary">Filter</p>
                    </div>
                </div>
                <p className="text-primary font-medium text-sm md:text-base whitespace-nowrap ml-auto">
                    {product?.length} Products
                </p>
            </div>

            <ProductList productList={product} categories={categoryList} />

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
            </div>

            <Sheet open={openFilterDrawer} onOpenChange={(open) => setOpenFilterDrawer(open)}>
                <SheetContent side="left" className="w-[400px] sm:w-[540px]">
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
                            setPriceFilter={setPriceFilter}
                            priceFilter={priceFilter}
                        />
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default LoadMoreProduct;
