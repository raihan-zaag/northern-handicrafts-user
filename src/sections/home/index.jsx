"use client";

import React, { useState } from "react";
import Filter from "./filter";
import LoadMoreProduct from "./loadMoreProduct";
import { Spin } from "antd";

const HomePageComponent = ({ product, pageSize }) => {
    const [categories, setCategories] = useState([]);
    const [priceFilter, setPriceFilter] = useState([0, 9999]);
    // Local loading state just for showing a spinner when filters change.
    const [isFiltering, setIsFiltering] = useState(false);

    const handleSpreadCategory = (categories) => {
        setCategories(categories);
    };

    return (
        <Spin spinning={isFiltering} tip="Applying filter...">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 w-full">
                {/* Sidebar - Hidden on smaller screens */}

                <div className="hidden md:block md:col-span-3 sticky top-5 self-start max-w-[200px]">
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
        </Spin>
    );
};

export default HomePageComponent;
