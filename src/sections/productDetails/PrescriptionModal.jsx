"use client";

import React, { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { IoCloseOutline } from "react-icons/io5";
import { useUserContext } from "@/contextProviders/userContextProvider";
import { usePrescription } from "@/contextProviders/usePrescriptionProvider";
import useGetPrescriptionList from "@/hooks/prescription/useGetPrescriptionsList";
import { useRouter } from "next/navigation";
import Button from "@/components/common/Button";
import useNotification from "@/hooks/useNotification";
import { IoIosArrowDown } from "react-icons/io";
import { useSingleCartProduct } from "@/contextProviders/useSingleCartProductProvider";
import PrescriptionForm from "./PrescriptionForm";

const PrescriptionModal = ({
  open,
  mode = "create",
  prescriptionInfo,
  handleModalOpenClose,
  handleSetPrescriptionInfo,
  handleSkipAddPrescription,
  handleDeletePrescription,
  cartInfo = {},
}) => {
  const router = useRouter();
  const { isAuthenticated } = useUserContext();
  const { openInfoNotification } = useNotification();

  const [selectedPrescriptionData, setSelectedPrescriptionData] = useState({});

  const {
    isCreatePrescriptionModal,
    isSelectPrescription,
    setIsSelectPrescription,
    handleCreateOpenPrescriptionModal,
  } = usePrescription();
  const { prescriptionList, getPrescriptionList, loading } =
    useGetPrescriptionList();
  const { setSelectedSize } = useSingleCartProduct();

  useEffect(() => {
    if (isAuthenticated) {
      getPrescriptionList();
    }

    setIsSelectPrescription(false);
  }, []);

  // update prescription for auth user.
  useEffect(() => {
    if (mode === "update" && isAuthenticated) {
      const userPrescription = prescriptionList?.find(
        (presc) => presc?.value === prescriptionInfo?.name
      );

      if (userPrescription) {
        setSelectedPrescriptionData(userPrescription?.totalValue);
        setIsSelectPrescription(true);
      }
    }
  }, [mode, isAuthenticated, prescriptionList]);

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     // Fetch the prescription list
  //     getPrescriptionList();

  //     // If the mode is "update," find and set the user's prescription
  //     if (mode === "update") {
  //       const userPrescription = prescriptionList?.find(
  //         (presc) => presc?.value
  //       );

  //       if (userPrescription) {
  //         setSelectedPrescriptionData(userPrescription?.totalValue);
  //         console.log(userPrescription);
  //         setIsSelectPrescription(true);
  //       }
  //     } else {
  //       // Reset prescription selection for other modes
  //       setIsSelectPrescription(false);
  //     }
  //   }
  // }, [mode, isAuthenticated]);

  const handleSelectPrescription = (value) => {
    setIsSelectPrescription(true);

    const _selectedPrescription = prescriptionList?.find(
      (prescription) => prescription?.value === value
    );

    setSelectedPrescriptionData(_selectedPrescription?.totalValue);

    // set selected size for auth user. To show in price breakdown section correctly.
    setSelectedSize(_selectedPrescription?.totalValue?.productSize);
  };

  const handleIsPrescriptionEmpty = () => {
    return !Object.keys(selectedPrescriptionData).length;
  };

  const buttonsForAuthUser = handleIsPrescriptionEmpty() ? (
    <div className="flex gap-4 w-full mt-5">
      {/* <Button
        type="outline"
        className={"w-full"}
        onClick={() => {
          if (isAuthenticated && mode === "update") {
            handleDeletePrescription();
          } else {
            handleSkipAddPrescription();
          }
        }}
      >
        No Prescription
      </Button> */}
      <Button
        type="primary"
        className={"w-full"}
        onClick={() => {
          if (handleIsPrescriptionEmpty()) {
            openInfoNotification("info", "Please select a prescription");
          }
        }}
      >
        Confirm
      </Button>
    </div>
  ) : null;

  return (
    <LoadingOverlay isLoading={loading}>
      <Sheet open={open} onOpenChange={(open) => !open && handleModalOpenClose()}>
  <SheetContent className="w-600px sm:max-w-600px">
          <SheetHeader>
            <div className="flex items-center justify-between border-b pb-2">
              <SheetTitle>My Prescription</SheetTitle>
              <button
                onClick={() => {
                  // handleSkipAddPrescription();
                  handleModalOpenClose();
                }}
              >
                <IoCloseOutline className="h-8 w-8" />
              </button>
            </div>
          </SheetHeader>
          <div className="mt-4">{/* Content will continue here */}
      {mode === "create" ? (
        isAuthenticated ? (
          <div className="flex flex-col gap-2">
            {isCreatePrescriptionModal ? null : (
              <div className="flex flex-col gap-2">
                <div className="flex flex-row items-center justify-between">
                  <p>Select Prescription</p>
                  {isCreatePrescriptionModal ||
                  Object.keys(selectedPrescriptionData).length > 0 ? null : (
                    <p
                      className="text-blue-500 font-medium cursor-pointer"
                      onClick={() => {
                        handleCreateOpenPrescriptionModal();
                        setIsSelectPrescription(false);
                      }}
                    >
                      Add New Prescription
                    </p>
                  )}
                </div>
                <Select onValueChange={handleSelectPrescription}>
                  <SelectTrigger className="w-full h-14">
                    <SelectValue placeholder="Select any saved prescription" />
                  </SelectTrigger>
                  <SelectContent>
                    {prescriptionList?.map((prescription) => (
                      <SelectItem key={prescription.value} value={prescription.value.toString()}>
                        {prescription.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {buttonsForAuthUser}
              </div>
            )}
          </div>
        ) : (
          <div className="py-0">
            <div className="flex items-center justify-start gap-1">
              <p>Have a saved prescription?</p>
              <p
                className="cursor-pointer underline text-blue-500"
                onClick={() => {
                  router.push("/login");
                }}
              >
                Sign In
              </p>
            </div>
            <PrescriptionForm
              mode={"create"}
              onSubmit={handleSetPrescriptionInfo}
              handleSkipAddPrescription={handleSkipAddPrescription}
              prescriptionInfo={prescriptionInfo || {}}
              onDelete={handleDeletePrescription}
              showPriceBreakDown={true}
              showButtons={true}
              readOnly={false}
            />
          </div>
        )
      ) : null}

      {mode === "update" ? (
        isAuthenticated ? (
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center justify-between">
              <p>Select Prescription</p>
              <p
                className="text-blue-500 font-medium cursor-pointer"
                onClick={() => {
                  router.push("/profile/my-prescriptions");
                  handleModalOpenClose();
                }}
              >
                Update Prescription
              </p>
            </div>
            <Select 
              onValueChange={handleSelectPrescription}
              defaultValue={
                mode === "update" && isAuthenticated
                  ? selectedPrescriptionData?.name
                  : null
              }
            >
              <SelectTrigger className="w-full h-14">
                <SelectValue placeholder="Select any saved prescription" />
              </SelectTrigger>
              <SelectContent>
                {prescriptionList?.map((prescription) => (
                  <SelectItem key={prescription.value} value={prescription.value.toString()}>
                    {prescription.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {buttonsForAuthUser}
          </div>
        ) : (
          <div className="py-0">
            <div className="flex items-center justify-start gap-1">
              <p>Have a saved prescription?</p>
              <p
                className="underline text-blue-500 cursor-pointer"
                onClick={() => {
                  router.push("/login");
                  handleModalOpenClose();
                }}
              >
                Sign In
              </p>
            </div>
            <PrescriptionForm
              mode={"update"}
              onSubmit={handleSetPrescriptionInfo}
              handleSkipAddPrescription={handleSkipAddPrescription}
              prescriptionInfo={prescriptionInfo || {}}
              onDelete={handleDeletePrescription}
              showPriceBreakDown={true}
              showButtons={true}
              readOnly={false}
              cartInfo={cartInfo}
            />
          </div>
        )
      ) : null}

      {/*  create form for auth user */}
      {isCreatePrescriptionModal && handleIsPrescriptionEmpty() ? (
        <div className="py-0">
          <PrescriptionForm
            mode={mode}
            onSubmit={handleSetPrescriptionInfo}
            handleSkipAddPrescription={handleSkipAddPrescription}
            prescriptionInfo={prescriptionInfo || {}}
            onDelete={handleDeletePrescription}
            showPriceBreakDown={true}
            showButtons={true}
            readOnly={false}
            cartInfo={cartInfo}
          />
        </div>
      ) : null}

      {/* Update for auth user, Render for selected prescription */}
      {isSelectPrescription && (
        <PrescriptionForm
          mode={mode}
          onSubmit={handleSetPrescriptionInfo}
          handleSkipAddPrescription={handleSkipAddPrescription}
          prescriptionInfo={selectedPrescriptionData}
          onDelete={handleDeletePrescription}
          showPriceBreakDown={true}
          showButtons={true}
          readOnly={true}
          cartInfo={cartInfo}
        />
      )}
          </div>
        </SheetContent>
      </Sheet>
    </LoadingOverlay>
  );
};

export default PrescriptionModal;
