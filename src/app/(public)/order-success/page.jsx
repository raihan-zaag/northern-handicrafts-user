"use client";

import Button from "@/components/common/button";
import Container from "@/components/common/container";
import Image from "next/image";
import React from "react";
import { redirect, useRouter } from "next/navigation";

function OrderSuccess() {
  const router = useRouter();

  const handleGoToHomePage = () => {
    router.push("/");
  };

  return (
    <Container className="flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <Image
          src={"/images/success_image.svg"}
          height={1000}
          width={1000}
          alt="Success_image"
          className="w-[190px] h-[140px]"
        />
        <h1 className="text-[24px] text-[#2a2a2a] font-semibold mt-12">
          Thanks for your order!
        </h1>
        <p className="font-normal text-base text-[#5A5A5A]">
          Your order has been placed successfully.{" "}
        </p>
        <p className="font-normal text-base text-[#5A5A5A]">
          Please be patient while we confirm your order.
        </p>
        <Button
          type={"primary"}
          className={"w-[100%] mt-2"}
          onClick={handleGoToHomePage}
        >
          Continue Shopping
        </Button>
      </div>
      {/* <Image /> */}
    </Container>
  );
}

export default OrderSuccess;
