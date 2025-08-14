import { LIGHT_GRAY, PRIMARY } from "@/constants/colors";

// theme.js
export const theme = {
  token: {
    colorPrimary: PRIMARY, // Primary color from your Tailwind theme
    colorLink: PRIMARY,
    colorTextBase: "#F5F5F5", // Light font color from Tailwind theme
    fontFamily: "Syne, sans-serif", // Custom font family
    colorBgBase: "#FAFBFB", // Background color for the app
    borderRadius: 8, // Border radius for components
    colorBorder: "#5D6B82", // Border color from Tailwind theme
    colorText: PRIMARY,
    fontSizeHeading1: "100px",
    colorTextPlaceholder: LIGHT_GRAY,
    borderRadius: "0px",
    colorBgSpotlight: "#45499f",
    // sizePopupArrow: "0px",
    colorBgSpotlight: "#000",
    colorBgElevated: "#fff",
    colorBgContainer: "none",
    colorTextDisabled: "#000",
  },
  components: {
    Breadcrumb: {
      /* here is your component tokens */
      itemColor: PRIMARY,
      linkColor: PRIMARY,
      lastItemColor: "#000",
      separatorColor: "#7A8699",
    },
    Card: {
      // Card-specific tokens
    },
    Form: {
      labelColor: PRIMARY,
      borderRadius: "0px",
      activeBorderColor: "#fff",
    },
    Menu: {
      itemBg: "#fff",
      // popupBg: "#000",
    },

    Collapse: {
      headerPadding: "5px 0 5px 0",
      contentPadding: "5px 0 5px 0",
    },
    Checkbox: {
      borderRadiusSM: "4px",
    },
    Slider: {
      trackBg: "#000000",
      railBg: "#D1D1D1",
      railHoverBg: "#D1D1D1",
    },
    Select: {
      activeBorderColor: "#2A2A2A",
      activeOutlineColor: "transparent",
      optionFontSize: 16,
      optionSelectedBg: "transparent",
      optionPadding: "5px 5px 5px 5px",
    },
    Input: {
      activeBorderColor: PRIMARY,
      colorBgContainer: "#FAFBFB",
      colorBorder: "#DFE2E6",
      borderRadius: "0px",
      paddingBlock: "16px",
      paddingInline: "16px",
      inputFontSize: "14px",
      activeShadow: "none",
    },
    Menu: {
      popupBg: "#fff",
    },
    InputNumber: {
      activeShadow: "none",
      controlWidth: 0,
      colorBorder: "#DFE2E6",
    },
    Radio: {
      buttonBg: "none",
      buttonCheckedBg: "none",
    },
  },
};
