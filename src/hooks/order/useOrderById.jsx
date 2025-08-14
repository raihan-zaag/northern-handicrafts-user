import { useState } from "react";
import axiosPrivate, { axiosPublic } from "@/configs/axios.publicInstance";
import {
    GET_CALCULATE_URL,
    GET_ONGOING_ORDER_URL,
    GET_ORDER_BY_ID_URL,
} from "@/constants/apiUrls";
import useNotification from "../useNotification";

const useOrderById = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { openErrorNotification } = useNotification();

    const getOrderById = async (id) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axiosPublic.get(
                `${GET_ORDER_BY_ID_URL}/${id}`
            );
            return response.data;
        } catch (err) {
            console.error("Error in get request:", err);
            setError(
                err.response?.data?.message || err.message || "Unknown error"
            );
            openErrorNotification(
                "error",
                err.response?.data?.message || err.message || "Unknown error"
            );
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, getOrderById };
};

export default useOrderById;
