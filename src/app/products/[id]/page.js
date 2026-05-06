import ProductDetailsMain from "@/components/layout/main/ProductDetailsMain";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import getAllProducts from "@/libs/getAllProducts";
import { notFound } from "next/navigation";

const ProductDetails = ({ params }) => {
  const products = getAllProducts() || [];
  const productParam = params?.id;

  if (!productParam) {
    notFound();
  }

  const product = products.find(
    (p) => p.slug === productParam || String(p.id) === productParam
  );

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
    id: p.slug || String(p.id),
  }));
}

export default ProductDetails;
