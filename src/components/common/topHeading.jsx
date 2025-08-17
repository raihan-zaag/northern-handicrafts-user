import React from "react";
import Link from "next/link";
import Image from "next/image";

const TopHeading = () => {
  return (
    <div className="container mx-auto h-full flex items-center justify-center py-4">
      <Link href="/">
        <Image
          src="/logo/brand_logo.png"
          alt="Brand Logo"
          width={200}
          height={80}
          className="hover:opacity-80 transition-opacity"
          priority
        />
      </Link>
    </div>
  );
};

export default TopHeading;
