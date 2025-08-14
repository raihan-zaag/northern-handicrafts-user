// Data utilities for managing sample and real data

import { sampleProductList, sampleProductListPage2, sampleCategories, sampleSizes } from './sampleProducts';
import { sampleBannerData, sampleTestimonials, sampleFeaturedCategories, sampleNewsletterPromo, sampleArtisanSpotlight } from './sampleHomeData';

// Environment flag to control whether to use sample data
export const USE_SAMPLE_DATA = process.env.NODE_ENV === 'development' || process.env.USE_SAMPLE_DATA === 'true';

// Product data utilities
export const getProductData = (page = 1, searchParams = {}) => {
  if (USE_SAMPLE_DATA) {
    // Return appropriate page of sample data
    switch (page) {
      case 2:
        return sampleProductListPage2;
      case 1:
      default:
        return sampleProductList;
    }
  }
  
  // This would be your real API call
  // return getProductFilterList(searchParams);
  return null;
};

export const getCategoriesData = () => {
  if (USE_SAMPLE_DATA) {
    return sampleCategories;
  }
  
  // This would be your real API call for categories
  // return getCategoriesList();
  return null;
};

export const getSizesData = () => {
  if (USE_SAMPLE_DATA) {
    return sampleSizes;
  }
  
  // This would be your real API call for sizes
  // return getSizesList();
  return null;
};

// Home page data utilities
export const getBannerData = () => {
  if (USE_SAMPLE_DATA) {
    return sampleBannerData;
  }
  
  // This would be your real API call for banner data
  // return getBannerList();
  return null;
};

export const getTestimonialsData = () => {
  if (USE_SAMPLE_DATA) {
    return sampleTestimonials;
  }
  
  // This would be your real API call for testimonials
  // return getTestimonialsList();
  return null;
};

export const getFeaturedCategoriesData = () => {
  if (USE_SAMPLE_DATA) {
    return sampleFeaturedCategories;
  }
  
  // This would be your real API call for featured categories
  // return getFeaturedCategoriesList();
  return null;
};

export const getNewsletterPromoData = () => {
  if (USE_SAMPLE_DATA) {
    return sampleNewsletterPromo;
  }
  
  // This would be your real API call for newsletter promo
  // return getNewsletterPromoInfo();
  return null;
};

export const getArtisanSpotlightData = () => {
  if (USE_SAMPLE_DATA) {
    return sampleArtisanSpotlight;
  }
  
  // This would be your real API call for artisan spotlight
  // return getArtisanSpotlightList();
  return null;
};

// Filter and search utilities for sample data
export const filterSampleProducts = (products, filters = {}) => {
  let filtered = [...products];
  
  // Filter by category
  if (filters.category && filters.category.length > 0) {
    filtered = filtered.filter(product => 
      filters.category.includes(product.category.id.toString())
    );
  }
  
  // Filter by price range
  if (filters.priceFrom !== undefined || filters.priceTo !== undefined) {
    filtered = filtered.filter(product => {
      const price = product.priceAfterDiscount || product.regularPrice;
      const fromPrice = filters.priceFrom || 0;
      const toPrice = filters.priceTo || 9999;
      return price >= fromPrice && price <= toPrice;
    });
  }
  
  // Filter by search term
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filtered = filtered.filter(product =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.name.toLowerCase().includes(searchTerm)
    );
  }
  
  // Sort products
  if (filters.sortBy) {
    switch (filters.sortBy) {
      case 'price_asc':
        filtered.sort((a, b) => {
          const priceA = a.priceAfterDiscount || a.regularPrice;
          const priceB = b.priceAfterDiscount || b.regularPrice;
          return priceA - priceB;
        });
        break;
      case 'price_desc':
        filtered.sort((a, b) => {
          const priceA = a.priceAfterDiscount || a.regularPrice;
          const priceB = b.priceAfterDiscount || b.regularPrice;
          return priceB - priceA;
        });
        break;
      case 'name_asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name_desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'rating_desc':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Default sort by ID
        break;
    }
  }
  
  return filtered;
};

// Pagination utility for sample data
export const paginateSampleProducts = (products, page = 1, size = 6) => {
  const startIndex = (page - 1) * size;
  const endIndex = startIndex + size;
  const paginatedProducts = products.slice(startIndex, endIndex);
  
  return {
    data: {
      content: paginatedProducts,
      totalPages: Math.ceil(products.length / size),
      totalElements: products.length,
      size: size,
      number: page - 1,
      first: page === 1,
      last: page === Math.ceil(products.length / size),
      numberOfElements: paginatedProducts.length
    },
    status: 200,
    message: "Products retrieved successfully"
  };
};

// Get all sample products (combines all pages)
export const getAllSampleProducts = () => {
  return [
    ...sampleProductList.data.content,
    ...sampleProductListPage2.data.content
  ];
};
