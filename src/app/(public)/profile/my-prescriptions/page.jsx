"use client";

import Button from "@/common/components/common/Button";
import EmptyDataSkeleton from "@/common/components/common/EmptyDataSkeleton";
import React, { useEffect, useState } from "react";
import PrescriptionModal from "./_components/prescriptionModal";
import RowSkeleton from "@/common/components/common/RowSkeleton";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { LoadingOverlay } from "@/common/components/ui/loading-overlay";

import useGetPrescriptionList from "@/common/hooks/prescription/useGetPrescriptionsList";
import useCreatePrescription from "@/common/hooks/prescription/useCreatePrescription";
import useDeletePrescription from "@/common/hooks/prescription/useDeletePrescription";
import PaginationComponent from "@/common/components/pagination";

const MyPrescription = () => {
  const [openPrescriptionModal, setOpenPrescriptionModal] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [page, setPage] = useState(1);

  const { getPrescriptionList, listForProfile, loading, totalPrescription } =
    useGetPrescriptionList();
  const { deletePrescription, loading: deleteLoading } =
    useDeletePrescription();
  const { loading: createLoading } = useCreatePrescription();

  useEffect(() => {
    getPrescriptionList();
  }, []);

  const handleRemoveDelete = async (id) => {
    const response = await deletePrescription(id);

    if (response?.status === 200) {
      getPrescriptionList();
    }
  };

  const handlePagination = (page, pageSize = 10) => {
    setPage(page);
    getPrescriptionList({ page: page - 1, size: pageSize });
  };

  return (
    <LoadingOverlay isLoading={loading || deleteLoading || createLoading}>
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-gray-dark font-semibold text-2xl hidden sm:block">
            My Saved Prescriptions
          </h2>
          <h2 className="text-gray-dark font-semibold text-sm sm:text-base md:text-2xl block sm:hidden">
            Prescriptions
          </h2>
          <Button
          className={"py-2 sm:py-15 px-3 sm:px-8"}
          onClick={() => setOpenPrescriptionModal(true)}
        >
          Add new Prescription
        </Button>
      </div>

      <div className=" mt-6 sm:mt-12">
        {loading || deleteLoading || createLoading ? (
          <RowSkeleton count={3} />
        ) : (
          <>
            {listForProfile?.length > 0 ? (
              listForProfile?.map((prescriptionData, index) => (
                <PrescriptionCard
                  prescription={prescriptionData}
                  key={index}
                  setOpenPrescriptionModal={setOpenPrescriptionModal}
                  setSelectedPrescription={setSelectedPrescription}
                  handleRemoveDelete={handleRemoveDelete}
                />
              ))
            ) : (
              <EmptyDataSkeleton title={"No Prescription Found"} />
            )}
          </>
        )}
      </div>

      {totalPrescription > 10 && (
        <div className="mt-4">
          <PaginationComponent
            pageSize={totalPrescription}
            handlePagination={handlePagination}
            current={page}
          />
        </div>
      )}

      <PrescriptionModal
        open={openPrescriptionModal}
        onClose={() => {
          setOpenPrescriptionModal(false);
          getPrescriptionList();
        }}
        isCreate={selectedPrescription ? false : true}
        selectedPrescription={selectedPrescription}
        setSelectedPrescription={setSelectedPrescription}
      />
      </div>
    </LoadingOverlay>
  );
};

export default MyPrescription;

const PrescriptionCard = ({
  prescription,
  setSelectedPrescription,
  setOpenPrescriptionModal,
  handleRemoveDelete,
}) => {
  return (
  <div className="flex sm:flex-row flex-col sm:gap-auto gap-4 items-start justify-between py-5 border-b border-border">
      <div className="flex flex-col gap-2">
    <h3 className="text-lg font-semibold text-gray-dark">
          {prescription?.name}
        </h3>
        {prescription?.leftEyeSPH && (
          <p className="text-gray-700 text-sm">
            Left Eye - SPH ({prescription?.leftEyeSPH})
          </p>
        )}
        {prescription?.rightEyeSPH && (
          <p className="text-gray-700 text-sm">
            Right Eye - SPH ({prescription?.rightEyeSPH})
          </p>
        )}
        {prescription?.leftEyeCYL && (
          <p className="text-gray-700 text-sm">
            Left Eye - CYL ({prescription?.leftEyeCYL})
          </p>
        )}
        {prescription?.rightEyeCYL && (
          <p className="text-gray-700 text-sm">
            Right Eye - CYL ({prescription?.rightEyeCYL})
          </p>
        )}
        {prescription?.pdDistance && (
          <p className="text-gray-700 text-sm">
            PD Distance - ({prescription?.pdDistance})
          </p>
        )}
        {prescription?.leftPdDistance && (
          <p className="text-gray-700 text-sm">
            Left Eye - PD ({prescription?.leftPdDistance})
          </p>
        )}
        {prescription?.rightPdDistance && (
          <p className="text-gray-700 text-sm">
            Right Eye - PD ({prescription?.rightPdDistance})
          </p>
        )}
      </div>
      <div className="flex item-center gap-12 w-full sm:w-auto">
        <button
          className="flex items-center justify-start sm:justify-center gap-1.5 sm:flex-grow-0 flex-grow"
          onClick={() => {
            setSelectedPrescription(prescription);
            setOpenPrescriptionModal(true);
          }}
        >
          <MdOutlineEdit className="text-blue text-base" />
          <p className="text-blue text-sm font-semibold">
            Edit Prescription
          </p>
        </button>
        <button
          onClick={() => handleRemoveDelete(prescription?.id)}
          className="flex items-center justify-end sm:justify-center gap-1.5 sm:flex-grow-0 flex-grow"
        >
          <RiDeleteBin6Line className="text-gray-medium text-base" />
          <p className="text-gray-medium text-sm font-semibold">Remove</p>
        </button>
      </div>
    </div>
  );
};
