"use client";
import BlogsPrimary from "@/components/sections/blogs/BlogsPrimary";
import Features4 from "@/components/sections/features/Features4";
import HeroPrimary from "@/components/sections/hero-banners/HeroPrimary";

const BlogsMain = ({ title }) => {
  return (
    <main>
      <HeroPrimary
        title={title ? title : "Export Insights & Ingredient Blog"}
        text="Insights"
        isCapitalize={false}
      />
      <BlogsPrimary />
      <Features4 />
    </main>
  );
};

export default BlogsMain;
