import About5 from "@/components/sections/about/About5";
import AboutPageSequence from "@/components/sections/about/AboutPageSequence";
import WhyChooseOrbitto from "@/components/sections/about/WhyChooseOrbitto";
import Features4 from "@/components/sections/features/Features4";
import HeroPrimary from "@/components/sections/hero-banners/HeroPrimary";
import SeoFaqSection from "@/components/seo/SeoFaqSection";

const AboutMain = ({ faqSection }) => {
  return (
    <main>
      <HeroPrimary title="About Us" text="About Us" bg="/img/bg/5.jpg" />
      <About5 pt={"pt-0"} />
      <WhyChooseOrbitto />
      <AboutPageSequence />
      {faqSection?.items?.length ? (
        <SeoFaqSection
          id={faqSection.id}
          title={faqSection.title}
          intro={faqSection.intro}
          items={faqSection.items}
          eyebrow={faqSection.eyebrow}
        />
      ) : null}
      <Features4 mb="before-bg-bottom-2 mt-40" />
    </main>
  );
};

export default AboutMain;
