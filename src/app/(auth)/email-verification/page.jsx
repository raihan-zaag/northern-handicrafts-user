"use client";

import React from "react";
import { getCookie } from "cookies-next";

import Container from "@/components/common/Container";
import VerificationForm from "@/components/verificationForm";
import { VERIFY_EMAIL } from "@/constants/cookiesKeys";
import useVerifyEmail from "@/hooks/auth/useVerifyEmail";
import useResendOTP from "@/hooks/auth/useResendOtp";
import { Spinner } from "@/components/ui/spinner";

const EmailVerification = () => {
  const varify_email = getCookie(VERIFY_EMAIL);
  const { loading, verifyEmail } = useVerifyEmail();
  const { loading: resendOtpLoading } = useResendOTP();

  const handleUpdate = async (code) => {
    await verifyEmail(code);
  };

  return (
    <div className="relative">
      {(loading || resendOtpLoading) && (
        <div className="fixed inset-0 grid place-items-center bg-background/60 z-50">
          <Spinner size="xl" className="text-primary" />
        </div>
      )}
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
