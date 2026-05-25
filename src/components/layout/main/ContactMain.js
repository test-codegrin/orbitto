import Adress from "@/components/sections/address/Adress";
import ContactPrimary from "@/components/sections/contacts/ContactPrimary";
import Features4 from "@/components/sections/features/Features4";
import HeroPrimary from "@/components/sections/hero-banners/HeroPrimary";
import SeoFaqSection from "@/components/seo/SeoFaqSection";
import Map2 from "@/components/shared/map/Map2";
import React from "react";

const ContactMain = ({ faqSection }) => {
  return (
    <main>
      <HeroPrimary title={"Contact Us"} text="Contact" />
      <Adress />
      <ContactPrimary />
      <Map2 />
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

export default ContactMain;
