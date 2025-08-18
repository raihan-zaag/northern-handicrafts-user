"use client";

import React from "react";

const PrescriptionForm = ({
  mode = "view",
  onSubmit = () => {},
  handleSkipAddPrescription = () => {},
  prescriptionInfo = {},
  onDelete = () => {},
  showPriceBreakDown = false,
  showButtons = false,
  readOnly = true,
  cartInfo = {},
}) => {
  const renderPrescriptionField = (label, value) => {
    if (!value) return null;
    
    return (
      <div className="flex justify-between py-2 border-b border-gray-100">
        <span className="text-sm font-medium text-gray-600">{label}:</span>
        <span className="text-sm text-gray-900">{value}</span>
      </div>
    );
  };

  if (!prescriptionInfo || Object.keys(prescriptionInfo).length <= 1) {
    return (
      <div className="p-4 text-center text-gray-500">
        No prescription information available
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Prescription Details</h3>
      
      <div className="space-y-1">
        {prescriptionInfo.name && renderPrescriptionField("Name", prescriptionInfo.name)}
        
        {/* Left Eye */}
        {(prescriptionInfo.leftEyeSPH || prescriptionInfo.leftEyeCYL || prescriptionInfo.leftEyeAxis) && (
          <div className="mt-4">
            <h4 className="text-md font-medium text-gray-800 mb-2">Left Eye (OS)</h4>
            {renderPrescriptionField("SPH", prescriptionInfo.leftEyeSPH)}
            {renderPrescriptionField("CYL", prescriptionInfo.leftEyeCYL)}
            {renderPrescriptionField("Axis", prescriptionInfo.leftEyeAxis)}
          </div>
        )}
        
        {/* Right Eye */}
        {(prescriptionInfo.rightEyeSPH || prescriptionInfo.rightEyeCYL || prescriptionInfo.rightEyeAxis) && (
          <div className="mt-4">
            <h4 className="text-md font-medium text-gray-800 mb-2">Right Eye (OD)</h4>
            {renderPrescriptionField("SPH", prescriptionInfo.rightEyeSPH)}
            {renderPrescriptionField("CYL", prescriptionInfo.rightEyeCYL)}
            {renderPrescriptionField("Axis", prescriptionInfo.rightEyeAxis)}
          </div>
        )}
        
        {/* PD Distance */}
        {prescriptionInfo.pdDistance && renderPrescriptionField("PD Distance", prescriptionInfo.pdDistance)}
        {prescriptionInfo.leftPdDistance && renderPrescriptionField("Left PD", prescriptionInfo.leftPdDistance)}
        {prescriptionInfo.rightPdDistance && renderPrescriptionField("Right PD", prescriptionInfo.rightPdDistance)}
        
        {/* Product Size */}
        {prescriptionInfo.productSize && renderPrescriptionField("Lens Index", prescriptionInfo.productSize)}
      </div>
      
      {showButtons && !readOnly && (
        <div className="flex gap-2 mt-4">
          {mode === "update" && (
            <button
              onClick={onDelete}
              className="px-4 py-2 text-red-600 border border-red-600 rounded hover:bg-red-50"
            >
              Delete
            </button>
          )}
          <button
            onClick={handleSkipAddPrescription}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default PrescriptionForm;
