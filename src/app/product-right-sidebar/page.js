import ProductMain from "@/components/layout/main/productMain";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import React from "react";

const ProductRightSidebar = () => {
  return (
    <PageWrapper
      isNotHeaderTop={true}
      isHeaderRight={true}
      isTextWhite={true}
      isNavbarAppointmentBtn={true}
    >
      <ProductMain title={"ProductRight Sidebar"} />
    </PageWrapper>
  );
};

export default ProductRightSidebar;
