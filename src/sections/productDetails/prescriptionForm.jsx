import Button from "@/components/common/button";
import InputLabel from "@/components/common/inputLabel";
import Typography from "@/components/Typography/component.typography";
import { useSingleCartProduct } from "@/contextProviders/useSingleCartProductProvider";
import useGetPrescription from "@/hooks/prescription/useGetPrescription";
import useGetSize from "@/hooks/singleProduct/useGetSizes";
import { Select, Form, Spin, Checkbox, Input, Popover } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import PrescriptionBreakdown from "./PrescriptionBreakdown";
import { useUserContext } from "@/contextProviders/userContextProvider";
import useGetColorList from "@/hooks/color/useGetColorList";
import { IoIosArrowDown } from "react-icons/io";

const PrescriptionForm = ({
    mode, // "create", "update", or "view"
    prescriptionInfo,
    onSubmit,
    handleSkipAddPrescription,
    onDelete,
    showPriceBreakDown = false,
    showButtons = false,
    readOnly = true,
    cartInfo = {},
}) => {
    const [form] = Form.useForm();
    const { isAuthenticated } = useUserContext();

    const { prescription, loading } = useGetPrescription();
    const { loading: sizeLoading, sizeList } = useGetSize();
    const { fetchColors, loading: getColorLoading, colors } = useGetColorList();

    const { handleSizeChange, selectedSize, selectedColor } =
        useSingleCartProduct();

    const [axisData, setAxisData] = useState([]);
    const [cylData, setCylData] = useState([]);
    const [pdData, setPdData] = useState([]);
    const [sphData, setSphData] = useState([]);

    const [is2DPd, setIs2DPd] = useState(false);
    const [lensPrice, setLensPrice] = useState({ label: "", price: 0 });
    const [colorPrice, setColorPrice] = useState({ label: "", price: 0 });

    useEffect(() => {
        if (prescriptionInfo) {
            // Set form values based on prescriptionInfo
            form.setFieldsValue(prescriptionInfo);

            // Check and set 2D PD if necessary
            if (
                prescriptionInfo?.leftPdDistance ||
                prescriptionInfo?.rightPdDistance
            ) {
                setIs2DPd(true);
            }
        }

        if (!loading && prescription) {
            // Helper function to process prescription data
            const processData = (content) =>
                content?.map((data) => ({
                    label: data?.value,
                    value: data?.value,
                    price: data?.price,
                })) || [];

            // Set processed data for prescription-related fields
            setAxisData(processData(prescription?.axis?.content));
            setCylData(processData(prescription?.cyl?.content));
            setSphData(processData(prescription?.sph?.content));
            setPdData(processData(prescription?.pd?.content));
        }

        // need to check up for update for auth user.
        if (mode === "create") {
            setColorPrice({
                label: selectedColor?.color?.name,
                price: selectedColor?.price,
            });

            const res = sizeList.find((size) => size?.value === selectedSize);
            setLensPrice(res);
        } else {
            if (isAuthenticated) {
                // console.log({ prescriptionInfo });
                const res = sizeList.find(
                    (size) => size?.value === prescriptionInfo?.productSize
                );

                setLensPrice(res);
            } else {
                const res = sizeList.find(
                    (size) =>
                        size?.value === cartInfo?.prescription?.productSize
                );

                setLensPrice(res);
            }

            if (cartInfo?.productColorId) {
                fetchColors(cartInfo?.productColorId);

                setColorPrice({
                    label: colors?.color?.name,
                    price: colors?.price,
                });
            } else {
                setColorPrice({
                    label: null,
                    price: 0,
                });
            }
        }
    }, [prescriptionInfo, form, loading, prescription]);

    // useEffect(() => {
    //   if (prescriptionInfo) {
    //     form.setFieldsValue(prescriptionInfo);

    //     if (
    //       prescriptionInfo?.leftPdDistance ||
    //       prescriptionInfo?.rightPdDistance
    //     ) {
    //       setIs2DPd(true);
    //     }
    //   }
    // }, [prescriptionInfo, form]);

    // useEffect(() => {
    //   if (!loading && prescription) {
    //     const processData = (content) =>
    //       content?.map((data) => ({
    //         label: data?.value,
    //         value: data?.value,
    //         price: data?.price,
    //       })) || [];

    //     setAxisData(processData(prescription?.axis?.content));
    //     setCylData(processData(prescription?.cyl?.content));
    //     setSphData(processData(prescription?.sph?.content));
    //     setPdData(processData(prescription?.pd?.content));
    //   }
    // }, [loading]);

    const handleFormSubmit = (values) => {
        values.productSize = selectedSize;
        if (onSubmit) {
            onSubmit(values);
            form.resetFields();
        }
    };

    const handle2PdDistance = useCallback(
        (e) => {
            setIs2DPd(e?.target?.checked);
        },
        [is2DPd]
    );

    const getPriceForValue = (allData, value) => {
        // console.log(allData, value);
        return allData.find((data) => data?.value === value);
    };

    const leftEyeSPH = Form.useWatch("leftEyeSPH", form);
    const leftEyeCYL = Form.useWatch("leftEyeCYL", form);
    const rightEyeSPH = Form.useWatch("rightEyeSPH", form);
    const rightEyeCYL = Form.useWatch("rightEyeCYL", form);
    const leftEyeAxis = Form.useWatch("leftEyeAxis", form);
    const rightEyeAxis = Form.useWatch("rightEyeAxis", form);
    const pdDistance = Form.useWatch("pdDistance", form);
    const leftPdDistance = Form.useWatch("leftPdDistance", form);
    const rightPdDistance = Form.useWatch("rightPdDistance", form);

    // Get price for each form value
    const prices = {
        "Left Eye - SPH": getPriceForValue(sphData, leftEyeSPH),
        "Left Eye - CYL": getPriceForValue(cylData, leftEyeCYL),
        "Right Eye - SPH": getPriceForValue(sphData, rightEyeSPH),
        "Right Eye - CYL": getPriceForValue(cylData, rightEyeCYL),
        "Left Eye - Axis": getPriceForValue(axisData, leftEyeAxis),
        "Right Eye - Axis": getPriceForValue(axisData, rightEyeAxis),
        "PD Distance": getPriceForValue(pdData, pdDistance),
        "Left - PD Distance": getPriceForValue(pdData, leftPdDistance),
        "Right - PD Distance": getPriceForValue(pdData, rightPdDistance),
        ...(colorPrice?.label && {
            color: { label: colorPrice.label, price: colorPrice.price },
        }),
        // color: { label: colorPrice?.label, price: colorPrice?.price },
        "lens-index": { label: lensPrice?.label, price: lensPrice?.price },
    };

    // Log all prices for debugging

    if (loading || sizeLoading || getColorLoading) {
        return (
            <Spin
                spinning={loading || sizeLoading || getColorLoading}
                fullscreen
            />
        );
    }

    return (
        <div className="prescription-form">
            {showPriceBreakDown && (
                <PrescriptionBreakdown
                    priceForValue={prices}
                    cartInfo={cartInfo}
                    mode={mode}
                />
            )}

            <Form
                form={form}
                layout="vertical"
                onFinish={handleFormSubmit}
                initialValues={mode === "create" ? {} : prescriptionInfo}
            >
                <Spin spinning={loading} fullscreen />

                {isAuthenticated && mode !== "view" ? (
                    <div className="mt-6">
                        <Form.Item
                            name="name"
                            label={
                                <div className="flex items-center">
                                    <InputLabel>Prescription Name</InputLabel>
                                    <Typography.BodyText className="text-sm font-medium">
                                        <span className="text-red-500">*</span>
                                    </Typography.BodyText>
                                </div>
                            }
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Please write a prescription name.",
                                },
                            ]}
                        >
                            <Input
                                type="text"
                                readOnly={readOnly}
                                placeholder="Please enter prescription name"
                            />
                        </Form.Item>
                    </div>
                ) : null}

                <div className="w-full my-4 flex flex-col gap-2">
                    <p className="text-primary text-base font-semibold">
                        Left Eye - OD
                    </p>
                    <div className="flex gap-2 w-full">
                        <Form.Item
                            name={"leftEyeSPH"}
                            label={<p className="font-semibold text-sm">SPH</p>}
                            rules={[
                                {
                                    required: false,
                                    message: "Please select SPH",
                                },
                            ]}
                            className="w-full"
                        >
                            <Select
                                suffixIcon={
                                    <IoIosArrowDown className="text-primary h-5 w-5" />
                                }
                                disabled={readOnly}
                                defaultValue={prescriptionInfo?.leftEyeSPH}
                                style={{ width: "100%", height: "48px" }}
                                options={sphData}
                                optionRender={(option) => {
                                    return (
                                        <div className="flex flex-row items-center justify-start gap-2">
                                            <p className="font-normal">
                                                {option.data.label}
                                            </p>
                                        </div>
                                    );
                                }}
                                placeholder="SPH"
                            />
                        </Form.Item>

                        <Form.Item
                            name={"leftEyeCYL"}
                            label={<p className="font-semibold text-sm">CYL</p>}
                            rules={[
                                {
                                    required: false,
                                    message: "Please select CYL",
                                },
                            ]}
                            className="w-full"
                        >
                            <Select
                                suffixIcon={
                                    <IoIosArrowDown className="text-primary h-5 w-5" />
                                }
                                disabled={readOnly}
                                style={{ width: "100%", height: "48px" }}
                                options={cylData}
                                optionRender={(option) => {
                                    return (
                                        <div className="flex flex-row items-center justify-start gap-2">
                                            <p className="font-normal">
                                                {option.data.label}
                                            </p>
                                        </div>
                                    );
                                }}
                                placeholder="CYL"
                            />
                        </Form.Item>

                        <Form.Item
                            name={"leftEyeAxis"}
                            label={
                                <p className="font-semibold text-sm">Axis</p>
                            }
                            rules={[
                                {
                                    required: false,
                                    message: "Please select Axis",
                                },
                            ]}
                            className="w-full"
                        >
                            <Select
                                suffixIcon={
                                    <IoIosArrowDown className="text-primary h-5 w-5" />
                                }
                                disabled={readOnly}
                                style={{ width: "100%", height: "48px" }}
                                options={axisData}
                                optionRender={(option) => {
                                    return (
                                        <div className="flex flex-row items-center justify-start gap-2">
                                            <p className="font-normal">
                                                {option.data.label}
                                            </p>
                                        </div>
                                    );
                                }}
                                placeholder="Axis"
                            />
                        </Form.Item>
                    </div>
                </div>

                <div className="w-full my-4 flex flex-col gap-2">
                    <p className="text-primary text-base font-semibold">
                        Right Eye - OD
                    </p>
                    <div className="flex gap-2 w-full">
                        <Form.Item
                            name={"rightEyeSPH"}
                            label={<p className="font-semibold text-sm">SPH</p>}
                            rules={[
                                {
                                    required: false,
                                    message: "Please select SPH",
                                },
                            ]}
                            className="w-full"
                        >
                            <Select
                                suffixIcon={
                                    <IoIosArrowDown className="text-primary h-5 w-5" />
                                }
                                disabled={readOnly}
                                style={{ width: "100%", height: "48px" }}
                                options={sphData}
                                optionRender={(option) => {
                                    return (
                                        <div className="flex flex-row items-center justify-start gap-2">
                                            <p className="font-normal">
                                                {option.data.label}
                                            </p>
                                        </div>
                                    );
                                }}
                                placeholder="SPH"
                            />
                        </Form.Item>

                        <Form.Item
                            name={"rightEyeCYL"}
                            label={<p className="font-semibold text-sm">CYL</p>}
                            rules={[
                                {
                                    required: false,
                                    message: "Please select CYL",
                                },
                            ]}
                            className="w-full"
                        >
                            <Select
                                suffixIcon={
                                    <IoIosArrowDown className="text-primary h-5 w-5" />
                                }
                                disabled={readOnly}
                                style={{ width: "100%", height: "48px" }}
                                options={cylData}
                                optionRender={(option) => {
                                    return (
                                        <div className="flex flex-row items-center justify-start gap-2">
                                            <p className="font-normal">
                                                {option.data.label}
                                            </p>
                                        </div>
                                    );
                                }}
                                placeholder="CYL"
                            />
                        </Form.Item>

                        <Form.Item
                            name={"rightEyeAxis"}
                            label={
                                <p className="font-semibold text-sm">Axis</p>
                            }
                            rules={[
                                {
                                    required: false,
                                    message: "Please select Axis",
                                },
                            ]}
                            className="w-full"
                        >
                            <Select
                                suffixIcon={
                                    <IoIosArrowDown className="text-primary h-5 w-5" />
                                }
                                disabled={readOnly}
                                style={{ width: "100%", height: "48px" }}
                                options={axisData}
                                optionRender={(option) => {
                                    return (
                                        <div className="flex flex-row items-center justify-start gap-2">
                                            <p className="font-normal">
                                                {option.data.label}
                                            </p>
                                        </div>
                                    );
                                }}
                                placeholder="Axis"
                            />
                        </Form.Item>
                    </div>
                </div>

                <div className="flex items-end justify-between pb-4">
                    <p className="text-base font-semibold">
                        Pupillary Distance (PD)
                    </p>

                    {readOnly ? (
                        <Checkbox checked={is2DPd}>2 PD Numbers</Checkbox>
                    ) : (
                        <Checkbox onClick={handle2PdDistance} checked={is2DPd}>
                            2 PD Numbers
                        </Checkbox>
                    )}
                </div>

                {is2DPd ? (
                    <div className="flex flex-row gap-6 w-full">
                        <Form.Item
                            name={"leftPdDistance"}
                            label={
                                <p className="text-primary text-sm font-semibold">
                                    Left PD
                                </p>
                            }
                            rules={[
                                {
                                    required: false,
                                    message: "Please select left PD Distance",
                                },
                            ]}
                            className="w-full"
                        >
                            <Select
                                suffixIcon={
                                    <IoIosArrowDown className="text-primary h-5 w-5" />
                                }
                                disabled={readOnly}
                                style={{ width: "100%", height: "48px" }}
                                options={pdData}
                                optionRender={(option) => {
                                    return (
                                        <div className="flex flex-row items-center justify-start gap-2">
                                            <p className="font-normal">
                                                {option.data.label}
                                            </p>
                                        </div>
                                    );
                                }}
                                placeholder="Left PD Distance"
                            />
                        </Form.Item>

                        <Form.Item
                            name={"rightPdDistance"}
                            label={
                                <p className="text-primary text-sm font-semibold">
                                    Right PD
                                </p>
                            }
                            rules={[
                                {
                                    required: false,
                                    message: "Please select right PD Distance",
                                },
                            ]}
                            className="w-full"
                        >
                            <Select
                                suffixIcon={
                                    <IoIosArrowDown className="text-primary h-5 w-5" />
                                }
                                disabled={readOnly}
                                style={{ width: "100%", height: "48px" }}
                                options={pdData}
                                optionRender={(option) => {
                                    return (
                                        <div className="flex flex-row items-center justify-start gap-2">
                                            <p className="font-normal">
                                                {option.data.label}
                                            </p>
                                        </div>
                                    );
                                }}
                                placeholder="Right PD Distance"
                            />
                        </Form.Item>
                    </div>
                ) : (
                    <Form.Item
                        name={"pdDistance"}
                        label={
                            <p className="text-primary text-sm font-semibold">
                                PD Distance
                            </p>
                        }
                        rules={[
                            {
                                required: false,
                                message: "Please select PD Distance",
                            },
                        ]}
                    >
                        <Select
                            suffixIcon={
                                <IoIosArrowDown className="text-primary h-5 w-5" />
                            }
                            disabled={readOnly}
                            style={{ width: "100%", height: "48px" }}
                            options={pdData}
                            optionRender={(option) => {
                                return (
                                    <div className="flex flex-row items-center justify-start gap-2">
                                        <p className="font-normal">
                                            {option.data.label}
                                        </p>
                                    </div>
                                );
                            }}
                            placeholder="PD Distance"
                        />
                    </Form.Item>
                )}

                {/* Product lens Index info */}
                {readOnly ? (
                    <div className="flex flex-col gap-y-3 mt-4">
                        <div className=" flex flex-col justify-between items-start gap-2 w-full pb-6">
                            <Typography.BodyText className="text-sm font-medium">
                                Lens Index{" "}
                                <span className="text-red-500">*</span>
                            </Typography.BodyText>
                            <div className="flex items-center justify-start gap-2 flex-wrap">
                                {sizeList?.map((size, index) => {
                                    return (
                                        <Popover
                                            title={null}
                                            content={
                                                <div className="flex flex-col items-start justify-start gap-1">
                                                    <p className="text-[#2A2A2A] text-base">
                                                        Index size :{" "}
                                                        {size?.label}
                                                    </p>
                                                    <p className="text-red-500">
                                                        $ ({size?.price})
                                                    </p>
                                                </div>
                                            }
                                            arrow={false}
                                            placement={"bottom"}
                                        >
                                            <div
                                                key={index}
                                                className={`p-2 ${
                                                    mode === "create"
                                                        ? size?.value ===
                                                          selectedSize
                                                            ? "text-blue-500 border-2 border-blue-400"
                                                            : ""
                                                        : size?.value ===
                                                          lensPrice?.label
                                                        ? "text-blue-500 border-2 border-blue-400"
                                                        : ""
                                                }`}
                                            >
                                                <p>{size?.label}</p>
                                            </div>
                                        </Popover>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col gap-y-3 mt-4">
                        <div className=" flex flex-col justify-between items-start gap-2 w-full pb-6">
                            <Typography.BodyText className="text-sm font-medium">
                                Lens Index{" "}
                                <span className="text-red-500">*</span>
                            </Typography.BodyText>
                            <div className="flex items-center justify-start gap-2 flex-wrap cursor-pointer">
                                {sizeList?.map((size, index) => {
                                    return (
                                        <Popover
                                            title={null}
                                            content={
                                                <div className="flex flex-col items-start justify-start gap-1">
                                                    <p className="text-[#2A2A2A] text-base">
                                                        Index size :{" "}
                                                        {size?.label}
                                                    </p>
                                                    {/* <p className="text-red-500">
                                                        $ ({size?.price})
                                                    </p> */}
                                                </div>
                                            }
                                            arrow={false}
                                            placement={"bottom"}
                                        >
                                            <div
                                                key={index}
                                                className={`p-2 ${
                                                    size?.value ===
                                                    lensPrice?.label
                                                        ? "text-blue-500 border-2 border-blue-400"
                                                        : ""
                                                }`}
                                                onClick={() => {
                                                    handleSizeChange(size);

                                                    setLensPrice(size);
                                                    if (mode === "update") {
                                                    }
                                                }}
                                            >
                                                <p>{size?.label}</p>
                                            </div>
                                        </Popover>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex gap-2 w-full my-6">
                    {/* {mode === "create" && showButtons && (
            <Button
              type="outline"
              className="w-full text-base font-semibold"
              htmlType="button"
              onClick={handleSkipAddPrescription}
            >
              No Prescription
            </Button>
          )} */}

                    {mode === "update" && showButtons && (
                        <Button
                            type="outline"
                            htmlType="button"
                            danger
                            className="w-full text-base font-semibold"
                            onClick={onDelete}
                        >
                            Delete Prescription
                        </Button>
                    )}

                    {showButtons ? (
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="w-full text-base font-semibold"
                        >
                            {mode === "create" || mode === "view"
                                ? "Add to Cart"
                                : "Update"}
                        </Button>
                    ) : null}
                </div>
            </Form>
        </div>
    );
};

export default PrescriptionForm;
