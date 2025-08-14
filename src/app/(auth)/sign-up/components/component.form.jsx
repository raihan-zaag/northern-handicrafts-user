"use client";

import { Form, Input, Divider, Spin, InputNumber } from "antd";
import Link from "next/link";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

import TopHeading from "@/components/common/topHeading";
import Typography from "@/components/Typography/component.typography";
import Button from "@/components/common/button";
import useSignUp from "@/hooks/auth/useSignup";
import InputLabel from "@/components/common/inputLabel";
import SocialLoginForm from "../../login/components/SocialLoginForm";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const router = useRouter();
  const { signUp, loading, error, responseData } = useSignUp();

  const onFinish = async (values) => {
    delete values.confirmPassword;

    if (!values?.mobileNumber) {
      delete values?.mobileNumber;
    }

    await signUp(values);
  };

  const handleGoToCheckoutPage = () => {
    if (cart?.length > 0) {
      router.push("/checkout");
    } else {
      router.push("/");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-4 md:p-0">
      <Spin fullscreen spinning={loading} />

      <div className="w-full max-w-[600px] bg-secondary p-8 px-4 sm:px-10 md:px-12 rounded border border-border pt-7">
        {/* Logo */}
        <div className="flex justify-center mb-6 ">
          <TopHeading />
        </div>

        <h2 className="text-2xl font-semibold text-left mb-2">Sign Up</h2>
        <p className="text-[#4A4A4A] text-left mb-6 font-light">
          Please fill up the form to sign up!
        </p>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="fullName"
            label={<InputLabel>Full Name</InputLabel>}
            rules={[{ required: true, message: "Please enter you full name" }]}
          >
            <Input placeholder="Enter your full name" className="h-[52px]" />
          </Form.Item>

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
          >
            <Input placeholder="Enter your email" className="h-[52px]" />
          </Form.Item>

          <Form.Item
            name="mobileNumber"
            label={<InputLabel>Phone Number</InputLabel>}
            rules={[
              {
                required: true,
                type: "text",
                message: "Please enter a valid phone number",
              },
            ]}
            className="w-full"
          >
            <Input
              placeholder="Enter phone number here"
              className="h-[52px] w-full"
              // style={{ padding: "8px 0", width: "100%" }}
              controls={false}
            />
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
                    className="text-primary"
                    color="#5D6B82"
                    style={{ height: "20px", width: "20px", cursor: "pointer" }}
                  />
                ) : (
                  <IoEyeOffOutline
                    className="text-primary"
                    color="#5D6B82"
                    style={{ height: "20px", width: "20px", cursor: "pointer" }}
                  />
                )
              }
              className="h-[52px]"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label={<InputLabel>Confirm Password</InputLabel>}
            rules={[
              {
                required: true,
                message: "Please re-enter your password!",
              },
              {
                min: 8,
                message: "Password must be at least 8 characters long.",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The new password that you entered does not match!"
                    )
                  );
                },
              }),
            ]}
            style={{ marginBottom: "34px" }}
          >
            <Input.Password
              placeholder="Min. 8 characters"
              iconRender={(visible) =>
                visible ? (
                  <IoEyeOutline
                    className="text-primary"
                    color="#5D6B82"
                    style={{ height: "20px", width: "20px", cursor: "pointer" }}
                  />
                ) : (
                  <IoEyeOffOutline
                    className="text-primary"
                    color="#5D6B82"
                    style={{ height: "20px", width: "20px", cursor: "pointer" }}
                  />
                )
              }
              className="h-[52px]"
            />
          </Form.Item>

          <Form.Item>
            <button
              htmltype="submit"
              className="w-full bg-primary text-white font-semibold h-[52px] rounded"
            >
              Sign Up
            </button>
          </Form.Item>
        </Form>

        <Divider>
          <Typography.SmallText>Or</Typography.SmallText>
        </Divider>

        {/* social login */}
        <SocialLoginForm />

        <p className="text-center text-sm mt-9">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary font-semibold hover:underline"
          >
            Sign in
          </Link>
        </p>

        <Divider>
          <Typography.SmallText>Or</Typography.SmallText>
        </Divider>

        {/* <Button type="outline" className={"w-full border-none"}>
          <Typography.BodyText color="text-light-font2">
            Continue as a guest
          </Typography.BodyText>
        </Button> */}
        <div
          className={"w-full border-none py-0 text-center cursor-pointer"}
          onClick={handleGoToCheckoutPage}
        >
          <Typography.BodyText color="text-light-font2" className={"py-0"}>
            Continue as a guest
          </Typography.BodyText>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
