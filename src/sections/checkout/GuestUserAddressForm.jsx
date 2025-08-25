"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/common/components/ui/input";
import { Textarea } from "@/common/components/ui/textarea";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/common/components/ui/form";

const GuestUserAddressForm = () => {
    const form = useFormContext();

    return (
        <div className="space-y-5">
            {/* Full Name */}
            <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-sm font-medium text-[var(--color-text-primary)]">
                            Full Name
                        </FormLabel>
                        <FormControl>
                            <Input
                                placeholder="Mr Smith"
                                className="h-12 text-sm bg-[var(--color-surface)] border-[var(--color-border)] rounded-xl"
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
                        <FormLabel className="text-sm font-medium text-[var(--color-text-primary)]">
                            Email Address
                        </FormLabel>
                        <FormControl>
                            <Input
                                type="email"
                                placeholder="mrsmith@mail.com"
                                className="h-12 text-sm bg-[var(--color-surface)] border-[var(--color-border)] rounded-xl"
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
                        <FormLabel className="text-sm font-medium text-[var(--color-text-primary)]">
                            Phone Number
                        </FormLabel>
                        <FormControl>
                            <Input
                                placeholder="+116556156"
                                className="h-12 text-sm bg-[var(--color-surface)] border-[var(--color-border)] rounded-xl"
                                maxLength={15}
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Country and State Row */}
            <div className="flex flex-col md:flex-row gap-5">
                <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel className="text-sm font-medium text-[var(--color-text-primary)]">
                                Country
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="United States"
                                    className="h-12 text-sm bg-[var(--color-surface)] border-[var(--color-border)] rounded-xl"
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
                        <FormItem className="flex-1">
                            <FormLabel className="text-sm font-medium text-[var(--color-text-primary)]">
                                District/State
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="California"
                                    className="h-12 text-sm bg-[var(--color-surface)] border-[var(--color-border)] rounded-xl"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            {/* City and ZIP Row */}
            <div className="flex flex-col md:flex-row gap-5">
                <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel className="text-sm font-medium text-[var(--color-text-primary)]">
                                City/Area
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Los Angeles"
                                    className="h-12 text-sm bg-[var(--color-surface)] border-[var(--color-border)] rounded-xl"
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
                        <FormItem className="flex-1">
                            <FormLabel className="text-sm font-medium text-[var(--color-text-primary)]">
                                ZIP/Postal Code
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="90017"
                                    className="h-12 text-sm bg-[var(--color-surface)] border-[var(--color-border)] rounded-xl"
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
                        <FormLabel className="text-sm font-medium text-[var(--color-text-primary)]">
                            Street Address
                        </FormLabel>
                        <FormControl>
                            <Textarea
                                placeholder="4135 Parkway Street"
                                className="min-h-[80px] text-sm bg-[var(--color-surface)] border-[var(--color-border)] rounded-xl resize-none"
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
