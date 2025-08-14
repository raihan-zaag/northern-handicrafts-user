"use client";

import React, { useEffect, useState } from "react";
import Typography from "@/components/Typography/component.typography";
import useGetCategories from "@/hooks/categories/useGetCategories";
import { Checkbox, Collapse, Divider, Menu, Radio, Slider, Spin } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { HiPlus, HiMinus } from "react-icons/hi";

const Filter = ({
    isSmallScreen = false,
    categoryList,
    setPriceFilter,
    priceFilter,
    isFiltering,
    setIsFiltering,
}) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { categories, loading } = useGetCategories();

    const [checkedItems, setCheckedItems] = useState([]);
    const [selectedRadio, setSelectedRadio] = useState("RECOMMENDED");
    // Local state to track slider value changes while dragging
    const [localRangeValue, setLocalRangeValue] = useState(priceFilter);

    const categoryMap =
        categories &&
        categories?.content?.map((item) => {
            return { key: item?.id, label: item?.name };
        });

    useEffect(() => {
        categoryList(categoryMap);
    }, [loading]);

    // Initialize checkedItems and selectedRadio from URL parameters
    useEffect(() => {
        const categoryIds = searchParams.getAll("category");
        setCheckedItems(categoryIds); // Set initial checked categories

        const sortBy = searchParams.get("sortBy");
        if (sortBy) {
            setSelectedRadio(sortBy); // Set initial selected radio option
        }

        const updatedSearchParams = new URLSearchParams(router.query);

        // console.log(
        //   updatedSearchParams.get("priceFrom"),
        //   updatedSearchParams.get("priceTo")
        // );

        // if (
        //   !updatedSearchParams.get("priceFrom") ||
        //   !updatedSearchParams.get("priceTo")
        // ) {
        //   // setPriceFilter([0, 9999]);

        //   console.log({ priceFilter });
        // }

        if (priceFilter?.length !== 0) {
            updatedSearchParams.set("priceFrom", priceFilter[0]);
            updatedSearchParams.set("priceTo", priceFilter[1]);
        }
    }, [searchParams]);

    // handle change checkbox value
    const handleCheckboxChange = (key, e) => {
        const isChecked = e.target.checked;

        setCheckedItems((prev) => {
            let newCheckedItems;
            if (isChecked) {
                // Add the checked item
                newCheckedItems = [...prev, key];
            } else {
                // Remove the unchecked item
                newCheckedItems = prev.filter((item) => item !== key);
            }

            // Update the URL parameters based on all checked items
            const updatedSearchParams = new URLSearchParams(router.query);
            updatedSearchParams.delete("category");
            newCheckedItems.forEach((item) => {
                updatedSearchParams.append("category", item);
            });

            // Preserve the selected radio item in URL params
            if (selectedRadio) {
                updatedSearchParams.set("sortBy", selectedRadio);
            }

            const priceFrom = parseInt(searchParams.get("priceFrom"), 10);
            const priceTo = parseInt(searchParams.get("priceTo"), 10);

            // console.log(priceFrom, priceTo);

            if (priceFrom || priceTo) {
                updatedSearchParams.set("priceFrom", priceFrom);
                updatedSearchParams.set("priceTo", priceTo);
            }

            // if (priceFilter?.length !== 0) {
            //   updatedSearchParams.set("priceFrom", priceFilter[0]);
            //   updatedSearchParams.set("priceTo", priceFilter[1]);
            // }

            // Update the URL
            // Show spinner
            setIsFiltering(true);
            router.push(`/?${updatedSearchParams.toString()}`);

            // Simulate finishing loading after 1 second
            setTimeout(() => {
                setIsFiltering(false);
            }, 1000);

            return newCheckedItems;
        });
    };

    // Radio change handler
    const handleRadioChange = (e) => {
        const newSelectedRadio = e.target.value;
        setSelectedRadio(newSelectedRadio);

        // Update the URL parameters with the new radio selection
        const updatedSearchParams = new URLSearchParams(router.query);
        updatedSearchParams.set("sortBy", newSelectedRadio);

        const sortByParam = updatedSearchParams.get("sortBy");

        // Add each checked item to the params if it exists
        checkedItems.forEach((item) => {
            updatedSearchParams.append("category", item);
        });

        const priceFrom = updatedSearchParams.get("priceFrom");
        const priceTo = updatedSearchParams.get("priceTo");

        if (priceFrom || priceTo) {
            updatedSearchParams.set("priceFrom", priceFrom);
            updatedSearchParams.set("priceTo", priceTo);
        }

        // Update the URL
        // Show spinner
        setIsFiltering(true);
        router.push(`/?${updatedSearchParams.toString()}`);

        // Simulate finishing loading
        setTimeout(() => {
            setIsFiltering(false);
        }, 1000);
    };

    const sortByItems = [
        { key: "RECOMMENDED", label: "Recommended" },
        { key: "LOW_TO_HIGH", label: "Price (Low to high)" },
        { key: "HIGH_TO_LOW", label: "Price (High to low)" },
        { key: "NEWEST", label: "Newest" },
        { key: "A_Z", label: "Name (A-Z)" },
        { key: "Z_A", label: "Name (Z-A)" },
    ];

    const onChangeComplete = (value) => {
        setPriceFilter([value[0], value[1]]);

        // Update the URL parameters with the new radio selection
        const updatedSearchParams = new URLSearchParams(router.query);

        // Preserve the existing 'sortBy' parameter if it exists
        const sortByParam = updatedSearchParams.get("sortBy");

        updatedSearchParams.set("priceFrom", value[0]);
        updatedSearchParams.set("priceTo", value[1]);

        // If 'sortBy' exists, retain it in the URL
        if (selectedRadio) {
            updatedSearchParams.set("sortBy", selectedRadio);
        }

        // Add each checked item to the params if it exists
        checkedItems.forEach((item) => {
            updatedSearchParams.append("category", item);
        });

        // Update the URL
        router.push(`/?${updatedSearchParams.toString()}`);
    };

    useEffect(() => {
        // If the initial priceFilter changes from outside,
        // also update local slider value
        setLocalRangeValue(priceFilter);
    }, [priceFilter]);

    // Called continuously while slider is being dragged
    const handleSliderChange = (value) => {
        setLocalRangeValue(value);
    };

    // Called once user finishes dragging the slider handle
    const handleSliderAfterChange = (value) => {
        // Update the main filter state (if needed)
        setPriceFilter(value);

        // Then update the URL parameters
        const updatedSearchParams = new URLSearchParams(router.query);

        // Example: preserve existing 'sortBy'
        const sortByParam = updatedSearchParams.get("sortBy");
        if (sortByParam) {
            updatedSearchParams.set("sortBy", sortByParam);
        }

        // Add price range
        updatedSearchParams.set("priceFrom", value[0]);
        updatedSearchParams.set("priceTo", value[1]);

        // Preserve previously checked categories if you have them
        // (This snippet may vary based on your logic)
        const categoryIds = searchParams.getAll("category") || [];
        updatedSearchParams.delete("category");
        categoryIds.forEach((id) => {
            updatedSearchParams.append("category", id);
        });

        // Finally, push to the router
        // Show spinner
        setIsFiltering(true);
        router.push(`/?${updatedSearchParams.toString()}`);

        // Simulate finishing loading
        setTimeout(() => {
            setIsFiltering(false);
        }, 1000);
    };

    const items = [
        {
            key: "1",
            label: (
                <p
                    className={`font-semibold text-base text-[#2A2A2A] whitespace-nowrap ${
                        isSmallScreen ? "pl-6" : "pl-0"
                    }`}
                >{`Categories (${checkedItems.length})`}</p>
            ),
            children: (
                <>
                    <Menu
                        mode="inline"
                        style={{
                            border: "none",
                            padding: `${
                                isSmallScreen ? "0px 0px 0px 24px" : "0px"
                            }`,
                            margin: 0,
                        }}
                    >
                        {loading ? (
                            <div
                                className="animate-pulse"
                                style={{
                                    border: "none",
                                    padding: "0px 0px 0px 0px",
                                    margin: "0px",
                                }}
                            >
                                <div className="border-none p-0 m-0 bg-transparent h-7 flex">
                                    <div className="bg-gray-200 rounded-full h-4 w-4 inline-block"></div>
                                    <div className="bg-gray-200 rounded h-4 w-full inline-block ml-2"></div>
                                </div>
                                <div className="border-none p-0 m-0 bg-transparent h-7 flex">
                                    <div className="bg-gray-200 rounded-full h-4 w-4 inline-block"></div>
                                    <div className="bg-gray-200 rounded h-4 w-full inline-block ml-2"></div>
                                </div>
                                <div className="border-none p-0 m-0 bg-transparent h-7 flex">
                                    <div className="bg-gray-200 rounded-full h-4 w-4 inline-block"></div>
                                    <div className="bg-gray-200 rounded h-4 w-full inline-block ml-2"></div>
                                </div>
                                <div className="border-none p-0 m-0 bg-transparent h-7 flex">
                                    <div className="bg-gray-200 rounded-full h-4 w-4 inline-block"></div>
                                    <div className="bg-gray-200 rounded h-4 w-full inline-block ml-2"></div>
                                </div>
                                <div className="border-none p-0 m-0 bg-transparent h-7 flex">
                                    <div className="bg-gray-200 rounded-full h-4 w-4 inline-block"></div>
                                    <div className="bg-gray-200 rounded h-4 w-full inline-block ml-2"></div>
                                </div>
                                <div className="border-none p-0 m-0 bg-transparent h-7 flex">
                                    <div className="bg-gray-200 rounded-full h-4 w-4 inline-block"></div>
                                    <div className="bg-gray-200 rounded h-4 w-full inline-block ml-2"></div>
                                </div>
                            </div>
                        ) : (
                            categoryMap?.map((item, index) => (
                                <Menu.Item
                                    key={index}
                                    style={{
                                        border: "none",
                                        padding: 0,
                                        margin: 0,
                                        background: "transparent",
                                        height: "30px",
                                    }}
                                >
                                    <Checkbox
                                        onChange={(e) =>
                                            handleCheckboxChange(item.key, e)
                                        }
                                        checked={checkedItems.includes(
                                            item.key
                                        )}
                                        style={{
                                            color: checkedItems.includes(
                                                item.key
                                            )
                                                ? "#2a2a2a"
                                                : "#4A4A4A",
                                            fontWeight: checkedItems.includes(
                                                item.key
                                            )
                                                ? 600
                                                : 500,
                                        }}
                                    >
                                        {item.label}
                                    </Checkbox>
                                </Menu.Item>
                            ))
                        )}
                    </Menu>
                    {/* <Divider
            style={{ padding: "0px 0px 0px 0px", margin: "10px 0px 0px 0px" }}
          /> */}
                    <div className="h-0.5 bg-[#E0E0E0] my-3"></div>
                </>
            ),
        },
        {
            key: "2",
            label: (
                <p
                    className={`font-semibold text-base text-[#2A2A2A] ${
                        isSmallScreen ? "ml-6" : ""
                    }`}
                >
                    Sort By
                </p>
            ),
            children: (
                <div>
                    <Menu
                        mode="inline"
                        style={{
                            border: "none",
                            padding: `${isSmallScreen ? "0 0 0 24px" : "0px"}`,
                            margin: 0,
                            // backgroundColor: "#fff",
                        }}
                    >
                        <Radio.Group
                            onChange={handleRadioChange}
                            value={selectedRadio}
                        >
                            {sortByItems.map((item, index) => (
                                <Menu.Item
                                    key={index}
                                    style={{
                                        border: "none",
                                        padding: 0,
                                        margin: 0,
                                        background: "transparent",
                                        height: "30px",
                                    }}
                                >
                                    <Radio
                                        value={item.key}
                                        style={{
                                            color:
                                                selectedRadio === item.key
                                                    ? "#000"
                                                    : "#2A2A2A",
                                        }}
                                        className={`${
                                            selectedRadio === item.key
                                                ? "#000 font-semibold"
                                                : "#2A2A2A"
                                        }`}
                                    >
                                        {item.label}
                                    </Radio>
                                </Menu.Item>
                            ))}
                        </Radio.Group>
                    </Menu>
                    {/* <Divider
            style={{
              padding: "0px 0px 0px 0px",
              margin: "10px 0px 0px 0px",
              backgroundColor: "red",
            }}
          /> */}
                    <div className="h-0.5 bg-[#E0E0E0] my-3"></div>
                </div>
            ),
        },
        {
            key: "3",
            label: (
                <p
                    className={`font-semibold text-base text-[#2A2A2A] ${
                        isSmallScreen ? "ml-6" : ""
                    }`}
                >
                    Price
                </p>
            ),
            children: (
                <div>
                    <Slider
                        range
                        step={1}
                        // defaultValue={priceFilter}
                        value={localRangeValue}
                        // onChangeComplete={onChangeComplete}
                        onChange={handleSliderChange} // track slider movement
                        onChangeComplete={handleSliderAfterChange} // single update when done
                        min={0}
                        max={400}
                        arrow={false}
                    />

                    <div className="flex items-center justify-between">
                        <p>Min</p>
                        <p>Max</p>
                    </div>
                </div>
            ),
        },
    ];

    return (
        <div>
            <div className="pb-4">
                <Typography.Title3 weight="bold" className={"md:text-xl"}>
                    Filter
                </Typography.Title3>
            </div>

            <Divider style={{ padding: 0, margin: 0 }} />

            <div className="">
                <Collapse
                    defaultActiveKey={["1", "2", "3"]}
                    className="border-none"
                    style={{
                        border: "none",
                        padding: 0,
                        whiteSpaceCollapse: "none",
                    }}
                    expandIconPosition={"end"}
                    ghost
                    items={items}
                    bordered={true}
                    expandIcon={({ isActive }) => {
                        return isActive ? (
                            <>
                                <HiMinus />
                            </>
                        ) : (
                            <>
                                <HiPlus />
                            </>
                        );
                    }}
                ></Collapse>
            </div>
        </div>
    );
};

export default Filter;
