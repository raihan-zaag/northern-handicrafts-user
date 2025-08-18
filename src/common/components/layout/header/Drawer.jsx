"use client";

import { useUserContext } from "@/contextProviders/userContextProvider";
import useGetCategories from "@/common/hooks/categories/useGetCategories";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/common/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { RxExit } from "react-icons/rx";
import { CgClose } from "react-icons/cg";
import { IMAGE_BASE_URL } from "@/common/config/constants/apiUrls";
import Icons from "@/public/icons";

const HeaderDrawer = ({ open, setOpen }) => {
  const router = useRouter();
  const pathname = usePathname(); // Get the current path

  const { categories, loading } = useGetCategories();
  const { user, logout, isAuthenticated } = useUserContext();

  // Extract "Men" and "Women" categories dynamically
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

  const menus = [{ name: "Home", link: "/" }];
  if (menCategory) {
    menus.push({
      name: menCategory.name,
      link: `/?category=${menCategory.id}`,
    });
  }
  if (womenCategory) {
    menus.push({
      name: womenCategory.name,
      link: `/?category=${womenCategory.id}`,
    });
  }
  menus.push({ name: "Track Order", link: "/track-order" });

  const isProfileActive = pathname?.includes("/profile/my-account");

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0">
        <SheetHeader className="px-6 py-4 border-b">
          <div className="flex items-center justify-between gap-5">
            {isAuthenticated ? (
              user &&
              (user?.profilePicture ? (
                <div className="flex items-center justify-center gap-3 cursor-pointer">
                  <div
                    className="flex items-center justify-center text-gray-500"
                    onClick={() => {
                      router.push("/profile/my-account");
                      setOpen(false);
                    }}
                  >
                    {/* Outer circle with border */}
                    <div className="w-10 h-10 rounded-full border-2 border-primary overflow-hidden">
                      <Image
                        height={1000}
                        width={1000}
                        quality={100}
                        src={`${IMAGE_BASE_URL}/${user?.profilePicture}`}
                        className="w-full h-full object-cover rounded-full"
                        alt="Profile picture"
                      />
                    </div>
                  </div>

                  <p className="text-base font-medium">{user?.fullName}</p>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-6 cursor-pointer">
                  <div
                    className="flex items-center justify-center gap-4"
                    onClick={() => {
                      router.push("/profile/my-account");
                      setOpen(false);
                    }}
                  >
                    {/* Outer circle with border */}
                    <div className="w-10 h-10 rounded-full border-2 border-primary overflow-hidden">
                      <Image
                        height={1000}
                        width={1000}
                        quality={100}
                        src={Icons.default_profile_pic}
                        alt="Profile picture"
                      />
                    </div>
                    <p className="text-base">{user?.fullName}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col">
                <p className="text-base leading-5 text-dark-black font-medium p-0 m-0">
                  OPTILUXE EYEWEAR
                </p>

                <p className="text-dark-black text-sm font-light">
                  Elevating your vision
                </p>
              </div>
            )}
          </div>
        </SheetHeader>
        <div className="flex flex-col items-start justify-start gap-4 h-full">
          <div className="flex flex-col  text-primary w-full">
            {menus.map((menu, index) => {
              const isActive =
                menu.link === "/"
                  ? pathname === "/"
                  : pathname.includes(menu.link);

              return (
                <Link
                  href={menu.link}
                  className={`text-sm font-semibold cursor-pointer border-b py-4 px-6 w-full flex items-center justify-between ${
                    isActive ? "text-primary " : "text-gray-500"
                  } text-gray-500`}
                  key={index}
                  onClick={() => setOpen(false)}
                >
                  <span
                    onClick={() => setOpen(false)}
                    className={`${isActive ? "text-primary " : "text-gray-500"}`}
                  >
                    {menu.name}
                  </span>
                  <IoIosArrowRoundForward
                    className={`w-6 h-6 ${
                      isActive ? "text-primary " : "text-gray-500"
                    }`}
                    onClick={() => setOpen(false)}
                  />
                </Link>
              );
            })}

            {user && (
              <Link
                href={`/profile/my-account`}
                className={`text-sm font-semibold cursor-pointer border-b py-4 px-6 w-full flex items-center justify-between ${
                  isProfileActive ? "text-primary " : "text-gray-500"
                } text-gray-500`}
                onClick={() => setOpen(false)}
              >
                <span
                  onClick={() => setOpen(false)}
                  className={`${
                    isProfileActive ? "text-primary " : "text-gray-500"
                  }`}
                >
                  My Profile
                </span>
                <IoIosArrowRoundForward
                  className={`w-6 h-6 ${
                    isProfileActive ? "text-primary " : "text-gray-500"
                  }`}
                  onClick={() => setOpen(false)}
                />
              </Link>
            )}
          </div>

          <div className="flex flex-col items-center justify-between w-full">
            {!isAuthenticated ? (
              <div className="flex flex-col items-center justify-between gap-4 w-full px-4">
                <button
                  className="py-2 px-0 text-white bg-primary w-full h-[48px] font-semibold border"
                  onClick={() => {
                    router.push("/login");
                    setOpen(false);
                  }}
                >
                  Log In
                </button>
                <button
                  className="border border-primary p- text-primary w-full h-[48px] font-semibold"
                  onClick={() => {
                    router.push("/sign-up");
                    setOpen(false);
                  }}
                >
                  Registration
                </button>
              </div>
            ) : (
              <div
                className="flex gap-3 p-3 pl-6 items-center justify-between w-full cursor-pointer "
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
              >
                <div className="flex gap-3 items-center">
                  <RxExit className={`text-red-500 h-4 w-4`} />
                  <p className="font-medium text-base text-red-500">Logout</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default HeaderDrawer;
