# Auth Module - Northern Handicrafts

## 📖 Module Overview

This module handles all authentication-related functionality including user login, registration, password management, and email verification.

## 🎯 Purpose & Scope

### Primary Functions
- User login with email/password
- Social authentication (Google, Facebook)
- User registration/signup
- Password recovery (forgot password)
- Password reset with tokens
- Email verification process
- Authentication state management

### Pages Included
- **Login** (`/login`) - User authentication
- **Sign Up** (`/sign-up`) - User registration  
- **Forgot Password** (`/forgot-password`) - Password recovery initiation
- **Reset Password** (`/reset-password`) - Password reset with token
- **Email Verification** (`/email-verification`) - Email confirmation

## 🏗️ Current Structure

```
src/app/(auth)/
├── layout.js                     # Auth layout (TopHeading + Breadcrumb)
├── login/
│   ├── page.jsx                  # Login page
│   └── components/
│       ├── LoginForm.jsx         # Main login form
│       └── SocialLoginForm.jsx   # Google/Facebook login
├── sign-up/
│   ├── page.jsx                  # Registration page
│   └── components/
├── forgot-password/
│   ├── page.jsx                  # Forgot password page
│   └── components/
├── reset-password/
│   ├── page.jsx                  # Reset password page  
│   └── components/
├── email-verification/
│   ├── page.jsx                  # Email verification page
│   └── components/
├── components/                   # Shared auth components
├── hooks/                        # Auth-specific hooks
├── services/                     # Auth API services
├── utils/                        # Auth utility functions
└── README.md                     # This file
```

## 🔌 API Endpoints Used

### Authentication APIs
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/forgot-password` - Initiate password recovery
- `POST /auth/reset-password` - Reset password with token
- `POST /auth/verify-email` - Email verification
- `POST /auth/refresh-token` - Token refresh

### Social Authentication APIs
- `POST /auth/google` - Google OAuth login
- `POST /auth/facebook` - Facebook OAuth login

## 🎨 Layout & Styling

### Auth Layout Features
- **TopHeading Component**: Displays brand logo and basic navigation
- **Breadcrumb Navigation**: Shows current page in auth flow
- **Minimal Design**: Clean, focused interface for auth processes
- **Responsive**: Works on mobile and desktop
- **Centered Content**: Forms are centered on page

### Styling Guidelines
- Background: Clean white/light background
- Typography: Inter font, clear hierarchy
- Colors: Primary brand colors for CTAs
- Forms: Consistent input styling across all auth forms
- Buttons: Primary style for main actions, outline for secondary

## 🔄 User Flow

### Registration Flow
1. User visits `/sign-up`
2. Fills registration form
3. Receives email verification
4. Clicks verification link → `/email-verification`
5. Account activated → Redirect to dashboard

### Login Flow
1. User visits `/login`
2. Enters credentials OR uses social login
3. Successful auth → Redirect to intended page or home
4. Failed auth → Error message shown

### Password Recovery Flow
1. User visits `/forgot-password`
2. Enters email address
3. Receives reset email
4. Clicks reset link → `/reset-password`
5. Enters new password
6. Success → Redirect to login

## 🛠️ Components

### Shared Auth Components (`components/`)
- **AuthForm**: Base form component for all auth forms
- **SocialLoginButtons**: Google/Facebook login buttons
- **AuthInput**: Styled input component for auth forms
- **AuthButton**: Styled button component
- **ErrorMessage**: Error display component
- **SuccessMessage**: Success notification component

### Page-Specific Components
- **LoginForm**: Email/password login form
- **SignUpForm**: Registration form with validation
- **ForgotPasswordForm**: Email input for password recovery
- **ResetPasswordForm**: New password form
- **EmailVerificationForm**: Email verification handler

## 🎣 Hooks

### Auth-Specific Hooks (`hooks/`)
- **useLogin**: Handles login logic and state
- **useSignUp**: Manages registration process
- **useForgotPassword**: Password recovery functionality
- **useResetPassword**: Password reset logic
- **useEmailVerification**: Email verification handling
- **useSocialAuth**: Google/Facebook authentication

## 🔧 Services

### Auth Services (`services/`)
- **authService.js**: Core authentication API calls
- **socialAuthService.js**: Social login integrations
- **tokenService.js**: JWT token management
- **validationService.js**: Form validation logic

## 🛡️ Security Features

- JWT token-based authentication
- Secure password hashing
- Email verification required
- Token refresh mechanism
- CSRF protection
- Rate limiting on auth endpoints
- Social OAuth integration

## 📱 Responsive Design

- Mobile-first approach
- Touch-friendly buttons and inputs
- Optimized for various screen sizes
- Accessible keyboard navigation
- Screen reader compatibility

## 🧪 Testing Considerations

### Unit Tests
- Form validation logic
- API service functions
- Hook functionality
- Component rendering

### Integration Tests
- Complete auth flows
- Social login integration
- Error handling scenarios
- Redirect behavior

### E2E Tests
- Full registration process
- Login/logout cycles
- Password recovery flow
- Cross-browser compatibility

## 🔄 Refactoring Status

### ✅ Completed
- [x] Basic auth pages structure in place
- [x] Auth layout with TopHeading and Breadcrumb
- [x] Social login components
- [x] Form validation

### ⏳ Pending Refactoring
- [ ] Move auth-specific components from global components
- [ ] Consolidate auth hooks from global hooks folder
- [ ] Move auth services from global services folder
- [ ] Create auth-specific utilities
- [ ] Update import paths to use module structure
- [ ] Add comprehensive error handling
- [ ] Implement loading states consistency

### 🎯 Post-Refactor Goals
- [ ] Improved code organization
- [ ] Better separation of concerns
- [ ] Easier testing and maintenance
- [ ] Consistent error handling
- [ ] Better TypeScript support (future)

## 🔗 Integration Points

### With Common Components
- Uses common Button, Input, Modal components
- Integrates with global notification system
- Uses shared loading and error components

### With Global State
- Updates user context on successful auth
- Manages cart state for authenticated users
- Handles authentication status globally

### With Public Module
- Redirects to public pages after auth
- Protects certain public routes
- Shares user data with profile module

---

**Last Updated**: August 18, 2025  
**Module Status**: ✅ Functional - ⏳ Refactoring Pending  
**Maintainer**: Development Team
