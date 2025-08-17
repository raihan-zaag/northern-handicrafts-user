"use client";

// Replaced Ant Design notification with Sonner
import { toast } from "sonner";

// Custom hook to handle notifications
const useNotification = () => {
  // Success notification
  const openSuccessNotification = (message, description) => {
    toast.success(message || "Success", {
      description: description || "Operation was successful.",
      duration: 3000,
    });
  };

  // Error notification
  const openErrorNotification = (message, description) => {
    toast.error(message || "Error", {
      description: description || "Something went wrong.",
      duration: 4000,
    });
  };

  // Info notification
  const openInfoNotification = (message, description) => {
    toast.info(message || "Information", {
      description: description || "Here is some information.",
      duration: 4000,
    });
  };

  // Warning notification
  const openWarningNotification = (message, description) => {
    toast.warning?.(message || "Warning", {
      description: description || "This is a warning.",
      duration: 4000,
    }) || toast(message || "Warning", { description, duration: 4000 });
  };

  return {
    openSuccessNotification,
    openErrorNotification,
    openInfoNotification,
    openWarningNotification,
  };
};

export default useNotification;
