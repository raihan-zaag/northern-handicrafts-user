"use client";

import React, { useState } from "react";
import useGetProductReviews from "@/hooks/singleProduct/useGetProductReviews";
import { ratingData } from "@/utils/dummyData";
import { StarRating } from "@/components/ui/star-rating";
import { Separator } from "@/components/ui/separator";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import NoCommentDataFound from "./NoCommentDataFound";
import Image from "next/image";
import useGetTotalRatingAverage from "@/hooks/singleProduct/useGetTotalRatingAverage";
import Icons from "../../../public/icons";

const ReviewAndRatings = ({ productId }) => {
  const { reviews, loading } = useGetProductReviews(productId);
  const { loading: ratingCountLoading, averageRatingValue } =
    useGetTotalRatingAverage(productId);

  const rating = reviews;

  // make rating object for all values like, 1 start, 2 start 3 start and so on....
  const mergedRatings = Array.from(
    new Map(
      [
        { rating: 1, count: 0 },
        { rating: 2, count: 0 },
        { rating: 3, count: 0 },
        { rating: 4, count: 0 },
        { rating: 5, count: 0 },
        ...(averageRatingValue || []).map(({ rating, count }) => ({
          rating,
          count: parseInt(count, 10) || 0,
        })),
      ].map((obj) => [obj.rating, obj])
    ).values()
  );

  // Calculate the total number of reviewers
  const totalReviewers = mergedRatings?.reduce(
    (acc, curr) => acc + curr.count,
    0
  );

  // Calculate the sum of (Rating * Number of Reviewers for that Rating)
  const sumOfWeightedRatings = mergedRatings?.reduce(
    (acc, curr) => acc + curr.rating * curr.count,
    0
  );

  // Calculate the average rating value
  const averageRating =
    totalReviewers > 0
      ? (sumOfWeightedRatings / totalReviewers).toFixed(1)
      : "0.0"; // Default to "0.0" if no reviewers

  // Calculate the divWidth for each item in ratings
  const ratingsWithDivWidth = mergedRatings?.map((item) => ({
    ...item,
    divWidth: rating ? (item.count / totalReviewers) * 100 : 0,
  }));

  return (
    <LoadingOverlay isLoading={loading || ratingCountLoading}>
      <div className="flex flex-col lg:flex-row w-full justify-between gap-x-6">
        <div className="order-2 lg:order-1">
          <LeftSideContent ratings={mergedRatings} data={rating} />
        </div>
        <div className="order-1 lg:order-2">
          <RightSidecontent
            ratingsWithDivWidth={ratingsWithDivWidth}
            rating={mergedRatings}
            averageRating={averageRating || 0}
            totalReviewers={totalReviewers}
          />
        </div>
      </div>
    </LoadingOverlay>
  );
};

export default ReviewAndRatings;

const LeftSideContent = ({ ratings, data }) => {
  const [selectedRating, setSelectedRating] = useState("All");

  const [filteredData, setFilteredData] = useState(data);

  const handleSelection = (value) => {
    setSelectedRating(value);
    if (value === "All") {
      setFilteredData(data);
    } else {
      const newArray = data.filter((item) => item.rating === value);
      setFilteredData(newArray);
    }
  };

  return (
    <>
      <div className="space-y-2 ml-0 sm:ml-8 md:ml-12">
        <h1 className="text-primary text-sm font-semibold">Filter</h1>
        <div className="flex gap-x-2 md:gap-x-2.5">
          <button
            onClick={() => handleSelection("All")}
            className={`w-[46px] md:w-[49px] h-[28px] md:h-[30px] flex justify-center items-center py-1.5 px-3  rounded-sm text-sm duration-300 ${
              selectedRating === "All"
                ? "border-[2px] border-neutral-700 font-bold text-neutral-700"
                : "border-[2px] border-neutral-30 text-[#6A6A6A] font-medium"
            }`}
          >
            All
          </button>
          <div className="flex gap-x-2 md:gap-x-2.5">
            {ratings.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelection(item.rating)}
                className={`w-[46px] md:w-[49px] h-[28px] md:h-[30px] flex justify-center items-center py-1.5 px-4 rounded-sm ${
                  selectedRating === item.rating
                    ? "border-[2px] border-black font-bold text-neutral-700 rounded-sm"
                    : "border-[2px] border-neutral-30 font-medium text-neutral-300"
                }`}
              >
                <div className="flex justify-center items-center gap-x-2">
                  <p className=" text-sm font-medium text-neutral-700 text-opacity-80">
                    {item.rating}
                  </p>

                  <Image
                    alt="star-icon"
                    src={Icons.rating}
                    className="w-3 h-3"
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
        <div className="pt-7 md:pt-6">
          <Comments data={filteredData} />
        </div>
      </div>
    </>
  );
};

const Comments = ({ data }) => {
  const formatDate = (timestamp) => {
    const date = new Date(Number(timestamp));
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div className="animate-fadeIn w-full ">
      {data?.length > 0 ? (
        data?.map((item) => (
          <div className="flex flex-col py-4 border-b">
            <div key={item.id} className="w-full flex gap-x-3 md:gap-x-4">
              <Image
                alt={item.name}
                width={1000}
                height={1000}
                src={
                  item?.customer?.profilePicture
                    ? `${item?.customer?.profilePicture}`
                    : `/images/image_placeholder.png`
                }
                className="w-10 h-10 md:w-10 md:h-10 rounded-full"
              />

              <div className="w-full lg:w-[500px] xl:w-[642px]">
                <div className="flex flex-col justify-between items-start">
                  <h1 className="text-primary text-sm font-semibold">
                    {item?.customer?.fullName}
                  </h1>
                  <p className="text-[#4a4a4a] text-[13px]">
                    {formatDate(item?.createdAt)}
                  </p>
                </div>

                <div className="pt-1 flex items-center gap-x-2 md:gap-x-2.5">
                  <StarRating
                    value={item?.rating}
                    disabled
                    size="w-3 h-3"
                  />
                  <p className="text-primary text-sm font-medium">
                    {item.rating}
                  </p>
                </div>

                <p className="text-[#4a4a4a] text-sm leading-[16.5px] md:leading-[21px]">
                  {item.comment}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <NoCommentDataFound
          message="No Reviews Yet!"
          className="w-full lg:w-[500px] xl:w-[600px] 2xl:w-[1000px] text-red-400 bg-red-100"
        />
      )}
    </div>
  );
};

const RightSidecontent = ({
  ratingsWithDivWidth,
  rating,
  averageRating,
  totalReviewers,
}) => {
  return (
    <div className="animate-fadeIn flex flex-row justify-between md:justify-start items-center md:flex-col md:gap-y-4 md:mt-7">
      <div className="flex flex-col gap-y-4 w-full">
        <div className="mx-2 flex flex-col items-center w-full gap-0">
          <div className="flex items-end">
            <h1 className="text-black text-[32px] font-medium">
              {averageRating}
            </h1>
            <span className="text-font_color_one text-xl font-normal mb-1.5 ml-1">
              /
            </span>
            <p className="text-font_color_one text-xl font-normal mb-1.5 ml-1">
              5.0
            </p>
          </div>

          <div className="md:hidden">
            <StarRating
              value={rating?.average || 5}
              disabled
              allowHalf
              size="w-3 h-3"
            />
          </div>
          <div className="hidden md:block">
            <StarRating
              value={rating?.average || 5.0}
              disabled
              allowHalf
              size="w-3 h-3"
            />
          </div>
          <p className="text-font_color_one text-base font-normal">
            <span className="font-semibold text-primary">{totalReviewers}</span>{" "}
            reviews
          </p>
        </div>

        <div className="flex flex-col gap-y-2 md:gap-y-2 pb-10">
          {ratingsWithDivWidth?.map((item) => (
            <div key={item.id} className="flex items-center px-5 gap-x-">
              <StarRating
                value={1}
                disabled
                max={1}
                size="w-3 h-3"
              />
              <p className="text-font_color_one text-sm font-semibold pl-2 ">
                {item.rating}
              </p>
              <div className="w-full lg:w-[300px] h-1 bg-white rounded mx-3 md:mx-4">
                {item?.divWidth > 0 ? (
                  <div className="w-full bg-[#E5E7EB] rounded">
                    <div
                      style={{
                        width: `${item.divWidth}%`, // Set the width based on the divWidth field
                      }}
                      className={`h-1 bg-[#F08200] rounded`}
                    />
                  </div>
                ) : (
                  <div
                    style={{
                      width: `${100}%`, // Set the width based on the divWidth field
                    }}
                    className={`h-1 bg-[#E5E7EB] w-full rounded`}
                  />
                )}
              </div>
              <p className="text-black-1000 text-sm font-semibold">
                {item.count}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
