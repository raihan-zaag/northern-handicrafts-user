// "use client";
// import Button from "@/common/components/common/Button";
// import EmptyDataSkeleton from "@/common/components/common/EmptyDataSkeleton";
// import RowSkeleton from "@/common/components/common/RowSkeleton";
// import PaginationComponent from "@/common/components/pagination";
// import useDeleteAddress from "@/app/(public)/profile/hooks/useDeleteAddress";
// import useGetAddress from "@/app/(public)/profile/hooks/useGetUserAddress";
// import AddressModal from "@/app/(public)/profile/sections/AddressAddModal";
// import { Spin } from "antd";
// import { useRouter } from "next/navigation";
// import React, { useEffect } from "react";
// import { MdOutlineEdit } from "react-icons/md";
// import { RiDeleteBin6Line } from "react-icons/ri";

// const AddressPage = () => {
//   const { address, loading, fetchAddress } = useGetAddress();
//   const { deleteAddress } = useDeleteAddress();
//   const [openAddressModal, setOpenAddressModal] = React.useState(false);
//   const [selectedAddress, setSelectedAddress] = React.useState(null);
//   const [addressData, setAddressData] = React.useState(null);

//   console.log("rerender");

//   // React.useEffect(() => {
//   //   const getAdd = async () => {
//   //     await fetchAddress(0, 10);
//   //   };

//   //   if (!openAddressModal) {
//   //     getAdd();
//   //   }
//   // }, [openAddressModal]);

//   useEffect(() => {
//     setAddressData(address);
//   }, [address, loading]);

//   const handleRemoveDelete = async (id) => {
//     const response = await deleteAddress(id);
//     if (response.status === 200) {
//       const res = await fetchAddress();
//       setAddressData(res);
//     }
//   };

//   const handleGetPaginatedAddress = (page, size) => {
//     fetchAddress(page - 1, size);
//   };

//   if (loading) {
//     return <Spin spinning={loading} fullscreen />;
//   }

//   return (
//     <div>
//       <div className="flex items-center justify-between">
//         <h2 className="text-[#2A2A2A] font-semibold text-2xl hidden sm:block">
//           My Saved Address
//         </h2>
//         <h2 className="text-[#2A2A2A] font-semibold text-2xl block sm:hidden">
//           Address
//         </h2>
//         <Button
//           className={"py-2 sm:py-[15px] px-3 sm:px-8"}
//           onClick={() => setOpenAddressModal(true)}
//         >
//           Add new address
//         </Button>
//       </div>
//       <div className=" mt-6 sm:mt-12">
//         {loading ? (
//           <RowSkeleton count={3} />
//         ) : (
//           <>
//             {addressData?.content?.length > 0 ? (
//               addressData?.content?.map((addressData, index) => (
//                 <AddressCard
//                   address={addressData}
//                   key={index}
//                   setOpenAddressModal={setOpenAddressModal}
//                   setSelectedAddress={setSelectedAddress}
//                   handleRemoveDelete={handleRemoveDelete}
//                 />
//               ))
//             ) : (
//               <EmptyDataSkeleton title={"No Address found"} />
//             )}
//           </>
//         )}
//       </div>

//       {address?.totalPages > 1 && (
//         <div className="mt-4">
//           <PaginationComponent
//             pageSize={address.totalElements}
//             handlePagination={handleGetPaginatedAddress}
//           />
//         </div>
//       )}

//       <AddressModal
//         open={openAddressModal}
//         onClose={() => setOpenAddressModal(false)}
//         isCreate={selectedAddress ? false : true}
//         selectedAddress={selectedAddress}
//         setSelectedAddress={setSelectedAddress}
//       />
//     </div>
//   );
// };

// export default AddressPage;

"use client";

import React, { useEffect, useState, useCallback } from "react";
import Button from "@/common/components/common/Button";
import EmptyDataSkeleton from "@/common/components/common/EmptyDataSkeleton";
import RowSkeleton from "@/common/components/common/RowSkeleton";
import PaginationComponent from "@/common/components/pagination";
import useDeleteAddress from "@/app/(public)/profile/hooks/useDeleteAddress";
import useGetAddress from "@/app/(public)/profile/hooks/useGetUserAddress";
import { LoadingOverlay } from "@/common/components/ui/loading-overlay";
import { MemoizedAddressCard } from "./MemorizedAddressCard";
import useCreateAddress from "@/app/(public)/profile/hooks/useCreateAddress";
import useUpdateAddress from "@/app/(public)/profile/hooks/useUpdateAddress";
import AddressModal from "@/sections/address/AddressAddModal";

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
                    <h2 className="text-[#2A2A2A] font-semibold text-2xl hidden sm:block">
                        My Saved Address
                    </h2>
                    <h2 className="text-[#2A2A2A] font-semibold text-2xl block sm:hidden">
                        Address
                    </h2>
                <Button
                    className={"py-2 sm:py-[15px] px-3 sm:px-8"}
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
                    <PaginationComponent
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

// const AddressCard = ({
//   address,
//   setSelectedAddress,
//   setOpenAddressModal,
//   handleRemoveDelete,
// }) => {
//   return (
//     <div className="flex sm:flex-row flex-col sm:gap-auto gap-4 items-start justify-between py-5 border-b border-[#EBEDF0]">
//       <div className="flex flex-col gap-2">
//         <h3 className="text-lg font-semibold text-[#2A2A2A]">
//           {address?.title}
//         </h3>
//         <p className="text-[#4A4A4A] text-sm">Country : {address?.country}</p>
//         {address?.state && (
//           <p className="text-gray-700 text-sm">State : {address?.state}</p>
//         )}
//         <p className="text-gray-700 text-sm">City : {address?.city}</p>
//         <p className="text-gray-700 text-sm">Zip Code : {address?.zipCode}</p>
//         <p className="text-gray-700 text-sm">Street : {address?.street}</p>
//       </div>
//       <div className="flex item-center gap-12 w-full sm:w-auto">
//         <button
//           className="flex items-center justify-center gap-1.5 sm:flex-grow-0 flex-grow"
//           onClick={() => {
//             setSelectedAddress(address);
//             setOpenAddressModal(true);
//           }}
//         >
//           <MdOutlineEdit className="text-[#0F62FE] text-base" />
//           <p className="text-[#0F62FE] text-sm font-semibold">Edit Address</p>
//         </button>
//         <button
//           onClick={() => handleRemoveDelete(address.id)}
//           className="flex items-center justify-center gap-1.5 sm:flex-grow-0 flex-grow"
//         >
//           <RiDeleteBin6Line className="text-[#4A4A4A] text-base" />
//           <p className="text-[#4A4A4A] text-sm font-semibold">Remove</p>
//         </button>
//       </div>
//     </div>
//   );
// };
