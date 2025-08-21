"use client";
import { useCallback, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useUserContext } from "@/contextProviders/userContextProvider";
import { useCart } from "@/contextProviders/useCartContext";
import useGetCategories from "@/common/hooks/categories/useGetCategories";
import { IMAGE_BASE_URL } from "@/common/config/constants/apiUrls";
import Icons from "@/public/icons";
import HeaderDrawer from "./Drawer";
import { Input } from "@/common/components/ui/input";
import {
  PROFILE_MY_ACCOUNT_URL,
  LOGIN_URL
} from "@/common/config/constants/routes";
import { getHeaderMenuItems } from "@/common/config/constants/headerMenuItems";
import { Menu, Search, ShoppingCart, UserRound } from "lucide-react";
import { cn, debounce } from "@/common/lib/utils";
import DrawerComponent from "@/sections/cart/Drawer";
import Container from "../../shared/Container";

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

  // Get header menu items from configuration
  const headerMenuItem = getHeaderMenuItems(categories);

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
      <div className="bg-background h-75px">
        <Container className="flex justify-between items-center py-4px">

          <Image
            src="/logo/brand_logo.png"
            alt="Brand Logo"
            width={100}
            height={54}
            className="hover:opacity-80 transition-opacity"
            priority
          />
          {/*Left Item*/}
          <div>
            <div className="hidden lg:flex flex-row justify-start items-center gap-9">
              {headerMenuItem?.map((item, index) => {
                return (
                  <Link href={item?.link} key={index}
                    className="hover:text-primary transition-colors duration-300  font-medium"
                  >
                    {item?.name}
                  </Link>
                );
              })}
            </div>


          </div>

          {/*Right Item */}
          <div className="flex items-center justify-center gap-15px md:gap-6 relative">
            {/* Search */}
            <div
              className="flex lg:hidden"
              onClick={() => {
                setOpenNavigationDrawer(true);
              }}
            >
              <Menu className="size-5" />
            </div>
            <div
              className={cn(
                "absolute right-24 sm:right-32 md:right-215px top-1/2 transform -translate-y-1/2 transition-all duration-300 ease-in-out",
                isAuthenticated ? "lg:right-274px" : "lg:right-56",
                showSearchInput ? "translate-x-0 opacity-100 w-200px md:w-300px" : "translate-x-full opacity-0 w-0"
              )}
            >
              {showSearchInput && (
                <Input
                  onChange={handleInputChange}
                  placeholder="Search..."
                  className="rounded h-48px p-4 bg-white text-sm text-black border border-border-input focus:outline-none w-full md:w-300px"
                />
              )}
            </div>
            <Search
              className="size-5 cursor-pointer hover:text-primary transition-colors duration-300"
              onClick={() => {
                setShowSearchInput(!showSearchInput);
              }}
            />

            {isAuthenticated ? (
              <div
                className="hidden md:flex flex-row items-center justify-center gap-2 cursor-pointer"
                onClick={() => {
                  router.push(PROFILE_MY_ACCOUNT_URL);
                }}
              >
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

              <UserRound className="hidden md:flex size-5 cursor-pointer hover:text-primary transition-colors duration-300"
                onClick={() => router.push(LOGIN_URL)}
              />

            )}

            <div className="relative cursor-pointer hover:text-primary transition-colors duration-300">
              {cart?.length ? (
                <span className="absolute -top-1 -right-6 inline-flex items-center justify-center rounded-full text-xxs h-4 min-w-4 px-1 font-semibold">
                  ( {cart.length} )
                </span>
              ) : null}
              <button onClick={handleToggleCartDrawer} aria-label="Open cart">
                <ShoppingCart className="size-5" />
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
