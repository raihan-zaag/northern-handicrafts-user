"use client";

import { useState } from "react";
// Replaced with shadcn-style Input OTP
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/common/components/ui/input-otp";
import TimerDisplay from "./TimerDisplay";
import { useRouter } from "next/navigation";
import Button from "@/common/components/common/Button";
import Image from "next/image";
import { cn } from "@/lib/utils";

const VerificationForm = ({ title, verifyShortForm, handleUpdate }) => {
  const [verificationCode, setVerificationCode] = useState("");
  const router = useRouter();

  const handleFinish = async () => {
    handleUpdate && handleUpdate(verificationCode);
  };

  return (
    <div className="w-full max-w-330px sm:max-w-500px flex flex-col pt-6 px-4 pb-9 md:pt-4 md:px-12 md:pb-12 shadow-light-grey bg-secondary border border-border">
      <h1 className="flex w-full justify-center font-semibold text-xl text-neutral-700 py-3 border-b border-gray-blue/10">
        Verification Code
      </h1>

      <div className="w-full flex justify-center pb-16 pt-9 sm:pt-12">
        <Image
          width={1000}
          height={1000}
          alt="verifyOTP"
          src={"/images/OTP-verification-image.svg"}
          quality={100}
        />
      </div>

      <div className="space-y-3">
        <h1 className="text-neutral-700 text-base md:text-xl font-semibold leading-5 md:leading-8">
          Verify your Email Address
        </h1>
        <p className="text-light-font2 text-sm font-normal leading-5 whitespace-normal md:whitespace-nowrap">
          We just sent a verification code to
          <span className="text-primary text-xs font-semibold">
            &nbsp;"{verifyShortForm}"
          </span>
        </p>
      </div>

      <div className="w-full flex flex-col gap-y-4 py-9">
        <div className="w-full flex justify-between">
          <p className="text-dark text-sm font-medium">
            Verification Code
          </p>
        </div>

        <InputOTP
          maxLength={6}
          value={verificationCode}
          onChange={setVerificationCode}
          containerClassName="w-full"
        >
          <InputOTPGroup className="w-full justify-between gap-x-2 md:gap-x-6">
            {[...Array(6)].map((_, i) => (
              <InputOTPSlot key={i} index={i} />
            ))}
          </InputOTPGroup>
        </InputOTP>
        <div className="w-full flex justify-between items-center">
          <p
            className="text-primary text-sm font-bold leading-18px cursor-pointer underline"
            onClick={() => router.back()}
          >
            Wrong Email?
          </p>
          <TimerDisplay />
        </div>
      </div>

      <Button
        onClick={handleFinish}
        type="primary"
        disabled={verificationCode.length < 6}
        className={cn(
          "w-full flex justify-center items-center text-white h-12",
          verificationCode.length < 6 ? "bg-neutral-50" : "bg-magenta-600"
        )}
      >
        Verify Email Address
      </Button>
    </div>
  );
};

export default VerificationForm;
