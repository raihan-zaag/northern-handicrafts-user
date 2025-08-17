"use client";

import { Form } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { IMAGE_BASE_URL } from "@/constants/apiUrls";
import Button from "../common/Button";
import RatingBtn from "../common/RatingBtn";
import Icons from "../../../public/icons";

const ProductReviewForm = ({
  submit,
  productName,
  image,
  data,
  closeModal,
}) => {
  const [form] = Form.useForm();
  const [selectedRating, setSelectedRating] = useState(5);
  const [isRatingEmpty, setIsRatingEmpty] = useState(false);

  const handleRating = (value) => {
    setSelectedRating(value);
    setIsRatingEmpty(false);
  };

  const onFinish = (values) => {
    const _data = {
      ...values,
      rating: selectedRating,
    };

    submit(_data);
  };

  const onFinishFailed = (errorInfo) => {
    if (selectedRating === null) {
      setIsRatingEmpty(true);
    } else {
      setIsRatingEmpty(false);
    }
  };

  return (
    <div>
      <Form
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        form={form}
      >
        <div className=" px-[30px] pt-8">
          <div className="flex flex-col items-center">
            <Image
              alt="avatar"
              // src={image ? image : ""}
              // src={`${IMAGE_BASE_URL}/${image}`}
              src={`${image}`}
              width={1000}
              height={1000}
              className="h-[120px] w-[120px]"
            />
            {productName && (
              <p className="text-brand-blue-800 text-base font-medium mt-4">
                {productName}
              </p>
            )}
            {/* {category && (
              <div className="text-neutral-300 text-[13px] font-medium ">
                {category}
              </div>
            )} */}
          </div>

          <div className="mt-8">
            <p className="text-primary text-sm font-medium">Rating</p>
            <div className="text-[#6E6E6E] text-sm font-medium">
              Give your rating by taping the stars
            </div>

            <div className="flex gap-x-[10px] mt-5">
              {Array.from({ length: 5 }, (_, index) => index + 1).map(
                (item, i) => (
                  <RatingBtn
                    key={i}
                    icon={Icons.rating}
                    label={item.toString()}
                    onClick={() => handleRating(item)}
                    active={selectedRating === item}
                    type="button"
                  />
                )
              )}
            </div>
            {isRatingEmpty && (
              <p className="text-error-500 pt-1 animate-fadeIn">
                Rating is required!
              </p>
            )}

            <div className="space-y-3 mt-7">
              <p className="text-[#6E6E6E] text-xs font-medium leading-[15.62px] md:text-sm md:leading-[18.23px]">
                Review
              </p>

              <Form.Item
                name="comment"
                rules={[
                  {
                    required: true,
                    message: "Comment is required!",
                  },
                ]}
              >
                <TextArea
                  className="text-neutral-400"
                  placeholder="Write your review here...."
                  style={{ width: "100%", height: "100px" }}
                  // maxLength={300}
                />
              </Form.Item>
              <div className="text-[#6E6E6E] text-[12px] mt-2">
                Max character limit: 500
              </div>
            </div>
          </div>

          {/* <div className="border-t border-x-primary-black-88 mt-[48px] mb-5"></div> */}
        </div>

        <div className="pb-5 px-[30px] pt-10 flex gap-4">
          <button
            className="w-full border-2 border-primary font-semibold text-xs md:text-sm transition-all duration-200 py-2 md:py-4 text-center antialiased"
            onClick={closeModal}
          >
            Cancel
          </button>

          <Button type="primary" className="w-full">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ProductReviewForm;
