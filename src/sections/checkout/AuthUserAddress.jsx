"use client ";

import { useEffect, useState } from "react";
import useGetAddress from "@/hooks/address/useGetUserAddress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Button from "@/components/common/Button";
import AddressModal from "../address/AddressAddModal";
import useCreateAddress from "@/hooks/address/useCreateAddress";

const AuthUserAddress = ({ setDeliveryAddress, deliveryAddress }) => {
    const [openAddressModal, setOpenAddressModal] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [addressOption, setAddressOption] = useState([]);

    const { createAddress } = useCreateAddress();

    const { address, loading, fetchAddress } = useGetAddress();

    useEffect(() => {
        fetchAddress(0, 1000);
    }, []);

    useEffect(() => {
        const options = address?.content?.map((address) => ({
            value: address?.id,
            label: address?.title,
        }));

        setAddressOption(options);
    }, [loading]);

    const handleChange = (e) => {
        setSelectedAddress(e);
        const select = address?.content?.find((address) => address?.id === e);

        setDeliveryAddress(select);
    };

    const handleToggleAddressModal = () => {
        setOpenAddressModal(!openAddressModal);
        setSelectedAddress(null);
    };

    const handleSubmit = async (values, isCreate = true) => {
        const res = await createAddress(values);
        if (res) {
            await fetchAddress();
        }
        handleToggleAddressModal();
    };

    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-col md:flex-row gap-4 w-full">
                <Select
                    value={selectedAddress?.toString()}
                    onValueChange={(value) => handleChange(parseInt(value))}
                >
                    <SelectTrigger className="w-full h-14">
                        <SelectValue placeholder="Select a delivery address" />
                    </SelectTrigger>
                    <SelectContent>
                        {addressOption?.map((option) => (
                            <SelectItem key={option.value} value={option.value.toString()}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Button
                    className={"self-end w-full md:w-[30%] "}
                    onClick={handleToggleAddressModal}
                >
                    Add new Address
                </Button>
            </div>

            {deliveryAddress && (
                <div className="bg-[#F5F5F5] p-4 flex flex-col gap-2">
                    {deliveryAddress?.title && (
                        <p className="text-sm font-semibold text-primary">
                            {deliveryAddress.title}
                        </p>
                    )}

                    {deliveryAddress?.country && (
                        <p className="text-sm font-normal text-[#4A4A4A]">
                            Country: {deliveryAddress.country}
                        </p>
                    )}

                    {deliveryAddress?.state && (
                        <p className="text-sm font-normal text-[#4A4A4A]">
                            State: {deliveryAddress.state}
                        </p>
                    )}

                    {deliveryAddress?.city && (
                        <p className="text-sm font-normal text-[#4A4A4A]">
                            City: {deliveryAddress.city}
                        </p>
                    )}

                    {deliveryAddress?.zipCode && (
                        <p className="text-sm font-normal text-[#4A4A4A]">
                            Zip Code: {deliveryAddress.zipCode}
                        </p>
                    )}

                    {deliveryAddress?.street && (
                        <p className="text-sm font-normal text-[#4A4A4A]">
                            Street: {deliveryAddress.street}
                        </p>
                    )}

                    {deliveryAddress?.apartment && (
                        <p className="text-sm font-normal text-[#4A4A4A]">
                            Apartment: {deliveryAddress.apartment}
                        </p>
                    )}
                </div>
            )}

            <AddressModal
                totalAddressCount={address?.content?.length}
                open={openAddressModal}
                selectedAddress={selectedAddress}
                setSelectedAddress={setSelectedAddress}
                onClose={handleToggleAddressModal}
                isCreate={true}
                onSubmit={handleSubmit}
            />
        </div>
    );
};

export default AuthUserAddress;
