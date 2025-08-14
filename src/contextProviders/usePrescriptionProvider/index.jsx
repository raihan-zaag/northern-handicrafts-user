import React, { createContext, useContext, useState } from "react";
import useCreatePrescription from "@/hooks/prescription/useCreatePrescription";

const PrescriptionContext = createContext();

export const PrescriptionProvider = ({ children }) => {
  const [prescriptionData, setPrescriptionData] = useState({});
  const [prescriptionDrawer, setPrescriptionDrawer] = useState(false);
  const [openPrescriptionModal, setOpenPrescriptionModal] = useState(false);

  const [isCreatePrescriptionModal, setIsCreatePrescriptionModal] =
    useState(false);
  const [isSelectPrescription, setIsSelectPrescription] = useState(false);

  const { createPrescription } = useCreatePrescription();

  const handleAddPrescription = (data) => {
    setPrescriptionData((prev) => ({ ...prev, ...data }));
  };

  const handleUpdatePrescription = (productId, updatedData) => {
    setPrescriptionData((prev) => ({
      ...prev,
      [productId]: { ...prev[productId], ...updatedData },
    }));
  };

  const handleDeletePrescription = (productId) => {
    setPrescriptionData((prev) => {
      const newData = { ...prev };
      delete newData[productId];
      return newData;
    });
  };

  const handleCreateOpenPrescriptionModal = () => {
    setIsCreatePrescriptionModal((prev) => !prev);
  };

  // only for auth user

  const handleCreatePrescriptionForAuthUser = async (prescriptionData) => {
    const res = await createPrescription(prescriptionData);
    return res;
  };

  const handleUpdatePrescriptionForAuthUser = async (
    PrescriptionId,
    prescriptionData
  ) => {};

  const handleDeletePresctionForAuthUser = async (prescriptionId) => {};

  return (
    <PrescriptionContext.Provider
      value={{
        prescriptionData,
        prescriptionDrawer,
        openPrescriptionModal,
        isCreatePrescriptionModal,
        isSelectPrescription,
        setIsSelectPrescription,

        setIsCreatePrescriptionModal,
        setPrescriptionData,

        handleAddPrescription,
        handleUpdatePrescription,
        handleDeletePrescription,
        handleCreateOpenPrescriptionModal,

        handleCreatePrescriptionForAuthUser,
        handleUpdatePrescriptionForAuthUser,
        handleDeletePresctionForAuthUser,
      }}
    >
      {children}
    </PrescriptionContext.Provider>
  );
};

export const usePrescription = () => {
  const context = useContext(PrescriptionContext);
  if (!context) {
    throw new Error(
      "usePrescription must be used within a PrescriptionProvider"
    );
  }
  return context;
};
