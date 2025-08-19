// components/SkeletonSignIn.js
"use client";

import React from "react";

const SkeletonSignIn = () => {
  return (
    <div className="flex items-center justify-center min-h-screen my-30px md:my-80px p-4 md:p-0">
      <div className="w-full max-w-600px bg-secondary p-8 px-4 sm:px-10 md:px-12 rounded border border-border">
        <div className="mb-5">
          <div className="h-6 w-40 bg-gray-300 animate-pulse rounded mb-2"></div>
          <div className="h-4 w-64 bg-gray-200 animate-pulse rounded"></div>
        </div>

        <div className="space-y-4">
          <div className="h-4 w-24 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-12 w-full bg-gray-200 animate-pulse rounded"></div>
          <div className="h-4 w-24 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-12 w-full bg-gray-200 animate-pulse rounded"></div>

          <div className="flex items-center justify-between mb-4">
            <div className="h-4 w-44 bg-gray-200 animate-pulse rounded"></div>
            <div className="h-4 w-32 bg-gray-200 animate-pulse rounded"></div>
          </div>

          <div className="h-12 w-full bg-gray-300 animate-pulse rounded mt-5"></div>

          <div className="flex items-center w-full my-4">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="px-3 text-xs font-normal text-gray-600">Or</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          <div className="h-10 w-full bg-gray-200 animate-pulse rounded"></div>

          <div className="flex items-center w-full my-4">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="px-3 text-xs font-normal text-gray-600">Or</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          <div className="h-4 w-64 bg-gray-200 animate-pulse rounded mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonSignIn;
