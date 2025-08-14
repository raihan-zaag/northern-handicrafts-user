"use client";
import { IMAGE_BASE_URL } from "@/constants/apiUrls";
import useImageUpload from "@/hooks/common/useImageUpload";
import React, { useRef } from "react";

const ImageUploader = ({ profileImage, setProfileImage, isReadOnly }) => {
  const { uploadImage, loading } = useImageUpload();
  const fileInputRef = useRef(null); // Reference to the file input

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      // setImage(file);
      // // uploadImage(file);
      // console.log("file", file);
      const formData = new FormData();
      formData.append("files", file);
      const response = await uploadImage(formData, "profile");
      setProfileImage(`${IMAGE_BASE_URL}/${response[0]}`);
    }
  };

  const handleChangeImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click(); // Programmatically trigger the file input
    }
  };

  return (
    <div>
      {profileImage ? (
        <div>
          <img
            src={profileImage}
            alt="profile"
            className="w-[140px] h-[140px] rounded-sm object-cover"
          />
          {!isReadOnly && (
            <div className="flex items-center gap-4 mt-4">
              <button
                onClick={handleChangeImageClick}
                className="text-sm font-semibold text-[#0F62FE] py-3.5 px-6 border border-[#0F62FE]"
              >
                {loading ? "Uploading..." : "Change Image"}
              </button>
              <button
                onClick={() => setProfileImage(null)}
                className="text-sm font-semibold text-[#EF4444] py-3.5 px-6 border border-[#EF4444]"
              >
                Remove
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="">
          <img
            src={"/images/image_placeholder.png"}
            alt="profile_placeholder"
            className="w-[140px] h-[140px] rounded-sm object-cover"
          />
          {!isReadOnly && (
            <label
              htmlFor="upload"
              className="cursor-pointer text-sm font-semibold text-[#0F62FE] py-3.5 px-6 border border-[#0F62FE]"
            >
              {loading ? "Uploading..." : "Add Image"}
            </label>
          )}
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        id="upload"
        // style={{ display: "none" }}
        ref={fileInputRef} // Attach the ref
        className="hidden"
        onChange={handleImageChange}
      />
    </div>
  );
};

export default ImageUploader;
