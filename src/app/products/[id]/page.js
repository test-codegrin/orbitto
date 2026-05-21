import ProductDetailsMain from "@/components/layout/main/ProductDetailsMain";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import {
  getPublicProductBySlug,
  getPublicProducts,
} from "@/libs/supabase/queries/products";
import { notFound } from "next/navigation";

const ProductDetails = async ({ params }) => {
  const productParam = params?.id;

  if (!productParam) {
    notFound();
  }

  const { data: product } = await getPublicProductBySlug(productParam);

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
  const { data: products } = await getPublicProducts({ limit: 200 });

  return (products || []).map((p) => ({
    id: p.slug || String(p.id),
  }));
}

export default ProductDetails;
