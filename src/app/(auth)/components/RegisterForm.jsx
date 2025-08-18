"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/common/components/ui/form";
import { Input } from "@/common/components/ui/input";
import { PasswordInput } from "@/common/components/ui/password-input";
import { Button } from "@/common/components/ui/button";

import { register } from "@/app/(auth)/services/authService";
import useNotification from "@/common/hooks/useNotification";
import { setCookie } from "cookies-next";
import { IS_RESET_PASSWORD, VERIFY_EMAIL } from "@/common/config/constants/cookiesKeys";
import SocialLoginForm from "./SocialLoginForm";
import { useCart } from "@/contextProviders/useCartContext";

// Validation schema
const registerSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required")
    .min(2, "Full name must be at least 2 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  mobileNumber: z
    .string()
    .optional()
    .refine((val) => !val || /^[0-9]+$/.test(val), {
      message: "Phone number must contain only digits",
    })
    .refine((val) => !val || val.length >= 10, {
      message: "Phone number must be at least 10 digits",
    }),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
      message: "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    }),
  confirmPassword: z
    .string()
    .min(8, "Password must be at least 8 characters long"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const RegisterForm = () => {
  const router = useRouter();
  const { openErrorNotification, openSuccessNotification } = useNotification();
  const { cart } = useCart();
  
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      mobileNumber: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values) => {
    setIsLoading(true);
    
    try {
      // Remove confirmPassword from the data sent to API
      const { confirmPassword, ...registrationData } = values;
      
      // Remove mobileNumber if it's empty
      if (!registrationData.mobileNumber) {
        delete registrationData.mobileNumber;
      }

      const response = await register(registrationData);
      
      if (response.success) {
        openSuccessNotification(
          "Success",
          response.message || "User successfully signed up. Now verify your email address."
        );

        setCookie(VERIFY_EMAIL, response.data?.email);
        setCookie(IS_RESET_PASSWORD, false);
        router.refresh();
        router.push("/email-verification");
      }
    } catch (error) {
      openErrorNotification("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoToCheckoutPage = () => {
    if (cart?.length > 0) {
      router.push("/checkout");
    } else {
      router.push("/");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 md:p-0">
      <div className="w-full max-w-[600px] bg-secondary p-8 px-4 sm:px-10 md:px-12 rounded border border-border pt-7">
        <h2 className="text-2xl font-semibold text-left mb-2">Sign Up</h2>
        <p className="text-[#4A4A4A] text-left mb-6 font-light">
          Please fill up the form to sign up!
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#262626] font-medium text-sm">
                    Full Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your full name"
                      className="h-[52px] bg-[#FAFBFB] border-[#DFE2E6] rounded-none px-4 py-4 text-sm focus:border-primary focus:ring-0"
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
                  <FormLabel className="text-[#262626] font-medium text-sm">
                    Email Id
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      className="h-[52px] bg-[#FAFBFB] border-[#DFE2E6] rounded-none px-4 py-4 text-sm focus:border-primary focus:ring-0"
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
                  <FormLabel className="text-[#262626] font-medium text-sm">
                    Phone Number (Optional)
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter phone number here"
                      className="h-[52px] bg-[#FAFBFB] border-[#DFE2E6] rounded-none px-4 py-4 text-sm focus:border-primary focus:ring-0"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#262626] font-medium text-sm">
                    Password
                  </FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder="Min. 8 characters"
                      className="h-[52px] bg-[#FAFBFB] border-[#DFE2E6] rounded-none px-4 py-4 text-sm focus:border-primary focus:ring-0"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="mb-8">
                  <FormLabel className="text-[#262626] font-medium text-sm">
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder="Min. 8 characters"
                      className="h-[52px] bg-[#FAFBFB] border-[#DFE2E6] rounded-none px-4 py-4 text-sm focus:border-primary focus:ring-0"
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
              className="w-full bg-primary text-white font-semibold h-[52px] rounded hover:bg-primary/90"
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </Button>
          </form>
        </Form>

        <div className="flex items-center w-full my-4">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-3 text-xs font-normal text-gray-600">Or</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* social login */}
        <SocialLoginForm />

        <p className="text-center text-sm mt-9">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary font-semibold hover:underline"
          >
            Sign in
          </Link>
        </p>

        <div className="flex items-center w-full my-4">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-3 text-xs font-normal text-gray-600">Or</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <button
          type="button"
          className="w-full border-none py-0 text-center cursor-pointer"
          onClick={handleGoToCheckoutPage}
        >
          <p className="text-xs sm:text-sm md:text-base font-normal text-light-font2 leading-none py-0">
            Continue as a guest
          </p>
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;
