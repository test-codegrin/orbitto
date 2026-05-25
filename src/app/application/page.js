import PortfolioMain from "@/components/layout/main/PortfolioMain";
import StructuredData from "@/components/seo/StructuredData";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import {
  buildSeoMetadata,
  getBreadcrumbSchema,
  getCollectionPageSchema,
} from "@/libs/seo";
import { applicationFaqItems } from "@/libs/seoContent";
import React from "react";

export const metadata = buildSeoMetadata({
  title: "Product Applications",
  description:
    "Explore fruit powder, vegetable powder, honey, spice, and herbal powder applications for beverages, bakery, snacks, ready meals, nutraceuticals, and wellness products.",
  path: "/application",
  keywords: [
    "fruit powder applications",
    "vegetable powder applications",
    "honey applications",
    "spice applications",
    "herbal powder applications",
  ],
});

const Application = () => {
  return (
    <>
      <StructuredData
        id="applications-page-schema"
        data={getCollectionPageSchema({
          title: "Orbitto Product Applications",
          description:
            "Application ideas for fruit powders, vegetable powders, spices, honey, and herbal ingredients across global food and beverage categories.",
          path: "/application",
        })}
      />
      <StructuredData
        id="application-breadcrumb-schema"
        data={getBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Application", path: "/application" },
        ])}
      />
      <PageWrapper
        isNotHeaderTop={true}
        isHeaderRight={true}
        isTextWhite={true}
        isNavbarAppointmentBtn={true}
      >
        <>
          <PortfolioMain
            faqSection={{
              id: "application-faq",
              title: "Application FAQ",
              intro:
                "Answers around where Orbitto ingredients fit in food, beverage, and wellness product development.",
              items: applicationFaqItems,
            }}
          />
        </>
      </PageWrapper>
    </>
  );
};

export default Application;
