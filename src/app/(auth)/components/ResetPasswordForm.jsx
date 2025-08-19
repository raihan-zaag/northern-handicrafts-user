"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/common/components/ui/form";
import { PasswordInput } from "@/common/components/ui/password-input";
import { Button } from "@/common/components/ui/button";

import { resetPassword } from "@/app/(auth)/services/authService";
import useNotification from "@/common/hooks/useNotification";

// Validation schema
const resetPasswordSchema = z.object({
  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
      message: "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    }),
  confirmNewPassword: z
    .string()
    .min(8, "Password must be at least 8 characters long"),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "Passwords don't match",
  path: ["confirmNewPassword"],
});

const ResetPasswordForm = () => {
  const { openErrorNotification, openSuccessNotification } = useNotification();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit = async (values) => {
    setIsLoading(true);
    
    try {
      const response = await resetPassword(values);
      
      if (response.success) {
        openSuccessNotification("Success", response.message || "Password reset successfully");
        form.reset();
      }
    } catch (error) {
      openErrorNotification("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-4 mb-16">
      <div className="w-full max-w-600px bg-secondary p-8 rounded border border-border">
        <h2 className="text-2xl font-semibold text-left mb-2">
          Reset password
        </h2>
  <p className="text-gray-medium text-left mb-6 font-light">
          Enter your new password to reset the password.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
          <FormLabel className="text-dark font-medium text-sm">
                    Password
                  </FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder="Min. 8 characters"
            className="h-52px bg-bg-lighter border-border-input rounded-none px-4 py-4 text-sm focus:border-primary focus:ring-0"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmNewPassword"
              render={({ field }) => (
                <FormItem>
          <FormLabel className="text-dark font-medium text-sm">
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder="Min. 8 characters"
            className="h-52px bg-bg-lighter border-border-input rounded-none px-4 py-4 text-sm focus:border-primary focus:ring-0"
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
              className="w-full bg-primary text-white font-semibold h-52px rounded hover:bg-primary/90"
            >
              {isLoading ? "Resetting..." : "Confirm Reset Password"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
