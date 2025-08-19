import {
  HOME_URL,
  TRACK_ORDER_URL,
  CATEGORY_URL,
} from "./routes";

/**
 * Header menu items configuration
 * This file contains the static menu items for the header navigation
 */
export const getHeaderMenuItems = (categories) => {
  const menuItems = [
    { name: "All Products", link: "/" },
  ];

  // Find Men's category dynamically
  const menCategory = categories?.content?.find((category) => {
    const menKeywords = ["man", "male", "men", "Male"];
    return menKeywords.some(keyword => 
      category.name.toLowerCase().includes(keyword.toLowerCase())
    );
  });

  if (menCategory) {
    menuItems.push({
      name: "Men's",
      link: CATEGORY_URL(menCategory?.id),
    });
  }

  // Add Body Care (you may need to update this based on your category structure)
  const bodyCareCategory = categories?.content?.find((category) => {
    const bodyCareKeywords = ["body care", "bodycare", "body", "care"];
    return bodyCareKeywords.some(keyword => 
      category.name.toLowerCase().includes(keyword.toLowerCase())
    );
  });

  if (bodyCareCategory) {
    menuItems.push({
      name: "Body Care",
      link: CATEGORY_URL(bodyCareCategory?.id),
    });
  }

  // Add Track Order
  menuItems.push({ name: "Track Order", link: TRACK_ORDER_URL });

  return menuItems;
};

/**
 * Static menu items that don't require category data
 */
export const staticMenuItems = [
  { name: "All Products", link: "/" },
  { name: "Track Order", link: TRACK_ORDER_URL },
];
