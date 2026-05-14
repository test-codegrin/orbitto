export const normalizeProductType = (value) =>
  String(value || "")
    .toLowerCase()
    .replace(/[\s_-]+/g, "");

export const isProductType = (productType, expectedType) =>
  normalizeProductType(productType) === normalizeProductType(expectedType);

export const productCategoryAliases = {
  fruit: "Fruit",
  vegetable: "Vegetable",
  fruitpowder: "FruitPowder",
  vegetablepowder: "VegetablePowder",
  herbalpowder: "Herbal Powder",
};

export const normalizeProductCategoryFilter = (value) => {
  const normalizedValue = normalizeProductType(value);
  return productCategoryAliases[normalizedValue] || value;
};
