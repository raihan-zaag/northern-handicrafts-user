// Sample banner/slider data for the home page

export const sampleBannerData = [
  {
    id: 1,
    title: "Handcrafted with Love",
    subtitle: "Discover unique artisan pieces from the heart of tradition",
    description: "Explore our collection of authentic handmade products crafted by skilled artisans from around the world.",
    imageUrl: "/images/image_placeholder.png",
    buttonText: "Shop Now",
    buttonLink: "/products",
    backgroundColor: "#f8f5f0",
    textColor: "#2c1810",
    isActive: true
  },
  {
    id: 2,
    title: "Winter Collection 2024",
    subtitle: "Warm up with our cozy handwoven textiles",
    description: "Premium wool scarves, blankets, and accessories to keep you comfortable during the cold season.",
    imageUrl: "/images/image_placeholder.png",
    buttonText: "Explore Collection",
    buttonLink: "/products?category=1",
    backgroundColor: "#e8f4f8",
    textColor: "#1a4548",
    isActive: true
  },
  {
    id: 3,
    title: "Limited Edition Ceramics",
    subtitle: "Exclusive pottery pieces by master craftsmen",
    description: "One-of-a-kind ceramic vases, bowls, and decorative items that blend traditional techniques with modern design.",
    imageUrl: "/images/image_placeholder.png",
    buttonText: "View Ceramics",
    buttonLink: "/products?category=2",
    backgroundColor: "#f0e8d6",
    textColor: "#3d2914",
    isActive: true
  }
];

export const sampleTestimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "New York, USA",
    rating: 5,
    comment: "Absolutely love the quality and craftsmanship of the products. The attention to detail is incredible!",
    productPurchased: "Handwoven Wool Scarf",
    avatar: "/images/image_placeholder.png",
    date: "2024-01-15"
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "San Francisco, USA",
    rating: 5,
    comment: "The ceramic vase I purchased is stunning. It's become the centerpiece of my living room. Highly recommended!",
    productPurchased: "Ceramic Pottery Vase",
    avatar: "/images/image_placeholder.png",
    date: "2024-01-10"
  },
  {
    id: 3,
    name: "Emma Thompson",
    location: "London, UK",
    rating: 4,
    comment: "Beautiful products with authentic craftsmanship. The shipping was fast and the packaging was excellent.",
    productPurchased: "Wooden Jewelry Box",
    avatar: "/images/image_placeholder.png",
    date: "2024-01-08"
  },
  {
    id: 4,
    name: "David Rodriguez",
    location: "Madrid, Spain",
    rating: 5,
    comment: "The leather wallet is of exceptional quality. You can tell it's made by skilled artisans. Worth every penny!",
    productPurchased: "Handmade Leather Wallet",
    avatar: "/images/image_placeholder.png",
    date: "2024-01-05"
  }
];

export const sampleFeaturedCategories = [
  {
    id: 1,
    name: "Textiles",
    description: "Handwoven fabrics and textile products",
    imageUrl: "/images/image_placeholder.png",
    productCount: 24,
    link: "/products?category=1"
  },
  {
    id: 2,
    name: "Ceramics",
    description: "Beautiful pottery and ceramic art",
    imageUrl: "/images/image_placeholder.png",
    productCount: 18,
    link: "/products?category=2"
  },
  {
    id: 3,
    name: "Woodwork",
    description: "Carved wooden items and furniture",
    imageUrl: "/images/image_placeholder.png",
    productCount: 15,
    link: "/products?category=3"
  },
  {
    id: 4,
    name: "Leather Goods",
    description: "Premium leather accessories",
    imageUrl: "/images/image_placeholder.png",
    productCount: 12,
    link: "/products?category=4"
  },
  {
    id: 5,
    name: "Glass Art",
    description: "Hand-blown glass decorative items",
    imageUrl: "/images/image_placeholder.png",
    productCount: 9,
    link: "/products?category=5"
  },
  {
    id: 6,
    name: "Jewelry",
    description: "Handcrafted jewelry and accessories",
    imageUrl: "/images/image_placeholder.png",
    productCount: 21,
    link: "/products?category=6"
  }
];

export const sampleNewsletterPromo = {
  title: "Stay Updated with Our Latest Creations",
  subtitle: "Subscribe to our newsletter and get 10% off your first order",
  description: "Be the first to know about new arrivals, exclusive offers, and artisan stories.",
  discountCode: "WELCOME10",
  backgroundImage: "/images/image_placeholder.png",
  buttonText: "Subscribe Now"
};

export const sampleArtisanSpotlight = [
  {
    id: 1,
    name: "Maria Gonzalez",
    specialty: "Textile Weaving",
    location: "Guatemala",
    experience: "25 years",
    description: "Maria has been weaving traditional textiles for over two decades, preserving ancient techniques passed down through generations.",
    imageUrl: "/images/image_placeholder.png",
    featuredProducts: [1, 4, 11]
  },
  {
    id: 2,
    name: "Hiroshi Tanaka",
    specialty: "Ceramic Pottery",
    location: "Japan",
    experience: "30 years",
    description: "Master potter Hiroshi creates stunning ceramic pieces that blend traditional Japanese techniques with contemporary design.",
    imageUrl: "/images/image_placeholder.png",
    featuredProducts: [2]
  },
  {
    id: 3,
    name: "Ahmed Hassan",
    specialty: "Leather Crafting",
    location: "Morocco",
    experience: "20 years",
    description: "Ahmed specializes in traditional leather crafting, creating beautiful bags, wallets, and accessories using time-honored methods.",
    imageUrl: "/images/image_placeholder.png",
    featuredProducts: [5]
  }
];
