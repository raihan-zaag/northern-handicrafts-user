import Image from "next/image";
import React from "react";

const RatingBtn = ({
  icon,
  iconAlt,
  variant,
  label,
  width,
  paddingX,
  background,
  paddingY,
  isBorder,
  iconTextGap,
  active,
  disabled,
  hover,
  textColor,
  ...rest
}) => {
  return (
    <button
      {...rest}
      // onClick={() => setActive(!active)}
      disabled={disabled}
      className={`flex items-center ${
        disabled && "filter invert opacity-40 text-opacity-60"
      } justify-center duration-200 ${
        active
          ? " border-[1.5px] border-neutral-700 text-primary"
          : "border border-neutral-30 text-neutral-400"
      } ${paddingY ? paddingY : "py-[6px]"} rounded-sm ${
        textColor ? textColor : "text-neutral-300black"
      } text-sm font-medium leading-[18.23px] ${
        paddingX ? paddingX : "px-3"
      } ${width}`}
    >
      <div
        className={`flex justify-center items-center ${
          iconTextGap ? iconTextGap : "gap-x-1"
        }`}
      >
        <span>{label}</span>

        <Image
          width={1000}
          height={1000}
          alt={"zaag-ecom-icon"}
          src={icon}
          className={`w-3 h-3 mb-0.5`}
        />
      </div>
    </button>
  );
};

export default RatingBtn;
