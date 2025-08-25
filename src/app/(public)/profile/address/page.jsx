"use client";

import { useEffect, useState, useCallback } from "react";
import PaginationWrapper from "@/common/components/pagination";
import useDeleteAddress from "@/app/(public)/profile/hooks/useDeleteAddress";
import useGetAddress from "@/app/(public)/profile/hooks/useGetUserAddress";
import { LoadingOverlay } from "@/common/components/ui/loading-overlay";
import { MemoizedAddressCard } from "./MemorizedAddressCard";
import useCreateAddress from "@/app/(public)/profile/hooks/useCreateAddress";
import useUpdateAddress from "@/app/(public)/profile/hooks/useUpdateAddress";
import AddressModal from "@/sections/address/AddressAddModal";
import { Button } from "@/common/components";
import EmptyDataSkeleton from "@/common/components/shared/EmptyDataSkeleton";
import RowSkeleton from "@/common/components/shared/RowSkeleton";

const AddressPage = () => {
    const { address, loading, fetchAddress } = useGetAddress();
    const { deleteAddress } = useDeleteAddress();
    const [openAddressModal, setOpenAddressModal] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const { createAddress } = useCreateAddress();
    const { updateAddress } = useUpdateAddress();

    useEffect(() => {
        fetchAddress(0, 10);
    }, []);

    // Handle paginated address fetching
    const handleGetPaginatedAddress = (page, size) => {
        setCurrentPage(page);
        fetchAddress(page - 1, size);
    };

    const handleRemoveDelete = useCallback(
        async (id) => {
            const response = await deleteAddress(id);
            if (response.status === 200) {
                fetchAddress(); // Refresh data
            }
        },
        [deleteAddress, fetchAddress]
    );

    const onClose = () => {
        setOpenAddressModal(false);
        setSelectedAddress(null);
    };

    const handleFinish = async (values, isCreate) => {
        try {
            let res;
            if (isCreate) {
                // Create new address
                res = await createAddress(values);
                if (res) {
                    await fetchAddress();
                    onClose();
                }
            } else {
                // Update address
                res = await updateAddress(selectedAddress?.id, values);
                if (res) {
                    await fetchAddress();
                    onClose();
                }
            }
        } catch (error) {
            console.error("Error creating/updating address:", error);
        }
    };

    return (
        <LoadingOverlay isLoading={loading}>
            <div>
                <div className="flex items-center justify-between">
                    <h2 className="text-gray-dark font-semibold text-2xl hidden sm:block">
                        My Saved Address
                    </h2>
                    <h2 className="text-gray-dark font-semibold text-2xl block sm:hidden">
                        Address
                    </h2>
                    <Button
                        className={"py-2 sm:py-15 px-3 sm:px-8"}
                        onClick={() => setOpenAddressModal(true)}
                    >
                        Add new address
                    </Button>
                </div>
                <div className="mt-6 sm:mt-12">
                    {loading ? (
                        <RowSkeleton count={3} />
                    ) : (
                        <>
                            {address?.content?.length > 0 ? (
                                address.content.map((addr, index) => (
                                    <MemoizedAddressCard
                                        address={addr}
                                        key={index}
                                        setOpenAddressModal={setOpenAddressModal}
                                        setSelectedAddress={setSelectedAddress}
                                        handleRemoveDelete={handleRemoveDelete}
                                    />
                                ))
                            ) : (
                                <EmptyDataSkeleton title={"No Address found"} />
                            )}
                        </>
                    )}
                </div>

                {address?.totalPages > 1 && (
                    <div className="mt-4">
                        <PaginationWrapper
                            pageSize={address.totalElements}
                            handlePagination={handleGetPaginatedAddress}
                            current={currentPage}
                        />
                    </div>
                )}

                <AddressModal
                    totalAddressCount={address?.content?.length}
                    open={openAddressModal}
                    onClose={onClose}
                    isCreate={!selectedAddress}
                    selectedAddress={selectedAddress}
                    setSelectedAddress={setSelectedAddress}
                    onSubmit={handleFinish}
                />
            </div>
        </LoadingOverlay>
    );
};

export default AddressPage;
