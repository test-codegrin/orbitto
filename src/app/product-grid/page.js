import ProductMain from "@/components/layout/main/productMain";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import React from "react";

const ProductGrid = () => {
  return (
    <PageWrapper
      isNotHeaderTop={true}
      isHeaderRight={true}
      isTextWhite={true}
      isNavbarAppointmentBtn={true}
    >
      <ProductMain isSidebar={false} title={"ProductGrid"} />
    </PageWrapper>
  );
};

export default ProductGrid;
