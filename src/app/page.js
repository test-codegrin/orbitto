import IndexMain from "@/components/layout/main/IndexMain";
import SeoFaqSection from "@/components/seo/SeoFaqSection";
import StructuredData from "@/components/seo/StructuredData";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import {
  buildSeoMetadata,
  defaultDescription,
  getWebPageSchema,
} from "@/libs/seo";
import { homeFaqItems } from "@/libs/seoContent";

export const metadata = buildSeoMetadata({
  title: "Fruit Powder, Spices, Honey & Ingredient Exporter",
  description: defaultDescription,
  path: "/",
  keywords: [
    "fruit powder manufacturer",
    "vegetable powder supplier",
    "honey exporter",
    "spice ingredient supplier",
  ],
});

export default function Home() {
  return (
    <>
      <StructuredData
        id="home-page-schema"
        data={getWebPageSchema({
          title: "Orbitto International Home",
          description: defaultDescription,
          path: "/",
        })}
      />
      <PageWrapper isNavbarAppointmentBtn={true}>
        <>
          <IndexMain />
          <SeoFaqSection
            id="home-faq"
            title="International Buyer FAQ"
            intro="Helpful answers for brands, importers, and distributors exploring Orbitto International."
            items={homeFaqItems}
          />
        </>
      </PageWrapper>
    </>
  );
}
