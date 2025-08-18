import { useState, useEffect } from "react";
import { axiosPublic } from "@/common/config/axios.publicInstance";
import { GET_BANNER_URL } from "@/common/config/constants/apiUrls";

const useGetBanner = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBanner = async () => {
            try {
                setLoading(true); // Start loading
                const response = await axiosPublic.get(GET_BANNER_URL);
                setData(response.data); // Set fetched data
            } catch (err) {
                setError(err.message || "Something went wrong"); // Set error message
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchBanner(); // Fetch banners if the URL is provided
    }, []);

    return { data, loading, error };
};

export default useGetBanner;
