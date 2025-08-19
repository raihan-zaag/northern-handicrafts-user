"use client";

import Button from "@/common/components/common/Button";
import Container from "@/common/components/common/Container";
import Image from "next/image";
import React from "react";
import { redirect, useRouter } from "next/navigation";
import { HOME_URL } from "@/common/config/constants/routes";

function OrderSuccess() {
  const router = useRouter();

  const handleGoToHomePage = () => {
    router.push(HOME_URL);
  };

  return (
    <Container className="flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <Image
          src={"/images/success_image.svg"}
          height={1000}
          width={1000}
          alt="Success_image"
          className="w-190px h-140px"
        />
        <h1 className="text-18px md:text-xl2 text-gray-dark font-semibold mt-12">
          Thanks for your order!
        </h1>
        <p className="font-normal text-base text-gray-mid2">
          Your order has been placed successfully.{" "}
        </p>
        <p className="font-normal text-base text-gray-mid2">
          Please be patient while we confirm your order.
        </p>
        <Button
          type={"primary"}
          className={"w-full mt-2"}
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
