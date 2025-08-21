"use client";

import { getCookie } from "cookies-next";
import VerificationForm from "../components/verificationForm";
import { VERIFY_EMAIL } from "@/common/config/constants/cookiesKeys";
import useVerifyEmail from "@/app/(auth)/hooks/useVerifyEmail";
import useResendOTP from "@/app/(auth)/hooks/useResendOtp";
import { Spinner } from "@/common/components/ui/spinner";
import Container from "@/common/components/shared/Container";

const EmailVerification = () => {
  const varify_email = getCookie(VERIFY_EMAIL);
  const { loading, verifyEmail } = useVerifyEmail();
  const { loading: resendOtpLoading } = useResendOTP();

  const handleUpdate = async (code) => {
    await verifyEmail(code);
  };

  return (
    <div className="relative bg-sky-900">
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
