import Blogs2 from "@/components/sections/blogs/Blogs2";
import About from "@/components/sections/about/About";
import ExportSupport from "@/components/sections/export-support/ExportSupport";
import Features4 from "@/components/sections/features/Features4";
import Hero1 from "@/components/sections/hero-banners/Hero1";
import HotDeal3 from "@/components/sections/hot-deals/HotDeal3";
import Offerings from "@/components/sections/offerings/Offerings";
import Products3 from "@/components/sections/products/Products3";
import Testimonials3 from "@/components/sections/testimonils/Testimonials3";

const IndexMain = () => {
  return (
    <main>
      <Hero1 />
      <About />
      <ExportSupport />
      <Offerings />
      <Products3 isDouble={true} title={"Our Products"} pt={" pt-85"} />
      <HotDeal3 />
      <Blogs2 type={2} pb="pb-70" title="Leatest Blog" />
      <Testimonials3 />
      <Features4 />
    </main>
  );
};

export default IndexMain;
