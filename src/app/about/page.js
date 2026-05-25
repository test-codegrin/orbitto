import AboutMain from "@/components/layout/main/AboutMain";
import StructuredData from "@/components/seo/StructuredData";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import {
  buildSeoMetadata,
  getBreadcrumbSchema,
  getWebPageSchema,
} from "@/libs/seo";
import { aboutFaqItems } from "@/libs/seoContent";
import React from "react";

export const metadata = buildSeoMetadata({
  title: "About Orbitto International",
  description:
    "Learn about Orbitto International, an export-focused manufacturer of fruit powders, vegetable powders, spices, honey, and herbal ingredients for global food and beverage brands.",
  path: "/about",
  keywords: [
    "about Orbitto International",
    "food ingredient manufacturer India",
    "export ingredient company",
  ],
});

const About = () => {
  return (
    <>
      <StructuredData
        id="about-page-schema"
        data={getWebPageSchema({
          title: "About Orbitto International",
          description:
            "Orbitto International manufactures and exports quality-focused food ingredients for worldwide buyers, brands, and distributors.",
          path: "/about",
          type: "AboutPage",
        })}
      />
      <StructuredData
        id="about-breadcrumb-schema"
        data={getBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <PageWrapper
        isNotHeaderTop={true}
        isHeaderRight={true}
        isTextWhite={true}
        isNavbarAppointmentBtn={true}
      >
        <>
          <AboutMain
            faqSection={{
              id: "about-faq",
              title: "About Orbitto FAQ",
              intro:
                "Key answers for international buyers researching the Orbitto brand.",
              items: aboutFaqItems,
            }}
          />
        </>
      </PageWrapper>
    </>
  );
};

export default About;
