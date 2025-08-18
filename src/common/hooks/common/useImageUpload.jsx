import { useState } from "react";

import { CREATE_WISH_LIST_URL, UPLOAD_IMAGE } from "@/common/config/constants/apiUrls";
import { axiosPrivate } from "@/common/config/axios.publicInstance";
import useNotification from "../useNotification";
import axios from "axios";
import { getCookie } from "cookies-next";
import { USER_TOKEN } from "@/common/config/constants/cookiesKeys";

const useImageUpload = () => {
    const [loading, setLoading] = useState(false);
    const { openSuccessNotification } = useNotification();

    const uploadImage = async (data, folderName) => {
        setLoading(true);
        try {
            const token = getCookie(USER_TOKEN);
            const response = await axios.post(
                `${UPLOAD_IMAGE}?folder=${folderName}`,
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            openSuccessNotification("success", "Image upload successfully.");

            return response.data;
        } catch (error) {
            console.error("Error adding to image upload:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return { uploadImage, loading };
};

export default useImageUpload;
