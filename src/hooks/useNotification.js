"use client";

import { notification } from "antd";

// Custom hook to handle notifications
const useNotification = () => {
  // Success notification
  const openSuccessNotification = (message, description) => {
    notification.success({
      message: message || "Success",
      description: description || "Operation was successful.",
      placement: "topRight",
      duration: 3, // Duration in seconds
    });
  };

  // Error notification
  const openErrorNotification = (message, description) => {
    notification.error({
      message: message || "Error",
      description: description || "Something went wrong.",
      placement: "topRight",
      duration: 4,
    });
  };

  // Info notification
  const openInfoNotification = (message, description) => {
    notification.info({
      message: message || "Information",
      description: description || "Here is some information.",
      placement: "topRight",
      duration: 4,
    });
  };

  // Warning notification
  const openWarningNotification = (message, description) => {
    notification.warning({
      message: message || "Warning",
      description: description || "This is a warning.",
      placement: "topRight",
      duration: 4,
    });
  };

  return {
    openSuccessNotification,
    openErrorNotification,
    openInfoNotification,
    openWarningNotification,
  };
};

export default useNotification;
