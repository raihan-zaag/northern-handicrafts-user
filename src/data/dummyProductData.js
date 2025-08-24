// Dummy data for development - TODO: Remove when backend is ready

export const dummyCategories = {
  content: [
    { id: 1, name: "Ceramics" },
    { id: 2, name: "Textiles" },
    { id: 3, name: "Wood" },
    { id: 4, name: "Metal" },
    { id: 5, name: "Bamboo" },
    { id: 6, name: "Jewelry" },
    { id: 7, name: "Paper Crafts" },
    { id: 8, name: "Glass" }
  ]
};

export const dummySizes = [
  { value: "XS", label: "XS", price: 20 },
  { value: "S", label: "S", price: 25 },
  { value: "M", label: "M", price: 30 },
  { value: "L", label: "L", price: 35 },
  { value: "XL", label: "XL", price: 40 }
];

export const dummyColors = [
  { id: 'natural-beige', label: 'Natural Beige', value: 'natural-beige', color: '#D6B98C' },
  { id: 'olive-green', label: 'Olive Green', value: 'olive-green', color: '#708238' },
  { id: 'white', label: 'White', value: 'white', color: '#FFFFFF' },
  { id: 'pink', label: 'Pink', value: 'pink', color: '#FFC2A7' },
  { id: 'grey', label: 'Grey', value: 'grey', color: '#A9A9A9' },
  { id: 'brown', label: 'Brown', value: 'brown', color: '#8B4513' },
  { id: 'blue', label: 'Blue', value: 'blue', color: '#4682B4' }
];

export const dummyProducts = [
  {
    id: 1,
    name: "Handcrafted Ceramic Vase",
    price: 45,
    image: "/images/image_placeholder.png",
    category: "Ceramics",
    categoryId: 1,
    size: "M",
    color: "natural-beige",
    inStock: true,
    description: "Beautiful handcrafted ceramic vase made by local artisans.",
    rating: 4.5,
    reviews: 12
  },
  {
    id: 2,
    name: "Woven Textile Bag",
    price: 32,
    image: "/images/image_placeholder.png",
    category: "Textiles",
    categoryId: 2,
    size: "L",
    color: "olive-green",
    inStock: true,
    description: "Eco-friendly woven bag perfect for daily use.",
    rating: 4.2,
    reviews: 8
  },
  {
    id: 3,
    name: "Wooden Handicraft Bowl",
    price: 28,
    image: "/images/image_placeholder.png",
    category: "Wood",
    categoryId: 3,
    size: "S",
    color: "brown",
    inStock: false,
    description: "Handcarved wooden bowl from sustainable wood sources.",
    rating: 4.8,
    reviews: 15
  },
  {
    id: 4,
    name: "Metal Decorative Item",
    price: 65,
    image: "/images/image_placeholder.png",
    category: "Metal",
    categoryId: 4,
    size: "XL",
    color: "grey",
    inStock: true,
    description: "Elegant metal decoration piece for your home.",
    rating: 4.0,
    reviews: 6
  },
  {
    id: 5,
    name: "Bamboo Craft Basket",
    price: 38,
    image: "/images/image_placeholder.png",
    category: "Bamboo",
    categoryId: 5,
    size: "M",
    color: "natural-beige",
    inStock: true,
    description: "Sustainable bamboo basket with traditional weaving.",
    rating: 4.3,
    reviews: 10
  },
  {
    id: 6,
    name: "Handmade Jewelry Set",
    price: 55,
    image: "/images/image_placeholder.png",
    category: "Jewelry",
    categoryId: 6,
    size: "S",
    color: "pink",
    inStock: true,
    description: "Beautiful handcrafted jewelry set with natural stones.",
    rating: 4.7,
    reviews: 18
  },
  {
    id: 7,
    name: "Paper Art Frame",
    price: 22,
    image: "/images/image_placeholder.png",
    category: "Paper Crafts",
    categoryId: 7,
    size: "M",
    color: "white",
    inStock: true,
    description: "Delicate paper art in a beautiful frame.",
    rating: 4.1,
    reviews: 5
  },
  {
    id: 8,
    name: "Glass Wind Chime",
    price: 41,
    image: "/images/image_placeholder.png",
    category: "Glass",
    categoryId: 8,
    size: "L",
    color: "blue",
    inStock: true,
    description: "Musical glass wind chime for garden decoration.",
    rating: 4.6,
    reviews: 14
  }
];

export const dummyPrescriptions = [
  {
    id: 1,
    name: "Prescription 1",
    doctor: "Dr. Smith",
    date: "2024-01-15",
    status: "active",
    medications: [
      { name: "Medicine A", dosage: "2 tablets daily" },
      { name: "Medicine B", dosage: "1 tablet morning" }
    ]
  },
  {
    id: 2,
    name: "Prescription 2", 
    doctor: "Dr. Johnson",
    date: "2024-01-20",
    status: "completed",
    medications: [
      { name: "Medicine C", dosage: "1 tablet evening" }
    ]
  },
  {
    id: 3,
    name: "Prescription 3",
    doctor: "Dr. Williams",
    date: "2024-02-01",
    status: "pending",
    medications: [
      { name: "Medicine D", dosage: "3 tablets daily" }
    ]
  }
];

// Helper function to simulate API delay
export const simulateApiDelay = (ms = 500) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Helper function to get paginated products
export const getPaginatedProducts = (page = 1, pageSize = 5) => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  
  // Create more products by duplicating with different IDs
  const extendedProducts = [];
  for (let i = 0; i < 20; i++) {
    dummyProducts.forEach(product => {
      extendedProducts.push({
        ...product,
        id: product.id + (i * dummyProducts.length),
        name: `${product.name} ${i + 1}`,
        price: product.price + Math.floor(Math.random() * 20) - 10 // Add some price variation
      });
    });
  }
  
  return {
    content: extendedProducts.slice(startIndex, endIndex),
    totalPages: Math.ceil(extendedProducts.length / pageSize),
    totalElements: extendedProducts.length,
    currentPage: page,
    pageSize
  };
};
