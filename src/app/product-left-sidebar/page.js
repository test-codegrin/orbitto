import ProductMain from "@/components/layout/main/productMain";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import React from "react";

const ProductLeftSidebar = () => {
  return (
    <PageWrapper
      isNotHeaderTop={true}
      isHeaderRight={true}
      isTextWhite={true}
      isNavbarAppointmentBtn={true}
    >
      <ProductMain isSidebar="left" title={"ProductLeft Sidebar"} />
    </PageWrapper>
  );
};

export default ProductLeftSidebar;
