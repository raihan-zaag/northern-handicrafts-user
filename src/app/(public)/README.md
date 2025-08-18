# Public Module - Northern Handicrafts

## 📖 Module Overview

This module contains all public-facing pages and functionality that users can access without authentication, as well as authenticated user features like profile management.

## 🎯 Purpose & Scope

### Primary Functions
- Product browsing and search
- Product details and reviews
- Shopping cart management
- Checkout process
- Order management and tracking
- User profile and account settings
- Customer support
- Legal and informational pages

### Page Categories

#### **🛍️ Shopping Experience**
- **Landing** (`/`) - Homepage with featured products
- **Products** (`/products`, `/product-details/[id]`) - Product catalog and details
- **Cart** (`/my-cart`) - Shopping cart management
- **Checkout** (`/checkout`) - Purchase flow

#### **📦 Order Management**
- **Order Success** (`/order-success`) - Successful order confirmation
- **Order Failed** (`/order-failed`) - Failed order handling
- **Track Order** (`/track-order`) - Order tracking for guests and users

#### **👤 User Profile** (Requires Authentication)
- **My Account** (`/profile/my-account`) - User profile settings
- **My Orders** (`/profile/my-orders`) - Order history and management
- **Wishlist** (`/profile/wishlist`) - Saved items
- **Address** (`/profile/address`) - Saved addresses
- **Track Order** (`/profile/track-order`) - Order tracking redirect

#### **📞 Support & Information**
- **Customer Support** (`/customer-support`) - Contact and support
- **Legal Pages**: Privacy Policy, Terms & Conditions, Shipping Policy, etc.

## 🏗️ Current Structure

```
src/app/(public)/
├── layout.js                           # Public layout (Header + Footer)
├── landing/
│   └── page.jsx                        # Homepage (currently at root /)
├── products/
│   ├── page.jsx                        # Product listing
│   ├── [id]/
│   │   └── page.jsx                    # Product details
│   ├── components/
│   ├── hooks/
│   └── services/
├── cart/
│   ├── page.jsx                        # Shopping cart (my-cart)
│   ├── components/
│   └── services/
├── checkout/
│   ├── page.jsx                        # Checkout process
│   ├── components/
│   ├── hooks/
│   └── services/
├── orders/
│   ├── success/
│   │   └── page.jsx                    # Order success page
│   ├── failed/
│   │   └── page.jsx                    # Order failed page
│   └── track/
│       └── page.jsx                    # Order tracking
├── profile/
│   ├── layout.jsx                      # Profile sidebar layout
│   ├── my-account/
│   │   └── page.jsx                    # User profile settings
│   ├── my-orders/
│   │   ├── page.jsx                    # Order history
│   │   └── track-order/
│   │       └── page.jsx                # Track order redirect
│   ├── wishlist/
│   │   └── page.jsx                    # User wishlist
│   ├── address/
│   │   └── page.jsx                    # Address management
│   ├── components/                     # Profile-specific components
│   ├── hooks/                          # Profile-specific hooks
│   └── services/                       # Profile API services
├── support/
│   ├── page.jsx                        # Customer support
│   └── components/
├── legal/
│   ├── privacy-policy/
│   │   └── page.jsx
│   ├── terms-and-condition/
│   │   └── page.jsx
│   ├── shipping-policy/
│   │   └── page.jsx
│   ├── refund-policy/
│   │   └── page.jsx
│   ├── cookie-policy/
│   │   └── page.jsx
│   └── accessibility-statement/
│       └── page.jsx
└── README.md                           # This file
```

## 🔌 API Endpoints Used

### Product APIs
- `GET /products` - Product listing with filters
- `GET /products/{id}` - Product details
- `GET /categories` - Product categories
- `GET /reviews/{productId}` - Product reviews

### Cart APIs
- `GET /cart` - Get user cart
- `POST /cart` - Add item to cart
- `PUT /cart/{id}` - Update cart item
- `DELETE /cart/{id}` - Remove cart item

### Order APIs
- `POST /orders` - Create new order
- `GET /orders` - Get user orders
- `GET /orders/{id}` - Get specific order
- `GET /orders/{id}/track` - Track order status

### Profile APIs
- `GET /profile` - Get user profile
- `PUT /profile` - Update user profile
- `GET /addresses` - Get user addresses
- `POST /addresses` - Add new address
- `PUT /addresses/{id}` - Update address
- `DELETE /addresses/{id}` - Delete address

### Wishlist APIs
- `GET /wishlist` - Get user wishlist
- `POST /wishlist` - Add to wishlist
- `DELETE /wishlist/{id}` - Remove from wishlist

### Support APIs
- `POST /contact` - Contact form submission
- `GET /static-content/{page}` - Legal page content

## 🎨 Layout & Styling

### Public Layout Features
- **Header Component**: Full navigation, search, cart, user menu
- **Footer Component**: Links, newsletter, payment info
- **Responsive Design**: Mobile-first approach
- **Navigation**: Category-based product navigation
- **Search**: Global product search functionality

### Profile Layout Features
- **Sidebar Navigation**: Profile menu with active states
- **Responsive Sidebar**: Accordion-style on mobile
- **Breadcrumb**: Clear navigation within profile
- **Grid Layout**: Sidebar + main content area

### Styling Guidelines
- Consistent color scheme across all pages
- Inter font family for typography
- Tailwind CSS for utility classes
- Component-based styling approach
- Mobile-responsive design patterns

## 🛠️ Key Components

### Layout Components
- **Header**: Navigation, search, cart, user menu
- **Footer**: Site links, newsletter signup, payment methods
- **ProfileSidebar**: Profile navigation menu
- **Breadcrumb**: Page navigation indicator

### Shopping Components
- **ProductCard**: Product display in listings
- **ProductDetails**: Detailed product view
- **CartItem**: Shopping cart item display
- **CheckoutForm**: Multi-step checkout process

### Profile Components
- **ProfileForm**: User profile editing
- **OrderCard**: Order history display
- **AddressCard**: Address management
- **WishlistItem**: Wishlist item display

## 🎣 Hooks

### Shopping Hooks
- **useProducts**: Product listing and filtering
- **useProductDetails**: Single product data
- **useCart**: Shopping cart management
- **useCheckout**: Checkout process handling

### Profile Hooks
- **useProfile**: User profile management
- **useOrders**: Order history and tracking
- **useAddresses**: Address CRUD operations
- **useWishlist**: Wishlist management

### Common Hooks
- **useNotification**: Success/error notifications
- **usePagination**: List pagination handling
- **useLocalStorage**: Local storage management

## 🔧 Services

### Shopping Services
- **productService.js**: Product API interactions
- **cartService.js**: Cart API operations
- **orderService.js**: Order management
- **checkoutService.js**: Payment processing

### Profile Services
- **profileService.js**: Profile API calls
- **addressService.js**: Address management
- **wishlistService.js**: Wishlist operations

## 🔒 Authentication Integration

### Protected Routes
- All `/profile/*` routes require authentication
- Cart operations require auth for persistence
- Checkout requires authentication
- Order tracking accessible to guests with order ID

### Guest Features
- Product browsing without auth
- Guest cart (local storage)
- Guest order tracking with order ID
- Guest checkout (with account creation option)

## 📱 Responsive Design

### Breakpoints
- Mobile: 320px - 768px
- Tablet: 768px - 1024px  
- Desktop: 1024px+

### Mobile Optimizations
- Touch-friendly buttons and interactions
- Collapsible navigation menus
- Optimized image loading
- Swipe gestures for carousels
- Bottom navigation for key actions

## 🔄 User Flows

### Shopping Flow
1. Browse products on homepage
2. Search/filter products
3. View product details
4. Add to cart
5. Proceed to checkout
6. Complete purchase
7. View order confirmation

### Profile Management Flow
1. Login to account
2. Access profile section
3. Update personal information
4. Manage addresses
5. View order history
6. Track current orders

## 🧪 Testing Considerations

### Unit Tests
- Component rendering
- Hook functionality  
- Service API calls
- Utility functions

### Integration Tests
- Shopping cart flow
- Checkout process
- Profile management
- Authentication integration

### E2E Tests
- Complete purchase flow
- User registration → shopping → checkout
- Profile management workflows
- Mobile responsiveness

## 🔄 Refactoring Status

### ✅ Completed
- [x] Basic page structure in place
- [x] Public layout with Header/Footer
- [x] Profile layout with sidebar
- [x] Core shopping functionality
- [x] Authentication integration

### ⏳ Pending Refactoring
- [ ] Move product-related components to products module
- [ ] Move cart components to cart module  
- [ ] Move checkout components to checkout module
- [ ] Move profile components to profile module
- [ ] Consolidate shared components to common
- [ ] Update import paths to use module structure
- [ ] Improve error handling consistency
- [ ] Add loading states standardization

### 🎯 Post-Refactor Goals
- [ ] Better code organization by feature
- [ ] Improved reusability of components
- [ ] Easier testing and maintenance
- [ ] Consistent error and loading handling
- [ ] Better separation of concerns

## 🔗 Integration Points

### With Auth Module
- Login/logout redirects
- Protected route handling
- User state management
- Authentication required notifications

### With Common Components
- Shared UI components (Button, Input, Modal)
- Global notification system
- Shared hooks and utilities
- Common styling patterns

### With Global State
- User authentication context
- Shopping cart context
- Wishlist context
- Notification context

## 📊 Performance Considerations

- Image optimization for product photos
- Lazy loading for product lists
- Caching for frequently accessed data
- Pagination for large data sets
- Search debouncing
- Code splitting by route

---

**Last Updated**: August 18, 2025  
**Module Status**: ✅ Functional - ⏳ Refactoring Pending  
**Maintainer**: Development Team
