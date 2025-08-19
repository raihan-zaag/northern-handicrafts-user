import React from "react";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

const AddressCard = ({
    address,
    setSelectedAddress,
    setOpenAddressModal,
    handleRemoveDelete,
}) => {
    return (
    <div className="flex sm:flex-row flex-col sm:gap-auto gap-4 items-start justify-between py-5 border-b border-border">
            <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-gray-dark">
                    {address?.title}
                </h3>
                {/* <p className="text-[#4A4A4A] text-sm">Country : {address?.country}</p> */}
                {address?.state && (
                    <p className="text-gray-700 text-sm">
                        State : {address?.state}
                    </p>
                )}
                <p className="text-gray-700 text-sm">City : {address?.city}</p>
                <p className="text-gray-700 text-sm">
                    Zip Code : {address?.zipCode}
                </p>
                <p className="text-gray-700 text-sm">
                    Street : {address?.street}
                </p>
                <p className="text-gray-700 text-sm">
                    Apartment : {address?.apartment}
                </p>
            </div>
            <div className="flex item-center gap-12 w-full sm:w-auto">
                <button
                    className="flex items-center justify-center gap-1.5 sm:flex-grow-0 flex-grow"
                    onClick={() => {
                        setSelectedAddress(address);
                        setOpenAddressModal(true);
                    }}
                >
                    <MdOutlineEdit className="text-blue text-base" />
                    <p className="text-blue text-sm font-semibold">
                        Edit Address
                    </p>
                </button>
                <button
                    onClick={() => handleRemoveDelete(address.id)}
                    className="flex items-center justify-center gap-1.5 sm:flex-grow-0 flex-grow"
                >
                    <RiDeleteBin6Line className="text-gray-medium text-base" />
                    <p className="text-gray-medium text-sm font-semibold">
                        Remove
                    </p>
                </button>
            </div>
        </div>
    );
};

export const MemoizedAddressCard = React.memo(AddressCard);
