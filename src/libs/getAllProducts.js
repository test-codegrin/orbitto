import allProducts from "@/../public/fakedata/products.json";

const getAllProducts = () => {
  const normalizeProductImagePath = (imagePath) => {
    if (typeof imagePath !== "string") return imagePath;
    return imagePath.replace("/img/product/fruit/", "/img/product/Fruit/");
  };

  const products = [...allProducts]?.map((product) => ({
    ...product,
    image: normalizeProductImagePath(product?.image),
  }));

  return products;
};

export default getAllProducts;
