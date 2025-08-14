import { useState } from "react";

import axiosPrivate from "@/configs/axios.publicInstance";
import { GET_PRESCRIPTION_LIST_URL } from "@/constants/apiUrls";

const useGetPrescriptionList = () => {
  const [prescriptionList, setPrescriptionList] = useState([]);
  const [listForProfile, setListForProfile] = useState([]);
  const [totalPrescription, setTotalPrescription] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getPrescriptionList = async (params = { page: 0, size: 10 }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosPrivate.get(GET_PRESCRIPTION_LIST_URL, {
        params,
      });

      if (response?.data) {
        const structurePrecriptionListData = response?.data?.content?.map(
          (prescription) => ({
            value: prescription?.name,
            label: prescription?.name,
            totalValue: {
              name: prescription?.name,
              productSize: prescription?.productSize,

              leftEyeSPH: prescription?.leftEyeSPH,
              leftEyeCYL: prescription?.leftEyeCYL,
              leftEyeAxis: prescription?.leftEyeAxis,
              leftPdDistance: prescription?.leftPdDistance,

              rightEyeSPH: prescription?.rightEyeSPH,
              rightEyeCYL: prescription?.rightEyeCYL,
              rightEyeAxis: prescription?.rightEyeAxis,
              rightPdDistance: prescription?.rightPdDistance,

              pdDistance: prescription?.pdDistance,
            },
          })
        );

        setPrescriptionList(structurePrecriptionListData);
        setListForProfile(response?.data?.content);
        setTotalPrescription(response?.data?.totalElements);
        // console.log(response);
      }
      return response.data; // Return data for further use
    } catch (err) {
      setError(err);
      throw err; // Rethrow error for caller to handle
    } finally {
      setLoading(false);
    }
  };

  return {
    prescriptionList,
    totalPrescription,
    listForProfile,
    loading,
    error,
    getPrescriptionList,
  };
};

export default useGetPrescriptionList;
