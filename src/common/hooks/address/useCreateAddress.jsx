import axiosPrivate from "@/common/config/axios.publicInstance";
import { CREATE_USER_ADDRESS } from "@/common/config/constants/apiUrls";
import { useState } from "react";
import useNotification from "../useNotification";
import useGetAddress from "./useGetUserAddress";
import { useRouter } from "next/navigation";

const useCreateAddress = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);
    const { openSuccessNotification, openErrorNotification } =
        useNotification();
    const { fetchAddress } = useGetAddress();

    const createAddress = async (addressData) => {
        setLoading(true);
        setError(null);

        try {
            const res = await axiosPrivate.post(
                CREATE_USER_ADDRESS,
                addressData
            );
            setResponse(res.data);

            // if (res) {
            //   await fetchAddress();
            // }

            openSuccessNotification("success", "Address successfully created.");

            return res.data;
        } catch (err) {
            setError(err.response?.data?.message || "Failed to create address");
            console.log("Error creating address:", err.response?.data?.message);
            openErrorNotification("Error", err.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    return { createAddress, loading, error, response };
};

export default useCreateAddress;
