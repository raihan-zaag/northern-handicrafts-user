# Sample Data Documentation

This directory contains sample data for development and testing purposes. The sample data is designed to match the expected data structure of the Northern Handicrafts application.

## Overview

The sample data system allows developers to work on the frontend without needing a fully functional backend API. It includes:

- **Product Data**: Complete product listings with images, prices, categories, colors, and sizes
- **Home Page Data**: Banner slides, testimonials, featured categories, and promotional content
- **Category Data**: Product categories with descriptions and metadata
- **Size Data**: Available product sizes with pricing modifiers

## Files Structure

```
src/data/
├── sampleProducts.js      # Product data and categories
├── sampleHomeData.js      # Home page content (banners, testimonials, etc.)
├── dataUtils.js           # Utilities for data management and filtering
└── README.md             # This documentation
```

## Usage

### Basic Usage

The sample data system is controlled by the `USE_SAMPLE_DATA` environment variable. By default, it's enabled in development mode.

```javascript
// In your components or pages
import { getProductData } from '@/data/dataUtils';

const productList = getProductData(1, searchParams);
```

### Using Sample Services

For more complex scenarios, use the sample service:

```javascript
import { sampleProductService } from '@/services/sampleProductService';

// Get filtered products
const products = await sampleProductService.getProductFilterList({
  category: ['1', '2'],
  priceFrom: 20,
  priceTo: 100,
  search: 'wool',
  page: 1,
  size: 6
});

// Get single product
const product = await sampleProductService.getProductById(1);

// Get featured products
const featured = await sampleProductService.getFeaturedProducts(4);
```

### Environment Configuration

Create a `.env.local` file based on `.env.example`:

```bash
# Enable sample data
USE_SAMPLE_DATA=true

# Simulate API delay (in milliseconds)
SAMPLE_DATA_DELAY=300

# Products per page
SAMPLE_PRODUCTS_PER_PAGE=6
```

## Data Structure

### Product Object

```javascript
{
  id: 1,
  name: "Product Name",
  thumbnailImage: "/images/image_placeholder.png",
  regularPrice: 45.00,
  priceAfterDiscount: 35.00, // null if no discount
  discount: 22, // percentage
  description: "Product description",
  colorList: [
    {
      id: 1,
      name: "Color Name",
      price: 0, // additional price for this color
      colorCode: "#FF0000"
    }
  ],
  category: {
    id: 1,
    name: "Category Name"
  },
  inStock: true,
  rating: 4.5,
  reviewCount: 23
}
```

### API Response Structure

```javascript
{
  data: {
    content: [...], // Array of products
    totalPages: 3,
    totalElements: 18,
    size: 6,
    number: 0, // current page (0-based)
    first: true,
    last: false,
    numberOfElements: 6
  },
  status: 200,
  message: "Success message"
}
```

## Features

### Filtering and Search

The sample data supports:

- **Category filtering**: Filter by one or multiple categories
- **Price range filtering**: Filter by minimum and maximum price
- **Text search**: Search in product names, descriptions, and categories
- **Sorting**: Sort by price, name, rating, etc.

### Pagination

- Configurable page size
- Proper pagination metadata
- Navigation controls

### Product Features

- Multiple color variants with pricing
- Size options with pricing modifiers
- Discount calculations
- Stock status
- Ratings and reviews

## Switching to Real API

When ready to use real API data:

1. Set `USE_SAMPLE_DATA=false` in your environment
2. Ensure your API endpoints match the expected data structure
3. Update service imports to use real services instead of sample services

```javascript
// Development (sample data)
import { getProductData } from '@/data/dataUtils';

// Production (real API)
import { getProductFilterList } from '@/services/productService';
```

## Adding New Sample Data

### Adding Products

1. Add new product objects to `sampleProducts.js`
2. Ensure they follow the existing data structure
3. Update pagination metadata if needed

### Adding Categories

1. Add new categories to the `sampleCategories` array
2. Update category references in product data
3. Add corresponding featured category data in `sampleHomeData.js`

### Adding Home Page Content

1. Update arrays in `sampleHomeData.js`:
   - `sampleBannerData` for slider content
   - `sampleTestimonials` for customer reviews
   - `sampleFeaturedCategories` for category highlights
   - `sampleArtisanSpotlight` for artisan features

## Best Practices

1. **Keep data realistic**: Use realistic product names, prices, and descriptions
2. **Maintain consistency**: Ensure data relationships are consistent (e.g., category IDs)
3. **Test edge cases**: Include products with and without discounts, different price ranges
4. **Image placeholders**: Use consistent placeholder images for development
5. **Update regularly**: Keep sample data fresh and relevant to current features

## Troubleshooting

### Common Issues

1. **Missing data**: Ensure all required fields are present in sample objects
2. **Inconsistent IDs**: Make sure category IDs, color IDs match across data files
3. **Pagination errors**: Verify totalPages calculation matches actual data length
4. **Image loading**: Ensure placeholder images exist in the public directory

### Debugging

Enable console logging in data utilities:

```javascript
// In dataUtils.js
console.log('Filtering products:', { filters, resultCount: filtered.length });
```

## Contributing

When adding new features that require data:

1. Update sample data structures to match new requirements
2. Add corresponding utilities in `dataUtils.js`
3. Update this documentation
4. Test with both sample and real data scenarios
