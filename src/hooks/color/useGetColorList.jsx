import { useState } from "react";
import { axiosPublic } from "@/configs/axios.publicInstance";
import { GET_COLOR_LIST } from "@/constants/apiUrls";

const useGetColorList = () => {
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchColors = async (colorId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosPublic.get(`${GET_COLOR_LIST}/${colorId}`);
      setColors(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { colors, loading, error, fetchColors };
};

export default useGetColorList;
