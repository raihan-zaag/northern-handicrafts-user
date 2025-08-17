import React from "react";
import classNames from "classnames";

const Button = ({
  type = "primary",
  icon: Icon,
  children,
  onClick,
  disabled,
  className,
  buttonType = "submit",
}) => {
  const baseStyles =
    "font-medium text-xs md:text-sm transition-all duration-200 py-4 md:py-4 font-semibold text-center antialiased";
  const typeStyles = {
    primary:
      "bg-primary text-white hover:bg-primary-dark border-2 border-primary",
    outline: "bg-transparent text-primary border-2 border-primary",
    "start-icon":
      "bg-primary text-white flex items-center gap-2 hover:bg-primary-dark",
  };

  const buttonClasses = classNames(
    baseStyles,
    typeStyles[type],
    {
      "opacity-50 cursor-not-allowed": disabled,
    },
    className // Inject custom className
  );

  return (
    <button
      type={buttonType}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {Icon && <Icon className="h-5 w-5" />}
      {children}
    </button>
  );
};

export default Button;
