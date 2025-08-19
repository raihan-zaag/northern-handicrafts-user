"use client";

import React, { useState } from "react";
import LoadMoreProduct from "./LoadMoreProduct";
import Filter from "./Filter";
import { Spinner } from "@/components/ui/spinner";

const HomePageComponent = ({ product, pageSize }) => {
    const [categories, setCategories] = useState([]);
    const [priceFilter, setPriceFilter] = useState([0, 9999]);
    // Local loading state just for showing a spinner when filters change.
    const [isFiltering, setIsFiltering] = useState(false);

    const handleSpreadCategory = (categories) => {
        setCategories(categories);
    };

    return (
        <div className="relative">
            {isFiltering && (
                <div className="absolute inset-0 grid place-items-center bg-background/40 z-10">
                    <div className="flex items-center gap-2 text-sm text-foreground">
                        <Spinner className="text-primary" />
                        <span>Applying filter...</span>
                    </div>
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 w-full">
                {/* Sidebar - Hidden on smaller screens */}

                <div className="hidden md:block md:col-span-3 sticky top-5 self-start max-w-200px">
                    {/* need to add suspense */}

                    <Filter
                        categoryList={handleSpreadCategory}
                        setPriceFilter={setPriceFilter}
                        priceFilter={priceFilter}
                        isFiltering={isFiltering}
                        setIsFiltering={setIsFiltering}
                    />
                </div>

                {/* Main Content */}
                <div className="col-span-1 md:col-span-9 w-full">
                    {/* Need to add suspense */}

                    <LoadMoreProduct
                        productList={product}
                        categoryList={categories}
                        totalPages={pageSize}
                        handleSpreadCategory={handleSpreadCategory}
                        setPriceFilter={setPriceFilter}
                        priceFilter={priceFilter}
                    />
                </div>
            </div>
        </div>
    );
};

export default HomePageComponent;
