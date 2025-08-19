"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Button from "@/common/components/common/Button";
import ImageUploader from "@/common/components/common/ImageUploader";
import ProfileSkeleton from "@/common/components/common/ProfileSkeleton";
import { Input } from "@/common/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/common/components/ui/form";
import { useUserContext } from "@/contextProviders/userContextProvider";
import useProfileUpdate from "@/app/(auth)/hooks/useProfileUpdate";
import { USER_INFO } from "@/common/config/constants/cookiesKeys";
import { setCookie } from "cookies-next";
import useGetUserProfile from "@/app/(auth)/hooks/useGetUserInfo";

// Profile form schema
const profileSchema = z.object({
  fullName: z.string().min(1, "Please input your full name!"),
  email: z
    .string()
    .min(1, "Please input your email address!")
    .email("Please input valid email address!"),
  phoneNumber: z.string().optional(),
});

const AccountPage = () => {
  const { user, setUser } = useUserContext();
  const [profileImage, setProfileImage] = React.useState(null);
  const [isReadOnly, setIsReadOnly] = React.useState(true);

  const { updateProfile } = useProfileUpdate();
  const { profile } = useGetUserProfile();

  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
    },
  });

  useEffect(() => {
    if (profile) {
      form.reset({
        fullName: profile?.fullName || user?.fullName || "",
        email: profile?.email || user?.email || "",
        phoneNumber: profile?.mobileNumber || "",
      });
      setProfileImage(profile?.profilePicture || user?.profilePicture);
    } else {
      form.reset({
        fullName: user?.fullName || "",
        email: user?.email || "",
        phoneNumber: user?.mobileNumber || "",
      });
      setProfileImage(user?.profilePicture);
    }
  }, [profile, user, form]);

  const onSubmit = async (values) => {
    const submitData = {
      ...values,
      profilePicture: profileImage,
    };
    delete submitData.phoneNumber;
    
    const response = await updateProfile(submitData);
    setUser(response.info);
    setCookie(USER_INFO, response.info);
    setIsReadOnly(true);
  };

  const handleClickUpdate = () => {
    form.handleSubmit(onSubmit)();
  };

  const handleCancel = () => {
    setIsReadOnly(true);
    // Reset form to original values
    if (profile || user) {
      form.reset({
        fullName: profile?.fullName || user?.fullName || "",
        email: profile?.email || user?.email || "",
        phoneNumber: profile?.mobileNumber || user?.mobileNumber || "",
      });
      setProfileImage(user?.profilePicture || "");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
  <h2 className="text-gray-dark font-semibold text-2xl">
          Profile Information
        </h2>
        {isReadOnly ? (
          <Button
            className="py-15 px-8 whitespace-nowrap"
            onClick={() => setIsReadOnly(false)}
          >
            Edit Info
          </Button>
        ) : (
          <div className="flex flex-col md:flex-row items-center gap-4">
            <Button
              type="outline"
              className="py-15 px-8"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              className="py-15 px-8 whitespace-nowrap"
              onClick={handleClickUpdate}
            >
              Update
            </Button>
          </div>
        )}
      </div>

      {user ? (
        <>
          <div className="mb-5">
            <h6 className="text-dark font-medium text-sm mb-2">
              Profile Photo
            </h6>
            <ImageUploader
              profileImage={profileImage}
              setProfileImage={setProfileImage}
              isReadOnly={isReadOnly}
            />
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <h6 className="text-dark font-medium text-sm">
                        Full Name
                      </h6>
                    </FormLabel>
                    <FormControl>
                      <Input
                        readOnly={isReadOnly}
                        className={isReadOnly ? "bg-gray-50" : ""}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <h6 className="text-dark font-medium text-sm">
                        Email Address
                      </h6>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        readOnly={isReadOnly}
                        className={isReadOnly ? "bg-gray-50" : ""}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <h6 className="text-dark font-medium text-sm">
                        Phone Number
                      </h6>
                    </FormLabel>
                    <FormControl>
                      <Input
                        readOnly={isReadOnly}
                        className={isReadOnly ? "bg-gray-50" : ""}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </>
      ) : (
        <ProfileSkeleton />
      )}
    </div>
  );
};

export default AccountPage;
