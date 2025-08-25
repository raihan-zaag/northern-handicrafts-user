"use client";

import Image from "next/image";
import Icons from "@/public/icons";
import { cn } from "@/common/lib/utils";

const QuantityControl = ({
  quantity,
  maxQuantity,
  onQuantityChange,
  disabled = false,
  className,
}) => {
  const handleDecrement = () => {
    if (quantity > 1 && !disabled) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < maxQuantity && !disabled) {
      onQuantityChange(quantity + 1);
    }
  };

  const canDecrement = quantity > 1 && !disabled;
  const canIncrement = quantity < maxQuantity && !disabled;

  return (
    <div
      className={cn(
        "flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-0 h-12",
        "bg-white",
        className
      )}
    >
      {/* Decrease Button */}
      <button
        onClick={handleDecrement}
        disabled={!canDecrement}
        className={cn(
          "flex items-center justify-center w-[18px] h-[18px] transition-colors",
          canDecrement 
            ? "hover:bg-gray-100 cursor-pointer" 
            : "cursor-not-allowed opacity-40"
        )}
        aria-label="Decrease quantity"
      >
        <Image
          src={canDecrement ? Icons.minus : Icons.disabled_minus}
          alt="Decrease"
          width={18}
          height={18}
          className="w-[18px] h-[18px]"
        />
      </button>

      {/* Quantity Display */}
      <span className="text-lg font-semibold text-gray-900 min-w-[32px] text-center">
        {quantity.toString().padStart(2, '0')}
      </span>

      {/* Increase Button */}
      <button
        onClick={handleIncrement}
        disabled={!canIncrement}
        className={cn(
          "flex items-center justify-center w-[18px] h-[18px] transition-colors",
          canIncrement 
            ? "hover:bg-gray-100 cursor-pointer" 
            : "cursor-not-allowed opacity-40"
        )}
        aria-label="Increase quantity"
      >
        <Image
          src={canIncrement ? Icons.plus : Icons.disabled_plus}
          alt="Increase"
          width={18}
          height={18}
          className="w-[18px] h-[18px]"
        />
      </button>
    </div>
  );
};

export default QuantityControl;
