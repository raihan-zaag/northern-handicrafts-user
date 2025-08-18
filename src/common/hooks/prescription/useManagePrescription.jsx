import { useState } from "react";
import { useManageSingleCartProduct } from "../cart/useManageSingleCartProduct";
import useGetSize from "../singleProduct/useGetSizes";

export const useManagePrescription = () => {
  const [prescriptionData, setPrescriptionData] = useState({});
  const [prescriptionDrawer, setPrescriptionDrawer] = useState(false);
  const [openPrescriptionModal, setOpenPrescriptionModal] = useState(false);

  const { productData, setTotalPrice, setCalculatePriceForSingleProduct } =
    useManageSingleCartProduct();
  const { sizeList } = useGetSize();

  // Add Prescrioption
  const handleAddPrescription = (data) => {
    setPrescriptionData({ ...prescriptionData, ...data });
  };

  // update Prescription
  const handleUpdatePrescription = (productId) => {};

  // remove Prescription
  const handleDeletePrescription = (productId) => {};

  const handleOpenClosePrescriptionModal = () => {
    setOpenPrescriptionModal(!openPrescriptionModal);
  };

  // const handleSizeChange = (e) => {
  //   // Update selected size
  //   setSelectedSize(e);
  //   console.log(e);

  //   // Recalculate the total price with the new size price
  //   setTotalPrice(() => {
  //     const basePrice =
  //       productData?.priceAfterDiscount ?? productData?.regularPrice;
  //     //   const colorPrice = selectedColor?.price || 0;
  //     const sizePrice = sizeList?.find((size) => size.value === e)?.price || 0;

  //     return basePrice + sizePrice;
  //   });

  //   setCalculatePriceForSingleProduct(() => {
  //     const basePrice =
  //       productData?.priceAfterDiscount ?? productData?.regularPrice;
  //     //   const colorPrice = selectedColor?.price || 0;
  //     const sizePrice = sizeList?.find((size) => size.value === e)?.price || 0;

  //     return basePrice + sizePrice;
  //   });
  // };

  return {
    prescriptionData,
    prescriptionDrawer,
    openPrescriptionModal,
    setPrescriptionData,
    handleAddPrescription,
    handleUpdatePrescription,
    handleDeletePrescription,
    handleOpenClosePrescriptionModal,
  };
};
