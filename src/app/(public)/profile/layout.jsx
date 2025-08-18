"use client";

import Container from "@/common/components/common/Container";
import Sidebar from "@/sections/profile/Sidebar";
import React from "react";

const ProfileLayout = ({ children }) => {
  return (
    <div className={`py-2 sm:py-8 md:py-4`}>
      <Container>
        <div
          className={
            "grid grid-cols-1 lg:grid-cols-12 lg:gap-x-10 2xl:gap-x-[100px] h-full"
          }
        >
          {/* Sidebar - occupies 4 columns on large screens */}
          <Sidebar />

          {/* Details section - occupies 10 columns on large screens */}
          <div className="lg:col-span-8 xl:col-span-9  mt-5 lg:mt-0">
            {children}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProfileLayout;
