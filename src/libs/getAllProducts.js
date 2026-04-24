import allProducts from "@/../public/fakedata/products.json";
import comments from "@/../public/fakedata/productComments.json";
import reviews from "@/../public/fakedata/productReviews.json";

const getAllProducts = () => {
  const products = [...allProducts]?.map((product) => ({
    ...product,
    comments: comments?.filter(({ productId }) => productId === product?.id),
    reviews: reviews?.filter(({ productId }) => productId === product?.id),
  }));

  return products;
};

export default getAllProducts;