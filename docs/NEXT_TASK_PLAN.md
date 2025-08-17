# Phase 2 Migration Plan: AntD → shadcn/ui + Tailwind v4

This document defines the next actionable tasks to finish removing Ant Design and standardize UI/UX and data flow. Use it as the source of truth for implementation, PR scope, and QA.

## Goals
- Remove all remaining AntD components and CSS.
- Replace with shadcn/ui primitives and Tailwind v4 utilities only.
- Migrate forms to react-hook-form + zod with inline errors.
- Move all API calls into services/ (axios instances + interceptors already configured).
- Keep naming conventions and file structure consistent.

## Definition of Done
- No imports from `antd` or `@ant-design/*` anywhere.
- No AntD CSS overrides in `globals.css`.
- All forms use react-hook-form + zod; inline validation shown with FormMessage.
- All data-fetch/mutations happen in services, not components/hooks.
- UI uses local shadcn-style primitives in `src/components/ui`.
- Build, type-check, and lint pass. Smoke tests complete in critical flows.

## Component Migration (UI)
Track and check off each area as you finish.

- [ ] Drawer → Sheet
  - [ ] `src/components/header/Drawer.jsx`
  - [ ] `src/sections/cart/Drawer.jsx`
  - [ ] Product details quick views (if any)
- [ ] Modal → Dialog
  - [ ] `src/app/(public)/profile/my-prescriptions/_components/prescriptionModal.jsx`
  - [ ] Any confirm/remove dialogs in cart/order flows
- [ ] Select → Select (shadcn)
  - [ ] Checkout address forms, product details variants
- [ ] Radio → RadioGroup
  - [ ] Checkout delivery/payment method, filters
- [ ] Popover → Popover (shadcn)
  - [ ] Product details and header popovers
- [ ] Rate → Star rating component (custom Tailwind + icons)
  - [ ] `src/components/cards/ProductReviewForm.jsx`
- [ ] Carousel → Carousel (Embla recommended)
  - [ ] Product image gallery, any sliders
- [ ] Collapse → Accordion
  - [ ] FAQ/spec sections on product pages
- [ ] Spin → Spinner
  - [ ] Ensure every remaining loading state uses local `Spinner`

Notes:
- Place new primitives under `src/components/ui/`: `sheet.jsx`, `dialog.jsx`, `select.jsx`, `radio-group.jsx`, `popover.jsx`, `accordion.jsx`, `carousel.jsx`, and `star-rating.jsx`.
- Use Tailwind-only styling; follow existing Button/Input/Form patterns in this folder.

## Forms Migration (RHF + Zod)
Convert AntD Forms to RHF + zod. Use `src/auth/components/LoginForm.jsx` as reference.

Targets:
- [ ] `src/app/(public)/checkout/page.jsx` (shipping/billing, delivery, payment)
- [ ] `src/sections/checkout/GuestUserAddressForm.jsx`
- [ ] `src/app/(public)/customer-support/_component/CustomerSupportForm.jsx`
- [ ] `src/app/(public)/profile/my-prescriptions/_components/prescriptionModal.jsx`
- [ ] `src/components/cards/ProductReviewForm.jsx`
- [ ] `src/app/(public)/track-order/page.jsx`

Guidelines:
- Define a `zod` schema per form; use `@hookform/resolvers/zod`.
- Display inline errors using `FormMessage` and `aria-invalid`.
- Use controlled `Select`/`RadioGroup` and `Checkbox` via RHF Controller or shadcn FormField.
- Keep UX parity: disabled states, loading, and submit feedback via Sonner toasts.

## Services Extraction (API)
Move all network calls to `src/services/` using the axios instances in `src/configs/axios.publicInstance.js`.

Create modules and export named functions:
- [ ] `services/cartService.js`
  - `updateCart(cartPayload)`
  - `getCart(customerId)`
- [ ] `services/orderService.js`
  - `getOrderCalculation(payload)`
  - `createGuestOrder(payload)`
- [ ] `services/addressService.js`
  - `getAddresses(customerId)`, `createAddress`, `updateAddress`, `deleteAddress`
- [ ] `services/prescriptionService.js`
  - `getPrescriptionOptions()`, `uploadPrescription`, `deletePrescription`
- [ ] `services/reviewService.js`
  - `getProductReviews(productId)`, `createReview`, `updateReview`
- [ ] `services/wishlistService.js`
  - `getWishlist`, `addToWishlist`, `removeFromWishlist`
- [ ] `services/newsletterService.js`
  - `subscribe(email)`

Refactors:
- Update hooks and contexts to consume services. Example:
  - `useCartContext`: remove direct axios usage (`getCartListForAuthUser`, `handleUpdateCartInBackend`) and call `cartService` instead. Keep local mapping utilities like `transformCartResponse`.
  - `useGetOrderCalculatedData`, `useMakeGuestUserOrder`: delegate to `orderService`.

## Notifications
- Replace any AntD notifications with Sonner toasts (already integrated globally). Use success/error/info consistently.

## Styling and Tokens
- Use Tailwind v4 utilities only; no scoped AntD styles.
- Reuse tokens defined in `src/app/globals.css` via `@theme`.
- Keep accessibility: focus states, aria labels, roles, keyboard nav.

## Naming and Structure
- Components: PascalCase in `src/components` and `src/sections`.
- Services: camelCase files in `src/services`.
- Pages: lowercase route segments. Avoid underscores.

## QA Checklist
- [ ] Build succeeds with zero AntD imports.
- [ ] Visual parity for header, product pages, cart drawer, checkout, and profile sections.
- [ ] All forms validate inline and block submit on errors.
- [ ] Cart operations: add/update/remove/clear reflect correctly and persist.
- [ ] Checkout: calculation updates with promo + delivery method and totals match.
- [ ] No console errors; toasts appear for success/fail.

## Cleanup
- When all usages are migrated, remove AntD packages and registry. Then run a full install.
- Search and delete any AntD-specific CSS overrides or dead code.

## Suggested Order of Work
1) Finish remaining Spinner replacements and minor component swaps.
2) Migrate Drawers (cart/header) and Modals (prescription) to unblock core flows.
3) Convert Checkout + Address + Customer Support forms to RHF + zod.
4) Extract services and update hooks/contexts to consume them.
5) Replace Select/Radio/Popover/Accordion and implement Carousel + StarRating.
6) Remove AntD dependencies and do a full QA pass.

## How to Use This Plan
- Pick a bullet group, open a short-lived feature branch, complete the checklist, and submit a focused PR referencing this doc.
- Keep changes scoped (UI component swap vs. service extraction) to speed up review.
