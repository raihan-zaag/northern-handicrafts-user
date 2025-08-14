// this page only for handle page redirection.
// when i track-order from breadcum component, It redirect here, then it will push back previously. It handle for emergercy solution

"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const TrackOrderPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.back();
  }, []);

  return <div>TrackOrder</div>;
};

export default TrackOrderPage;
