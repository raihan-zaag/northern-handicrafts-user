# Northern Handicrafts - Project Structure Documentation

## 🏗️ Project Architecture

This project follows a **feature-based modular structure** with clear separation between authentication, public pages, and shared components.

## 📁 Directory Structure

```
src/
├── app/
│   ├── (auth)/                    # Authentication Module
│   │   ├── layout.js             # Auth-specific layout (TopHeading + Breadcrumb)
│   │   ├── login/                # Login functionality
│   │   ├── signup/               # User registration
│   │   ├── forgot-password/      # Password recovery
│   │   ├── reset-password/       # Password reset
│   │   ├── email-verification/   # Email verification
│   │   └── README.md
│   │
│   ├── (public)/                 # Public Module
│   │   ├── layout.js            # Public layout (Header + Footer)
│   │   ├── landing/             # Home page (/)
│   │   ├── products/            # Product browsing & details
│   │   ├── cart/                # Shopping cart (my-cart)
│   │   ├── checkout/            # Checkout process
│   │   ├── orders/              # Order management
│   │   ├── profile/             # User profile & account
│   │   ├── support/             # Customer support
│   │   ├── legal/               # Legal pages (privacy, terms, etc.)
│   │   └── README.md
│   │
│   ├── layout.js                # Root layout (ContextWrapper + Toaster)
│   ├── page.js                  # Root page (redirects to landing)
│   └── globals.css              # Global styles
│
├── common/                      # Shared/Reusable Code
│   ├── components/              # Shared UI components
│   │   ├── layout/             # Layout components (Header, Footer, Sidebar)
│   │   ├── ui/                 # Shadcn UI components
│   │   ├── forms/              # Form components
│   │   ├── buttons/            # Button components
│   │   ├── cards/              # Card components
│   │   └── modals/             # Modal components
│   │
│   ├── hooks/                   # Shared React hooks
│   ├── services/                # Global API services
│   ├── utils/                   # Helper functions
│   └── config/                  # Global configuration
│
├── contextProviders/            # Global state management
├── features/                    # Legacy feature structure (to be migrated)
└── README.md                    # This file
```

## 🎯 Layout Usage Guidelines

### Root Layout (`src/app/layout.js`)
- **Purpose**: Global layout wrapper
- **Contains**: ContextWrapper, Toaster, global styles
- **Used by**: All pages in the application

### Auth Layout (`src/app/(auth)/layout.js`)
- **Purpose**: Authentication pages layout
- **Contains**: TopHeading component, Breadcrumb navigation
- **Used by**: login, signup, forgot-password, reset-password, email-verification
- **Styling**: Minimal, focused on auth flow

### Public Layout (`src/app/(public)/layout.js`)
- **Purpose**: Public-facing pages layout
- **Contains**: Header, Footer components
- **Used by**: All public pages (landing, products, cart, checkout, etc.)
- **Styling**: Full navigation and branding

### Profile Layout (`src/app/(public)/profile/layout.js`)
- **Purpose**: User profile pages layout
- **Contains**: Profile sidebar navigation + main content area
- **Used by**: my-account, my-orders, wishlist, address, etc.
- **Styling**: Sidebar + content grid layout

## 🔄 Module vs Common Code Rules

### ✅ Module-Specific Code (goes in `src/app/(module)/feature/`)
- Components used only within that specific feature
- Hooks that serve only that feature's logic
- Services that call APIs specific to that feature
- Utils that are feature-specific

### ✅ Common/Shared Code (goes in `src/common/`)
- UI components used across multiple features (Button, Modal, Card)
- Layout components (Header, Footer, Sidebar)
- Global hooks (useAuth, useNotification, useLocalStorage)
- Shared services (API client, interceptors)
- Global utilities (formatters, validators, date helpers)
- Configuration files (constants, routes, API URLs)

### ✅ Global State (stays in `src/contextProviders/`)
- Context providers that need to be shared across features
- Shopping cart state, user authentication state, etc.

## 📋 Refactoring Progress

### ✅ **Phase 1: Foundation Setup** (Target: Complete)
- [x] Create root README documentation
- [x] Create common directory structure
- [x] Move shared components from src/components/ → src/common/components/
- [x] Move shared hooks from src/hooks/ → src/common/hooks/
- [x] Move shared services from src/services/ → src/common/services/
- [x] Move shared utils from src/utils/ → src/common/utils/
- [x] Move configs from src/configs/ → src/common/config/

### ✅ **Phase 2: Layout Updates** (Target: Complete)
- [x] Move Footer component to src/common/components/layout/
- [x] Move Header component to src/common/components/layout/
- [x] Update auth layout to use common components
- [x] Update public layout to use common components
- [x] Create landing page in public module
- [x] Update root page to redirect to landing
- [x] Remove Footer from root layout (auth pages don't need footer)
- [x] Test layout consistency across all pages

### ✅ **Phase 3: Auth Module Refactor** (Target: Complete)
- [x] Create auth module README
- [x] Consolidate auth functionality into (auth) module
- [x] Move auth-specific components to (auth)/components/
- [x] Move auth-specific hooks to (auth)/hooks/
- [x] Move auth-specific services to (auth)/services/
- [x] Update import paths for auth functionality
- [x] Create auth module index files
- [x] Clean up old auth directories

### ✅ **Phase 4: Public Module Refactor** (Target: Complete)
- [x] Create public module README
- [x] Reorganize public pages into feature modules
- [x] Create feature-specific component/hook/service folders
- [x] Move feature-specific hooks from global hooks directory
- [x] Create index files for clean imports within feature modules
- [x] Move sections to appropriate feature modules
- [x] Remove empty global directories (hooks/, sections/)
- [x] Update import paths for public functionality

### ⏳ **Phase 5: Import Path Updates & Testing** (Target: In Progress)
- [ ] Update @/hooks/* imports to new locations
- [ ] Update @/sections/* imports to new locations  
- [ ] Update @/components/* imports to @/common/components/*
- [ ] Update @/services/* imports to @/common/services/*
- [ ] Fix remaining broken imports
- [ ] Test all pages and functionality
- [ ] Performance testing
- [ ] Documentation updates

## 🚀 Getting Started After Refactor

### For New Features
1. Determine if it's auth or public functionality
2. Create feature folder in appropriate module
3. Add components/, hooks/, services/ as needed
4. Update the module's README

### For Shared Components
1. Add to `src/common/components/`
2. Export from appropriate index file
3. Import using `@/common/components/`

### For Global State
1. Add to `src/contextProviders/`
2. Wrap in ContextWrapper if needed

## 📚 Key Files to Monitor

- `src/app/layout.js` - Root layout configuration
- `src/app/(auth)/layout.js` - Auth pages layout
- `src/app/(public)/layout.js` - Public pages layout  
- `src/common/components/layout/` - Layout components
- `src/contextProviders/contextWrapper.js` - Global state wrapper

## 🔧 Development Guidelines

1. **Feature Isolation**: Keep feature-specific code within its module
2. **Common First**: Check if component/hook exists in common before creating new
3. **Import Paths**: Use `@/common/` for shared code, `@/contextProviders/` for global state
4. **Documentation**: Update README when adding new features or major changes
5. **Testing**: Test both module-specific and cross-module functionality

## 📞 Support

For questions about the project structure or refactoring process, refer to:
- Module-specific README files
- This root documentation
- Git commit history for refactoring changes

---

**Last Updated**: August 18, 2025  
**Current Branch**: auth  
**Refactoring Status**: Phase 4 - Public Module Refactor (In Progress)
