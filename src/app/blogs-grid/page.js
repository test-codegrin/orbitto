import BlogGridMain from "@/components/layout/main/BlogGridMain";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import { buildNoIndexMetadata } from "@/libs/seo";
import React from "react";

export const metadata = buildNoIndexMetadata("Blogs Grid");

const BlogsGrid = () => {
  return (
    <PageWrapper
      isNotHeaderTop={true}
      isHeaderRight={true}
      isTextWhite={true}
      isNavbarAppointmentBtn={true}
    >
      <BlogGridMain />
    </PageWrapper>
  );
};

export default BlogsGrid;
