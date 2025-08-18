"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const GuestUserAddressForm = () => {
    const form = useFormContext();

    return (
        <div className="space-y-6">
            {/* Full Name */}
            <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Full Name*</FormLabel>
                        <FormControl>
                            <Input
                                placeholder="Enter your fullname."
                                className="h-14 text-base"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Email */}
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email address*</FormLabel>
                        <FormControl>
                            <Input
                                type="email"
                                placeholder="Enter your email address."
                                className="h-14 text-base"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Phone Number */}
            <FormField
                control={form.control}
                name="mobileNumber"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Phone number</FormLabel>
                        <FormControl>
                            <Input
                                placeholder="Enter your phone number."
                                className="h-14 text-base"
                                maxLength={15}
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Country and State Row */}
            <div className="flex flex-col md:flex-row gap-4">
                <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Country*</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter your country name"
                                    className="h-12 text-base"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>District/State*</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter your district/state name"
                                    className="h-12 text-base"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            {/* City and ZIP Row */}
            <div className="flex flex-col md:flex-row gap-4">
                <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>City/Area*</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter your city/area name"
                                    className="h-12 text-base"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="zipCode"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>ZIP/Postal Code*</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Enter zip/postal code here"
                                    className="h-12 text-base"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            {/* Street Address */}
            <FormField
                control={form.control}
                name="street"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Street Address*</FormLabel>
                        <FormControl>
                            <Textarea
                                placeholder="e.g. Road no., Area, City, Zip code etc."
                                className="min-h-[120px] text-base"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
};

export default GuestUserAddressForm;
