// "use client";

// import React, { useEffect } from "react";
// import { Modal, Form, Input, Select, InputNumber } from "antd";
// import Button from "@/components/common/Button";
// import { useRouter } from "next/navigation";
// import { IoClose } from "react-icons/io5";
// import useCreateAddress from "@/hooks/address/useCreateAddress";
// import useGetAddress from "@/hooks/address/useGetUserAddress";
// import useUpdateAddress from "@/hooks/address/useUpdateAddress";

// const AddressModal = ({
//     open,
//     onClose,
//     isCreate,
//     selectedAddress,
//     setSelectedAddress,
//     onSubmit,
// }) => {
//     const [form] = Form.useForm();
//     const router = useRouter();

//     // const { createAddress } = useCreateAddress();
//     // const { updateAddress } = useUpdateAddress();
//     // const { fetchAddress } = useGetAddress();

//     useEffect(() => {
//         if (!isCreate && selectedAddress) {
//             form.setFieldsValue({
//                 title: selectedAddress?.title,
//                 country: selectedAddress?.country,
//                 state: selectedAddress?.state,
//                 city: selectedAddress?.city,
//                 zipCode: selectedAddress?.zipCode,
//                 street: selectedAddress?.street,
//             });
//         }
//     }, [isCreate, selectedAddress]);

//     const handleFinish = async (values) => {
//         // if (isCreate) {
//         //   // create new address
//         //   const res = await createAddress(values);
//         //   if (res) {
//         //     await fetchAddress();
//         //   }
//         // } else {
//         //   // Update address
//         //   updateAddress(selectedAddress?.id, values);
//         // }

//         onSubmit(values, isCreate, form);
//         onClose();
//         form.resetFields();
//         // router.refresh();
//     };

//     const handleCloseModal = () => {
//         form.resetFields();
//         onClose();
//         setSelectedAddress(null);
//         form.setFieldsValue({
//             title: "",
//             country: "",
//             state: "",
//             city: "",
//             zipCode: "",
//             street: "",
//         });
//     };

//     return (
//         <Modal
//             title={
//                 <div className="flex items-center justify-between">
//                     <p>Enter Address Details</p>
//                     <IoClose
//                         className="h-7 w-7 cursor-pointer"
//                         onClick={handleCloseModal}
//                     />
//                 </div>
//             }
//             open={open}
//             onCancel={handleCloseModal}
//             footer={null}
//             centered
//             closable={false}
//         >
//             <Form
//                 form={form}
//                 layout="vertical"
//                 onFinish={handleFinish}
//                 className="space-y-2"
//             >
//                 <Form.Item
//                     name="title"
//                     label="Address Name"
//                     rules={[
//                         {
//                             required: true,
//                             message: "Please enter your address title",
//                         },
//                     ]}
//                     className="w-full"
//                 >
//                     <Input
//                         placeholder="Enter address title here like - work, home .etc"
//                         style={{ height: "48px" }}
//                     />
//                 </Form.Item>

//                 {/* Country */}
//                 <div className="flex w-full gap-3">
//                     {/* <Form.Item
//                         name="country"
//                         label="Country"
//                         rules={[
//                             {
//                                 required: true,
//                                 message: "Please select your country",
//                             },
//                         ]}
//                         className="w-full"
//                     >
//                         <Input
//                             placeholder="Enter your country name"
//                             style={{ height: "48px" }}
//                         />
//                     </Form.Item> */}

//                     {/* District/State */}
//                     <Form.Item
//                         name="state"
//                         label="State"
//                         rules={[
//                             {
//                                 required: true,
//                                 message: "Please select your state",
//                             },
//                         ]}
//                         className="w-full"
//                     >
//                         <Input
//                             placeholder="Enter your state name"
//                             style={{ height: "48px" }}
//                         />
//                     </Form.Item>
//                 </div>

//                 {/* City/Area */}
//                 <div className="flex w-full gap-3">
//                     <Form.Item
//                         name="city"
//                         label="City"
//                         rules={[
//                             {
//                                 required: true,
//                                 message: "Please select your city",
//                             },
//                         ]}
//                         className="w-full"
//                     >
//                         <Input
//                             placeholder="Enter your city name"
//                             style={{ height: "48px" }}
//                         />
//                     </Form.Item>

//                     {/* ZIP/Postal Code */}
//                     <Form.Item
//                         name="zipCode"
//                         label="ZIP Code"
//                         rules={[
//                             {
//                                 type: "number",
//                                 required: true,
//                                 message: "Please enter your valid zip code",
//                             },
//                         ]}
//                         className="w-full"
//                     >
//                         <InputNumber
//                             min={0}
//                             placeholder="Enter zip code here"
//                             // className="py-6 w-full"
//                             style={{ padding: "8px 0", width: "100%" }}
//                             controls={false}
//                         />
//                     </Form.Item>
//                 </div>

//                 <Form.Item
//                     name="apartment"
//                     label="Apartment/Suite/Unit Info (Optional)"
//                     rules={[
//                         {
//                             required: false,
//                             message:
//                                 "Please enter your Apartment/Suite/Unit Info",
//                         },
//                     ]}
//                     className="w-full"
//                 >
//                     <Input
//                         placeholder="Enter Apartment/Suite/Unit Info here"
//                         style={{ height: "48px", marginBottom: "20px" }}
//                     />
//                 </Form.Item>

//                 {/* Street Address */}
//                 <Form.Item
//                     name="street"
//                     label="Street Address"
//                     rules={[
//                         {
//                             required: true,
//                             message: "Please enter your street address",
//                         },
//                     ]}
//                 >
//                     <Input.TextArea
//                         placeholder="e.g. Road no., Area, City, Zip code etc."
//                         className="h-12"
//                     />
//                 </Form.Item>

//                 {/* Submit Button */}
//                 <div className="flex items-start gap-3 pt-6">
//                     <Button
//                         type="outline"
//                         buttonType="button"
//                         className="flex-grow"
//                         onClick={handleCloseModal}
//                     >
//                         Cancel
//                     </Button>
//                     <Form.Item className="flex-grow">
//                         <Button
//                             type="primary"
//                             htmlType="submit"
//                             className="w-full"
//                         >
//                             Submit
//                         </Button>
//                     </Form.Item>
//                 </div>
//             </Form>
//         </Modal>
//     );
// };

// export default AddressModal;

"use client";

import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Select, InputNumber } from "antd";
import Button from "@/components/common/Button";
import { useRouter } from "next/navigation";
import { IoClose } from "react-icons/io5";
import statesData from "../../../libs/states.json";
import { IoIosArrowDown } from "react-icons/io";

const AddressModal = ({
    open,
    onClose,
    isCreate,
    selectedAddress,
    setSelectedAddress,
    onSubmit,
    totalAddressCount,
}) => {
    const [form] = Form.useForm();
    const router = useRouter();

    // Local state for city dropdown options
    const [availableCities, setAvailableCities] = useState([]);

    useEffect(() => {
        if (isCreate) {
            // When creating a new address, default title to "Address X"
            form.setFieldsValue({
                title: `Address ${totalAddressCount + 1}`,
            });
        } else if (selectedAddress) {
            // If editing an existing address, fill the fields
            form.setFieldsValue({
                title: selectedAddress?.title,
                // country: selectedAddress?.country,
                state: selectedAddress?.state,
                city: selectedAddress?.city,
                zipCode: selectedAddress?.zipCode,
                street: selectedAddress?.street,
                apartment: selectedAddress?.apartment,
            });

            // Also set the available cities if a state was provided
            if (selectedAddress?.state) {
                const matchedState = statesData.states.find(
                    (st) => st.name === selectedAddress.state
                );
                setAvailableCities(matchedState ? matchedState.cities : []);
            }
        }
    }, [isCreate, selectedAddress, totalAddressCount, form, open]);

    /**
     * If user picks a state manually, set the cities and clear city selection
     */
    const handleStateChange = (stateName) => {
        const matchedState = statesData.states.find(
            (st) => st.name === stateName
        );
        if (matchedState) {
            setAvailableCities(matchedState.cities);
        } else {
            setAvailableCities([]);
        }
        // Reset city field
        form.setFieldsValue({ city: null });
    };

    /**
     * If user enters ZIP first, attempt to auto-select state + city
     */
    const handleZipChange = (value) => {
        if (!value) {
            // Clear out fields if empty
            form.setFieldsValue({ state: null, city: null });
            setAvailableCities([]);
            return;
        }

        const zipString = value.toString();
        let foundState = null;
        let foundCity = null;

        for (const state of statesData.states) {
            for (const city of state.cities) {
                if (city.zip_codes.includes(zipString)) {
                    foundState = state;
                    foundCity = city;
                    break;
                }
            }
            if (foundState) break;
        }

        if (foundState && foundCity) {
            // Update the state and city fields
            form.setFieldsValue({
                state: foundState.name,
                city: foundCity.name,
            });
            // Update availableCities to the matched state's entire city list
            setAvailableCities(foundState.cities);
        } else {
            form.setFieldsValue({ state: null, city: null });
            setAvailableCities([]);
        }
    };

    /**
     * Submit form
     */
    const handleFinish = async (values) => {
        onSubmit(values, isCreate, form);
        onClose();
        form.resetFields();
        router.refresh(); // if needed
    };

    /**
     * Close modal
     */
    const handleCloseModal = () => {
        form.resetFields();
        onClose();
        setSelectedAddress(null);
        setAvailableCities([]);
    };

    return (
        <Modal
            title={
                <div className="flex items-center justify-between">
                    <p>Enter Address Details</p>
                    <IoClose
                        className="h-7 w-7 cursor-pointer"
                        onClick={handleCloseModal}
                    />
                </div>
            }
            open={open}
            onCancel={handleCloseModal}
            footer={null}
            centered
            closable={false}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
                className="space-y-2"
            >
                {/* Address Name */}
                <Form.Item
                    name="title"
                    label="Address Name"
                    rules={[
                        {
                            required: true,
                            message: "Please enter your address title",
                        },
                    ]}
                >
                    <Input
                        placeholder="e.g., Home, Work"
                        style={{ height: "48px" }}
                    />
                </Form.Item>

                {/* ZIP Code */}
                <Form.Item
                    name="zipCode"
                    label="ZIP Code"
                    rules={[
                        {
                            type: "number",
                            required: true,
                            message: "Please enter a valid ZIP code",
                        },
                    ]}
                >
                    <InputNumber
                        min={0}
                        placeholder="Enter zip code"
                        style={{
                            padding: "8px 0",
                            width: "100%",
                        }}
                        controls={false}
                        onChange={handleZipChange}
                    />
                </Form.Item>

                {/* State */}
                <Form.Item
                    name="state"
                    label="State"
                    rules={[
                        {
                            required: true,
                            message: "Please select your state",
                        },
                    ]}
                >
                    <Select
                        showSearch
                        placeholder="Select a state"
                        onChange={handleStateChange}
                        filterOption={(input, option) =>
                            (option?.label ?? "")
                                .toLowerCase()
                                .includes(input.toLowerCase())
                        }
                        options={statesData.states.map((st) => ({
                            label: st.name,
                            value: st.name,
                        }))}
                        style={{
                            width: "100%",
                            height: "48px",
                        }}
                        suffixIcon={
                            <IoIosArrowDown className="text-primary h-5 w-5" />
                        }
                    />
                </Form.Item>

                {/* City */}
                <Form.Item
                    name="city"
                    label="City"
                    rules={[
                        {
                            required: true,
                            message: "Please select your city",
                        },
                    ]}
                >
                    <Select
                        showSearch
                        placeholder="Select a city"
                        disabled={!availableCities.length}
                        filterOption={(input, option) =>
                            (option?.label ?? "")
                                .toLowerCase()
                                .includes(input.toLowerCase())
                        }
                        options={availableCities.map((city) => ({
                            label: city.name,
                            value: city.name,
                        }))}
                        style={{
                            width: "100%",
                            height: "48px",
                        }}
                        suffixIcon={
                            <IoIosArrowDown className="text-primary h-5 w-5" />
                        }
                    />
                </Form.Item>

                {/* Apartment/Suite Info (optional) */}
                <Form.Item
                    name="apartment"
                    label="Apartment/Suite/Unit Info (Optional)"
                >
                    <Input
                        placeholder="Apartment/Suite/Unit Info"
                        style={{ height: "48px", marginBottom: "20px" }}
                    />
                </Form.Item>

                {/* Street Address */}
                <Form.Item
                    name="street"
                    label="Street Address"
                    rules={[
                        {
                            required: true,
                            message: "Please enter your street address",
                        },
                    ]}
                >
                    <Input.TextArea
                        placeholder="e.g. Road no., Area etc."
                        className="h-12"
                    />
                </Form.Item>

                {/* Buttons */}
                <div className="flex items-start gap-3 pt-6">
                    <Button
                        type="outline"
                        buttonType="button"
                        className="flex-grow"
                        onClick={handleCloseModal}
                    >
                        Cancel
                    </Button>
                    <Form.Item className="flex-grow">
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="w-full"
                        >
                            Submit
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </Modal>
    );
};

export default AddressModal;
