"use client";

import React, { useCallback, useState } from "react";
import Link from "next/link";
import { PiShoppingCart } from "react-icons/pi";
import { GoSearch } from "react-icons/go";
import { AiOutlineUser } from "react-icons/ai";
import { Badge, Divider, Input } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Container from "@/components/common/container";
import Button from "../common/button";
import { useUserContext } from "@/contextProviders/userContextProvider";
import { useCart } from "@/contextProviders/useCartContext";
import DrawerComponent from "@/sections/cart/drawer";
import { debounce } from "@/utils";
import useGetCategories from "@/hooks/categories/useGetCategories";
import HeaderDrawer from "./drawer";
import { IMAGE_BASE_URL } from "@/constants/apiUrls";
import Icons from "../../../public/icons";

const HeaderComponent = () => {
  const router = useRouter();
  const paths = usePathname();

  const { isAuthenticated, user } = useUserContext();
  const { openCartDrawer, handleToggleCartDrawer, cart } = useCart();
  const searchParams = useSearchParams();
  const { categories, loading } = useGetCategories();

  const [inputValue, setInputValue] = useState("");
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [openNavigationDrawer, setOpenNavigationDrawer] = useState(false);

  // Extract "Men" and "Women" categories dynamically
  const isMenCategory = (category) => {
    const menKeywords = ["man", "male", "men", "Male"];
    return menKeywords.includes(category.name.toLowerCase());
  };

  const isWomenCategory = (category) => {
    const womenKeywords = ["woman", "female", "women", "Female"];
    return womenKeywords.includes(category.name.toLowerCase());
  };

  const menCategory = categories?.content?.find(isMenCategory);
  const womenCategory = categories?.content?.find(isWomenCategory);

  const headerMenuItem = [{ name: "Home", link: "/" }];
  if (menCategory) {
    headerMenuItem.push({
      name: menCategory?.name,
      link: `/?category=${menCategory?.id}`,
    });
  }
  if (womenCategory) {
    headerMenuItem.push({
      name: womenCategory?.name,
      link: `/?category=${womenCategory?.id}`,
    });
  }
  headerMenuItem.push({ name: "Track Order", link: "/track-order" });

  // Create a debounced function to update search params
  const debouncedUpdateSearch = useCallback(
    debounce((value) => {
      const newSearchParams = new URLSearchParams(searchParams);
      if (value) {
        newSearchParams.set("name", value);
        router.push(`/?${newSearchParams.toString()}`);
      } else {
        newSearchParams.delete("name");
        router.push(`${paths}`);
      }
    }, 1000), // Debounce delay of 1 second
    [paths, router, searchParams]
  );

  // Update local state and trigger the debounced search logic
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value); // Update local state immediately
    debouncedUpdateSearch(value); // Trigger debounced logic
  };

  return (
    <div className="">
      <div className="bg-primary text-light-font h-[75px]">
        <Container className="flex justify-between items-center  text-light-font py-[4px]">
          {/*Left Item*/}
          <div>
            <div className="hidden lg:flex flex-row justify-start items-center gap-9">
              {headerMenuItem?.map((item, index) => {
                return (
                  <Link href={item?.link} key={index}>
                    {item?.name}
                  </Link>
                );
              })}
            </div>

            <div
              className="flex lg:hidden"
              onClick={() => {
                setOpenNavigationDrawer(true);
              }}
            >
              <Image
                src={Icons.menuIcon}
                alt="Menu_icon"
                height={100}
                width={100}
                className="h-4 w-5"
                quality={100}
              />
            </div>
          </div>

          {/*Right Item */}
          <div className="flex items-center justify-center gap-[15px] md:gap-[26px] relative">
            {/* className="w-[260px] sm:w-[260px] md:w-[300px]"  */}
            <div
              className={`absolute right-24 sm:right-32 md:right-[215px] ${isAuthenticated ? "lg:right-[274px]" : "lg:right-56"
                } top-1/2 transform -translate-y-1/2 transition-all duration-300 ease-in-out ${showSearchInput
                  ? "translate-x-0 opacity-100 w-[270%] sm:w-[300px] md:w-[300px]"
                  : "translate-x-full opacity-0 w-0"
                }`}
            >
              {showSearchInput && (
                <Input
                  onChange={handleInputChange}
                  placeholder="Search..."
                  // className={`rounded h-[48px] p-4 bg-[#649695] text-sm border-none placeholder:text-white focus:outline-none w-full`}
                  className="rounded h-[48px] p-4 bg-[#fff] text-sm text-black border-none focus:outline-none w-[100%] md:w-[300px]"
                  style={{
                    backgroundColor: "#fff",
                    color: "#000",
                    border: "none",
                    "& ::placeholder": {
                      color: "#000",
                    },
                    width: "100%",
                    padding: "10px",
                    fontSize: "16px",
                  }}
                />
              )}
            </div>
            <GoSearch
              className="w-5 h-5 cursor-pointer"
              onClick={() => {
                setShowSearchInput(!showSearchInput);
              }}
            />
            <Divider
              orientation="center"
              type="vertical"
              style={{
                margin: 0,
                padding: 0,
                color: "#515151",
                backgroundColor: "#515151",
              }}
            />

            {isAuthenticated ? (
              <div
                className="hidden md:flex flex-row items-center justify-center gap-2 cursor-pointer"
                onClick={() => {
                  router.push("/profile/my-account");
                }}
              >
                {/* <Button
                  type="start-icon"
                  icon={AiOutlineUser}
                  className={"hidden md:flex"}
                /> */}
                {user?.profilePicture ? (
                  <Image
                    height={1000}
                    width={1000}
                    quality={100}
                    src={`${IMAGE_BASE_URL}/${user?.profilePicture}`}
                    className="w-10 h-10 object-cover rounded-full"
                    alt="Profile picture"
                  />
                ) : (
                  <Image
                    height={1000}
                    width={1000}
                    quality={100}
                    src={Icons.default_profile_pic}
                    alt="Profile_picture"
                    className="h-10 w-10"
                  />
                )}
                <p>{user?.fullName}</p>
              </div>
            ) : (
              <Button
                type="start-icon"
                icon={AiOutlineUser}
                onClick={() => router.push("/login")}
                className={"hidden md:flex"}
              >
                SIGN IN
              </Button>
            )}

            <Badge
              count={cart?.length || null}
              size="small"
              styles={{ marginBottom: "10px" }}
            >
              <button onClick={handleToggleCartDrawer}>
                <PiShoppingCart className="w-5 h-5 text-white" />
              </button>
            </Badge>
          </div>
        </Container>
      </div>

      {openCartDrawer && <DrawerComponent />}

      {openNavigationDrawer && (
        <HeaderDrawer
          open={openNavigationDrawer}
          setOpen={setOpenNavigationDrawer}
        />
      )}
    </div>
  );
};

export default HeaderComponent;
