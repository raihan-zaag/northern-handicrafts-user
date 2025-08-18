import { useState } from "react";
import axiosPrivate, { axiosPublic } from "@/common/config/axios.publicInstance";
import { GET_CALCULATE_URL, GET_ONGOING_ORDER_URL } from "@/common/config/constants/apiUrls";
import { useNotification } from "@/common/hooks";

const useGetOnGoingOrder = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [onGoingPageSize, setOngoingPageSize] = useState(0);

  const { openErrorNotification } = useNotification();

  const getOnGoingOrder = async (page = 0, size = 0, id) => {
    setLoading(true);
    setError(null);

    // let url;
    // if (id) {
    //   // console.log("id");
    //   // url = `/secured/orders/all`;
    //   url = GET_ONGOING_ORDER_URL;
    // } else {
    //   // console.log("not id");
    //   url = GET_ONGOING_ORDER_URL;
    // }

    try {
      const response = await axiosPrivate.get(GET_ONGOING_ORDER_URL, {
        params: { id, page, size },
      });

      setOngoingPageSize(response?.data?.totalElements);

      return response.data.content;
    } catch (err) {
      console.error("Error in POST request:", err);
      setError(err.response?.data?.message || err.message || "Unknown error");
      openErrorNotification(
        "error",
        err.response?.data?.message || err.message || "Unknown error"
      );
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, onGoingPageSize, getOnGoingOrder };
};

export default useGetOnGoingOrder;
