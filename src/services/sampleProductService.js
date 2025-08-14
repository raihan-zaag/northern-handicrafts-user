// Sample service to simulate API calls with sample data
// This can be used for development when backend APIs are not available

import { 
  getAllSampleProducts, 
  filterSampleProducts, 
  paginateSampleProducts,
  getCategoriesData,
  getSizesData 
} from '../data/dataUtils';

// Simulate network delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

export const sampleProductService = {
  // Get filtered product list with pagination
  getProductFilterList: async (params = {}) => {
    await delay(300); // Simulate API delay
    
    try {
      const allProducts = getAllSampleProducts();
      
      // Apply filters
      const filteredProducts = filterSampleProducts(allProducts, {
        category: Array.isArray(params.category) ? params.category : (params.category ? [params.category] : []),
        priceFrom: params.priceFrom,
        priceTo: params.priceTo,
        search: params.searchKey || params.search,
        sortBy: params.sort || params.sortBy
      });
      
      // Apply pagination
      const page = Number(params.page) > 0 ? Number(params.page) : 1;
      const size = Number(params.size) > 0 ? Number(params.size) : 6;
      
      return paginateSampleProducts(filteredProducts, page, size);
    } catch (error) {
      throw new Error('Failed to fetch products: ' + error.message);
    }
  },

  // Get single product by ID
  getProductById: async (id) => {
    await delay(200);
    
    try {
      const allProducts = getAllSampleProducts();
      const product = allProducts.find(p => p.id === Number(id));
      
      if (!product) {
        throw new Error('Product not found');
      }
      
      return {
        data: product,
        status: 200,
        message: 'Product retrieved successfully'
      };
    } catch (error) {
      throw new Error('Failed to fetch product: ' + error.message);
    }
  },

  // Get product categories
  getCategories: async () => {
    await delay(200);
    
    try {
      const categories = getCategoriesData();
      return {
        data: categories,
        status: 200,
        message: 'Categories retrieved successfully'
      };
    } catch (error) {
      throw new Error('Failed to fetch categories: ' + error.message);
    }
  },

  // Get product sizes
  getSizes: async () => {
    await delay(200);
    
    try {
      const sizes = getSizesData();
      return {
        data: sizes,
        status: 200,
        message: 'Sizes retrieved successfully'
      };
    } catch (error) {
      throw new Error('Failed to fetch sizes: ' + error.message);
    }
  },

  // Search products
  searchProducts: async (searchTerm, page = 1, size = 6) => {
    await delay(300);
    
    try {
      return await sampleProductService.getProductFilterList({
        searchKey: searchTerm,
        page,
        size
      });
    } catch (error) {
      throw new Error('Failed to search products: ' + error.message);
    }
  },

  // Get featured products (first 4 products with discounts)
  getFeaturedProducts: async (limit = 4) => {
    await delay(200);
    
    try {
      const allProducts = getAllSampleProducts();
      const featuredProducts = allProducts
        .filter(product => product.discount > 0)
        .slice(0, limit);
      
      return {
        data: featuredProducts,
        status: 200,
        message: 'Featured products retrieved successfully'
      };
    } catch (error) {
      throw new Error('Failed to fetch featured products: ' + error.message);
    }
  },

  // Get products by category
  getProductsByCategory: async (categoryId, page = 1, size = 6) => {
    await delay(300);
    
    try {
      return await sampleProductService.getProductFilterList({
        category: [categoryId.toString()],
        page,
        size
      });
    } catch (error) {
      throw new Error('Failed to fetch products by category: ' + error.message);
    }
  },

  // Get related products (products from same category, excluding current product)
  getRelatedProducts: async (productId, limit = 4) => {
    await delay(200);
    
    try {
      const allProducts = getAllSampleProducts();
      const currentProduct = allProducts.find(p => p.id === Number(productId));
      
      if (!currentProduct) {
        throw new Error('Product not found');
      }
      
      const relatedProducts = allProducts
        .filter(product => 
          product.category.id === currentProduct.category.id && 
          product.id !== currentProduct.id
        )
        .slice(0, limit);
      
      return {
        data: relatedProducts,
        status: 200,
        message: 'Related products retrieved successfully'
      };
    } catch (error) {
      throw new Error('Failed to fetch related products: ' + error.message);
    }
  }
};

// Export individual functions for easier importing
export const {
  getProductFilterList,
  getProductById,
  getCategories,
  getSizes,
  searchProducts,
  getFeaturedProducts,
  getProductsByCategory,
  getRelatedProducts
} = sampleProductService;
