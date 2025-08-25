"use client";

import { useState } from "react";
import { Button } from "@/common/components/ui/button";
import { ChevronDown, X } from "lucide-react";

const AuthUserAddress = ({ setDeliveryAddress, deliveryAddress }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Mock saved addresses - this would come from an API
  const savedAddresses = [
    {
      id: 1,
      name: "Home",
      country: "United States",
      state: "California", 
      city: "Los Angeles",
      zipCode: "90017",
      street: "4135 Parkway Street",
      fullAddress: "4135 Parkway Street, Los Angeles, CA 90017"
    },
    {
      id: 2,
      name: "Office",
      country: "United States",
      state: "California",
      city: "San Francisco", 
      zipCode: "94102",
      street: "123 Market Street",
      fullAddress: "123 Market Street, San Francisco, CA 94102"
    }
  ];

  const handleAddressSelect = (address) => {
    setDeliveryAddress(address);
    setIsDropdownOpen(false);
  };

  const handleRemoveAddress = () => {
    setDeliveryAddress(null);
  };

  return (
    <div className="space-y-3">
      {/* Address Selector */}
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full h-12 px-4 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl flex items-center justify-between text-sm text-[var(--color-text-subtle)] hover:border-[var(--color-border-strong)] transition-colors"
          >
            <span>Select any saved delivery address</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          
          {/* Dropdown */}
          {isDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[var(--color-border)] rounded-xl shadow-lg z-10 max-h-48 overflow-y-auto">
              {savedAddresses.map((address) => (
                <button
                  key={address.id}
                  type="button"
                  onClick={() => handleAddressSelect(address)}
                  className="w-full px-4 py-3 text-left text-sm hover:bg-[var(--color-surface)] transition-colors border-b border-[var(--color-border)] last:border-b-0"
                >
                  <div className="font-medium text-[var(--color-text-primary)]">{address.name}</div>
                  <div className="text-[var(--color-text-secondary)] text-xs mt-1">{address.fullAddress}</div>
                </button>
              ))}
            </div>
          )}
        </div>
        
        <Button
          type="button"
          variant="outline"
          className="h-12 px-6 bg-[var(--color-text-primary)] text-white border-[var(--color-text-primary)] rounded-xl hover:bg-[var(--color-text-primary)]/90"
        >
          Add new address
        </Button>
      </div>

      {/* Selected Address Display */}
      {deliveryAddress && (
        <div className="space-y-2">
          <div className="flex gap-2">
            <div className="flex-1 h-12 px-4 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl flex items-center justify-between">
              <span className="text-sm font-medium text-[var(--color-text-primary)]">
                {deliveryAddress.name}
              </span>
              <button
                type="button"
                onClick={handleRemoveAddress}
                className="text-[var(--color-text-subtle)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <Button
              type="button"
              variant="outline" 
              className="h-12 px-6 bg-[var(--color-text-primary)] text-white border-[var(--color-text-primary)] rounded-xl hover:bg-[var(--color-text-primary)]/90"
            >
              Add new address
            </Button>
          </div>

          {/* Address Details */}
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-6">
            <div className="space-y-2">
              <div className="font-semibold text-sm text-[var(--color-text-primary)] mb-2">
                {deliveryAddress.name}
              </div>
              <div className="text-sm text-[var(--color-text-secondary)]">
                <strong>Country:</strong> {deliveryAddress.country}
              </div>
              <div className="text-sm text-[var(--color-text-secondary)]">
                <strong>State:</strong> {deliveryAddress.state}
              </div>
              <div className="text-sm text-[var(--color-text-secondary)]">
                <strong>City:</strong> {deliveryAddress.city}
              </div>
              <div className="text-sm text-[var(--color-text-secondary)]">
                <strong>Zip Code:</strong> {deliveryAddress.zipCode}
              </div>
              <div className="text-sm text-[var(--color-text-secondary)]">
                <strong>Street Address:</strong> {deliveryAddress.street}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthUserAddress;
