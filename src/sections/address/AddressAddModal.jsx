"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { IoClose } from "react-icons/io5";
import statesData from "../../../libs/states.json";
import { Button } from "@/common/components";

// Address form schema
const addressSchema = z.object({
    title: z.string().min(1, "Please enter your address title"),
    zipCode: z
        .string()
        .min(1, "Please enter a valid ZIP code")
        .regex(/^\d+$/, "ZIP code must contain only numbers"),
    state: z.string().min(1, "Please select your state"),
    city: z.string().min(1, "Please select your city"),
    apartment: z.string().optional(),
    street: z.string().min(1, "Please enter your street address"),
});

const AddressModal = ({
    open,
    onClose,
    isCreate,
    selectedAddress,
    setSelectedAddress,
    onSubmit,
    totalAddressCount,
}) => {
    const router = useRouter();

    // Local state for city dropdown options
    const [availableCities, setAvailableCities] = useState([]);

    const form = useForm({
        resolver: zodResolver(addressSchema),
        defaultValues: {
            title: "",
            zipCode: "",
            state: "",
            city: "",
            apartment: "",
            street: "",
        },
    });

    useEffect(() => {
        if (isCreate) {
            // When creating a new address, default title to "Address X"
            form.reset({
                title: `Address ${totalAddressCount + 1}`,
                zipCode: "",
                state: "",
                city: "",
                apartment: "",
                street: "",
            });
            setAvailableCities([]);
        } else if (selectedAddress) {
            // If editing an existing address, fill the fields
            form.reset({
                title: selectedAddress?.title || "",
                zipCode: selectedAddress?.zipCode || "",
                state: selectedAddress?.state || "",
                city: selectedAddress?.city || "",
                apartment: selectedAddress?.apartment || "",
                street: selectedAddress?.street || "",
            });

            // Also set the available cities if a state was provided
            if (selectedAddress?.state) {
                const matchedState = statesData.states.find(
                    (st) => st.name === selectedAddress.state
                );
                setAvailableCities(matchedState ? matchedState.cities : []);
            }
        }
    }, [isCreate, selectedAddress, totalAddressCount, form, open]);

    /**
     * If user picks a state manually, set the cities and clear city selection
     */
    const handleStateChange = (stateName) => {
        const matchedState = statesData.states.find(
            (st) => st.name === stateName
        );
        if (matchedState) {
            setAvailableCities(matchedState.cities);
        } else {
            setAvailableCities([]);
        }
        // Reset city field
        form.setValue("city", "");
    };

    /**
     * If user enters ZIP first, attempt to auto-select state + city
     */
    const handleZipChange = (value) => {
        if (!value) {
            // Clear out fields if empty
            form.setValue("state", "");
            form.setValue("city", "");
            setAvailableCities([]);
            return;
        }

        const zipString = value.toString();
        let foundState = null;
        let foundCity = null;

        for (const state of statesData.states) {
            for (const city of state.cities) {
                if (city.zip_codes.includes(zipString)) {
                    foundState = state;
                    foundCity = city;
                    break;
                }
            }
            if (foundState) break;
        }

        if (foundState && foundCity) {
            // Update the state and city fields
            form.setValue("state", foundState.name);
            form.setValue("city", foundCity.name);
            // Update availableCities to the matched state's entire city list
            setAvailableCities(foundState.cities);
        } else {
            form.setValue("state", "");
            form.setValue("city", "");
            setAvailableCities([]);
        }
    };

    /**
     * Submit form
     */
    const handleSubmit = async (values) => {
        onSubmit(values, isCreate, form);
        onClose();
        form.reset();
        router.refresh(); // if needed
    };

    /**
     * Close modal
     */
    const handleCloseModal = () => {
        form.reset();
        onClose();
        setSelectedAddress(null);
        setAvailableCities([]);
    };

    return (
        <Dialog open={open} onOpenChange={handleCloseModal}>
            <DialogContent className="sm:max-w-600px max-h-90vh overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center justify-between">
                        <span>Enter Address Details</span>
                        <IoClose
                            className="h-7 w-7 cursor-pointer"
                            onClick={handleCloseModal}
                        />
                    </DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                        {/* Address Name */}
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="e.g., Home, Work"
                                            className="h-12"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* ZIP Code */}
                        <FormField
                            control={form.control}
                            name="zipCode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ZIP Code</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Enter zip code"
                                            className="h-12"
                                            {...field}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                handleZipChange(e.target.value);
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* State */}
                        <FormField
                            control={form.control}
                            name="state"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>State</FormLabel>
                                    <Select onValueChange={(value) => {
                                        field.onChange(value);
                                        handleStateChange(value);
                                    }} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="h-12">
                                                <SelectValue placeholder="Select a state" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {statesData.states.map((state) => (
                                                <SelectItem key={state.name} value={state.name}>
                                                    {state.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* City */}
                        <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>City</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value} disabled={!availableCities.length}>
                                        <FormControl>
                                            <SelectTrigger className="h-12">
                                                <SelectValue placeholder="Select a city" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {availableCities.map((city) => (
                                                <SelectItem key={city.name} value={city.name}>
                                                    {city.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Apartment/Suite Info (optional) */}
                        <FormField
                            control={form.control}
                            name="apartment"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Apartment/Suite/Unit Info (Optional)</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Apartment/Suite/Unit Info"
                                            className="h-12"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Street Address */}
                        <FormField
                            control={form.control}
                            name="street"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Street Address</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="e.g. Road no., Area etc."
                                            className="min-h-80px"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Buttons */}
                        <div className="flex items-center gap-3 pt-6">
                            <Button
                                type="outline"
                                buttonType="button"
                                className="flex-1"
                                onClick={handleCloseModal}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="flex-1"
                            >
                                Submit
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default AddressModal;
