import BlogDetailsPrimary from "@/components/sections/blog-details/BlogDetailsPrimary";
import Features4 from "@/components/sections/features/Features4";
import HeroPrimary from "@/components/sections/hero-banners/HeroPrimary";
import React from "react";

const BlogDetailsMain = ({ title }) => {
  return (
    <main>
      <HeroPrimary
        title={title || "Export Insight Article"}
        text="Insight Article"
        headingTag="h2"
      />
      <BlogDetailsPrimary />
      <Features4 />
    </main>
  );
};

export default BlogDetailsMain;
