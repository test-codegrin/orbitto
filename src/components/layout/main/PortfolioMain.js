import ApplicationPrimary from "@/components/sections/application/ApplicationPrimary";
import Features4 from "@/components/sections/features/Features4";
import HeroPrimary from "@/components/sections/hero-banners/HeroPrimary";
import React from "react";

const PortfolioMain = () => {
  return (
    <main>
      <HeroPrimary title={"Application"} text="Application" />
      <ApplicationPrimary />
      <Features4 />
    </main>
  );
};

export default PortfolioMain;
