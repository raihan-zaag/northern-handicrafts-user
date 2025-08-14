"use client";

import React from "react";
import { useRouter } from "next/navigation";

const ErrorMessage = ({
  message,
  buttonText = "Go Home",
  redirectPath = "/",
}) => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push(redirectPath);
  };

  return (
    <div className="flex flex-col items-center justify-center py-10">
      <p className="text-lg font-semibold text-red-500 mb-4">{message}</p>
      <button
        onClick={handleRedirect}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default ErrorMessage;
