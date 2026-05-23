import PortfolioMain from "@/components/layout/main/PortfolioMain";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import { buildNoIndexMetadata } from "@/libs/seo";
import React from "react";

export const metadata = buildNoIndexMetadata("Portfolio");

const Portfolio = () => {
  return (
    <PageWrapper
      isNotHeaderTop={true}
      isHeaderRight={true}
      isTextWhite={true}
      isNavbarAppointmentBtn={true}
    >
      <PortfolioMain />
    </PageWrapper>
  );
};

export default Portfolio;
