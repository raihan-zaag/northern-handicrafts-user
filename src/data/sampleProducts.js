// Sample product data for development and testing purposes

export const sampleProductList = {
  data: {
    content: [
      {
        id: 1,
        name: "Handwoven Wool Scarf",
        thumbnailImage: "/images/image_placeholder.png",
        regularPrice: 45.00,
        priceAfterDiscount: 35.00,
        discount: 22,
        description: "Beautiful handwoven wool scarf made from premium quality wool. Perfect for winter seasons.",
        colorList: [
          {
            id: 1,
            name: "Red",
            price: 0,
            colorCode: "#FF0000"
          },
          {
            id: 2,
            name: "Blue",
            price: 5,
            colorCode: "#0000FF"
          }
        ],
        category: {
          id: 1,
          name: "Textiles"
        },
        inStock: true,
        rating: 4.5,
        reviewCount: 23
      },
      {
        id: 2,
        name: "Ceramic Pottery Vase",
        thumbnailImage: "/images/image_placeholder.png",
        regularPrice: 65.00,
        priceAfterDiscount: null,
        discount: 0,
        description: "Hand-crafted ceramic vase with traditional patterns. Perfect for home decoration.",
        colorList: [
          {
            id: 3,
            name: "Earth Brown",
            price: 0,
            colorCode: "#8B4513"
          },
          {
            id: 4,
            name: "Ocean Blue",
            price: 10,
            colorCode: "#006994"
          }
        ],
        category: {
          id: 2,
          name: "Ceramics"
        },
        inStock: true,
        rating: 4.8,
        reviewCount: 15
      },
      {
        id: 3,
        name: "Wooden Jewelry Box",
        thumbnailImage: "/images/image_placeholder.png",
        regularPrice: 85.00,
        priceAfterDiscount: 70.00,
        discount: 18,
        description: "Intricately carved wooden jewelry box with velvet interior. Handmade by skilled artisans.",
        colorList: [
          {
            id: 5,
            name: "Natural Wood",
            price: 0,
            colorCode: "#DEB887"
          },
          {
            id: 6,
            name: "Dark Walnut",
            price: 15,
            colorCode: "#5D4E37"
          }
        ],
        category: {
          id: 3,
          name: "Woodwork"
        },
        inStock: true,
        rating: 4.7,
        reviewCount: 31
      },
      {
        id: 4,
        name: "Embroidered Throw Pillow",
        thumbnailImage: "/images/image_placeholder.png",
        regularPrice: 28.00,
        priceAfterDiscount: 22.00,
        discount: 21,
        description: "Beautiful embroidered throw pillow with traditional motifs. Adds charm to any living space.",
        colorList: [
          {
            id: 7,
            name: "Ivory",
            price: 0,
            colorCode: "#FFFFF0"
          },
          {
            id: 8,
            name: "Sage Green",
            price: 3,
            colorCode: "#9CAF88"
          }
        ],
        category: {
          id: 1,
          name: "Textiles"
        },
        inStock: true,
        rating: 4.3,
        reviewCount: 18
      },
      {
        id: 5,
        name: "Handmade Leather Wallet",
        thumbnailImage: "/images/image_placeholder.png",
        regularPrice: 55.00,
        priceAfterDiscount: null,
        discount: 0,
        description: "Premium quality leather wallet with multiple compartments. Crafted with attention to detail.",
        colorList: [
          {
            id: 9,
            name: "Black",
            price: 0,
            colorCode: "#000000"
          },
          {
            id: 10,
            name: "Brown",
            price: 0,
            colorCode: "#8B4513"
          },
          {
            id: 11,
            name: "Tan",
            price: 5,
            colorCode: "#D2B48C"
          }
        ],
        category: {
          id: 4,
          name: "Leather Goods"
        },
        inStock: true,
        rating: 4.6,
        reviewCount: 42
      },
      {
        id: 6,
        name: "Glass Wind Chimes",
        thumbnailImage: "/images/image_placeholder.png",
        regularPrice: 38.00,
        priceAfterDiscount: 29.00,
        discount: 24,
        description: "Beautiful hand-blown glass wind chimes that create soothing sounds in the breeze.",
        colorList: [
          {
            id: 12,
            name: "Clear",
            price: 0,
            colorCode: "#FFFFFF"
          },
          {
            id: 13,
            name: "Turquoise",
            price: 8,
            colorCode: "#40E0D0"
          }
        ],
        category: {
          id: 5,
          name: "Glass Art"
        },
        inStock: false,
        rating: 4.4,
        reviewCount: 12
      }
    ],
    totalPages: 3,
    totalElements: 18,
    size: 6,
    number: 0,
    first: true,
    last: false,
    numberOfElements: 6
  },
  status: 200,
  message: "Products retrieved successfully"
};

export const sampleCategories = [
  {
    id: 1,
    name: "Textiles",
    key: "1",
    description: "Handwoven fabrics, scarves, and textile products"
  },
  {
    id: 2,
    name: "Ceramics",
    key: "2",
    description: "Hand-crafted pottery and ceramic items"
  },
  {
    id: 3,
    name: "Woodwork",
    key: "3",
    description: "Carved wooden items and furniture"
  },
  {
    id: 4,
    name: "Leather Goods",
    key: "4",
    description: "Premium leather accessories and bags"
  },
  {
    id: 5,
    name: "Glass Art",
    key: "5",
    description: "Hand-blown glass decorative items"
  }
];

export const sampleSizes = [
  {
    id: 1,
    name: "Small",
    price: 0,
    dimensions: "10x10 cm"
  },
  {
    id: 2,
    name: "Medium",
    price: 10,
    dimensions: "15x15 cm"
  },
  {
    id: 3,
    name: "Large",
    price: 20,
    dimensions: "20x20 cm"
  },
  {
    id: 4,
    name: "Extra Large",
    price: 35,
    dimensions: "25x25 cm"
  }
];

// Additional sample data for pagination
export const sampleProductListPage2 = {
  data: {
    content: [
      {
        id: 7,
        name: "Beaded Necklace Set",
        thumbnailImage: "/images/image_placeholder.png",
        regularPrice: 42.00,
        priceAfterDiscount: 35.00,
        discount: 17,
        description: "Elegant beaded necklace set with matching earrings. Perfect for special occasions.",
        colorList: [
          {
            id: 14,
            name: "Silver",
            price: 0,
            colorCode: "#C0C0C0"
          },
          {
            id: 15,
            name: "Gold",
            price: 12,
            colorCode: "#FFD700"
          }
        ],
        category: {
          id: 6,
          name: "Jewelry"
        },
        inStock: true,
        rating: 4.5,
        reviewCount: 28
      },
      {
        id: 8,
        name: "Woven Basket Set",
        thumbnailImage: "/images/image_placeholder.png",
        regularPrice: 75.00,
        priceAfterDiscount: null,
        discount: 0,
        description: "Set of three handwoven baskets in different sizes. Great for storage and decoration.",
        colorList: [
          {
            id: 16,
            name: "Natural",
            price: 0,
            colorCode: "#F5DEB3"
          },
          {
            id: 17,
            name: "Dark Brown",
            price: 8,
            colorCode: "#654321"
          }
        ],
        category: {
          id: 7,
          name: "Baskets"
        },
        inStock: true,
        rating: 4.9,
        reviewCount: 35
      },
      {
        id: 9,
        name: "Hand-painted Canvas Art",
        thumbnailImage: "/images/image_placeholder.png",
        regularPrice: 120.00,
        priceAfterDiscount: 95.00,
        discount: 21,
        description: "Original hand-painted canvas artwork featuring traditional motifs and vibrant colors.",
        colorList: [
          {
            id: 18,
            name: "Multicolor",
            price: 0,
            colorCode: "#FF69B4"
          }
        ],
        category: {
          id: 8,
          name: "Art"
        },
        inStock: true,
        rating: 4.8,
        reviewCount: 19
      },
      {
        id: 10,
        name: "Copper Tea Set",
        thumbnailImage: "/images/image_placeholder.png",
        regularPrice: 95.00,
        priceAfterDiscount: 80.00,
        discount: 16,
        description: "Traditional copper tea set with intricate engravings. Includes teapot and four cups.",
        colorList: [
          {
            id: 19,
            name: "Antique Copper",
            price: 0,
            colorCode: "#B87333"
          },
          {
            id: 20,
            name: "Polished Copper",
            price: 10,
            colorCode: "#DA8A67"
          }
        ],
        category: {
          id: 9,
          name: "Metalwork"
        },
        inStock: true,
        rating: 4.7,
        reviewCount: 22
      },
      {
        id: 11,
        name: "Embroidered Table Runner",
        thumbnailImage: "/images/image_placeholder.png",
        regularPrice: 35.00,
        priceAfterDiscount: 28.00,
        discount: 20,
        description: "Beautiful embroidered table runner with floral patterns. Perfect for dining room decor.",
        colorList: [
          {
            id: 21,
            name: "Cream",
            price: 0,
            colorCode: "#FFFDD0"
          },
          {
            id: 22,
            name: "Burgundy",
            price: 5,
            colorCode: "#800020"
          }
        ],
        category: {
          id: 1,
          name: "Textiles"
        },
        inStock: true,
        rating: 4.4,
        reviewCount: 16
      },
      {
        id: 12,
        name: "Carved Stone Sculpture",
        thumbnailImage: "/images/image_placeholder.png",
        regularPrice: 150.00,
        priceAfterDiscount: null,
        discount: 0,
        description: "Handcrafted stone sculpture representing traditional cultural symbols. A unique piece of art.",
        colorList: [
          {
            id: 23,
            name: "Natural Stone",
            price: 0,
            colorCode: "#A9A9A9"
          }
        ],
        category: {
          id: 10,
          name: "Stone Art"
        },
        inStock: true,
        rating: 4.9,
        reviewCount: 8
      }
    ],
    totalPages: 3,
    totalElements: 18,
    size: 6,
    number: 1,
    first: false,
    last: false,
    numberOfElements: 6
  },
  status: 200,
  message: "Products retrieved successfully"
};
