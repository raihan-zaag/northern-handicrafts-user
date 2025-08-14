"use client";

// components/Typography.js

const Typography = {
  // Title 1 - 24px (Title) with multiple weights
  Title1: ({ children, weight = "extrabold" }) => (
    <h1
      className={`text-2xl sm:text-3xl md:text-4xl font-${weight} text-black leading-tight`}
    >
      {children}
    </h1>
  ),

  // Title 2 - 20px (Subtitle) with multiple weights
  Title2: ({ children, weight = "bold" }) => (
    <h2
      className={`text-xl sm:text-2xl md:text-3xl font-${weight} text-black leading-snug`}
    >
      {children}
    </h2>
  ),

  // Title 3 - 18px (Subheading) with multiple weights
  Title3: ({
    children,
    weight = "semibold",
    color = "text-primary",
    leading = "normal",
    className,
  }) => (
    <h3
      className={`text-lg sm:text-xl md:text-[28px] font-${weight} ${color} leading-${leading} ${className}`}
    >
      {children}
    </h3>
  ),

  // Paragraph - 16px (Body) with multiple weights
  Paragraph: ({ children, weight = "normal", leading = "relaxed" }) => (
    <p
      className={`text-sm sm:text-base md:text-lg font-${weight} text-gray-700 leading-${leading}`}
    >
      {children}
    </p>
  ),

  // Body Text - 14px with multiple weights
  BodyText: ({
    children,
    weight = "normal",
    color = "text-primary",
    leading = "none",
    className,
  }) => (
    <p
      className={`text-xs sm:text-sm md:text-base font-${weight} ${color} leading-${leading} ${className}`}
    >
      {children}
    </p>
  ),

  // Small Text - 12px with multiple weights
  SmallText: ({
    children,
    weight = "normal",
    leading = "tight",
    color = "font_color_one",
  }) => (
    <p className={`text-xs font-${weight} text-${color} leading-${leading}`}>
      {children}
    </p>
  ),
};

export default Typography;

// usese
{
  /* 
  
    <Typography.Title1 weight="extrabold">Title 1 - 32px (Extrabold)</Typography.Title1>

    <Typography.Title2 weight="bold">Title 2 - 24px (Bold)</Typography.Title2>

    <Typography.Title3 weight="semibold">Title 3 - 20px (Semibold)</Typography.Title3>

    <Typography.Paragraph weight="normal">
      This is a paragraph with 16px text size and normal font weight.
    </Typography.Paragraph>

    <Typography.BodyText weight="light">
      Regular body text with 14px font size and light weight.
    </Typography.BodyText>

    <Typography.SmallText weight="normal">
      Small text with 12px font size and normal weight.
    </Typography.SmallText> 

    */
}
