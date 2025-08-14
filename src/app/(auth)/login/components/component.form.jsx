"use client";

import React, { useEffect, useState } from "react";
import { Form, Input, Checkbox, Spin, Divider } from "antd";
import Link from "next/link";
import { getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

import {
  USER_INFO,
  USER_PERMISSION,
  USER_TOKEN,
} from "@/constants/cookiesKeys";
import Typography from "@/components/Typography/component.typography";
import TopHeading from "@/components/common/topHeading";
import useNotification from "@/hooks/useNotification";
import Button from "@/components/common/button";
import { handleLogin } from "./_action";
import { useUserContext } from "@/contextProviders/userContextProvider";
import { useCart } from "@/contextProviders/useCartContext";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import InputLabel from "@/components/common/inputLabel";
import SocialLoginForm from "./SocialLoginForm";

const SignIn = () => {
  const router = useRouter();

  const { setUser, setToken, setIsAuthenticated } = useUserContext();
  const { openErrorNotification, openSuccessNotification } = useNotification();
  const { handleUpdateCartInBackend, cart, getCartListForAuthUser } = useCart();

  const [redirectUrl, setRedirectUrl] = useState("/");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Get the redirect URL from the query parameters if it exists
    const params = new URLSearchParams(window.location.search);
    const redirect = params.get("redirect");

    // console.log(redirect);

    if (redirect) {
      setRedirectUrl(redirect);
    }
  }, []);

  const onFinish = async (values) => {
    setLoading(true);
    const response = await handleLogin(values);

    if (response?.error) {
      openErrorNotification("Error", response?.message);
    } else {
      openSuccessNotification("Success", response?.message);

      setUser(response.result.user); // set user info in the context immediately.
      setToken(response?.result?.token?.access);
      setIsAuthenticated(true);

      setCookie(USER_TOKEN, response?.result?.token?.access);
      setCookie(USER_INFO, response?.result?.user);
      setCookie(USER_PERMISSION, response?.result?.user?.roles);

      // cart update
      if (cart?.length > 0) {
        handleUpdateCartInBackend();
      } else {
        getCartListForAuthUser();
      }

      // check QueryParams and redirect.
      if (redirectUrl) {
        // handleUpdateCartInBackend();
        router.push(redirectUrl);
      } else {
        router.push("/");
      }
    }

    setLoading(false);
  };

  const handleGoToCheckoutPage = () => {
    if (cart?.length > 0) {
      router.push("/checkout");
    } else {
      router.push("/");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-scr bg-white my-[30px] md:my-[80px] p-4 md:p-0">
      <Spin fullscreen spinning={loading} />

      <div className="w-full max-w-[600px] bg-secondary p-8 px-4 sm:px-10 md:px-12 rounded border border-border">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <TopHeading />
        </div>

        <div className="mb-5">
          <h2 className="text-2xl font-semibold text-left mb-2">Sign In</h2>
          <span className="text-[#4A4A4A] text-left mb-6 font-light">
            Please fill up the form to sign in!
          </span>
        </div>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="email"
            label={<InputLabel>Email Id</InputLabel>}
            rules={[
              {
                required: true,
                type: "email",
                message: "Please enter a valid email",
              },
            ]}
            style={{ backgroundColor: "transparent" }}
          >
            <Input placeholder="Enter your email" className="h-[52px]" />
          </Form.Item>

          <Form.Item
            name="password"
            label={<InputLabel>Password</InputLabel>}
            rules={[
              {
                required: true,
                message: "Password must be at least 8 characters",
                min: 8,
              },
            ]}
          >
            <Input.Password
              placeholder="Min. 8 characters"
              iconRender={(visible) =>
                visible ? (
                  <IoEyeOutline
                    className="text-primary cursor-pointer h-10 w-10"
                    color="#5D6B82"
                    style={{ height: "20px", width: "20px", cursor: "pointer" }}
                  />
                ) : (
                  <IoEyeOffOutline
                    className="text-primary cursor-pointer  h-7 w-7"
                    color="#5D6B82"
                    style={{ height: "20px", width: "20px", cursor: "pointer" }}
                  />
                )
              }
              className="h-[52px]"
            />
          </Form.Item>

          <div className="flex items-center justify-between mb-4">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Keep me logged in</Checkbox>
            </Form.Item>
            <Link
              href="/forgot-password"
              className="text-xs md:text-sm text-primary underline font-semibold"
            >
              Forgot password?
            </Link>
          </div>

          <Form.Item>
            <button
              type="submit"
              className="w-full bg-primary text-white font-semibold h-[52px] rounded mt-5"
            >
              Sign In
            </button>
          </Form.Item>
        </Form>

        <div className="flex flex-col items-center justify-center gap-2">
          <Divider
            style={{
              margin: "10px 0px",
              padding: 0,
              color: "#000",
              // backgroundColor: "#fff",
            }}
          >
            <Typography.SmallText>Or</Typography.SmallText>
          </Divider>

          {/* Social login  */}
          <SocialLoginForm />

          <div className="flex flex-col gap-4 mt-9 w-full">
            <p className="text-center text-sm text-light-font2">
              Don’t have an account?{" "}
              <Link
                href="/sign-up"
                className="text-primary font-semibold hover:underline"
              >
                Sign Up
              </Link>
            </p>

            <Divider
              style={{
                margin: "0px 0px",
                padding: 0,
                color: "#000",
                // backgroundColor: "#fff",
              }}
            >
              <Typography.SmallText>Or</Typography.SmallText>
            </Divider>

            <p
              className={"w-full border-none py-0 text-center cursor-pointer"}
              onClick={handleGoToCheckoutPage}
            >
              <Typography.BodyText color="text-light-font2" className={"py-0"}>
                Continue as a guest
              </Typography.BodyText>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
