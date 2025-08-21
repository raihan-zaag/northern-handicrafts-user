# Global CSS Variables & Tailwind Classes Reference

This document contains all Tailwind CSS classes, CSS variables, and arbitrary values used throughout the Northern Handicrafts User project.

## Table of Contents
- [CSS Variables](#css-variables)
- [Tailwind Standard Classes](#tailwind-standard-classes)
- [Arbitrary Values](#arbitrary-values)
- [Custom Color Variables](#custom-color-variables)
- [Typography System](#typography-system)
- [Component-Specific Classes](#component-specific-classes)

## CSS Variables

### Brand & Primary Colors
```css
--primary: #3EB345
--primary-foreground: #ffffff
--secondary: #f1f5f9
--secondary-foreground: #0f172a
--background: #ffffff
--foreground: #0a0a0a
```

### State Colors
```css
--destructive: #ef4444
--destructive-foreground: #ffffff
--success: #22c55e
--success-foreground: #ffffff
--warning: #f59e0b
--warning-foreground: #ffffff
--info: #3b82f6
--info-foreground: #ffffff
```

### Border & Input
```css
--border: #e2e8f0
--input: #e2e8f0
--ring: #3EB345
--border-dark: #2b2e3a
```

### Legacy Colors (Backward Compatibility)
```css
--color-primary: #3EB345
--color-secondary: #f1f5f9
--color-background: #ffffff
--color-border: #e2e8f0
--color-border-dark: #2b2e3a
--color-light-font: #f5f5f5
--color-light-font2: #64748b
--color-dark-black: #0a0a0a
--color-light-gray: #6b7280
--color-font-color-one: #374151
--color-font-color-two: #9ca3af
--color-font-color-red: #ef4444
--color-font-color-three: #4b5563
```

### Spacing Scale
```css
--spacing-xs: 0.25rem
--spacing-sm: 0.5rem
--spacing-md: 1rem
--spacing-lg: 1.5rem
--spacing-xl: 2rem
--spacing-2xl: 3rem
--spacing-3xl: 4rem
```

### Border Radius
```css
--radius: 0.5rem
--radius-sm: 0.25rem
--radius-md: 0.375rem
--radius-lg: 0.75rem
--radius-xl: 1rem
--radius-full: 9999px
```

### Typography
```css
--font-syne: "Syne", sans-serif
```

### Box Shadows
```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05)
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)
```

### Chart Colors
```css
--chart-1: #3EB345
--chart-2: #22c55e
--chart-3: #16a34a
--chart-4: #15803d
--chart-5: #166534
```

### Container Breakpoints & Max-widths
```css
--breakpoint-sm: 640px
--breakpoint-md: 768px
--breakpoint-lg: 1024px
--breakpoint-xl: 1280px
--breakpoint-2xl: 1536px

--container-sm: 640px
--container-md: 768px
--container-lg: 1024px
--container-xl: 1200px
--container-2xl: 1500px
```

## Tailwind Standard Classes

### Layout Classes
```
grid, flex, block, hidden, inline-block
grid-cols-1, grid-cols-2, grid-cols-5, grid-cols-12
col-span-1, col-span-2, col-span-3, col-span-4, col-span-5
flex-col, flex-row, flex-grow, flex-grow-0
justify-start, justify-center, justify-between, justify-end
items-start, items-center, items-end
space-x-2, space-y-2, space-y-4, space-y-5, space-y-8
gap-1, gap-3, gap-4, gap-6, gap-8, gap-10, gap-12
```

### Typography Classes
```
text-xs, text-sm, text-base, text-lg, text-xl, text-2xl, text-3xl, text-4xl
font-normal, font-medium, font-semibold, font-bold, font-extrabold
leading-none, leading-tight, leading-normal, leading-relaxed, leading-snug
text-left, text-center, text-right
whitespace-nowrap, whitespace-normal
text-balance
```

### Color Classes
```
text-black, text-white, text-gray-600, text-gray-700
text-red-500, text-blue-500, text-primary
bg-white, bg-gray-200, bg-gray-300
bg-primary, bg-secondary, bg-dark-black
border-border, border-gray-300, border-transparent
```

### Spacing Classes
```
p-2, p-3, p-4, p-5, p-6, p-8, p-12
px-3, px-4, px-6, px-8, px-12
py-2, py-3, py-4, py-5, py-6, py-10, py-12
m-2, m-4, m-6, m-8, m-12
mt-1, mt-2, mt-4, mt-5, mt-6, mt-8, mt-12
mb-2, mb-4, mb-6
```

### Size Classes
```
w-full, w-1/2, w-1/4, w-3/4
h-4, h-5, h-6, h-8, h-12
min-h-scr, max-w-lg
```

### Border & Effects
```
border, border-2, border-b, border-b-2, border-t
rounded, rounded-md, rounded-sm, rounded-lg, rounded-full
shadow, shadow-sm, shadow-md, shadow-lg, shadow-xl
animate-pulse, animate-spin
transition, transition-colors, transition-all
duration-200
```

### Responsive Prefixes
```
sm:, md:, lg:, xl:, 2xl:
```

### Display & Visibility
```
block, hidden, inline-block
sm:block, md:block, lg:block
sm:hidden, md:hidden, lg:hidden
```

## Arbitrary Values

### Text Sizes (Arbitrary)
```
text-[13px], text-[15px], text-[28px]
text-[12px], text-[14px]
```

### Colors (Arbitrary)
```
text-[#6A6A6A] - Gray text
text-[#2A2A2A] - Dark gray text
text-[#4A4A4A] - Medium gray text
text-[#CCCCCC] - Light gray text
text-[#fff] - White text
text-[#0F62FE] - Blue text
text-[#262626] - Dark text
text-[#EF4444] - Red text
text-[#8790AB] - Light blue-gray text
text-[#3A3A3A] - Medium dark text
text-[#5A5A5A] - Medium gray text
text-[#BABABA] - Light gray text
text-[#D9333F] - Red text variant
text-[#E91C24] - Another red variant
```

### Background Colors (Arbitrary)
```
bg-[#F6F6F6] - Light gray background
bg-[#FAFBFB] - Very light gray background
bg-[#F7F8FA] - Off-white background
bg-[#EFF5FF] - Light blue background
bg-[#F3F5F6] - Light blue-gray background
bg-[#E5E7EB] - Light gray background
bg-[#F08200] - Orange background
```

### Border Colors (Arbitrary)
```
border-[#2B2E3A] - Dark border
border-[#EBEDF0] - Light gray border
border-[#F0F0F0] - Very light gray border
border-[#3A3A3A] - Dark gray border
border-[#8790AB] - Light blue-gray border
border-[1.5px] - Border width
```

### Dimensions (Arbitrary)
```
w-[48px], w-[120px], w-[140px], w-[328px], w-[350px], w-[496px], w-[600px]
h-[20px], h-[52px], h-[80px], h-[100px], h-[120px], h-[140px], h-[369px], h-[500px]
min-w-[8rem]
max-w-[600px], max-w-[500px], max-w-[760px], max-w-[690px]
min-h-[80px], min-h-[100px], min-h-[200px]
```

### Spacing (Arbitrary)
```
mt-[108px] - Large top margin
py-[15px] - Vertical padding
px-[30px] - Horizontal padding
gap-[10px], gap-[60px] - Custom gaps
top-[50%], left-[50%] - Positioning
translate-x-[-50%], translate-y-[-50%] - Transform
```

### Complex Transform & Animation Classes
```
data-[state=open]:animate-in
data-[state=closed]:animate-out
data-[state=closed]:fade-out-0
data-[state=open]:fade-in-0
data-[state=closed]:zoom-out-95
data-[state=open]:zoom-in-95
```

## Custom Color Variables (JS Constants)

### Primary Colors
```javascript
PRIMARY = "#2A2A2A"
SECONDARY = ""
LIGHT_GRAY = "#6E6E6E"
```

## Typography System

### Title Components
```
Title1: text-2xl sm:text-3xl md:text-4xl font-extrabold text-black leading-tight
Title2: text-xl sm:text-2xl md:text-3xl font-bold text-black leading-snug
Title3: text-lg sm:text-xl md:text-[28px] font-semibold text-primary leading-normal
```

### Text Components
```
Paragraph: text-sm sm:text-base md:text-lg font-normal text-gray-700 leading-relaxed
BodyText: text-xs sm:text-sm md:text-base font-normal text-primary leading-none
SmallText: text-xs font-normal text-gray-600 leading-tight
```

## Component-Specific Classes

### Spinner Component
```
sm: h-4 w-4
md: h-6 w-6
lg: h-8 w-8
xl: h-12 w-12
animate-spin rounded-full border-2 border-current border-t-transparent
```

### Button Variants
```
Primary: bg-primary text-white
Secondary: border-2 border-primary
Disabled: disabled:opacity-50, disabled:cursor-not-allowed
```

### Form Elements
```
Input: px-3 py-2 border border-input bg-background rounded-md
Textarea: min-h-[80px] w-full rounded-md border border-input
Select: rounded-md border bg-popover text-popover-foreground
```

### Layout Containers
```
Container: w-full margin-left-auto margin-right-auto px-4
Footer: bg-dark-black text-light-font py-12
```

### Skeleton Loading
```
Base: animate-pulse
Background: bg-gray-200, bg-gray-300
Heights: h-4, h-6, h-8
Widths: w-full, w-3/4, w-1/2, w-1/4
```

## Usage Notes

1. **Responsive Design**: Most classes use responsive prefixes (sm:, md:, lg:, xl:)
2. **Color System**: Prefer CSS variables over arbitrary hex values for consistency
3. **Spacing**: Use the defined spacing scale variables when possible
4. **Typography**: Use the Typography component system for consistent text styling
5. **Animations**: Leverage Tailwind's built-in animation classes
6. **Dark Mode**: Some variables are prepared for dark mode support

## File Locations

- Global CSS: `src/app/globals.css`
- Typography Components: `src/common/components/Typography/index.js`
- Color Constants: `src/common/config/constants/colors.js`
- Utility Functions: `src/lib/utils.js`, `src/utils/index.js`, `src/common/utils/index.js`
- Ant Design Theme: Found in semantic search results (configs/antd.theme.js pattern)

---

*Last Updated: August 19, 2025*
*This document should be updated when new CSS variables or Tailwind classes are added to the project.*





@import "tailwindcss";

/* =======================
   🌞 Light Mode Variables
   ======================= */
:root {
  --background: #FFFFFF;
  --foreground: #2A2A2A;

  /* Brand Colors */
  --color-primary: #3EB345;
  --color-secondary: #fafbfb;

  /* Borders */
  --color-border: #ebedf0;
  --color-border-dark: #2b2e3a;
  --color-border-gray: #EBEDF0;
  --color-border-light: #F0F0F0;
  --color-border-input: #DFE2E6;

  /* Text Colors */
  --color-light-font: #f5f5f5;
  --color-light-font2: #505f79;
  --color-dark-black: #1A1A1A;
  --color-light-gray: #6e6e6e;

  --color-gray-dark: #2A2A2A;
  --color-gray-medium: #4A4A4A;
  --color-gray: #6A6A6A;
  --color-gray-light: #CCCCCC;
  --color-gray-light2: #BABABA;
  --color-gray-dark2: #3A3A3A;
  --color-gray-mid2: #5A5A5A;
  --color-gray-blue: #8790AB;

  --color-font-color-one: #5a5a5a;
  --color-font-color-two: #bababa;
  --color-font-color-three: #4a4a4a;

  --color-white: #FFFFFF;
  --color-dark: #262626;

  /* States */
  --color-red: #EF4444;
  --color-red-variant1: #D9333F;
  --color-red-variant2: #E91C24;
  --color-blue: #0F62FE;
  --color-blue-gray: #8790AB;
  --color-orange: #F08200;

  /* Backgrounds */
  --color-bg-light-gray: #F6F6F6;
  --color-bg-off-white: #F7F8FA;
  --color-bg-lighter: #FAFBFB;
  --color-light-blue-bg: #EFF5FF;
  --color-light-blue-gray-bg: #F3F5F6;
  --color-secondary-bg: #F5F7FA;


  /* Font Sizes */
  --text-xs2: 12px;
  --text-sm2: 13px;
  --text-base2: 14px;
  --text-md2: 15px;
  --text-xl2: 28px;

  /* Widths */
  --w-48: 48px;
  --w-120: 120px;
  --w-140: 140px;
  --w-328: 328px;
  --w-350: 350px;
  --w-496: 496px;
  --w-600: 600px;

  /* Heights */
  --h-20: 20px;
  --h-52: 52px;
  --h-80: 80px;
  --h-100: 100px;
  --h-120: 120px;
  --h-140: 140px;
  --h-369: 369px;
  --h-500: 500px;

  /* Min/Max Widths */
  --min-w-32: 8rem;
  --max-w-500: 500px;
  --max-w-600: 600px;
  --max-w-690: 690px;
  --max-w-760: 760px;

  /* Min Heights */
  --min-h-80: 80px;
  --min-h-100: 100px;
  --min-h-200: 200px;

  /* Spacing */
  --mt-108: 108px;
  --py-15: 15px;
  --px-30: 30px;
  --gap-10: 10px;
  --gap-60: 60px;

  /* Position / Transforms */
  --pos-50: 50%;
  --translate-50: -50%;

  /* Fonts */
  --font-syne: "Syne", sans-serif;
}

/* =======================
   🌙 Dark Mode (Optional)
   ======================= */
/* @media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
} */

/* =======================
   🔗 Map to Tailwind Theme
   ======================= */
@theme inline {
  /* Fonts */
  --font-syne: var(--font-syne);

  /* Colors */
  --color-primary: var(--color-primary);
  --color-secondary: var(--color-secondary);
  --color-background: var(--background);
  --color-border: var(--color-border);
  --color-border-dark: var(--color-border-dark);
  --color-border-gray: var(--color-border-gray);
  --color-border-light: var(--color-border-light);
  --color-border-input: var(--color-border-input);

  --color-light-font: var(--color-light-font);
  --color-light-font2: var(--color-light-font2);
  --color-dark-black: var(--color-dark-black);
  --color-light-gray: var(--color-light-gray);

  --color-gray-dark: var(--color-gray-dark);
  --color-gray-medium: var(--color-gray-medium);
  --color-gray: var(--color-gray);
  --color-gray-light: var(--color-gray-light);
  --color-gray-light2: var(--color-gray-light2);
  --color-gray-dark2: var(--color-gray-dark2);
  --color-gray-mid2: var(--color-gray-mid2);

  --color-font-color-one: var(--color-font-color-one);
  --color-font-color-two: var(--color-font-color-two);
  --color-font-color-three: var(--color-font-color-three);

  --color-white: var(--color-white);
  --color-dark: var(--color-dark);

  --color-red: var(--color-red);
  --color-red-variant1: var(--color-red-variant1);
  --color-red-variant2: var(--color-red-variant2);
  --color-blue: var(--color-blue);
  --color-blue-gray: var(--color-blue-gray);
  --color-gray-blue: var(--color-gray-blue);
  --color-orange: var(--color-orange);

  --color-bg-light-gray: var(--color-bg-light-gray);
  --color-bg-off-white: var(--color-bg-off-white);
  --color-bg-lighter: var(--color-bg-lighter);
  --color-light-blue-bg: var(--color-light-blue-bg);
  --color-light-blue-gray-bg: var(--color-light-blue-gray-bg);
  --color-secondary-bg: var(--color-secondary-bg);

  /* Font Sizes */
  --text-xs2: var(--text-xs2);
  --text-sm2: var(--text-sm2);
  --text-base2: var(--text-base2);
  --text-md2: var(--text-md2);
  --text-xl2: var(--text-xl2);

  /* Widths */
  --w-48: var(--w-48);
  --w-120: var(--w-120);
  --w-140: var(--w-140);
  --w-328: var(--w-328);
  --w-350: var(--w-350);
  --w-496: var(--w-496);
  --w-600: var(--w-600);

  /* Heights */
  --h-20: var(--h-20);
  --h-52: var(--h-52);
  --h-80: var(--h-80);
  --h-100: var(--h-100);
  --h-120: var(--h-120);
  --h-140: var(--h-140);
  --h-369: var(--h-369);
  --h-500: var(--h-500);

  /* Min/Max Widths */
  --min-w-32: var(--min-w-32);
  --max-w-500: var(--max-w-500);
  --max-w-600: var(--max-w-600);
  --max-w-690: var(--max-w-690);
  --max-w-760: var(--max-w-760);

  /* Min Heights */
  --min-h-80: var(--min-h-80);
  --min-h-100: var(--min-h-100);
  --min-h-200: var(--min-h-200);

  /* Spacing */
  --mt-108: var(--mt-108);
  --py-15: var(--py-15);
  --px-30: var(--px-30);
  --gap-10: var(--gap-10);
  --gap-60: var(--gap-60);

  /* Position / Transform */
  --pos-50: var(--pos-50);
  --translate-50: var(--translate-50);

  /* Default text color example */
  --color-text: #ff4455;

  /* Container breakpoints */
  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;
  --container-xl: 1200px;
  --container-2xl: 1500px;

  /* Spacing tokens (used by w-*, h-*, p-*, m-*, max-w-*, etc.) */
  --spacing-38px: 38px;
  --spacing-36px: 36px;
  --spacing-40px: 40px;
  --spacing-48px: 48px;
  --spacing-6px: 6px;
  --spacing-20px: 20px;
  --spacing-108px: 108px;
  --spacing-30px: 30px;
  --spacing-4px: 4px;
  --spacing-62px: 62px;
  --spacing-180px: 180px;
  --spacing-10px: 10px;
  --spacing-12px: 12px;
  --spacing-350px: 350px;
  --spacing-14px: 14px;
  --spacing-68px: 68px;
  --spacing-408px: 408px;
  --spacing-15px: 15px;
  --spacing-18px: 18px;
  --spacing-48px: 48px;
  --spacing-52px: 52px;
  --spacing-28px: 28px;
  --spacing-30px: 30px;
  --spacing-60px: 60px;
  --spacing-65px: 65px;
  --spacing-70px: 70px;
  --spacing-72px: 72px;
  --spacing-75px: 75px;
  --spacing-80px: 80px;
  --spacing-108px: 108px;
  --spacing-100px: 100px;
  --spacing-280px: 280px;
  --spacing-112px: 112px;
  --spacing-120px: 120px;
  --spacing-123px: 123px;
  --spacing-140px: 140px;
  --spacing-13px: 13px;
  --spacing-41px: 41px;
  --spacing-46px: 46px;
  --spacing-49px: 49px;
  --spacing-43px: 43px;
  --spacing-150px: 150px;
  --spacing-153px: 153px;
  --spacing-200px: 200px;
  --spacing-215px: 215px;
  --spacing-260px: 260px;
  --spacing-274px: 274px;
  --spacing-300px: 300px;
  --spacing-330px: 330px;
  --spacing-360px: 360px;
  --spacing-369px: 369px;
  --spacing-440px: 440px;
  --spacing-412px: 412px;
  --spacing-460px: 460px;
  --spacing-380px: 380px;
  --spacing-400px: 400px;
  --spacing-360px: 360px;
  --spacing-642px: 642px;
  --spacing-400px: 400px;
  --spacing-500px: 500px;
  --spacing-550px: 550px;
  --spacing-650px: 650px;
  --spacing-590px: 590px;
  --spacing-513px: 513px;
  --spacing-512px: 512px;
  --spacing-540px: 540px;
  --spacing-450px: 450px;
  --spacing-564px: 564px;
  --spacing-664px: 664px;
  --spacing-600px: 600px;
  --spacing-190px: 190px;
  --spacing-690px: 690px;
  --spacing-720px: 720px;
  --spacing-760px: 760px;
  --spacing-90px: 90px;
  --spacing-110px: 110px;
  --spacing-26px: 26px;
  --spacing-90vh: 90vh;

  /* Leading */
  --leading-18px: 18.23px;
  --leading-25px: 25px;
  --leading-30px: 30px;
  --leading-20px: 20px;
  --leading-44px: 44px;
  --leading-1562: 15.62px;

  /* font sizes */
  --text-xxs: 10px;
  --text-18px: 18px;
  --text-36px: 36px;
  --text-40px: 40px;
  --text-48px: 48px;
}

/* =======================
   🖌️ Base Styles
   ======================= */
body {
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-syne), Helvetica, sans-serif;
}

/* Utilities */
@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}

/* Autofill Fix */
@keyframes autofill {

  0%,
  100% {
    color: #666;
    background: transparent;
  }
}

@-webkit-keyframes autofill {

  0%,
  100% {
    color: #666;
    background: transparent;
  }
}

input:-webkit-autofill {
  -webkit-animation-delay: 1s;
  -webkit-animation-name: autofill;
  -webkit-animation-fill-mode: both;
  -webkit-background-clip: text !important;
}

/* Custom Example Override */
.search-field {
  width: 400px !important;
}
