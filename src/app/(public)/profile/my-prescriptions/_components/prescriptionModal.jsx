"use client";

import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Select, Checkbox } from "antd";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import Button from "@/components/common/Button";
import { useRouter } from "next/navigation";
import useGetSize from "@/hooks/singleProduct/useGetSizes";
import InputLabel from "@/components/common/InputLabel";
import useGetPrescription from "@/hooks/prescription/useGetPrescription";
import Typography from "@/components/Typography";

import useCreatePrescription from "@/hooks/prescription/useCreatePrescription";
import useGetPrescriptionList from "@/hooks/prescription/useGetPrescriptionsList";
import usePrescriptionUpdate from "@/hooks/prescription/useUpdatePrescription";
import useNotification from "@/hooks/useNotification";
import { IoClose } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";

const PrescriptionModal = ({
  open,
  onClose,
  isCreate,
  selectedPrescription,
  setSelectedPrescription,
}) => {
  const [form] = Form.useForm();
  const router = useRouter();

  const [axisData, setAxisData] = useState([]);
  const [cylData, setCylData] = useState([]);
  const [pdData, setPdData] = useState([]);
  const [sphData, setSphData] = useState([]);

  const [is2DPd, setIs2DPd] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);

  const { openErrorNotification } = useNotification();

  const { prescription, loading } = useGetPrescription();
  const { loading: sizeLoading, sizeList } = useGetSize();
  const { createPrescription, loading: createLoading } =
    useCreatePrescription();
  const { getPrescriptionList, loading: getPrescriptionLoading } =
    useGetPrescriptionList();
  const { updatePrescription, loading: updateLoading } =
    usePrescriptionUpdate();

  useEffect(() => {
    setSelectedSize(null);
    if (!isCreate && selectedPrescription) {
      form.setFieldsValue(selectedPrescription);
      setSelectedSize(selectedPrescription.productSize);
    }

    if (
      selectedPrescription?.leftPdDistance ||
      selectedPrescription?.rightPdDistance
    ) {
      setIs2DPd(true);
    }
  }, [selectedPrescription, form]);

  useEffect(() => {
    const processData = (content) =>
      content?.map((data) => ({
        label: data?.value,
        value: data?.value,
        price: data?.price,
      })) || [];
    if (!loading && prescription) {
      setAxisData(processData(prescription?.axis?.content));
      setCylData(processData(prescription?.cyl?.content));
      setSphData(processData(prescription?.sph?.content));
      setPdData(processData(prescription?.pd?.content));
    }
  }, [loading]);

  const handleCloseModal = () => {
    onClose();
    form.resetFields();

    setSelectedPrescription(null);
    setIs2DPd(false);
    setSelectedSize(null);
  };

  const handleFinish = async (values) => {
    values.productSize = selectedSize;
    values.active = true;

    if (!selectedSize) {
      openErrorNotification("error", "Please select a lens index.");
      return;
    }

    if (isCreate) {
      // create new Prescription
      const res = await createPrescription(values);
      if (res?.status === 201) {
        router.refresh();
        handleCloseModal();
      }
    } else {
      // Update address
      const res = await updatePrescription(selectedPrescription?.id, values);

      if (res?.status === 200) {
        router.refresh();
        handleCloseModal();
      }
    }

    await getPrescriptionList();
    // router.refresh();

    // handleCloseModal();
  };

  const handle2PdDistance = (e) => {
    setIs2DPd(e?.target?.checked);
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size?.value);
  };

  if (loading || sizeLoading || getPrescriptionLoading || updateLoading) {
    return (
      <Spin
        fullscreen
        spinning={
          loading || sizeLoading || getPrescriptionLoading || updateLoading
        }
      />
    );
  }

  return (
    <Modal
      title={
        <div className="flex items-center justify-between border-b pb-4">
          <p>{isCreate ? "Add new Prescription " : "Edit Prescription"}</p>
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
      closeIcon={<h1>sdf</h1>}
    >
      <LoadingOverlay isLoading={createLoading}>
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <div className="mt-4">
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
              { required: true, message: "Please write a prescription name." },
            ]}
          >
            <Input type="text" placeholder="Enter prescription name" />
          </Form.Item>
        </div>

        <div className="w-full flex flex-col gap-2">
          <p className="text-primary text-xs sm:text-sm md:text-base font-semibold">
            Left Eye - OD
          </p>
          <div className="flex gap-2 w-full">
            <Form.Item
              name={"leftEyeSPH"}
              label={<p className="font-semibold text-xs sm:text-sm">SPH</p>}
              rules={[{ required: false, message: "Please select SPH" }]}
              className="w-full"
            >
              <Select
                style={{ width: "100%", height: "48px" }}
                options={sphData}
                suffixIcon={<IoIosArrowDown className="text-primary h-5 w-5" />}
                optionRender={(option) => {
                  // console.log({ selectedSize, option });
                  return (
                    <div className="flex flex-row items-center justify-start gap-2">
                      <p className="font-normal">{option.data.label}</p>
                      <p className="font-light text-red-500 text-sm">
                        $ ({option.data.price})
                      </p>
                    </div>
                  );
                }}
                placeholder="SPH"
              />
            </Form.Item>

            <Form.Item
              name={"leftEyeCYL"}
              label={<p className="font-semibold text-xs sm:text-sm">CYL</p>}
              rules={[{ required: false, message: "Please select CYL" }]}
              className="w-full"
            >
              <Select
                suffixIcon={<IoIosArrowDown className="text-primary h-5 w-5" />}
                style={{ width: "100%", height: "48px" }}
                options={cylData}
                optionRender={(option) => {
                  // console.log({ selectedSize, option });
                  return (
                    <div className="flex flex-row items-center justify-start gap-2">
                      <p className="font-normal">{option.data.label}</p>
                      <p className="font-light text-red-500 text-sm">
                        $ ({option.data.price})
                      </p>
                    </div>
                  );
                }}
                placeholder="CYL"
              />
            </Form.Item>

            <Form.Item
              name={"leftEyeAxis"}
              label={<p className="font-semibold text-xs sm:text-sm">Axis</p>}
              rules={[{ required: false, message: "Please select Axis" }]}
              className="w-full"
            >
              <Select
                suffixIcon={<IoIosArrowDown className="text-primary h-5 w-5" />}
                style={{ width: "100%", height: "48px" }}
                options={axisData}
                optionRender={(option) => {
                  // console.log({ selectedSize, option });
                  return (
                    <div className="flex flex-row items-center justify-start gap-2">
                      <p className="font-normal">{option.data.label}</p>
                      <p className="font-light text-red-500 text-sm">
                        $ ({option.data.price})
                      </p>
                    </div>
                  );
                }}
                placeholder="Axis"
              />
            </Form.Item>
          </div>
        </div>

        <div className="w-full flex flex-col gap-2">
          <p className="text-primary text-xs sm:text-sm md:text-base font-semibold">
            Right Eye - OD
          </p>
          <div className="flex gap-2 w-full">
            <Form.Item
              name={"rightEyeSPH"}
              label={<p className="font-semibold text-xs sm:text-sm">SPH</p>}
              rules={[{ required: false, message: "Please select SPH" }]}
              className="w-full"
            >
              <Select
                suffixIcon={<IoIosArrowDown className="text-primary h-5 w-5" />}
                style={{ width: "100%", height: "48px" }}
                options={sphData}
                optionRender={(option) => {
                  // console.log({ selectedSize, option });
                  return (
                    <div className="flex flex-row items-center justify-start gap-2">
                      <p className="font-normal">{option.data.label}</p>
                      <p className="font-light text-red-500 text-sm">
                        $ ({option.data.price})
                      </p>
                    </div>
                  );
                }}
                placeholder="SPH"
              />
            </Form.Item>

            <Form.Item
              name={"rightEyeCYL"}
              label={<p className="font-semibold text-xs sm:text-sm">CYL</p>}
              rules={[{ required: false, message: "Please select CYL" }]}
              className="w-full"
            >
              <Select
                suffixIcon={<IoIosArrowDown className="text-primary h-5 w-5" />}
                style={{ width: "100%", height: "48px" }}
                options={cylData}
                optionRender={(option) => {
                  // console.log({ selectedSize, option });
                  return (
                    <div className="flex flex-row items-center justify-start gap-2">
                      <p className="font-normal">{option.data.label}</p>
                      <p className="font-light text-red-500 text-sm">
                        $ ({option.data.price})
                      </p>
                    </div>
                  );
                }}
                placeholder="CYL"
              />
            </Form.Item>

            <Form.Item
              name={"rightEyeAxis"}
              label={<p className="font-semibold text-xs sm:text-sm">Axis</p>}
              rules={[{ required: false, message: "Please select Axis" }]}
              className="w-full"
            >
              <Select
                suffixIcon={<IoIosArrowDown className="text-primary h-5 w-5" />}
                style={{ width: "100%", height: "48px" }}
                options={axisData}
                optionRender={(option) => {
                  // console.log({ selectedSize, option });
                  return (
                    <div className="flex flex-row items-center justify-start gap-2">
                      <p className="font-normal">{option.data.label}</p>
                      <p className="font-light text-red-500 text-sm">
                        $ ({option.data.price})
                      </p>
                    </div>
                  );
                }}
                placeholder="Axis"
              />
            </Form.Item>
          </div>
        </div>

        <div className="flex items-center justify-between pb-4">
          <p className="text-xs sm:text-sm md:text-base font-semibold">
            Pupillary Distance (PD)
          </p>

          <Checkbox onClick={handle2PdDistance} checked={is2DPd}>
            <p className="text-xs sm:text-sm md:text-sm font-semibold whitespace-nowrap flex items-center">
              2 PD <span className="hidden sm:block">&nbsp;Numbers</span>
            </p>
          </Checkbox>
        </div>

        {is2DPd ? (
          <div className="flex flex-col sm:flex-row gap-0 sm:gap-6 w-full">
            <Form.Item
              name={"leftPdDistance"}
              label={
                <p className="text-primary text-xs sm:text-sm font-semibold">
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
                suffixIcon={<IoIosArrowDown className="text-primary h-5 w-5" />}
                style={{ width: "100%", height: "48px" }}
                options={pdData}
                optionRender={(option) => {
                  // console.log({ selectedSize, option });
                  return (
                    <div className="flex flex-row items-center justify-start gap-2">
                      <p className="font-normal">{option.data.label}</p>
                      <p className="font-light text-red-500 text-sm">
                        $ ({option.data.price})
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
                <p className="text-primary text-xs sm:text-sm font-semibold">
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
                suffixIcon={<IoIosArrowDown className="text-primary h-5 w-5" />}
                style={{ width: "100%", height: "48px" }}
                options={pdData}
                optionRender={(option) => {
                  // console.log({ selectedSize, option });
                  return (
                    <div className="flex flex-row items-center justify-start gap-2">
                      <p className="font-normal">{option.data.label}</p>
                      <p className="font-light text-red-500 text-sm">
                        $ ({option.data.price})
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
              <p className="text-primary text-sm font-semibold">PD Distance</p>
            }
            rules={[{ required: false, message: "Please select PD Distance" }]}
          >
            <Select
              suffixIcon={<IoIosArrowDown className="text-primary h-5 w-5" />}
              style={{ width: "100%", height: "48px" }}
              options={pdData}
              optionRender={(option) => {
                // console.log({ selectedSize, option });
                return (
                  <div className="flex flex-row items-center justify-start gap-2">
                    <p className="font-normal">{option.data.label}</p>
                    <p className="font-light text-red-500 text-sm">
                      $ ({option.data.price})
                    </p>
                  </div>
                );
              }}
              placeholder="PD Distance"
            />
          </Form.Item>
        )}

        {/* Product lens Index info */}

        <div className="flex flex-col gap-y-3">
          <div className=" flex flex-col justify-between items-start gap-2 w-full">
            <Typography.BodyText className="text-sm font-medium">
              Lens Index <span className="text-red-500">*</span>
            </Typography.BodyText>

            <div className="flex items-center justify-start gap-2 flex-wrap cursor-pointer">
              {sizeList?.map((size, index) => {
                return (
                  <div
                    key={index}
                    className={`p-2 ${
                      size?.value === selectedSize
                        ? "text-blue-500 border-2 border-blue-400"
                        : ""
                    }`}
                    onClick={() => {
                      handleSizeChange(size);
                    }}
                  >
                    <p>{size?.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex gap-2 w-full mt-6">
          {
            <Button
              type="primary"
              htmlType="submit"
              className="w-full text-base font-semibold"
            >
              {isCreate ? "Create" : "Update"}
            </Button>
          }
        </div>
        </Form>
      </LoadingOverlay>
    </Modal>
  );
};

export default PrescriptionModal;
