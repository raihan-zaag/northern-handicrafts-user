import axiosPrivate from "@/common/config/axios.publicInstance";
import { UPDATE_USER_ADDRESS } from "@/common/config/constants/apiUrls";
import { useState } from "react";
import useNotification from "../useNotification";
import useGetAddress from "./useGetUserAddress";

const useUpdateAddress = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const { openSuccessNotification } = useNotification();
  const { fetchAddress } = useGetAddress();

  const updateAddress = async (id, addressData) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axiosPrivate.put(
        `${UPDATE_USER_ADDRESS}/${id}`,
        addressData
      );
      setResponse(res.data);

      openSuccessNotification("success", "Address successfully updated.");
      return res;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update address");
      console.error("Error creating address:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return { updateAddress, loading, error, response };
};

export default useUpdateAddress;
