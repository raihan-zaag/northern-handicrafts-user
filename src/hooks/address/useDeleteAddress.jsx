import axiosPrivate from "@/configs/axios.publicInstance";
import { DELETE_USER_ADDRESS, DELETE_WISH_LIST_URL } from "@/constants/apiUrls";
import { useState } from "react";
import useNotification from "../useNotification";

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
