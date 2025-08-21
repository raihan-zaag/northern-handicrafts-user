"use client";

import { useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import { useUserContext } from "@/contextProviders/userContextProvider";
import useNotification from "@/common/hooks/useNotification";
import useCreateNewsletter from "@/common/hooks/newsletter/useCreateNewsletter";
import useGetCategories from "@/common/hooks/categories/useGetCategories";
import Container from "../../shared/Container";
import Copyright from "./Copyright";
import {
  HOME_URL,
  CATEGORY_URL,
  TERMS_AND_CONDITION_URL,
  PRIVACY_POLICY_URL,
  SHIPPING_POLICY_URL,
  ACCESSIBILITY_STATEMENT_URL,
  CUSTOMER_SUPPORT_URL,
  ABOUT_US_URL
} from "@/common/config/constants/routes";
import { Separator } from "../../ui";
import { PRODUCT_LIST } from "@/common/config";

const Footer = () => {
  const [email, setEmail] = useState("");
  const { isAuthenticated } = useUserContext();
  const { createContact } = useCreateNewsletter();
  const { openErrorNotification } = useNotification();
  const { categories } = useGetCategories();

  const isMenCategory = (category) => ["man", "male", "men"].includes(category.name.toLowerCase());
  const isWomenCategory = (category) => ["woman", "female", "women"].includes(category.name.toLowerCase());

  const menCategory = categories?.content?.find(isMenCategory);
  const womenCategory = categories?.content?.find(isWomenCategory);

  const handleSubscribeNewsletter = async () => {
    if (!email) return;
    if (isAuthenticated) {
      const res = await createContact({ email });
      if (res?.status === 201) setEmail("");
    } else {
      openErrorNotification(
        "error",
        "Please log in to subscribe to our newsletter."
      );
    }
  };

  return (
        <footer className="bg-black-strong text-border-strong py-8 md:py-12">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0">

          <div className="space-y-8 md:space-y-12 lg:col-span-4">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-0 sm:flex sm:justify-between">
              {/* SHOP + CONTACT */}
              <div className="space-y-4 md:space-y-6">
                <h3 className="text-base md:text-lg font-semibold text-primary-foreground">SHOP</h3>
                <ul className="mt-2 space-y-3 md:space-y-5 text-sm">
                  <li><Link href={HOME_URL} className="hover:text-primary hover:underline transition-colors duration-200">Home</Link></li>
                  {menCategory && <li><Link href={CATEGORY_URL(menCategory.id)} className="hover:text-primary hover:underline transition-colors duration-200">{menCategory.name}</Link></li>}
                  {womenCategory && <li><Link href={CATEGORY_URL(womenCategory.id)} className="hover:text-primary hover:underline transition-colors duration-200">{womenCategory.name}</Link></li>}
                  <li><Link href={PRODUCT_LIST} className="hover:text-primary hover:underline transition-colors duration-200">All Products</Link></li>
                  <li><Link href={ABOUT_US_URL} className="hover:text-primary hover:underline transition-colors duration-200">About Us</Link></li>
                  <li><Link href={CUSTOMER_SUPPORT_URL} className="hover:text-primary hover:underline transition-colors duration-200">Customer Support</Link></li>
                </ul>
              </div>


              {/* LEGAL */}
              <div className="space-y-4 md:space-y-6">
                <h3 className="text-base md:text-lg font-semibold text-primary-foreground">LEGAL</h3>
                <ul className="space-y-3 md:space-y-5 text-sm">
                  <li><Link href={TERMS_AND_CONDITION_URL} className="hover:text-primary hover:underline transition-colors duration-200">Terms & Conditions</Link></li>
                  <li><Link href={PRIVACY_POLICY_URL} className="hover:text-primary hover:underline transition-colors duration-200">Privacy Policy</Link></li>
                  <li><Link href={SHIPPING_POLICY_URL} className="hover:text-primary hover:underline transition-colors duration-200">Shipping Policy</Link></li>
                  <li><Link href={ACCESSIBILITY_STATEMENT_URL} className="hover:text-primary hover:underline transition-colors duration-200">Accessibility Statement</Link></li>
                </ul>
              </div>
            </div>

            <div className="">
              <h3 className="text-base md:text-lg font-semibold text-primary-foreground">Contact Us</h3>
              <p className="flex items-center space-x-2 mt-2 text-sm">
                <Image src="/icons/phone_icon.svg" alt="phone" width={16} height={16} />
                <span>+1 555 498 5659</span>
              </p>
              <p className="flex items-start space-x-2 mt-4 text-sm">
                <Image src="/icons/message_icon.svg" alt="email" width={16} height={16} className="mt-1" />
                <span className="break-all">business.northernhandicrafts@gmail.com</span>
              </p>
            </div>


          </div>


          {/* Vertical Separator - Hidden on mobile */}
          <div className="hidden lg:flex lg:col-span-3 justify-center">
            <Separator className="bg-border-dark" orientation="ver" />
          </div>

          {/* Horizontal Separator - Visible on mobile/tablet */}
          <div className="lg:hidden">
            <Separator className="bg-border-dark" orientation="horizontal" />
          </div>

          {/* LOGO + ABOUT + NEWSLETTER */}
          <div className="space-y-6 lg:col-span-5">
            {/* LOGO + ABOUT */}
            <div className="space-y-4">
              <Image src="/logo/logo_lite.png" alt="logo" width={150} height={54} className="w-32 md:w-[150px]" />
              <p className="text-sm leading-6 md:leading-7">
                Local Women&apos;s Handicrafts was founded by Northern. Our mission is to provide a living wage, empower, and educate artisans.
              </p>
            </div>

            {/* NEWSLETTER */}
            <div className="space-y-4">
              <h3 className="text-base md:text-lg font-semibold text-primary-foreground">Subscribe to our newsletter</h3>
              <div className="flex w-full gap-2">
                <input
                  type="email"
                  placeholder="Enter Email"
                  className="flex-1 px-3 py-2 bg-dark-black border-b-2 border-border-dark text-light-font text-sm md:text-base"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  className="bg-text-primary p-2 rounded-full flex items-center justify-center w-12 h-12 md:w-14 md:h-14 flex-shrink-0"
                  onClick={handleSubscribeNewsletter}
                  disabled={!email}
                >
                  <MdArrowOutward className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <Copyright />
      </Container>
    </footer>
  );
};

export default Footer;
