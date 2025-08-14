"use client";

import React from "react";
import { Form, Input, Spin } from "antd";
import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";

import TopHeading from "@/components/common/topHeading";
import useResetPassword from "@/hooks/auth/useResetPassword";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const ResetPasswordForm = () => {
  const { resetPassword, loading } = useResetPassword();

  const onFinish = async (values) => {
    await resetPassword(values);
  };

  return (
    <div className="flex items-center justify-center  bg-white p-4 mb-16">
      <Spin fullscreen spinning={loading} />

      <div className="w-full max-w-[600px] bg-secondary p-8 rounded border border-border">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <TopHeading />
        </div>

        <h2 className="text-2xl font-semibold text-left mb-2">
          Reset password
        </h2>
        <p className="text-[#4A4A4A] text-left mb-6 font-light">
          Enter your new password to reset the password.
        </p>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="newPassword"
            label="Password"
            rules={[
              {
                required: true,
                message: "Password must be at least 8 characters",
                min: 8,
              },
            ]}
          >
            <Input.Password
              placeholder="Min. 8 characters"
              iconRender={(visible) =>
                visible ? (
                  <IoEyeOutline
                    className="text-primary"
                    color="#5D6B82"
                    style={{ height: "20px", width: "20px", cursor: "pointer" }}
                  />
                ) : (
                  <IoEyeOffOutline
                    className="text-primary"
                    color="#5D6B82"
                    style={{ height: "20px", width: "20px", cursor: "pointer" }}
                  />
                )
              }
              className="h-[52px]"
            />
          </Form.Item>

          <Form.Item
            name="confirmNewPassword"
            label="Confirm Password"
            rules={[
              {
                required: true,
                message: "Please re-enter your password!",
              },
              {
                min: 8,
                message: "Password must be at least 8 characters long.",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The new password that you entered does not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Min. 8 characters"
              iconRender={(visible) =>
                visible ? (
                  <IoEyeOutline
                    className="text-primary"
                    color="#5D6B82"
                    style={{ height: "20px", width: "20px", cursor: "pointer" }}
                  />
                ) : (
                  <IoEyeOffOutline
                    className="text-primary"
                    color="#5D6B82"
                    style={{ height: "20px", width: "20px", cursor: "pointer" }}
                  />
                )
              }
              className="h-[52px]"
            />
          </Form.Item>

          <Form.Item>
            <button
              htmltype="submit"
              className="w-full bg-primary text-white font-semibold h-[52px] rounded"
            >
              Confirm Reset Password
            </button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
