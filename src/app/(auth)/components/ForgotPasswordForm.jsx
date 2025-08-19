"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/common/components/ui/form";
import { Input } from "@/common/components/ui/input";
import { Button } from "@/common/components/ui/button";

import { sendResetPasswordOTP } from "@/app/(auth)/services/authService";
import useNotification from "@/common/hooks/useNotification";
import Container from "@/common/components/common/Container";

// Validation schema
const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

const ForgotPasswordForm = () => {
  const { openErrorNotification, openSuccessNotification } = useNotification();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values) => {
    setIsLoading(true);

    try {
      const response = await sendResetPasswordOTP(values.email);

      if (response.success) {
        openSuccessNotification("Success", response.message || "Verification code sent successfully");
      }
    } catch (error) {
      openErrorNotification("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-600px bg-secondary p-8 rounded border border-border">
      <div className="flex flex-col items-center justify-center border-b border-b-gray-blue/10 pb-4">
        <h2 className="text-2xl font-semibold">Reset Password</h2>
      </div>

      <div>
        <Image
          src={"/images/forgot_password_image.svg"}
          width={1000}
          height={1000}
          quality={100}
          alt="reset password"
        />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 md:gap-3 mt-10">
          <div className="flex flex-col gap-3">
            <p className="text-gray-medium text-left font-light">
              Enter the email address which is linked to your account
            </p>
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-dark font-medium text-sm">
                  Email Id
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="username@mail.com"
                    className="h-52px bg-bg-lighter border-border-input rounded-sm px-4 py-3 text-sm focus:border-primary focus:ring-0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 rounded-sm text-base font-semibold"
          >
            {isLoading ? "Please wait..." : "Send Verification Code"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ForgotPasswordForm;
