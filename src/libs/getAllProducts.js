import allProducts from "@/../public/fakedata/products.json";

const getAllProducts = () => {
  const products = [...allProducts]?.map((product) => ({
    ...product
  }));

  return products;
};

export default getAllProducts;