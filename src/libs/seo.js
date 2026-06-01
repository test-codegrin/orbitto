import {
  locationName,
  officeAddress,
  officeAddress2,
  socialUrls,
} from "@/libs/contactInfo";

export const brandName = "Orbitto International";
export const brandShortName = "Orbitto";
export const brandEmail = "orbittointernational@gmail.com";
export const primaryPhone = "+91 99047 27348";
export const defaultOgImage = "/img/banner/banner-2.webp";
export const defaultDescription =
  "Orbitto International is an export-focused manufacturer and supplier of fruit powders, vegetable powders, spices, honey, and herbal ingredients for global food and beverage brands.";

const baseKeywords = [
  "Orbitto International",
  "food ingredient exporter",
  "fruit powder exporter",
  "vegetable powder exporter",
  "spice exporter",
  "honey exporter",
  "herbal powder exporter",
  "private label food ingredients",
  "bulk ingredient supplier",
  "contract manufacturing",
  "third party manufacturing",
];

const normalizeSiteUrl = (value) => {
  if (!value) return "http://localhost:3000";

  const trimmedValue = String(value).trim();
  if (/^https?:\/\//i.test(trimmedValue)) {
    return trimmedValue.replace(/\/+$/, "");
  }

  if (trimmedValue.startsWith("localhost") || trimmedValue.startsWith("127.0.0.1")) {
    return `http://${trimmedValue}`.replace(/\/+$/, "");
  }

  return `https://${trimmedValue}`.replace(/\/+$/, "");
};

export const getSiteUrl = () =>
  normalizeSiteUrl(
    process.env.NEXT_PUBLIC_SITE_URL ||
      process.env.SITE_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      process.env.VERCEL_URL
  );

export const absoluteUrl = (path = "/") => {
  const siteUrl = getSiteUrl();

  if (!path) return siteUrl;
  if (/^https?:\/\//i.test(path)) return path;

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${normalizedPath}`;
};

export const stripHtml = (value = "") =>
  String(value)
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();

export const truncateText = (value = "", maxLength = 160) => {
  const cleanValue = String(value || "").trim();

  if (cleanValue.length <= maxLength) {
    return cleanValue;
  }

  return `${cleanValue.slice(0, Math.max(maxLength - 1, 0)).trimEnd()}…`;
};

export const humanizeSlug = (value = "") =>
  String(value)
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (character) => character.toUpperCase());

export const mergeKeywords = (...keywordGroups) =>
  Array.from(
    new Set(
      [baseKeywords, ...keywordGroups]
        .flat()
        .filter(Boolean)
        .map((keyword) => String(keyword).trim())
        .filter(Boolean)
    )
  );

const buildRobots = (noIndex = false) => ({
  index: !noIndex,
  follow: !noIndex,
  googleBot: {
    index: !noIndex,
    follow: !noIndex,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
});

export const buildMetadataImages = (images, fallbackAlt = brandName) => {
  const normalizedImages = Array.isArray(images) ? images : [images];

  return normalizedImages
    .filter(Boolean)
    .map((image) => {
      if (typeof image === "string") {
        return {
          url: absoluteUrl(image),
          width: 1200,
          height: 630,
          alt: fallbackAlt,
        };
      }

      return {
        ...image,
        url: absoluteUrl(image.url),
        alt: image.alt || fallbackAlt,
      };
    });
};

export const buildSeoMetadata = ({
  title,
  description = defaultDescription,
  path = "/",
  images = [defaultOgImage],
  keywords = [],
  noIndex = false,
  openGraphType = "website",
}) => {
  const metaTitle = title || brandName;
  const metaDescription = truncateText(description, 170) || defaultDescription;
  const metaImages = buildMetadataImages(images, metaTitle);

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: mergeKeywords(keywords),
    alternates: path
      ? {
          canonical: path,
        }
      : undefined,
    openGraph: {
      type: openGraphType,
      url: path || undefined,
      title: metaTitle,
      description: metaDescription,
      siteName: brandName,
      images: metaImages,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: metaImages.map((image) => image.url),
    },
    robots: buildRobots(noIndex),
  };
};

export const buildNoIndexMetadata = (title, path) =>
  buildSeoMetadata({
    title,
    description: `${title} is not intended for search indexing.`,
    path,
    noIndex: true,
  });

export const getOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${absoluteUrl("/")}#organization`,
  name: brandName,
  alternateName: brandShortName,
  url: absoluteUrl("/"),
  logo: absoluteUrl("/img/logo.webp"),
  image: absoluteUrl(defaultOgImage),
  description: defaultDescription,
  email: brandEmail,
  telephone: primaryPhone,
  sameAs: [
    socialUrls.facebook,
    socialUrls.instagram,
    socialUrls.linkedin,
    socialUrls.x,
  ].filter(Boolean),
  areaServed: "Worldwide",
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "Shop No-104, First Floor, Royal Shopping Center, Rafaleshwar Industrial Estate, 8-A National Highway, Jambudiya",
    addressLocality: "Morbi",
    addressRegion: "Gujarat",
    postalCode: "363642",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    telephone: primaryPhone,
    email: brandEmail,
    areaServed: "Worldwide",
    availableLanguage: ["English", "Hindi", "Gujarati"],
  },
  knowsAbout: [
    "Fruit powder manufacturing",
    "Vegetable powder manufacturing",
    "Spice exports",
    "Honey exports",
    "Herbal ingredient supply",
    "Private label manufacturing",
    "Bulk food ingredient supply",
  ],
  location: [
    {
      "@type": "Place",
      name: locationName,
      address: officeAddress,
    },
    {
      "@type": "Place",
      name: "Orbitto Manufacturing Unit",
      address: officeAddress2,
    },
  ],
});

export const getWebsiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${absoluteUrl("/")}#website`,
  url: absoluteUrl("/"),
  name: brandName,
  description: defaultDescription,
  publisher: {
    "@id": `${absoluteUrl("/")}#organization`,
  },
  potentialAction: {
    "@type": "SearchAction",
    target: `${absoluteUrl("/products")}?search={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
});

export const getWebPageSchema = ({
  title,
  description,
  path = "/",
  type = "WebPage",
}) => ({
  "@context": "https://schema.org",
  "@type": type,
  name: title,
  description,
  url: absoluteUrl(path),
  isPartOf: {
    "@id": `${absoluteUrl("/")}#website`,
  },
  about: {
    "@id": `${absoluteUrl("/")}#organization`,
  },
});

export const getCollectionPageSchema = ({ title, description, path = "/" }) =>
  getWebPageSchema({
    title,
    description,
    path,
    type: "CollectionPage",
  });

export const getContactPageSchema = ({ title, description, path = "/contact" }) => ({
  ...getWebPageSchema({
    title,
    description,
    path,
    type: "ContactPage",
  }),
  mainEntity: {
    "@id": `${absoluteUrl("/")}#organization`,
  },
});

export const getBreadcrumbSchema = (items = []) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});

export const getItemListSchema = ({ title, path = "/", items = [] }) => {
  const listItems = items
    .filter((item) => item?.name && (item?.path || item?.url))
    .map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.path || item.url),
    }));

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: title,
    url: absoluteUrl(path),
    numberOfItems: listItems.length,
    itemListElement: listItems,
  };
};

export const getFAQPageSchema = (items = []) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
});

export const getProductSchema = (product) => {
  if (!product) return null;

  const additionalProperty = (product.specifications || [])
    .filter((entry) => entry?.key && entry?.value)
    .map((entry) => ({
      "@type": "PropertyValue",
      name: entry.key,
      value: entry.value,
    }));

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title || product.product_name,
    description: truncateText(
      product.shortDescription || product.description || product.desc || defaultDescription,
      500
    ),
    image: (product.images || []).length
      ? product.images.map((image) => absoluteUrl(image))
      : product.image
      ? [absoluteUrl(product.image)]
      : [absoluteUrl(defaultOgImage)],
    sku: String(product.id || product.slug || ""),
    category: product.type || product.category?.name || "",
    brand: {
      "@type": "Brand",
      name: brandName,
    },
    manufacturer: {
      "@id": `${absoluteUrl("/")}#organization`,
    },
    url: absoluteUrl(`/products/${product.slug || product.id}`),
    additionalProperty,
    audience: {
      "@type": "BusinessAudience",
      audienceType: "Importers, distributors, and food brands",
    },
  };
};

export const getBlogPostingSchema = (blog) => {
  if (!blog) return null;

  const image = blog.image
    ? [absoluteUrl(blog.image)]
    : [absoluteUrl(defaultOgImage)];

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title || "Orbitto Article",
    description: truncateText(blog.excerpt || defaultDescription, 300),
    image,
    datePublished: blog.created_at,
    dateModified: blog.updated_at || blog.created_at,
    articleSection: blog.category || "Insights",
    mainEntityOfPage: absoluteUrl(`/blogs/${blog.id}`),
    author: {
      "@type": "Person",
      name: blog.authorName || brandName,
    },
    publisher: {
      "@id": `${absoluteUrl("/")}#organization`,
    },
  };
};

export const getLocalBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${absoluteUrl("/")}#local-business`,
  name: brandName,
  image: absoluteUrl(defaultOgImage),
  description: defaultDescription,
  url: absoluteUrl("/"),
  telephone: primaryPhone,
  email: brandEmail,
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "Shop No-104, First Floor, Royal Shopping Center, Rafaleshwar Industrial Estate, 8-A National Highway, Jambudiya",
    addressLocality: "Morbi",
    addressRegion: "Gujarat",
    postalCode: "363642",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 22.825,
    longitude: 72.015,
  },
  priceRange: "$$$",
  areaServed: {
    "@type": "Country",
    name: "Worldwide",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
      timezone: "IST",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "10:00",
      closes: "14:00",
      timezone: "IST",
    },
  ],
  hasMap: "https://www.google.com/maps?q=ORBITTO%20INTERNATIONAL%2C%20INDUSTRIAL%20ESTATE%2C%20SURVEY%20NO-144%2FP%2CPLOT%20NO-C%20288%2CSHOP%20NO-104%2CFIRST%20FLOOR%2CROYAL%20SHOPPING%20CENTER%2C%208-A%2C%20NATIONAL%20HIGHWAY%2C%20Rafaleshwar%2C%20Jambudiya%2C%20Morbi%2C%20Gujarat%20363642",
  sameAs: [
    socialUrls.facebook,
    socialUrls.instagram,
    socialUrls.linkedin,
    socialUrls.x,
  ].filter(Boolean),
});

export const getProductFAQSchema = (productName = "Product") => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: `What is ${productName}?`,
      acceptedAnswer: {
        "@type": "Answer",
        text: `${productName} is a premium quality ingredient exported by Orbitto International. We provide certified, export-grade ingredients sourced and processed to meet international quality standards for food and beverage manufacturers.`,
      },
    },
    {
      "@type": "Question",
      name: `What is the manufacturing process for ${productName}?`,
      acceptedAnswer: {
        "@type": "Answer",
        text: `Our ${productName} is manufactured using state-of-the-art spray drying and processing technology at our facility in Morbi, Gujarat, India. We follow strict quality control measures including HACCP certification, food safety standards, and international export compliance to ensure premium quality.`,
      },
    },
    {
      "@type": "Question",
      name: `What certifications and export quality standards does ${productName} meet?`,
      acceptedAnswer: {
        "@type": "Answer",
        text: `${productName} from Orbitto International meets international export standards including FSSC 22000, HACCP compliance, and is suitable for EU, USA, and global markets. We provide third-party testing certifications and detailed specifications for each product batch to ensure quality assurance.`,
      },
    },
  ],
});
