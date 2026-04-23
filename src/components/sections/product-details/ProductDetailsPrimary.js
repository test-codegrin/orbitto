"use client";
import getAllProducts from "@/libs/getAllProducts";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useProductContext } from "@/providers/ProductContext";
import ProductDetailsRight from "@/components/shared/products/ProductDetailsRight";
import { useCommonContext } from "@/providers/CommonContext";

const ProductDetailsPrimary = () => {
  const { isNotSidebar, type } = useCommonContext();
  const { setCurrentProduct } = useProductContext();

  const { id: currentId } = useParams();
  const products = getAllProducts();

  // ✅ Re-derives product fresh on every render when URL id changes
  const product = products?.find(
    ({ id }) => id === (!currentId ? 1 : parseInt(currentId))
  );

  if (!product) return null; // ✅ Guard against undefined product

  const otherImages = products?.filter(
    ({ id }) => id !== parseInt(currentId) && (!currentId ? id !== 1 : true)
  );
  const allImages = [product, ...otherImages?.slice(0, 6)];

  return (
    <div
      className={`ltn__shop-details-area ${
        type === 1 || type === 2 ? "pb-85" : "pb-120"
      }`}
      onMouseEnter={() => setCurrentProduct(product)}
    >
      <div className="container">
        <div className="row">
          <div className={`${isNotSidebar ? "" : "col-lg-12"} col-md-12`}>
            <div
              className={`ltn__shop-details-inner ${
                type === 1 || type === 2 ? "mb-60" : ""
              }`}
            >
              <div className="row">
                <div className={isNotSidebar ? "col-lg-6" : "col-md-6"}>
                  <div className="ltn__shop-details-img-gallery">
                    <div className="ltn__shop-details-large-img">
                      {allImages?.map(({ image }, idx) => (
                        <div key={idx} className="single-large-img">
                          <Link href={image} data-rel="lightcase:myCollection">
                            <Image
                              src={image}
                              alt="Image"
                              width={1000}
                              height={1000}
                            />
                          </Link>
                        </div>
                      ))}
                    </div>
                    <div className="ltn__shop-details-small-img slick-arrow-2">
                      {allImages?.map(({ image }, idx) => (
                        <div key={idx} className="single-small-img">
                          <Image
                            src={image}
                            alt="Image"
                            width={1000}
                            height={1000}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className={isNotSidebar ? "col-lg-6" : "col-md-6"}>
                  {/* ✅ key prop forces re-mount when product changes */}
                  <ProductDetailsRight key={product.id} product={product} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPrimary;