"use client";

import Button from "@/components/common/button";
import ImageUploader from "@/components/common/ImageUploader";
import ProfileSkeleton from "@/components/common/ProfileSkeleton";
import { useUserContext } from "@/contextProviders/userContextProvider";
import { Form, Input } from "antd";
import React, { useEffect } from "react";
import useProfileUpdate from "@/hooks/auth/useProfileUpdate";
import { USER_INFO } from "@/constants/cookiesKeys";
import { setCookie } from "cookies-next";
import useGetUserProfile from "@/hooks/user/useGetUserInfo";

const AccountPage = () => {
  const [form] = Form.useForm();
  const { user, setUser } = useUserContext();
  const [profileImage, setProfileImage] = React.useState(null);
  const [isReadOnly, setIsReadOnly] = React.useState(true);

  const { updateProfile } = useProfileUpdate();
  const { profile } = useGetUserProfile();

  useEffect(() => {
    if (profile) {
      form.setFieldsValue({
        fullName: profile?.fullName || user?.fullName,
        email: profile?.email || user?.email,
        phoneNumber: profile?.mobileNumber,
      });

      setProfileImage(profile?.profilePicture || user?.profilePicture);
    } else {
      form.setFieldsValue({
        fullName: user?.fullName,
        email: user?.email,
        phoneNumber: user?.mobileNumber,
      });

      setProfileImage(user?.profilePicture);
    }

    // console.log(profile);
    // form.setFieldsValue({
    //   fullName: user?.fullName,
    //   email: user?.email,
    // });
    // setProfileImage(user?.profilePicture);
  }, [profile]);

  const onFinish = async (values) => {
    // console.log("Success:", values);
    values.profilePicture = profileImage;
    delete values.phoneNumber;
    const response = await updateProfile(values);
    setUser(response.info);
    setCookie(USER_INFO, response.info);
  };

  const handleClickSubmit = () => {
    form.submit();
    setIsReadOnly(!isReadOnly);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-[#2A2A2A] font-semibold text-2xl">
          Profile Information
        </h2>
        {isReadOnly ? (
          <Button
            className={"py-[15px] px-8 whitespace-nowrap"}
            onClick={() => setIsReadOnly(false)}
          >
            Edit Info
          </Button>
        ) : (
          <div className="flex flex-col md:flex-row items-center gap-4">
            <Button
              type="outline"
              className={"py-[15px] px-8"}
              onClick={() => {
                setIsReadOnly(true);

                if (user?.profilePicture) {
                  setProfileImage(user?.profilePicture);
                } else {
                  setProfileImage("");
                }
              }}
            >
              Cancel
            </Button>
            <Button
              className={"py-[15px] px-8 whitespace-nowrap"}
              onClick={handleClickSubmit}
            >
              Update
            </Button>
          </div>
        )}
      </div>

      {user ? (
        <>
          <div className="mb-5">
            <h6 className="text-[#262626] font-medium text-sm mb-2">
              Profile Photo
            </h6>
            <ImageUploader
              profileImage={profileImage}
              setProfileImage={setProfileImage}
              isReadOnly={isReadOnly}
            />
          </div>

          <Form
            form={form}
            name="basic"
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              label={
                <h6 className="text-[#262626] font-medium text-sm">
                  Full Name
                </h6>
              }
              name="fullName"
              rules={[
                {
                  required: true,
                  message: "Please input your full name!",
                },
              ]}
            >
              <Input readOnly={isReadOnly} placeholder="Enter full name" />
            </Form.Item>
            <Form.Item
              label={
                <h6 className="text-[#262626] font-medium text-sm">
                  Email Address
                </h6>
              }
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your full name!",
                },
                {
                  type: "email",
                  message: "Please input valid email address!",
                },
              ]}
            >
              <Input readOnly={isReadOnly} placeholder="Enter your email" />
            </Form.Item>
            <Form.Item
              label={
                <h6 className="text-[#262626] font-medium text-sm">
                  Phone Number
                </h6>
              }
              name="phoneNumber"
            >
              <Input
                readOnly={isReadOnly}
                placeholder="Enter your phone number"
              />
            </Form.Item>
          </Form>
        </>
      ) : (
        <ProfileSkeleton />
      )}
    </div>
  );
};

export default AccountPage;
