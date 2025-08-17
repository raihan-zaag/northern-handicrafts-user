"use client";

import { useState } from "react";
import VerificationInput from "react-verification-input";
import TimerDisplay from "./TimerDisplay";
import { Spin } from "antd";
import { useRouter } from "next/navigation";
import Button from "../common/Button";
import Image from "next/image";

const VerificationForm = ({ title, verifyShortForm, handleUpdate }) => {
  const [verificationCode, setVerificationCode] = useState("");
  const router = useRouter();

  const handleFinish = async () => {
    handleUpdate && handleUpdate(verificationCode);
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-[328px] sm:w-[496px] flex flex-col pt-6 px-4 pb-9 md:pt-4 md:px-12 md:pb-12 shadow-light-grey bg-secondary border border-border mb-16">
        <h1 className="flex w-full justify-center font-semibold text-xl text-neutral-700 py-3 border-b border-[#8790AB] border-opacity-[8%]">
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
          <h1 className="text-neutral-700 text-base md:text-xl font-semibold leading-[21px] md:leading-[31.25px]">
            Verify your Email Address
          </h1>
          <p className="text-light-font2 text-sm font-normal leading-[21px] whitespace-normal md:whitespace-nowrap">
            We just sent a verification code to
            <span className="text-primary text-xs font-semibold">
              &nbsp;"{verifyShortForm}"
            </span>
          </p>
        </div>

        <div className="w-full flex flex-col gap-y-4 py-9">
          <div className="w-full flex justify-between">
            <p className="text-[#262626] text-sm font-medium">
              Verification Code
            </p>
          </div>

          <VerificationInput
            validChars="0-9"
            classNames={{
              container: "w-full flex justify-between gap-x-2 md:gap-x-6",
              character:
                "w-[43px] h-[41px] md:w-12 md:h-12 text-[15px] md:text-base text-[#3A3A3A] flex items-center justify-center leading-[18.23px] md:leading-[19.53px] bg-white rounded-sm border border-[#DFE2E6] ",
              characterSelected: "bg-primary",
            }}
            onChange={(code) => setVerificationCode(code)}
          />
          <div className="w-full flex justify-between items-center">
            {/* <Link href={"change-phone-number"}> */}
            <p
              className="text-primary text-sm font-bold leading-[18.23px] cursor-pointer underline"
              onClick={() => router.back()}
            >
              Wrong Email?
            </p>
            {/* </Link> */}
            <TimerDisplay />
          </div>
        </div>

        <Button
          onClick={handleFinish}
          type="primary"
          disabled={verificationCode.length < 6}
          className={`w-full flex justify-center items-center text-white h-12  ${
            verificationCode.length < 6 ? "bg-neutral-50" : "bg-magenta-600"
          } `}
        >
          Verify Email Address
        </Button>
      </div>
    </div>
  );
};

export default VerificationForm;
