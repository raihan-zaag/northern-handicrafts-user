"use client";

import React, { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";

import useGetColorList from "@/hooks/color/useGetColorList";
import useGetPrescription from "@/hooks/prescription/useGetPrescription";
import useGetSize from "@/hooks/singleProduct/useGetSizes";
import { formatNumber } from "@/utils";

const PriceBreakdown = ({ cartInfo }) => {
  const [axisData, setAxisData] = useState([]);
  const [cylData, setCylData] = useState([]);
  const [pdData, setPdData] = useState([]);
  const [sphData, setSphData] = useState([]);

  const { sizeList, loading: sizeLoading } = useGetSize();
  const { fetchColors, colors, loading: colorLoading } = useGetColorList();
  const { prescription, loading: prescriptionLoading } = useGetPrescription();

  useEffect(() => {
    if (cartInfo && "productColorId" in cartInfo && cartInfo.productColorId) {
      fetchColors(cartInfo.productColorId);
    }
  }, []);

  useEffect(() => {
    if (!prescriptionLoading && prescription) {
      const processData = (content) =>
        content?.map((data) => ({
          label: data?.value,
          value: data?.value,
          price: data?.price,
        })) || [];

      setAxisData(processData(prescription?.axis?.content));
      setCylData(processData(prescription?.cyl?.content));
      setSphData(processData(prescription?.sph?.content));
      setPdData(processData(prescription?.pd?.content));
    }
  }, [prescriptionLoading]);

  const getPriceForValue = (allData, value) => {
    return allData.find((data) => data?.value === value);
  };

  // Get price for each form value
  const prices = {
    "Left Eye - SPH": getPriceForValue(
      sphData,
      cartInfo?.prescription?.leftEyeSPH
    ),
    "Left Eye - CYL": getPriceForValue(
      cylData,
      cartInfo?.prescription?.leftEyeCYL
    ),
    "Right Eye - SPH": getPriceForValue(
      sphData,
      cartInfo?.prescription?.rightEyeSPH
    ),
    "Right Eye - CYL": getPriceForValue(
      cylData,
      cartInfo?.prescription?.rightEyeCYL
    ),
    "Left Eye - Axis": getPriceForValue(
      axisData,
      cartInfo?.prescription?.leftEyeAxis
    ),
    "Right Eye - Axis": getPriceForValue(
      axisData,
      cartInfo?.prescription?.rightEyeAxis
    ),
    "PD Distance": getPriceForValue(pdData, cartInfo?.prescription?.pdDistance),
    "Left - PD Distance": getPriceForValue(
      pdData,
      cartInfo?.prescription?.leftPdDistance
    ),
    "Right - PD Distance": getPriceForValue(
      pdData,
      cartInfo?.prescription?.rightPdDistance
    ),
  };

  if (sizeLoading || prescriptionLoading || colorLoading) {
    return (
      <div className="flex items-center gap-2 text-sm text-foreground">
        <Spinner className="text-primary" />
        <span>Loading price breakdown...</span>
      </div>
    );
  }

  const calculateTotalPrice = () => {
    const basePrice = cartInfo.productBasePrice || 0;
    const sizePrice =
      sizeList.find((size) => size.value === cartInfo.prescription.productSize)
        ?.price || 0;

    const colorPrice =
      colors.id === String(cartInfo.productColorId) ? colors.price : 0;

    const prescriptionPrice = Object.values(prices)
      .filter((item) => item && item.price !== undefined)
      .reduce((total, item) => total + item.price, 0);

    return basePrice + sizePrice + colorPrice + prescriptionPrice;
  };

  const totalPrice = calculateTotalPrice();

  return (
    <div className="min-w-52">
      <h2 className="font-semibold text-sm mb-4">{cartInfo.productName}</h2>

      {/* Here, All price show when price will greater then 0. */}
      {/* Base price info */}
      <div className="flex flex-row items-center justify-between font-semibold text-sm mb-2">
        <p>Base Price:</p>
        <p>${formatNumber(cartInfo.productBasePrice)}</p>
      </div>

      {/* Lense info */}
      {sizeList.find((size) => size.value === cartInfo.prescription.productSize)
        ?.price > 0 && (
        <div className="flex flex-row items-center justify-between text-sm">
          <p>
            Lens Index (
            <span className="text-blue-500">
              {cartInfo.prescription.productSize}{" "}
            </span>
            )
          </p>
          <p>
            {
              sizeList.find(
                (size) => size.value === cartInfo.prescription.productSize
              )?.price
            }
          </p>
        </div>
      )}

      {/* Color info */}
      {cartInfo.productColorId && colors.price > 0 && (
        <div className="flex flex-row items-center justify-between text-sm">
          <p>
            Color : (
            <span className="text-blue-500">{cartInfo.productColor}</span>){" "}
          </p>
          <p> ${colors.price}</p>
        </div>
      )}

      {/* Prescription info */}
      {Object.entries(prices).map(
        ([key, item]) =>
          item &&
          item.price > 0 && ( // Check if item exists and price is greater than 0
            <div
              key={key}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "2px 0",
              }}
            >
              <span>
                {key} <span className="text-blue-500">({item.label})</span>
              </span>
              <span>+ ${item.price}</span>
            </div>
          )
      )}

      {/* Total and subtotal Info */}
  <div className="h-0.5 w-full bg-border-gray my-2" />
      <div className="flex flex-row items-center justify-between text-sm">
        <p>Subtotal Price Unit:</p>
        <p>${formatNumber(totalPrice)}</p>
      </div>

      <div className="flex flex-row items-center justify-between text-sm">
        <p>Quantity</p>
        <p>{cartInfo?.sellQty}</p>
      </div>

  <div className="h-0.5 w-full bg-border-gray my-2" />

      <div className="flex flex-row items-center justify-between text-sm">
        <p className="text-sm">Total Price</p>
        <p className="text-blue-500">
          $ {formatNumber(totalPrice * cartInfo?.sellQty)}
        </p>
      </div>
    </div>
  );
};

export default PriceBreakdown;
