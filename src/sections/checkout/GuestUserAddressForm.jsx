"use client";

import { Form, Input, InputNumber, Select } from "antd";
import React from "react";

const GuestUserAddressForm = () => {
    const { Option } = Select;

    return (
        <div>
            <div>
                <Form.Item
                    name="fullName"
                    label="Full Name*"
                    rules={[
                        {
                            required: true,
                            message: "User fullname is required.",
                        },
                    ]}
                >
                    <Input
                        placeholder="Enter your fullname."
                        className="h-14"
                        style={{ fontSize: "16px" }}
                    />
                </Form.Item>
            </div>

            <div>
                <Form.Item
                    name="email"
                    label="Email address*"
                    rules={[
                        {
                            required: true,
                            message: "Email address is required.",
                        },
                        {
                            type: "email",
                            message: "Please enter a valid email address.",
                        },
                    ]}
                >
                    <Input
                        placeholder="Enter your email address."
                        className="h-14"
                        style={{ fontSize: "16px" }}
                    />
                </Form.Item>
            </div>

            <div>
                <Form.Item
                    name="mobileNumber"
                    label="Phone number"
                    rules={[
                        // { required: true, message: "Phone number is required" },
                        {
                            // pattern: /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/, // Only for USA
                            pattern: /^[+\d]?[0-9\s()-]*$/, // for all country
                            message: "Please enter a valid US phone number",
                        },
                        {
                            validator: (_, value) =>
                                value && value.length > 15
                                    ? Promise.reject(
                                          new Error(
                                              "Phone number cannot exceed 15 characters"
                                          )
                                      )
                                    : Promise.resolve(),
                        },
                    ]}
                >
                    <Input
                        placeholder="Enter your phone number."
                        className="h-14"
                        style={{ fontSize: "16px" }}
                        maxLength={15}
                    />
                </Form.Item>
            </div>
            <div className="flex flex-col md:flex-row gap-1 md:gap-4">
                <Form.Item
                    name="country"
                    label="Country*"
                    rules={[
                        {
                            required: true,
                            message: "Please select your country",
                        },
                    ]}
                    className="w-full"
                >
                    {/* <Select
            placeholder="Please Select your country"
            style={{ height: "48px", width: "100%" }}
          >
            <Option value="usa">USA</Option>
            <Option value="uk">UK</Option>
            <Option value="india">India</Option>
          </Select> */}
                    <Input
                        placeholder="Enter your country name"
                        style={{ height: "48px" }}
                    />
                </Form.Item>

                <Form.Item
                    name="state"
                    label="District/State*"
                    rules={[
                        { required: true, message: "Please select your state" },
                    ]}
                    className="w-full"
                >
                    {/* <Select
            placeholder="Please Select your District/State."
            style={{ height: "48px" }}
          >
            <Option value="state1">State 1</Option>
            <Option value="state2">State 2</Option>
          </Select> */}
                    <Input
                        placeholder="Enter your district/state name"
                        style={{ height: "48px" }}
                    />
                </Form.Item>
            </div>

            <div className="flex flex-col md:flex-row gap-1 md:gap-4">
                {/* City/Area */}
                <Form.Item
                    name="city"
                    label="City/Area*"
                    rules={[
                        {
                            required: true,
                            message: "Please select your city/area",
                        },
                    ]}
                    className="w-full"
                >
                    {/* <Select
            placeholder="Please select your city/area."
            style={{ height: "48px" }}
          >
            <Option value="Texas">Texas</Option>
            <Option value="Alaska">Alaska</Option>
            <Option value="California">California</Option>
            <Option value="Alabama">Alabama</Option>
          </Select> */}
                    <Input
                        placeholder="Enter your city/area name"
                        style={{ height: "48px" }}
                    />
                </Form.Item>

                {/* ZIP/Postal Code */}
                <Form.Item
                    name="zipCode"
                    label="ZIP/Postal Code*"
                    rules={[
                        {
                            required: true,
                            message: "Please enter your zip code",
                        },
                    ]}
                    className="w-full"
                >
                    {/* <Input
            placeholder="Please enter your zip code"
            style={{ height: "48px" }}
          /> */}
                    <InputNumber
                        min={0}
                        placeholder="Enter zip/postal code here"
                        // className="py-6 w-full"
                        style={{ padding: "8px 0", width: "100%" }}
                    />
                </Form.Item>
            </div>

            {/* Street Address */}
            <Form.Item
                name="street"
                label="Street Address*"
                rules={[
                    {
                        required: true,
                        message: "Please enter your street address",
                    },
                ]}
            >
                <Input.TextArea
                    placeholder="e.g. Road no., Area, City, Zip code etc."
                    className="h-20"
                    style={{ height: "120px" }}
                />
            </Form.Item>
        </div>
    );
};

export default GuestUserAddressForm;
