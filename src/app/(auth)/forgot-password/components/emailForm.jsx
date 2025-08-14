"use client";

import React from "react";
import { Form, Input, Spin } from "antd";
import { useRouter } from "next/navigation";

import Container from "@/components/common/container";
import Button from "@/components/common/button";
import Typography from "@/components/Typography/component.typography";
import Image from "next/image";
import useResendOTP from "@/hooks/auth/useResendOtp";
import useSendOTP from "@/hooks/auth/useSendResetPasswordOTP";
import InputLabel from "@/components/common/inputLabel";

const ChangeEmailForm = () => {
  const router = useRouter();
  const { sendOTP, loading } = useSendOTP();
  const {} = useResendOTP();

  // Send OTP
  // save email in local-storage
  // varify and save otp
  // then change password

  const onFinish = async (values) => {
    await sendOTP(values.email);
  };

  return (
    <Container>
      <Spin spinning={loading} fullscreen />
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="w-full max-w-[600px] bg-secondary p-8 rounded border border-border">
          <div className="flex flex-col items-center justify-center border-b border-b-[#8790ab]/[.1] pb-4">
            <Typography.Title2>Reset Password</Typography.Title2>
          </div>

          <div>
            <Image
              src={"/images/forgot_password_image.svg"}
              width={1000}
              height={1000}
              quality={100}
              alt="reset password"
            />
          </div>

          <Form
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
            className="flex flex-col gap-4 md:gap-3 "
          >
            <div className="flex flex-col gap-3 mt-10">
              <Typography.Paragraph>
                Enter the email address which is linked to your account
              </Typography.Paragraph>
            </div>

            <div className="flex flex-col gap-1">
              <Form.Item
                className="m-0"
                label={<InputLabel>Email Id</InputLabel>}
                name="email"
                rules={[
                  {
                    required: true,
                    message: "New email is required!",
                  },
                  {
                    type: "email",
                    message: "The input is not valid email!",
                  },
                ]}
              >
                <Input
                  className="py-3 rounded-sm h-[52px]"
                  placeholder="username@mail.com"
                />
              </Form.Item>
            </div>

            <Button
              type="primary"
              htmltype="submit"
              className="w-full h-12 bg-magenta-600 rounded-sm text-base font-semibold"
              disabled={loading}
            >
              {loading ? "Please wait..." : "Send Verification Code"}
            </Button>
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default ChangeEmailForm;
