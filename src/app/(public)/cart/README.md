# Cart Management System

This directory contains a clean, industry-standard cart implementation following modern React best practices and the Figma design specifications.

## Architecture Overview

### Component Structure
```
cart/
├── components/
│   ├── CartItemCard.jsx          # Individual cart item component
│   ├── QuantityControl.jsx       # Reusable quantity selector
│   ├── OrderSummaryCard.jsx      # Order summary with promo codes
│   ├── EmptyCartState.jsx        # Empty state component
│   └── index.js                  # Component exports
├── hooks/
│   ├── useCartManagement.js      # Cart operations hook
│   └── useCartUpdate.jsx         # Backend update hook
└── page.jsx                      # Main cart page

```

## Key Features

### 🎨 Design Implementation
- **Figma-compliant UI**: Matches the provided design specifications
- **Responsive Design**: Mobile-first approach with desktop optimizations
- **Clean Visual Hierarchy**: Clear product information layout
- **Consistent Spacing**: Following design system guidelines

### 🛒 Cart Functionality
- **Quantity Management**: Intuitive +/- controls with validation
- **Item Removal**: One-click removal with confirmation
- **Price Calculation**: Real-time price updates
- **Prescription Support**: Edit item prescriptions
- **Promo Code System**: Apply and manage discount codes

### 🔧 Technical Implementation
- **Component Composition**: Modular, reusable components
- **State Management**: Efficient state updates with context
- **Error Handling**: Graceful error states and loading indicators
- **Performance**: Optimized re-renders and calculations
- **Accessibility**: ARIA labels and keyboard navigation

## Component API

### CartItemCard
```jsx
<CartItemCard
  cartInfo={cartItem}
  onQuantityChange={handleUpdate}
  onRemove={handleRemove}
  className="custom-styles"
/>
```

**Props:**
- `cartInfo`: Cart item data object
- `onQuantityChange`: Callback for quantity updates
- `onRemove`: Callback for item removal
- `className`: Additional CSS classes

### QuantityControl
```jsx
<QuantityControl
  quantity={2}
  maxQuantity={10}
  onQuantityChange={handleQuantityChange}
  disabled={false}
/>
```

**Props:**
- `quantity`: Current quantity value
- `maxQuantity`: Maximum allowed quantity
- `onQuantityChange`: Callback when quantity changes
- `disabled`: Disable all controls

### OrderSummaryCard
```jsx
<OrderSummaryCard
  total={299.99}
  subTotal={279.99}
  discount={20.00}
  promoCode="SAVE20"
  onPromoCodeChange={handlePromoChange}
  onApplyPromoCode={handleApplyPromo}
  fromCartPage={true}
/>
```

**Props:**
- `total`: Final total amount
- `subTotal`: Subtotal before discounts
- `discount`: Discount amount
- `promoCode`: Current promo code
- `onPromoCodeChange`: Promo code input handler
- `onApplyPromoCode`: Apply promo code handler
- `fromCartPage`: Show cart-specific UI elements

## State Management

### Cart Context Integration
The cart components integrate seamlessly with the existing cart context:

```jsx
const {
  cart,
  calculatedData,
  removeFromCart,
  updateCartItem,
  handleGetOrderCalculateData,
  handleUpdateCartInBackend,
} = useCart();
```

### Custom Hook Usage
For advanced cart operations, use the `useCartManagement` hook:

```jsx
const {
  cart,
  calculatedData,
  isLoading,
  error,
  updateQuantity,
  removeItem,
  applyPromoCode,
  clearPromoCode,
} = useCartManagement();
```

## Best Practices Implemented

### 1. **Component Composition**
- Single responsibility components
- Prop-driven behavior
- Minimal state management in components

### 2. **Performance Optimization**
- Optimized re-renders with `useCallback`
- Efficient state updates
- Lazy loading for heavy operations

### 3. **Error Handling**
- Graceful error states
- Loading indicators
- User-friendly error messages

### 4. **Accessibility**
- ARIA labels for screen readers
- Keyboard navigation support
- Focus management
- Semantic HTML structure

### 5. **Mobile Responsiveness**
- Touch-friendly controls
- Adaptive layouts
- Consistent spacing across devices

## Usage Examples

### Basic Cart Page
```jsx
import { CartItemCard, OrderSummaryCard, EmptyCartState } from './components';

const CartPage = () => {
  const { cart, calculatedData } = useCart();

  if (!cart?.length) {
    return <EmptyCartState />;
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        {cart.map(item => (
          <CartItemCard
            key={item.uid}
            cartInfo={item}
            onQuantityChange={handleUpdate}
            onRemove={handleRemove}
          />
        ))}
      </div>
      <div className="lg:col-span-1">
        <OrderSummaryCard
          {...calculatedData}
          fromCartPage={true}
        />
      </div>
    </div>
  );
};
```

### Quantity Control in Product Pages
```jsx
import { QuantityControl } from './components';

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div>
      <QuantityControl
        quantity={quantity}
        maxQuantity={product.stockQuantity}
        onQuantityChange={setQuantity}
      />
    </div>
  );
};
```

## Styling Guidelines

### CSS Classes
- Use Tailwind utility classes for consistency
- Follow the design system color palette
- Maintain consistent spacing (4px grid)

### Component Styling
```jsx
// Good: Conditional styling with cn utility
className={cn(
  "base-styles",
  condition && "conditional-styles",
  className
)}

// Good: Responsive breakpoints
className="text-sm lg:text-base"
```

## Testing Considerations

### Component Testing
- Test quantity updates
- Verify remove functionality
- Check promo code application
- Test responsive behavior

### Integration Testing
- Cart state synchronization
- Backend API calls
- Error handling scenarios
- Loading states

## Future Enhancements

### Potential Improvements
1. **Animations**: Smooth transitions for updates
2. **Wishlist Integration**: Move to wishlist functionality
3. **Recently Viewed**: Show recently viewed items
4. **Quick Actions**: Bulk operations (select all, remove all)
5. **Saved Carts**: Save cart for later
6. **Price Alerts**: Notify on price changes

### Performance Optimizations
1. **Virtual Scrolling**: For large cart lists
2. **Image Optimization**: Lazy loading and WebP format
3. **Bundle Splitting**: Code splitting for cart features
4. **Caching**: Implement cart data caching

## Maintenance

### Code Quality
- Regular linting with ESLint
- Type checking with TypeScript (recommended)
- Unit tests for critical functions
- Integration tests for user flows

### Dependencies
- Keep dependencies updated
- Monitor bundle size
- Audit for security vulnerabilities
- Performance monitoring

---

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Navigate to Cart**
   Visit `http://localhost:3000/cart` to see the implementation.

4. **Test Functionality**
   - Add items to cart
   - Modify quantities
   - Apply promo codes
   - Test responsive behavior

This implementation provides a solid foundation for e-commerce cart functionality while maintaining clean code architecture and excellent user experience.
