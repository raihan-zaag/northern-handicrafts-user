"use client";

import Container from "@/common/components/common/Container";
import useFetchStaticContent from "@/common/hooks/staticPageContent/useStaticPageContent";
import React, { useEffect } from "react";
import { Spinner } from "@/common/components/ui/spinner";

const PrivacyPolicyPage = () => {
  const { fetchData, data, error, loading } = useFetchStaticContent();

  useEffect(() => {
    fetchData("privacy-policy");
  }, []);

  if (loading) {
    return (
      <div className="relative min-h-[200px]">
        <div className="fixed inset-0 grid place-items-center bg-background/60 z-50">
          <Spinner size="xl" className="text-primary" />
        </div>
        <Container />
      </div>
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

export default PrivacyPolicyPage;
