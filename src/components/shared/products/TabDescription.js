"use client";
import getAllProducts from "@/libs/getAllProducts";
import { useParams } from "next/navigation";

const TabDescription = () => {
  const { id: currentId } = useParams();
  const products = getAllProducts();
  const product = products?.find(
    ({ id }) => id === (!currentId ? 1 : parseInt(currentId))
  );

  const desc = product?.desc;

  return (
    <div className="ltn__Product-details-tab-content-inner">
      <h4 className="title-2">Product Description</h4>
      <p>{desc ? desc : "No description available."}</p>
    </div>
  );
};

export default TabDescription;