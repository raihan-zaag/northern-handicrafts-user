"use client";

import * as React from "react";
import { OTPInput as BaseOTPInput, OTPInputContext, REGEXP_ONLY_DIGITS } from "input-otp";
import { cn } from "@/common/lib/utils";

const InputOTP = React.forwardRef(function InputOTP(
  { className, containerClassName, pattern = REGEXP_ONLY_DIGITS, ...props },
  ref
) {
  return (
    <BaseOTPInput
      ref={ref}
      inputMode="numeric"
      pattern={pattern}
      containerClassName={cn(
        "flex items-center has-[:disabled]:opacity-50",
        containerClassName
      )}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  );
});

const InputOTPGroup = ({ className, ...props }) => (
  <div className={cn("flex items-center", className)} {...props} />
);

const InputOTPSlot = React.forwardRef(function InputOTPSlot(
  { index, className, activeClassName, ...props },
  ref
) {
  const inputOTP = React.useContext(OTPInputContext);
  const slot = inputOTP.slots[index];

  if (!slot) return null;

  const isActive = inputOTP.isFocused && slot.isActive;

  return (
    <div
      ref={ref}
      aria-label={`OTP character ${index + 1}`}
      className={cn(
        // Base box styles to match the design
        "flex items-center justify-center bg-white rounded-xl border border-border-input text-gray-dark2",
        // sizing & typography
        "w-43px h-41px md:w-12 md:h-12 text-md2 md:text-base leading-18px md:leading-20px",
        // focus/active state: thicker, darker border
        isActive && cn("border-2 border-neutral-600", activeClassName),
        className
      )}
      {...props}
    >
      {slot.char ?? <span className="text-light-font2 select-none">&nbsp;</span>}
    </div>
  );
});

const InputOTPSeparator = ({ className, ...props }) => (
  <div role="separator" className={cn("mx-2", className)} {...props} />
);

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
