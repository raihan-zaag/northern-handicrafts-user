import axiosPrivate from "@/common/config/axios.publicInstance";
import { DELETE_USER_ADDRESS, DELETE_WISH_LIST_URL } from "@/common/config/constants/apiUrls";
import { useNotification } from "@/common/hooks";
import { useState } from "react";


const useDeleteAddress = () => {
    const [loading, setLoading] = useState();

    const { openSuccessNotification } = useNotification();

    const deleteAddress = async (addressId) => {
        setLoading(true);

        try {
            const response = await axiosPrivate.delete(
                `${DELETE_USER_ADDRESS}/${addressId}`
            );

            openSuccessNotification(
                "Success",
                "Successfully remove from address."
            );

            return response;
        } catch (error) {
            console.error("Error removing from address:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return { deleteAddress, loading };
};

export default useDeleteAddress;
