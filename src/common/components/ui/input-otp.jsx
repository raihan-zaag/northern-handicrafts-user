'use client';

import * as React from 'react';
import {
  OTPInput as BaseOTPInput,
  OTPInputContext,
  REGEXP_ONLY_DIGITS,
} from 'input-otp';
import { cn } from '@/common/lib/utils';

// Main OTP input wrapper
const InputOTP = ({
  className,
  containerClassName,
  pattern = REGEXP_ONLY_DIGITS,
  ...props
}) => {
  return (
    <BaseOTPInput
      inputMode="numeric"
      pattern={pattern}
      containerClassName={cn(
        'flex items-center has-[:disabled]:opacity-50 gap-2',
        containerClassName
      )}
      className={cn(
        'disabled:cursor-not-allowed border border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-text-primary)] rounded-lg px-3 py-2 text-center w-12 h-12',
        className
      )}
      {...props}
    />
  );
};

// Group container for OTP inputs
const InputOTPGroup = ({ className, ...props }) => (
  <div className={cn('flex items-center gap-2', className)} {...props} />
);

// Individual OTP slot
const InputOTPSlot = ({ index, className, activeClassName, ...props }) => {
  const inputOTP = React.useContext(OTPInputContext);
  const slot = inputOTP.slots[index];
  if (!slot) return null;

  const isActive = inputOTP.isFocused && slot.isActive;

  return (
    <div
      aria-label={`OTP character ${index + 1}`}
      className={cn(
        'flex items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-text-primary)] w-12 h-12 text-center font-medium transition-colors duration-200',
        isActive &&
          cn('border-2 border-[var(--color-primary)]', activeClassName),
        className
      )}
      {...props}
    >
      {slot.char ?? (
        <span className="text-[var(--color-text-subtle)] select-none">
          &nbsp;
        </span>
      )}
    </div>
  );
};

// Separator between OTP slots
const InputOTPSeparator = ({ className, ...props }) => (
  <div role="separator" className={cn('mx-1', className)} {...props} />
);

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
