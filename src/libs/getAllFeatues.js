const productImage1 = "/img/product/1.png";

const getAllFeatues = () => {
  const features = [
    {
      id: 1,
      title: "Reasonable Price",
      img: <i className="icon-car-parts"></i>,
      path: "/contact",
      desc: "Competitive pricing for bulk ingredients without compromising product quality.",
      bg: "dark",
      bgImg: null,
    },
    {
      id: 2,
      title: "Expert Mechanics",
      img: <i className="icon-car"></i>,
      path: "/team",
      desc: "Experienced sourcing and processing teams support every product category.",
      bg: "secondary",
      bgImg: productImage1,
    },
    {
      id: 3,
      title: "Fast Feature Delivery",
      img: <i className="icon-mechanic"></i>,
      path: "/products",
      desc: "Responsive handling for product inquiries, samples, and dispatch planning.",
      bg: "white",
      bgImg: null,
    },
    {
      id: 4,
      title: "All Kind Brand",
      img: "/img/icons/icon-img/21.png",
      path: "/about",
      desc: "A broad ingredient range for food, beverage, wellness, and export markets.",
      bg: "white",
      bgImg: null,
    },
    {
      id: 5,
      title: "Vegetable Growing",
      img: "/img/icons/icon-img/22.png",
      path: "/team",
      desc: "Fresh produce and powders selected for clean taste, color, and usability.",
      bg: "white",
      bgImg: null,
    },
    {
      id: 6,
      title: "Landscaping",
      img: "/img/icons/icon-img/23.png",
      path: "/portfolio",
      desc: "Reliable supply support for domestic and international product programs.",
      bg: "white",
      bgImg: null,
    },
    {
      id: 7,
      title: "Paint & Costume",
      img: <i className="icon-car-parts-9"></i>,
      path: "/contact",
      desc: "Ingredient solutions tailored to your formulation, packaging, and order needs.",
      bg: "white",
      bgImg: null,
    },
  ];

  return features;
};

export default getAllFeatues;
