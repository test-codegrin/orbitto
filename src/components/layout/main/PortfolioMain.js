import ApplicationPrimary from "@/components/sections/application/ApplicationPrimary";
import Features4 from "@/components/sections/features/Features4";
import HeroPrimary from "@/components/sections/hero-banners/HeroPrimary";
import SeoFaqSection from "@/components/seo/SeoFaqSection";
import React from "react";

const PortfolioMain = ({ faqSection }) => {
  return (
    <main>
      <HeroPrimary title={"Application"} text="Application" />
      <ApplicationPrimary />
      {faqSection?.items?.length ? (
        <SeoFaqSection
          id={faqSection.id}
          title={faqSection.title}
          intro={faqSection.intro}
          items={faqSection.items}
          eyebrow={faqSection.eyebrow}
        />
      ) : null}
      <Features4 />
    </main>
  );
};

export default PortfolioMain;
