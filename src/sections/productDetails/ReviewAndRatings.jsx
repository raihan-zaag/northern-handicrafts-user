"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/common/components/ui/button";
import PaginationWrapper from "@/common/components/pagination";
import Typography from "@/common/components/Typography";
import Image from "next/image";

// Enhanced mock reviews data with more entries for pagination
const mockReviews = [
  {
    id: 1,
    customerName: "Courtney Henry",
    date: "13 June, 2023",
    rating: 4,
    comment: "I ordered a set of jute bags and the quality exceeded my expectations. The craftsmanship is excellent, and I love that it's eco-friendly. Highly recommended!",
    profileImage: "/images/image_placeholder.png"
  },
  {
    id: 2,
    customerName: "Wade Warren",
    date: "13 June, 2023",
    rating: 4,
    comment: "The combo offer was a great choice. I got different jute products at a very reasonable price. Delivery was on time and packaging was perfect.",
    profileImage: "/images/image_placeholder.png"
  },
  {
    id: 3,
    customerName: "Rafa Leo",
    date: "13 June, 2023",
    rating: 4,
    comment: "I appreciate the effort behind these handmade products. Each piece feels unique and authentic. It's wonderful to support local women artisans through my purchase.",
    profileImage: "/images/image_placeholder.png"
  },
  {
    id: 4,
    customerName: "Sarah Johnson",
    date: "10 June, 2023",
    rating: 5,
    comment: "Absolutely amazing quality! The attention to detail in these handcrafted items is outstanding. Will definitely order again.",
    profileImage: "/images/image_placeholder.png"
  },
  {
    id: 5,
    customerName: "Michael Chen",
    date: "8 June, 2023",
    rating: 3,
    comment: "Good products but delivery took longer than expected. Quality is decent for the price point.",
    profileImage: "/images/image_placeholder.png"
  },
  {
    id: 6,
    customerName: "Emily Davis",
    date: "5 June, 2023",
    rating: 5,
    comment: "Love supporting local artisans! The craftsmanship is exceptional and the materials feel premium.",
    profileImage: "/images/image_placeholder.png"
  },
  {
    id: 7,
    customerName: "David Wilson",
    date: "3 June, 2023",
    rating: 2,
    comment: "Product was okay but not what I expected based on the description. Customer service was helpful though.",
    profileImage: "/images/image_placeholder.png"
  },
  {
    id: 8,
    customerName: "Lisa Anderson",
    date: "1 June, 2023",
    rating: 4,
    comment: "Beautiful handcrafted items. The packaging was excellent and everything arrived in perfect condition.",
    profileImage: "/images/image_placeholder.png"
  }
];

const ReviewAndRatings = ({ productId: _productId }) => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3;

  // Check if there are any reviews available
  const hasReviews = mockReviews && mockReviews.length > 0;

  // If no reviews exist, show empty state
  if (!hasReviews) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Typography.Title3 className="text-lg font-medium text-text-primary mb-2">
          No Reviews Yet
        </Typography.Title3>
        <Typography.Paragraph className="text-text-subtle">
          Be the first to review this product and share your experience with others.
        </Typography.Paragraph>
      </div>
    );
  }

  // Filter reviews based on selected rating
  const filteredReviews = selectedFilter === "All"
    ? mockReviews
    : mockReviews.filter(review => review.rating === selectedFilter);

  // Calculate pagination
  const totalFilteredReviews = filteredReviews.length;
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const endIndex = startIndex + reviewsPerPage;
  const currentReviews = filteredReviews.slice(startIndex, endIndex);

  const ratingFilters = [
    { label: "All", value: "All" },
    { label: "5", value: 5 },
    { label: "4", value: 4 },
    { label: "3", value: 3 },
    { label: "2", value: 2 },
    { label: "1", value: 1 }
  ];

  const handleFilterChange = (value) => {
    setSelectedFilter(value);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handlePagination = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Filter Section */}
      <div className="flex flex-col gap-2">
        <Typography.Title3 className="text-base font-medium text-text-primary">
          Filter
        </Typography.Title3>

        <div className="flex flex-wrap gap-3">
          {ratingFilters.map((filter) => (
            <Button
              key={filter.value}
              variant="outline"
              size="sm"
              className={`flex items-center gap-1 h-9 px-4 rounded ${selectedFilter === filter.value
                ? "border-primary border-2"
                : "border-2 border-border text-text-secondary hover:border-border-strong"
                }`}
              onClick={() => handleFilterChange(filter.value)}
            >
              <span className="text-base font-normal">{filter.label}</span>
              {filter.value !== "All" && (
                <Star className="w-3 h-3 fill-orange-500 text-orange-500" />
              )}
            </Button>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="flex flex-col">
        {currentReviews.length > 0 ? (
          currentReviews.map((review, index) => (
            <div key={review.id}>
              <ReviewCard review={review} />
              {index < currentReviews.length - 1 && (
                <div className="border-b border-border my-4" />
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <Typography.Paragraph className="text-text-subtle">
              No reviews found for the selected rating.
            </Typography.Paragraph>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredReviews.length > reviewsPerPage && (
        <div className="flex justify-center">
          <PaginationWrapper
            pageSize={totalFilteredReviews}
            handlePagination={handlePagination}
            current={currentPage}
          />
        </div>
      )}
    </div>
  );
};

const ReviewCard = ({ review }) => {
  return (
    <div className="flex gap-4.5 items-start">
      {/* Profile Image */}
      <div className="flex-shrink-0">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <Image
            src={review.profileImage}
            alt={review.customerName}
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
      </div>

      {/* Review Content */}
      <div className="flex-1 space-y-1">
        {/* Header - Name, Date, and Rating in one row */}
        <div className="flex flex-col gap-1">
          <div className="">
            <Typography.BodyText className="font-medium text-text-primary text-sm">
              {review.customerName}
            </Typography.BodyText>
            <Typography.SmallText className="text-text-secondary text-sm">
              {review.date}
            </Typography.SmallText>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={`w-3 h-3 ${index < review.rating
                      ? "fill-orange-500 text-orange-500"
                      : "fill-none text-orange-300"
                      }`}
                  />
                ))}
              </div>
              <Typography.SmallText className="font-normal text-text-primary text-sm">
                {review.rating}.0
              </Typography.SmallText>
            </div>
          </div>
        </div>

        {/* Comment */}
        <div className="pt-2">
          <Typography.Description className="text-text-secondary text-sm leading-relaxed">
            {review.comment}
          </Typography.Description>
        </div>
      </div>
    </div>
  );
};

export default ReviewAndRatings;
