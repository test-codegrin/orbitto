import ProductDetailsMain from "@/components/layout/main/ProductDetailsMain";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import getAllProducts from "@/libs/getAllProducts";
import { notFound } from "next/navigation";

const ProductDetails = ({ params }) => {
  const products = getAllProducts() || [];

  const id = Number(params?.id);

  // ✅ Validate ID
  if (!id) {
    notFound();
  }

  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return (
    <PageWrapper
      isNotHeaderTop={true}
      isHeaderRight={true}
      isTextWhite={true}
      isNavbarAppointmentBtn={true}
    >
      <ProductDetailsMain product={product} type={1} />
    </PageWrapper>
  );
};

export async function generateStaticParams() {
  const products = getAllProducts() || [];

  return products.map((p) => ({
    id: String(p.id),
  }));
}

export default ProductDetails;