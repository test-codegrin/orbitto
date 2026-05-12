import About5 from "@/components/sections/about/About5";
import Features4 from "@/components/sections/features/Features4";
import HeroPrimary from "@/components/sections/hero-banners/HeroPrimary";

const AboutMain = () => {
  return (
    <main>
      <HeroPrimary title="About Us" text="About Us" bg="/img/bg/5.jpg" />
      <About5 pt={"pt-0"} />
      <Features4 />
    </main>
  );
};

export default AboutMain;
