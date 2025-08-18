"use client";

import React from "react";

import Link from "next/link";
import { RxExit } from "react-icons/rx";
import { usePathname, useRouter } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useUserContext } from "@/contextProviders/userContextProvider";
import { profileMenu } from "@/constants/common";
import { useCart } from "@/contextProviders/useCartContext";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { logout } = useUserContext();
  const { clearCart } = useCart();

  const handleLogout = () => {
    logout();
    clearCart();
    router.push("/");
  };

  const pageLabels = {
    "my-account": "My Account",
    "my-prescriptions": "Saved Prescription",
    address: "My Address",
    wishlist: "My Wishlist",
    "my-orders": "My Orders",
  };

  const pathSegment = pathname.split("/")[2]; // Extract the third segment

  const currentLabel = pageLabels[pathSegment] || "Unknown Page";

  const items = [
    {
      key: "1",
      label: (
        <div className="font-normal text-base text-[#2A2A2A] whitespace-nowrap  rounded-md">
          <div className="flex items-center justify-start gap-6">
            <p className="font-semibold text-sm md:text-base">{currentLabel}</p>
          </div>
        </div>
      ),
      children: (
        <div className="flex flex-col  gap-4 py-4">
          {profileMenu.map((menu, index) => (
            <Link key={index} href={menu.url}>
              <div
                className={`flex gap-2 px-5 items-center w-full py-3.5 duration-300 ${
                  pathname?.includes(menu.url)
                    ? "bg-light-font"
                    : "bg-transparent"
                }
                          }`}
              >
                <div className="flex gap-3 items-center">
                  {pathname?.includes(menu.url) ? menu.activeIcon : menu.icon}
                  <p
                    className={`font-medium text-base  ${
                      pathname?.includes(menu.url)
                        ? "text-primary"
                        : "text-[#6A6A6A]"
                    }`}
                  >
                    {menu.title}
                  </p>
                </div>
              </div>
            </Link>
          ))}
          <div
            onClick={handleLogout}
            className="flex gap-3 px-5 py-3.5 items-center w-full cursor-pointer"
          >
            <RxExit className={`text-red-500 h-4 w-4`} />
            <p className="font-medium text-base text-red-500">Logout</p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="lg:col-span-4 xl:col-span-3 h-full bg-background1">
      <div className="hidden lg:block bg-background1">
        <div className="px-6  flex flex-col gap-6">
          <div className="flex flex-col w-full">
            {profileMenu.map((menu, index) => (
              <Link key={index} href={menu.url}>
                <div
                  className={`flex gap-2 px-5 items-center w-full py-3.5 duration-300 ${
                    pathname?.includes(menu.url)
                      ? "bg-light-font"
                      : "bg-transparent"
                  }
                                    }`}
                >
                  <div className="flex gap-3 items-center">
                    {pathname?.includes(menu.url) ? menu.activeIcon : menu.icon}
                    <p
                      className={`font-medium text-base  ${
                        pathname?.includes(menu.url)
                          ? "text-primary"
                          : "text-[#6A6A6A]"
                      }`}
                    >
                      {menu.title}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
            <div
              onClick={handleLogout}
              className="flex gap-3 px-5 py-3.5 items-center w-full cursor-pointer"
            >
              <RxExit className={`text-red-500 h-4 w-4`} />
              <p className="font-medium text-base text-red-500">Logout</p>
            </div>
          </div>
        </div>
      </div>

      <div className="block lg:hidden">
        <Accordion type="single" collapsible className="border-none">
          <AccordionItem value="profile-menu" className="border-none">
            <AccordionTrigger className="font-semibold text-sm md:text-base text-[#2A2A2A] hover:no-underline">
              {currentLabel}
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-4 py-4">
                {profileMenu.map((menu, index) => (
                  <Link
                    key={index}
                    href={menu.link}
                    className={`flex items-center justify-start gap-6 px-4 py-2 rounded-md ${
                      pathname === menu.link
                        ? "bg-primary text-white"
                        : "text-[#2A2A2A] hover:bg-gray-100"
                    }`}
                  >
                    {React.createElement(menu.icon, {
                      className: `${
                        pathname === menu.link
                          ? "text-white"
                          : "text-[#2A2A2A]"
                      } h-4 w-4`,
                    })}
                    <p className="font-normal text-sm">{menu.title}</p>
                  </Link>
                ))}
                
                <div
                  onClick={handleLogout}
                  className="flex items-center justify-start gap-6 px-4 py-2 rounded-md cursor-pointer hover:bg-red-50"
                >
                  <RxExit className="text-red-500 h-4 w-4" />
                  <p className="font-medium text-base text-red-500">Logout</p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default Sidebar;
