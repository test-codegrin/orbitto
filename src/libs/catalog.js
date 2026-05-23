import { humanizeSlug } from "@/libs/seo";

export const normalizeCategorySlug = (value = "") =>
  String(value)
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[_\s]+/g, "-")
    .replace(/[^a-z0-9-]+/g, "")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");

const productCategoryContent = {
  "fruit-powder": {
    label: "Fruit Powder",
    description:
      "Explore export-ready fruit powders from Orbitto International for beverages, bakery, nutraceuticals, private label requirements, and bulk ingredient sourcing.",
  },
  "vegetable-powder": {
    label: "Vegetable Powder",
    description:
      "Browse vegetable powders from Orbitto International for soups, seasonings, ready meals, health foods, and industrial food manufacturing.",
  },
  honey: {
    label: "Honey",
    description:
      "Find export-quality honey from Orbitto International for food brands, retail packing, private label projects, and global distribution.",
  },
  spices: {
    label: "Spices",
    description:
      "Discover premium spices from Orbitto International for seasoning blends, sauces, ready meals, foodservice supply, and wholesale export.",
  },
  "herbal-powder": {
    label: "Herbal Powder",
    description:
      "Source herbal powders from Orbitto International for wellness products, nutraceuticals, functional beverages, and international ingredient supply.",
  },
  fruit: {
    label: "Fruit",
    description:
      "Browse fruit ingredients from Orbitto International for export-oriented food, beverage, and industrial ingredient requirements.",
  },
  vegetable: {
    label: "Vegetable",
    description:
      "Browse vegetable ingredients from Orbitto International for export-oriented food manufacturing, health-focused products, and wholesale supply.",
  },
};

export const indexedProductCategorySlugs = [
  "fruit-powder",
  "vegetable-powder",
  "honey",
  "spices",
  "herbal-powder",
];

export const getCategoryContent = (categorySlug = "") => {
  const normalizedSlug = normalizeCategorySlug(categorySlug);
  const fallbackLabel = humanizeSlug(normalizedSlug);
  const presetContent = productCategoryContent[normalizedSlug];

  if (presetContent) {
    return {
      slug: normalizedSlug,
      ...presetContent,
    };
  }

  return {
    slug: normalizedSlug,
    label: fallbackLabel || "Product Category",
    description: `Explore ${fallbackLabel.toLowerCase()} from Orbitto International for export-focused sourcing, bulk supply, and private label ingredient needs.`,
  };
};

export const buildProductCategoryPath = (categorySlug) => {
  const normalizedSlug = normalizeCategorySlug(categorySlug);

  if (!normalizedSlug) {
    return "/products";
  }

  return `/products/category/${normalizedSlug}`;
};

export const buildProductSearchPath = (searchValue) => {
  const normalizedValue = String(searchValue || "").trim();

  if (!normalizedValue) {
    return "/products";
  }

  const params = new URLSearchParams({
    search: normalizedValue,
  });

  return `/products?${params.toString()}`;
};
