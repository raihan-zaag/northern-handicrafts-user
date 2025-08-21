import React from "react";
import Link from "next/link";
import Image from "next/image";

const TopHeading = () => {
  return (
    <div className="bg-white mx-auto h-full flex items-center justify-center py-4">
      <Link href="/">
        <Image
          src="/logo/brand_logo.png"
          alt="Brand Logo"
          width={100}
          height={54}
          className="hover:opacity-80 transition-opacity"
          priority
        />
      </Link>
    </div>
  );
};

export default TopHeading;
