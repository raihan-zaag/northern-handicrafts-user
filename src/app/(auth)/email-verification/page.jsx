"use client";

import React from "react";
import { getCookie } from "cookies-next";

import Container from "@/components/common/Container";
import VerificationForm from "@/components/verificationForm";
import { VERIFY_EMAIL } from "@/constants/cookiesKeys";
import useVerifyEmail from "@/hooks/auth/useVerifyEmail";
import { Spin } from "antd";
import useResendOTP from "@/hooks/auth/useResendOtp";

const EmailVerification = () => {
  const varify_email = getCookie(VERIFY_EMAIL);
  const { loading, verifyEmail } = useVerifyEmail();
  const { loading: resendOtpLoading } = useResendOTP();

  const handleUpdate = async (code) => {
    await verifyEmail(code);
  };

  return (
    <div>
      <Spin fullscreen spinning={loading || resendOtpLoading} />
      <Container>
        <VerificationForm
          verifyShortForm={varify_email}
          handleUpdate={handleUpdate}
        />
      </Container>
    </div>
  );
};

export default EmailVerification;
