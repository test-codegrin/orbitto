import ProductDetailsMain from "@/components/layout/main/ProductDetailsMain";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";

const ProductDetails = async ({ params }) => {
  const productParam = params?.id;

  return (
    <PageWrapper
      isNotHeaderTop={true}
      isHeaderRight={true}
      isTextWhite={true}
      isNavbarAppointmentBtn={true}
    >
      <ProductDetailsMain productIdOrSlug={productParam} type={1} />
    </PageWrapper>
  );
};

export default ProductDetails;
