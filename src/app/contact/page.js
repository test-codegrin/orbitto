import ContactMain from "@/components/layout/main/ContactMain";
import SeoFaqSection from "@/components/seo/SeoFaqSection";
import StructuredData from "@/components/seo/StructuredData";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import {
  buildSeoMetadata,
  getBreadcrumbSchema,
  getContactPageSchema,
} from "@/libs/seo";
import { contactFaqItems } from "@/libs/seoContent";
import React from "react";

export const metadata = buildSeoMetadata({
  title: "Contact Orbitto International",
  description:
    "Contact Orbitto International for export enquiries, bulk supply, private label manufacturing, product details, MOQ, pricing, and packaging support.",
  path: "/contact",
  keywords: [
    "contact Orbitto International",
    "export enquiry",
    "bulk ingredient quote",
  ],
});

const Contact = () => {
  return (
    <>
      <StructuredData
        id="contact-page-schema"
        data={getContactPageSchema({
          title: "Contact Orbitto International",
          description:
            "Reach Orbitto International for export quotes, product discussions, and supply partnerships.",
        })}
      />
      <StructuredData
        id="contact-breadcrumb-schema"
        data={getBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <PageWrapper
        isNotHeaderTop={true}
        isHeaderRight={true}
        isTextWhite={true}
        isNavbarAppointmentBtn={true}
      >
        <>
          <ContactMain />
          <SeoFaqSection
            id="contact-faq"
            title="Quote and Export Support FAQ"
            intro="Common questions from buyers contacting Orbitto International."
            items={contactFaqItems}
          />
        </>
      </PageWrapper>
    </>
  );
};

export default Contact;
