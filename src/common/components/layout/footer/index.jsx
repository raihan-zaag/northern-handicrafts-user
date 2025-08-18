"use client";

import React, { useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import Image from "next/image";
import { useUserContext } from "@/contextProviders/userContextProvider";
import useNotification from "@/common/hooks/useNotification";
import useCreateNewsletter from "@/common/hooks/newsletter/useCreateNewsletter";
import Link from "next/link";
import useGetCategories from "@/common/hooks/categories/useGetCategories";
import Container from "../common/Container";

const Footer = () => {
  const [email, setEamil] = useState("");
  const { isAuthenticated } = useUserContext();

  const { createContact } = useCreateNewsletter();
  const { openErrorNotification } = useNotification();

  const { categories } = useGetCategories();

  // Extract "Men" and "Women" categories dynamically
  const isMenCategory = (category) => {
    const menKeywords = ["man", "male", "men"];
    return menKeywords.includes(category.name.toLowerCase());
  };

  const isWomenCategory = (category) => {
    const womenKeywords = ["woman", "female", "Women"];
    return womenKeywords.includes(category.name.toLowerCase());
  };

  const menCategory = categories?.content?.find(isMenCategory);
  const womenCategory = categories?.content?.find(isWomenCategory);

  const handleChangeEmail = (e) => {
    setEamil(e.target.value);
  };

  const handleSubscribeNewsletter = async () => {
    if (isAuthenticated) {
      const res = await createContact({ email });

      if (res?.status === 201) {
        setEamil("");
      }
    } else {
      openErrorNotification(
        "error",
        "Please log in to subscribe to our newsletter. We look forward to keeping you informed!"
      );
    }
  };

  return (
    <footer className="bg-dark-black text-light-font py-12 mt-[108px]">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap- w-full">
          {/* Left Section */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-4 flex flex-col space-y-4">
            <h2 className="text-2xl font-semibold">OPTILUXE</h2>
            <p className="text-[15px] leading-8">
              Welcome to Optiluxe, your ultimate destination for luxury eyewear.
              With a dedication to style and clarity, we present a curated
              selection of premium eyewear. Explore unparalleled craftsmanship
              and timeless designs that elevate your look and enhance your
              vision. Find your perfect pair to reflect your unique style at
              Optiluxe.
            </p>

            <div className="hidden md:block space-y-2 text-sm">
              <p>Contact Us</p>
              {/* <p className="flex items-center space-x-2">
                <Image
                  src="/icons/phone_icon.svg"
                  alt="phone icon"
                  height={1000}
                  width={1000}
                  className="h-4 w-4"
                />
                <span>+1 555 498 5659</span>
              </p> */}
              <p className="flex items-center space-x-2">
                <Image
                  src="/icons/message_icon.svg"
                  alt="phone icon"
                  height={1000}
                  width={1000}
                  className="h-4 w-4"
                />
                <span>business.optiluxeyewear@gmail.com</span>
              </p>
            </div>
          </div>

          {/* Empty space for better alignment on larger screens */}
          <div className="col-span-1 lg:col-span-3"></div>

          {/* Middle Section - Shop & Legal Links */}
          <div className="col-span-2 lg:col-span-5 justify-start items-start mt-4 sm:mt-4 md:mt-4 lg:mt-0">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 col-span-5 gap-8">
              <div className="col-span-1 space-y-5">
                <h3 className="text-lg font-semibold">SHOP</h3>
                <ul className="space-y-5 text-sm">
                  <li>
                    <Link href={"/"}>Home</Link>
                  </li>
                  {menCategory && (
                    <li>
                      <Link href={`/?category=${menCategory?.id}`}>
                        {menCategory?.name || "Men"}
                      </Link>
                    </li>
                  )}
                  {womenCategory && (
                    <li>
                      <Link href={`/?category=${womenCategory?.id}`}>
                        {womenCategory?.name || "Women"}
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link href={"/track-order"}>Track Order</Link>
                  </li>
                  <li>
                    <a href="/customer-support">Customer Support</a>
                  </li>
                </ul>
              </div>
              <div className="col-span-1 space-y-5">
                <h3 className="text-lg font-semibold">LEGAL</h3>
                <ul className="space-y-5 text-sm">
                  <li>
                    <Link href={`/terms-and-condition`}>
                      Terms & Conditions
                    </Link>
                  </li>
                  <li>
                    <Link href={`/privacy-policy`}>Privacy Policy</Link>
                  </li>
                  <li>
                    <Link href={`/shipping-policy`}>Shipping Policy</Link>
                  </li>
                  <li>
                    <Link href={`/refund-policy`}>Refund Policy</Link>
                  </li>
                  <li>
                    <Link href={`/cookie-policy`}>Cookie Policy</Link>
                  </li>
                  <li>
                    <Link href={`accessibility-statement`}>
                      Accessibility Statement
                    </Link>
                  </li>
                </ul>
              </div>

              {/* News Letter */}
              <div className="block md:hidden space-y-2 text-sm">
                <div className=" space-y-2 text-sm">
                  <p>Contact Us</p>
                  {/* <p className="flex items-center space-x-2">
                   
                    <Image
                      src="/icons/phone_icon.svg"
                      alt="phone icon"
                      height={1000}
                      width={1000}
                      className="h-4 w-4"
                    />
                    <span>+1 555 498 5659</span>
                  </p> */}
                  <p className="flex items-center space-x-2">
                    <Image
                      src="/icons/message_icon.svg"
                      alt="phone icon"
                      height={1000}
                      width={1000}
                      className="h-4 w-4"
                    />
                    <span>business.optiluxeyewear@gmail.com</span>
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-start mt-8 sm:mt-12 col-span-2 w-full">
                <h3 className="text-lg font-semibold mb-4">
                  Subscribe to our newsletter
                </h3>
                <div className="flex flex-row gap-4 w-full">
                  <input
                    type="email"
                    placeholder="Enter Email"
                    className="px- py-2 bg-dark-black border-b-2 border-[#2B2E3A] text-light-font w-full sm:w-[350px] "
                    onChange={(e) => {
                      handleChangeEmail(e);
                    }}
                    value={email}
                  />
                  <button
                    className="px-4 py-4 bg-primary text-light-font rounded-full transition-colors"
                    onClick={handleSubscribeNewsletter}
                    disabled={!email}
                  >
                    <MdArrowOutward className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Right Section - Newsletter */}
        {/* Uncomment if needed */}

        {/* Footer Copyright */}
        <div className="mt-12 text-center text-sm border-t border-border_dark pt-6 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
          <div className="flex items-center justify-center gap-3 md:gap-6">
            <p className="text-xs sm:text-base text-[#CCCCCC]">
              Payment Securely with
            </p>
            <Image
              src="/icons/Stripe_Logo.svg"
              alt="payment with stripe"
              height={1000}
              width={1000}
              quality={100}
              className="w-[48px] h-[20px]"
            />
            <Image
              src="/icons/Visa_Inc.svg"
              alt="payment with stripe"
              height={1000}
              width={1000}
              quality={100}
              className="w-[48px] h-[20px]"
            />
            <Image
              src="/icons/master_card.svg"
              alt="payment with stripe"
              height={1000}
              width={1000}
              quality={100}
              className="w-[48px] h-[20px]"
            />
          </div>
          <p className="text-xs sm:text-base">
            <span className="text-[#CCCCCC]">© All rights reserved </span>
            <span className="text-[#fff]">OptiluxeEyewear.com</span>
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
