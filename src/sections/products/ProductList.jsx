"use client";

import React, { useEffect, useState } from "react";
import SingleProduct from "./SingleProduct";
import { useRouter } from "next/navigation";
import useGetSize from "@/hooks/singleProduct/useGetSizes";
import { LoadingOverlay } from "@/components/ui/loading-overlay";

const ProductList = ({ productList, categories }) => {
    const router = useRouter();

    const [filteredItems, setFilteredItems] = useState([]);
    const [open, setOpen] = useState(false);

    const { loading: sizeLoading, sizeList } = useGetSize();

    useEffect(() => {
        // Only execute this code on the client
        const url = new URL(window.location.href);
        const searchParams = new URLSearchParams(url.search);

        // Get all `categoryId` values as an array
        const categoryIds = searchParams.getAll("category");

        // // Filter itemsArray to include only items with keys in filteredCategoryIds
        const filtered = categories?.filter((item) =>
            categoryIds.includes(item.key)
        );

        setFilteredItems(filtered);

        // console.log({ filteredItems: filtered, categoryItem, categoryIds });
    }, [categories]);

    // console.log("productList", productList);

    return (
        <LoadingOverlay isLoading={sizeLoading}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 gap-y-4 sm:gap-y-6 md:gap-y-8 lg:gap-y-12">
                {productList?.map((product, index) => {
                    return (
                        <div key={index} className="relative overflow-hidden">
                            <SingleProduct
                                product={product}
                                defaultSizePrice={
                                    sizeLoading ? 0 : sizeList[0]?.price
                                }
                            />
                        </div>
                    );
                })}
            </div>
        </LoadingOverlay>
    );
};

export default ProductList;
