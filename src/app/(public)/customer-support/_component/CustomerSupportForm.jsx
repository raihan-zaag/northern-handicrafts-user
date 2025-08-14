"use client";

import React from "react";
import { Form, Input, InputNumber, Spin } from "antd";
import Button from "@/components/common/button";
import InputLabel from "@/components/common/inputLabel";
import Typography from "@/components/Typography/component.typography";
import useCreateContactInfo from "@/hooks/contactus/useContactUs";

const CustomerSupportForm = () => {
  const { createContact, loading } = useCreateContactInfo();
  const [form] = Form.useForm();

  const onFinish = async (data) => {
    const res = await createContact(data);

    if (res?.status === 201) {
      form.resetFields();
    }
  };

  return (
    <div className="p-3 sm:p-8 md:p-12">
      <Spin fullscreen spinning={loading} />

      {/* Logo */}
      <div className="flex flex-col justify-center mb-4 ">
        <p className="text-primary font-semibold text-2xl">Get In Touch</p>
        <p className="text-[#515151] text-sm md:text-base">
          You can reach out to us anytime from anywhere
        </p>
      </div>

      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          name="name"
          label={<InputLabel>Full Name</InputLabel>}
          rules={[{ required: true, message: "Please enter you full name" }]}
        >
          <Input placeholder="Enter full name here" className="h-[52px]" />
        </Form.Item>

        <Form.Item
          name="email"
          label={<InputLabel>Email id</InputLabel>}
          rules={[
            { required: true, message: "Please enter you email address." },
          ]}
        >
          <Input placeholder="username@mail.com" className="h-[52px]" />
        </Form.Item>

        <Form.Item
          name="mobileNumber"
          label={<InputLabel>Phone Number</InputLabel>}
          rules={[
            {
              required: true,
              message: "Please enter your phone number.",
            },
            {
              pattern: /^[0-9]+$/,
              message: "Phone number must contain only digits.",
            },
            {
              min: 10,
              max: 15,
              message: "Phone number must be between 10 and 15 digits.",
            },
            {
              validator: (_, value) => {
                if (value && !/^\+?[1-9]\d{9,14}$/.test(value)) {
                  return Promise.reject(
                    new Error("Please enter a valid phone number.")
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
          className="w-full"
        >
          <Input
            placeholder="Enter your phone number here"
            className="h-[52px] w-full"
            // style={{ padding: "10px 6px", width: "100%" }}
          />
        </Form.Item>

        <div className="flex flex-col gap-0">
          <Form.Item
            name="message"
            label={<InputLabel>Your Message</InputLabel>}
            rules={[
              {
                required: true,
                message: "Please write your message.",
              },
            ]}
            className="w-full"
            style={{ marginBottom: "5px" }}
          >
            <Input.TextArea
              placeholder="How can we help you?"
              className="h-[52px] w-full bg-red-200"
              showCount
              maxLength={500}
              style={{
                height: 120,
                resize: "none",
              }}
            />
          </Form.Item>
          <p className="font-normal text-[#8A8A8A]">
            Maximum 500 character long.
          </p>
        </div>

        <Button
          type="primary"
          htmlType="submit"
          className={"w-full border-none mt-4"}
        >
          <Typography.BodyText color="#ffffff" className={"font-semibold"}>
            Submit
          </Typography.BodyText>
        </Button>
      </Form>
    </div>
  );
};

export default CustomerSupportForm;
