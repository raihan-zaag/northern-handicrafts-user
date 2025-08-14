"use client";

import Container from "@/components/common/container";
import React from "react";
import CustomerSupportForm from "./_component/CustomerSupportForm";
import LeftSideContent from "./_component/LeftSide";

const CustomerSupport = () => {
  return (
    <Container>
      <div className="flex flex-col lg:flex-row w-full items-start justify-between gap-6">
        {/* Left section */}
        <div className="lg:max-w-[440px] 2xl:max-w-[550px] w-full">
          <LeftSideContent />
        </div>
        {/* Right section */}
        <div className="bg-[#FAFBFB] lg:max-w-[550px] 2xl:max-w-[650px] w-full">
          <CustomerSupportForm />
        </div>
      </div>
    </Container>
  );
};

export default CustomerSupport;
