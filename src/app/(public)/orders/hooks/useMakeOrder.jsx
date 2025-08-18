import { useState } from "react";
import axiosPrivate from "@/common/config/axios.publicInstance";
import { CREATE_ORDER_URL } from "@/common/config/constants/apiUrls";
import { useNotification } from "@/common/hooks";

const useCreateOrder = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);

    const { openSuccessNotification, openErrorNotification } =
        useNotification();

    const createOrder = async (orderData) => {
        setLoading(true);
        setError(null);
        setResponse(null);

        try {
            console.log("orderData", orderData);

            const res = await axiosPrivate.post(CREATE_ORDER_URL, orderData);
            setResponse(res.data);

            openSuccessNotification("success", "Successfully create order.");
            //   console.log("Order created successfully:", res.data);
            return res?.data;
        } catch (err) {
            setError(err.response?.data?.message || "Failed to create order");

            openErrorNotification("error", error);
            console.error("Error creating order:", err.message);
        } finally {
            setLoading(false);
        }
    };

    return { createOrder, loading, error, response };
};

export default useCreateOrder;
