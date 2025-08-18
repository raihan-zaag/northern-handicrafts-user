"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LoadingOverlay } from "@/common/components/ui/loading-overlay";
import { Input } from "@/common/components/ui/input";
import { Textarea } from "@/common/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/common/components/ui/form";
import Button from "@/common/components/common/Button";
import InputLabel from "@/common/components/common/InputLabel";
import Typography from "@/common/components/Typography";
import useCreateContactInfo from "@/app/(public)/support/hooks/useContactUs";

// Contact form schema
const contactSchema = z.object({
  name: z.string().min(1, "Please enter your full name"),
  email: z
    .string()
    .min(1, "Please enter your email address")
    .email("Please enter a valid email address"),
  mobileNumber: z
    .string()
    .min(10, "Phone number must be between 10 and 15 digits")
    .max(15, "Phone number must be between 10 and 15 digits")
    .regex(/^\+?[1-9]\d{9,14}$/, "Please enter a valid phone number"),
  message: z
    .string()
    .min(1, "Please write your message")
    .max(500, "Message cannot exceed 500 characters"),
});

const CustomerSupportForm = () => {
  const { createContact, loading } = useCreateContactInfo();
  
  const form = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      mobileNumber: "",
      message: "",
    },
  });

  const onSubmit = async (data) => {
    const res = await createContact(data);

    if (res?.status === 201) {
      form.reset();
    }
  };

  return (
    <LoadingOverlay isLoading={loading}>
      <div className="p-3 sm:p-8 md:p-12">
        {/* Logo */}
        <div className="flex flex-col justify-center mb-4">
          <p className="text-primary font-semibold text-2xl">Get In Touch</p>
          <p className="text-[#515151] text-sm md:text-base">
            You can reach out to us anytime from anywhere
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <InputLabel>Full Name</InputLabel>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter full name here"
                      className="h-[52px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <InputLabel>Email id</InputLabel>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="username@mail.com"
                      className="h-[52px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mobileNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <InputLabel>Phone Number</InputLabel>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your phone number here"
                      className="h-[52px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <InputLabel>Your Message</InputLabel>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="How can we help you?"
                      className="min-h-[120px] resize-none"
                      maxLength={500}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  <p className="text-sm text-[#8A8A8A]">
                    Maximum 500 characters. Current: {field.value?.length || 0}/500
                  </p>
                </FormItem>
              )}
            />

            <Button
              type="primary"
              htmlType="submit"
              className="w-full border-none mt-4"
            >
              <Typography.BodyText color="#ffffff" className="font-semibold">
                Submit
              </Typography.BodyText>
            </Button>
          </form>
        </Form>
      </div>
    </LoadingOverlay>
  );
};

export default CustomerSupportForm;
