import Image from "next/image";
import React from "react";
import { AiOutlineMail } from "react-icons/ai";
import { MdOutlineMailOutline } from "react-icons/md";

const LeftSideContent = () => {
  return (
    <div>
      <div className="flex flex-col justify-center pt-12 mb-4 ">
        <p className="text-primary font-semibold text-[24px] sm:text-[36px] md:text-[40px] lg:text-[48px]">
          Contact Us
        </p>
        <p className="text-[#515151] text-sm md:text-base">
          Email, call or complete the form to reach out to us for any help at
          anytime
        </p>
      </div>

      {/* email */}
      <div className="flex items-center justify-start gap-2 pb-4 sm:pb-6 md:pb-8 lg:pb-12 pt-0 sm:pt-2 md:pt-6">
        <MdOutlineMailOutline className="text-[#4a4a4a] h-4 w-5" />
        <p className="text-primary font-normal text-xs sm:text-sm md:text-[18px]">
          business.optiluxeeyewear@gmail.com
        </p>
      </div>

      <div className="flex flex-col gap-9">
        <div className="flex flex-col gap-2">
          <p className="font-bold text-sm md:text-base">Customer Support</p>
          <p className="font-normal text-xs sm:text-sm md:text-base text-[#3A3A3A]">
            Our support team is available around the clock 24/7 to address any
            concerns or queries you may have. Don’t hesitate to reach out to us
            at anytime.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-bold text-sm md:text-base">
            Feedback and Suggestions
          </p>
          <p className="font-normal text-xs sm:text-sm md:text-base text-[#3A3A3A]">
            We value your feedback and we are continuously working to improve
            our Optiluxe Eyewear. Your input is crucial in shaping the future of
            Optiluxe Eyewear.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeftSideContent;
