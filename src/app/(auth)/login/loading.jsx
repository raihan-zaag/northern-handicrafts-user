// components/SkeletonSignIn.js
"use client";

import React from "react";
import { Skeleton, Divider } from "antd";

import Container from "@/components/common/container";

const SkeletonSignIn = () => {
  return (
    <Container>
      <div className="flex items-center justify-center min-h-screen bg-white p-4 animate-pulse">
        <div className="w-full max-w-[600px] bg-gray-200 p-8 rounded border border-gray-300">
          <div className="h-10 mb-6 bg-gray-300 rounded"></div>

          <div className="h-5 bg-gray-300 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-full mb-6"></div>

          <div className="h-10 bg-gray-300 rounded w-full mb-4"></div>
          <div className="h-10 bg-gray-300 rounded w-full mb-4"></div>
          <div className="h-10 bg-gray-300 rounded w-full mb-4"></div>
          <div className="h-10 bg-gray-300 rounded w-full mb-4"></div>
          <div className="h-10 bg-gray-300 rounded w-full mb-4"></div>

          <div className="h-1 border border-gray-300 w-full mb-4"></div>

          <div className="h-4 w-full mb-6"></div>

          <div className="h-3 border border-gray-300 w-full mb-4"></div>

          <Divider orientation="center" />

          <div className="h-10 w-full border-none"></div>
        </div>
      </div>
    </Container>
  );
};

export default SkeletonSignIn;
