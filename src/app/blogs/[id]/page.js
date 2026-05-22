import BlogDetailsMain from "@/components/layout/main/BlogDetailsMain";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import React from "react";

const BlogDetails = () => {
  return (
    <PageWrapper
      isNotHeaderTop={true}
      isHeaderRight={true}
      isTextWhite={true}
      isNavbarAppointmentBtn={true}
    >
      <BlogDetailsMain />
    </PageWrapper>
  );
};

export default BlogDetails;
