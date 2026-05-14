import makePath from "./makePath";

export const normalizeProductType = (value) =>
  makePath(value || "")?.toLowerCase();

export const isProductType = (productType, expectedType) =>
  normalizeProductType(productType) === normalizeProductType(expectedType);

export const productCategoryAliases = {
  fruit: "Fruit",
  vegetable: "Vegetable",
  fruit_powder: "Fruit Powder",
  vegetable_powder: "Vegetable Powder",
  herbal_powder: "Herbal Powder",
};

export const normalizeProductCategoryFilter = (value) => {
  const normalizedValue = normalizeProductType(value);
  return productCategoryAliases[normalizedValue] || value;
};
