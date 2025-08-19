"use client";

import React, { useCallback, useState } from "react";
import Link from "next/link";
import { PiShoppingCart } from "react-icons/pi";
import { GoSearch } from "react-icons/go";
import { AiOutlineUser } from "react-icons/ai";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Container from "@/common/components/common/Container";
import Button from "@/common/components/common/Button";
import { useUserContext } from "@/contextProviders/userContextProvider";
import { useCart } from "@/contextProviders/useCartContext";
import CartDrawer from "@/sections/cart/Drawer";
import { debounce } from "@/utils";
import useGetCategories from "@/common/hooks/categories/useGetCategories";
import { IMAGE_BASE_URL } from "@/common/config/constants/apiUrls";
import Icons from "@/public/icons";
import HeaderDrawer from "./Drawer";
import { Input } from "@/common/components/ui/input";
import { 
  HOME_URL, 
  TRACK_ORDER_URL, 
  CATEGORY_URL, 
  PROFILE_MY_ACCOUNT_URL, 
  LOGIN_URL 
} from "@/common/config/constants/routes";

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

  const headerMenuItem = [{ name: "Home", link: HOME_URL }];
  if (menCategory) {
    headerMenuItem.push({
      name: menCategory?.name,
      link: CATEGORY_URL(menCategory?.id),
    });
  }
  if (womenCategory) {
    headerMenuItem.push({
      name: womenCategory?.name,
      link: CATEGORY_URL(womenCategory?.id),
    });
  }
  headerMenuItem.push({ name: "Track Order", link: TRACK_ORDER_URL });

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
      <div className="bg-primary text-light-font h-75px">
        <Container className="flex justify-between items-center  text-light-font py-4px">
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
          <div className="flex items-center justify-center gap-15px md:gap-26px relative">
            {/* Search */}
            <div
              className={`absolute right-24 sm:right-32 md:right-215px ${
                isAuthenticated ? "lg:right-274px" : "lg:right-56"
              } top-1/2 transform -translate-y-1/2 transition-all duration-300 ease-in-out ${
                showSearchInput ? "translate-x-0 opacity-100 sm:w-300px md:w-300px" : "translate-x-full opacity-0 w-0"
              }`}
            >
              {showSearchInput && (
                <Input
                  onChange={handleInputChange}
                  placeholder="Search..."
                  className="rounded h-48px p-4 bg-white text-sm text-black border border-border-input focus:outline-none w-full md:w-300px"
                />
              )}
            </div>
            <GoSearch
              className="w-5 h-5 cursor-pointer"
              onClick={() => {
                setShowSearchInput(!showSearchInput);
              }}
            />
            <div className="h-5 w-px bg-gray-mid2" />

            {isAuthenticated ? (
              <div
                className="hidden md:flex flex-row items-center justify-center gap-2 cursor-pointer"
                onClick={() => {
                  router.push(PROFILE_MY_ACCOUNT_URL);
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
                onClick={() => router.push(LOGIN_URL)}
                className={"hidden md:flex"}
              >
                SIGN IN
              </Button>
            )}

            <div className="relative">
              {cart?.length ? (
                <span className="absolute -top-2 -right-2 inline-flex items-center justify-center rounded-full bg-white text-black text-10px h-4 min-w-4 px-1">
                  {cart.length}
                </span>
              ) : null}
              <button onClick={handleToggleCartDrawer} aria-label="Open cart">
                <PiShoppingCart className="w-5 h-5 text-white" />
              </button>
            </div>
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
