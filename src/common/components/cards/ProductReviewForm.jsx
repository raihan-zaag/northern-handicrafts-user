"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Textarea } from "@/common/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/common/components/ui/form";
import { IMAGE_BASE_URL } from "@/common/config/constants/apiUrls";
import Button from "../common/Button";
import RatingBtn from "../common/RatingBtn";
import Icons from "@/public/icons";

// Review form schema
const reviewSchema = z.object({
  comment: z.string().min(1, "Comment is required!"),
  rating: z.number().min(1, "Rating is required!").max(5),
});

const ProductReviewForm = ({
  submit,
  productName,
  image,
  data,
  closeModal,
}) => {
  const [selectedRating, setSelectedRating] = useState(5);

  const form = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      comment: "",
      rating: 5,
    },
  });

  const handleRating = (value) => {
    setSelectedRating(value);
    form.setValue("rating", value);
  };

  const onSubmit = (values) => {
    const _data = {
      ...values,
      rating: selectedRating,
    };

    submit(_data);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="px-[30px] pt-8">
            <div className="flex flex-col items-center">
              <Image
                alt="avatar"
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
            </div>

            <div className="mt-8">
              <p className="text-primary text-sm font-medium">Rating</p>
              <div className="text-[#6E6E6E] text-sm font-medium">
                Give your rating by tapping the stars
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
              
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem className="mt-2">
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-3 mt-7">
                <p className="text-[#6E6E6E] text-xs font-medium leading-[15.62px] md:text-sm md:leading-[18.23px]">
                  Review
                </p>

                <FormField
                  control={form.control}
                  name="comment"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          className="text-neutral-400 min-h-[100px]"
                          placeholder="Write your review here...."
                          maxLength={500}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="text-[#6E6E6E] text-[12px] mt-2">
                  Max character limit: 500
                </div>
              </div>
            </div>
          </div>

          <div className="pb-5 px-[30px] pt-10 flex gap-4">
            <button
              type="button"
              className="w-full border-2 border-primary font-semibold text-xs md:text-sm transition-all duration-200 py-2 md:py-4 text-center antialiased"
              onClick={closeModal}
            >
              Cancel
            </button>

            <Button type="primary" htmlType="submit" className="w-full">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProductReviewForm;
