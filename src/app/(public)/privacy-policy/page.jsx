"use client";

import Container from "@/components/common/Container";
import useFetchStaticContent from "@/hooks/staticPageContent/useStaticPageContent";
import { Spin } from "antd";
import React, { useEffect } from "react";

const Page = () => {
  const { fetchData, data, error, loading } = useFetchStaticContent();

  useEffect(() => {
    fetchData("privacy-policy");
  }, []);

  if (loading) {
    return (
      <Container>
        <Spin spinning={loading} fullscreen />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <p>Error: {error}</p>
      </Container>
    );
  }

  return (
    <Container>
      {data ? (
        <div className="flex flex-col gap-6 sm:gap-8 md:gap-8 lg:gap-12">
          <h1 className="font-semibold text-xl sm:text-2xl md:text-4xl lg:text-5xl">
            Privacy Policy
          </h1>
          <div dangerouslySetInnerHTML={{ __html: data.description || "" }} />
        </div>
      ) : (
        <p>No data available</p>
      )}
    </Container>
  );
};

export default Page;
