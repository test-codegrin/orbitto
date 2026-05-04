"use client";
import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const DEFAULT_FLOAT_SIZE = 100;
const BASE_STAGE_WIDTH = 1920;
const BASE_STAGE_HEIGHT = 940;

const normalizeDimension = (value) => {
  if (value === undefined || value === null || value === "") {
    return `${DEFAULT_FLOAT_SIZE}px`;
  }

  if (typeof value === "number") {
    return `${value}px`;
  }

  const trimmed = String(value).trim();

  if (/^\d+(\.\d+)?$/.test(trimmed)) {
    return `${trimmed}px`;
  }

  return trimmed;
};

const SLIDES = [
  {
    id: 0,
    line1: "Fruit",
    line2: "Powder",
    subtitle: "From fruit to fine powder perfection",
    bgText: "FRUIT POWDER",
    watermarkGradient:
      "background: linear-gradient(180deg, rgba(201, 118, 167, 0.2) 0%, rgba(176, 95, 211, 0.2) 50%, rgba(245, 222, 110, 0.2) 100%);",
    bgColor: "#fff5f8",
    gradientEnd: "#fce4ec",
    card: {
      title: "Premium Fruit Powder",
      desc: "Bringing the goodness of fresh fruits into every serving.",
    },
    mainImg: "/img/slider/main/fruit_powder.png",
    floats: [
      {
        src: "/img/slider/Fruit/kiwi_blur.png",
        alt: "Kiwi",
        top: "0%",
        left: "6%",
        width: "151", // or 120, or "40%"
        height: "105",
      },
      {
        src: "/img/slider/Fruit/coconut_blur.png",
        alt: "Coconut",
        top: "15%",
        left: "18%",
        width: "90",
        height: "87",
      },

      {
        src: "/img/slider/Fruit/avocado.png",
        alt: "Avocado",
        top: "18%",
        left: "26%",
        width: "240",
        height: "240",
        delay: "0.3s",
      },
      {
        src: "/img/slider/Fruit/cherry.png",
        alt: "Cherry",
        bottom: "14%",
        left: "35%",
        width: "112",
        height: "102",
        delay: "0.35s",
      },
      {
        src: "/img/slider/Fruit/berry_blur.png",
        alt: "Blueberry",
        bottom: "-20%",
        left: "-5%",
        width: "239",
        height: "210",
        delay: "0.35s",
      },
      {
        src: "/img/slider/Fruit/berry.png",
        alt: "Blueberry",
        bottom: "5%",
        right: "31%",
        width: "208",
        height: "206",
        delay: "0.55s",
      },

      {
        src: "/img/slider/Fruit/cherry_blur.png",
        alt: "Small Strawberry",
        bottom: "0%",
        right: "-10%",
        width: "350",
        height: "320",
        delay: "0.45s",
      },
      {
        src: "/img/slider/Fruit/berry_loom.png",
        alt: "Blackberry",
        bottom: "-10%",
        right: "18%",
        width: "154",
        height: "129",
        // delay: "0.6s",
      },
      {
        src: "/img/slider/Fruit/gauvava_blur.png",
        alt: "Green Apple",
        top: "-20%",
        right: "22%",
        width: "198",
        height: "212",
        delay: "0.15s",
      },
    ],
    accent: "#d63f6e",
    tabIcon: "/img/slider/FruiteBasket.png",
    tabLabel: "Fruit Powder",
  },
  {
    id: 1,
    line1: "Vegetable",
    line2: "Powder",
    subtitle: "From farm to fine powder perfection",
    bgText: "VEGETABLE POWDER",
    watermarkGradient:
      "background: linear-gradient(180deg, rgba(114, 142, 25, 0.2) 0%, rgba(175, 28, 91, 0.2) 50%, rgba(114, 142, 25, 0.2) 100%);",
    bgColor: "#f0fff5",
    gradientEnd: "#d4f5df",
    card: {
      title: "Natural Vegetable Powder",
      desc: "Processed to preserve natural flavor and rich nutrients.",
    },
    mainImg: "/img/slider/main/vegetable_powder.png",
    floats: [
      {
        src: "/img/slider/Vegetable/Beet.png",
        alt: "Beetroot",
        top: "22%",
        left: "25%",
        size: "174",
        delay: "0s",
      },
      {
        src: "/img/slider/Vegetable/Coriander.png",
        alt: "Coriander Leaves",
        bottom: "-15%",
        left: "25%",
        width: 165,
        height: 234,
        delay: "0s",
      },
      {
        src: "/img/slider/Vegetable/broccoli.png",
        alt: "Broccoli",
        bottom: "0%",
        right: "30%",
        size: 242,
        delay: "0.4s",
      },
      {
        src: "/img/slider/Vegetable/Carrot.png",
        alt: "Carrot",
        bottom: "-30%",
        right: "0%",
        width: 429,
        height: 479,
        delay: "0.4s",
      },
      {
        src: "/img/slider/Vegetable/Bittermelon.png",
        alt: "Bitter Gourd",
        top: "-10%",
        left: "-1%",
        size: 334,
        delay: "0.15s",
      },
      {
        src: "/img/slider/Vegetable/SlicedOnion.png",
        alt: "Onion Ring",
        top: "-40%",
        right: "20%",
        size: 418,
        delay: "0.3s",
      },
      {
        src: "/img/slider/Vegetable/blur.png",
        alt: "Spinach",
        bottom: "-10%",
        left: "0%",
        size: 155,
        delay: "0.5s",
      },
      {
        src: "/img/slider/Vegetable/Greenchilli.png",
        alt: "Green Chili",
        bottom: "-30%",
        left: "15%",
        size: 155,
        delay: "0.5s",
      },
    ],
    accent: "#2a7d3e",
    tabIcon: "/img/slider/VegBasket.png",
    tabLabel: "Vegetable Powder",
  },
  {
    id: 2,
    line1: "Pure",
    line2: "Honey",
    subtitle: "Nature's golden sweetness refined",
    bgText: "PURE HONEY",
    watermarkGradient:
      "background: linear-gradient(180deg, rgba(249, 140, 21, 0.2) 0%, rgba(197, 157, 46, 0.2) 100%);",
    bgColor: "#fffbf0",
    gradientEnd: "#fef0c7",
    card: {
      title: "Raw Pure Honey",
      desc: "Directly sourced from natural hives for authentic golden taste.",
    },
    mainImg: "/img/slider/main/honey.png",
    floats: [
      {
        src: "/img/slider/Honey/bee.gif",
        alt: "Bee",
        top: "18%",
        right: "33%",
        size: 125,
        delay: "0s",
      },
      {
        src: "/img/slider/Honey/3.png",
        alt: "Sunflower",
        top: "0%",
        right: "20%",
        size: 314,
        // delay: "0s",
      },
      {
        src: "/img/slider/Honey/5.png",
        alt: "Honey Drop",
        top: "-5%",
        left: "0%",
        width: 537,
        height: 268,
      },
      {
        src: "/img/slider/Honey/1.png",
        alt: "Honey Jar",
        bottom: "10%",
        right: "30%",
        width: 120,
        height: 88,
        // delay: "0.55s",
      },
      {
        src: "/img/slider/Honey/2.png",
        alt: "Honey Jar",
        bottom: "-20%",
        right: "-8%",
        width: 369,
        height: 274,
        // delay: "0.55s",
      },
      {
        src: "/img/slider/Honey/4.png",
        alt: "Honey Jar",
        top: "-5%",
        right: "-3%",
        size: 288,
        // delay: "0.55s",
      },
    ],
    accent: "#d97706",
    tabIcon: "/img/slider/HoneyPad.png",
    tabLabel: "Pure Honey",
  },
  {
    id: 3,
    line1: "Premium",
    line2: "Spices",
    subtitle: "Handpicked spices bursting with bold flavor",
    bgText: "PREMIUM SPICES",
    watermarkGradient:
      "background: linear-gradient(180deg, rgba(132, 14, 14, 0.2) 0%, rgba(255, 0, 0, 0.1) 100%);",
    bgColor: "#fff8f2",
    gradientEnd: "#ffe0cc",
    card: {
      title: "Exotic Spice Blends",
      desc: "Sun-dried and stone-ground for maximum aroma and authentic taste.",
    },
    mainImg: "/img/slider/main/spices.png",
    floats: [
      {
        src: "/img/slider/Spices/GaramMsala.png",
        alt: "Garam Masala",
        top: "-5%",
        left: "-2%",
        size: 310,
        // delay: "0s",
      },
      {
        src: "/img/slider/Spices/DryChilli.png",
        alt: "Red Chili",
        bottom: "-40%",
        right: "-3%",
        size: 611,
        // delay: "0s",
      },
      {
        src: "/img/slider/Spices/Clove.png",
        alt: "Clove",
        bottom: "-12%",
        left: "15%",
        size: 278,
        // delay: "0.35s",
      },
      {
        src: "/img/slider/Spices/RedChilli.png",
        alt: "Red Chili",
        bottom: "-5%",
        right: "30%",
        size: 287,
        // delay: "0.5s",
      },
      {
        src: "/img/slider/Spices/Tea-Leaf.png",
        alt: "Tea Leaf",
        bottom: "1%",
        right: "-63%",
        size: 260,
        // delay: "0.2s",
      },
      {
        src: "/img/slider/Spices/Turmeric.png",
        alt: "Turmeric",
        top: "0%",
        right: "10%",
        size: 144,
        // delay: "0.45s",
      },
      {
        src: "/img/slider/Spices/StarAnise.png",
        alt: "Star Anise",
        bottom: "-46%",
        left: "-3%",
        size: 287,
        // delay: "0.6s",
      },
    ],
    accent: "#c2410c",
    tabIcon: "/img/slider/SpicesBasket.png",
    tabLabel: "Spices",
  },
  {
    id: 4,
    line1: "Herbal",
    line2: "Powder",
    subtitle: "Pure herbs transformed into healing powder",
    bgText: "HERBAL POWDER",
    watermarkGradient:
      "background: linear-gradient(180deg, rgba(27, 146, 82, 0.054) 0%, rgba(1, 62, 29, 0.2) 100%);",
    bgColor: "#f4fbf5",
    gradientEnd: "#c8edcf",
    card: {
      title: "Pure Herbal Powder",
      desc: "Cold-processed medicinal herbs retaining full nutritional potency.",
    },
    mainImg: "/img/slider/main/natural_herbs.png",
    floats: [
      {
        src: "/img/slider/Herbs/amla.png",
        alt: "Amla",
        top: "18%",
        left: "26%",
        size: 236,
        delay: "0s",
      },
      {
        src: "/img/slider/Herbs/PricklyPear.png",
        alt: "Prickly Pear",
        top: "-5%",
        left: "-2%",
        size: 300,
      },

      {
        src: "/img/slider/Herbs/Rose.png",
        alt: "Rose",
        bottom: "-20%",
        left: "8%",
        size: 300,
      },
      {
        src: "/img/slider/Herbs/MoringaLeaf.png",
        alt: "Moringa Leaf",
        bottom: "-5%",
        right: "27%",
        size: 352,
      },
      {
        src: "/img/slider/Herbs/AloeveraBlur.png",
        alt: "Aloe Vera",
        bottom: "-20%",
        right: "-5%",
        size: 438,
      },
      {
        src: "/img/slider/Herbs/GreenFennel.png",
        alt: "Green Fennel",
        top: "-20%",
        right: "28%",
        size: 298,
      },
      {
        src: "/img/slider/Herbs/Rose-2.png",
        alt: "Rose",
        top: "0",
        right: "12%",
        size: 129,
      },
    ],
    accent: "#166534",
    tabIcon: "/img/slider/HerbalBasket.png",
    tabLabel: "Herbal Powder",
  },
];

const CSS = `
  .hs-root {
  position: relative;
  width: 100%;
  min-height: 100vh;
  padding-top: var(--navbar-height, 80px); /* pushes content below fixed navbar */
  overflow: hidden;
  transition: background-color 0.65s ease;
  font-family: inherit;
}
  .hs-bg-gradient {
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity 0.65s ease;
    pointer-events: none;
    z-index: 0;
  }
  .hs-bg-gradient.visible { opacity: 1; }

  .hs-stage-outer {
    position: relative;
    z-index: 1;
    width: 100%;
    display: flex;
    justify-content: center;
    overflow: hidden;
  }

  .hs-stage {
    position: relative;
    width: ${BASE_STAGE_WIDTH}px;
    height: ${BASE_STAGE_HEIGHT}px;
    transform-origin: top center;
    transform: scale(var(--hs-stage-scale, 1));
  }

.hs-watermark {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scaleY(1.3) !important;
  font-size: clamp(60px, 8.2vw, 180px);
  font-weight: 700;
  letter-spacing: 0.06em;
  color: rgba(0,0,0,0.055);
  white-space: nowrap;
  pointer-events: none;
  z-index: 0;
  user-select: none;
  line-height: 1;
}

  .hs-grid {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  align-items: center;
  min-height: clamp(600px, 66vh, 860px);
  margin-top: clamp(10px, 8vh, 200px);
  // padding: 40px 75px 16px;
  padding: clamp(20px, 2.6vw, 50px);
  gap: clamp(8px, 1vw, 24px);
}

  .hs-left {
  margin-top: clamp(20px, 6.5vh, 80px);
  width: 100%;
  }

  .hs-title {
    font-size: clamp(34px, 3.8vw, 60px);
    font-weight: 800;
    line-height: 1.08;
    color: #111;
    margin: 0 0 14px;
    font-family: 'Playfair Display', Georgia, serif;
  }

  .hs-subtitle {
    font-size: 15px;
    color: #777;
    line-height: 1.6;
    margin: 0;
  }

  .hs-center {
    // position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: clamp(380px, 50vh, 500px);
    
    }

  .hs-bowl-wrap {
  position: relative;
  z-index: 2;
  width: clamp(320px, 35vw, 500px);
  height: clamp(320px, 35vw, 500px);
  overflow: visible;
}

  .hs-bowl-track {
  width: 100%;
  height: 100%;
}

  .hs-bowl-item {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 20;
}

  .hs-float {
    position: absolute;
    display: block;
    z-index: 3;
    pointer-events: none;
  }

  .hs-card {
  // background: rgba(255,255,255,0.88);
  // backdrop-filter: blur(12px);
  // -webkit-backdrop-filter: blur(12px);
  margin-bottom: clamp(60px, 18vh, 200px);
  // border-radius: 20px;
  // padding: 26px 22px;
  // box-shadow: 0 6px 28px rgba(0,0,0,0.09);
  max-width: clamp(280px, 28vw, 530px);
  justify-self: end;
  
  // border: 1px solid rgba(255,255,255,0.9);
}

  .hs-card-title {
    font-size: 24px;
    font-weight: 700;
    color: #111;
    margin: 0 0 8px;
    line-height: 1.3;
    font-family: 'Playfair Display', Georgia, serif;
  }

  .hs-card-desc {
    font-size: 15px;
    color: #666;
    margin: 0 0 18px;
    line-height: 1.55;
  }

  .hs-btn {
    display: inline-block;
    padding: 10px 22px;
    border-radius: 10px;
    color: #fff;
    font-size: 13.5px;
    font-weight: 600;
    text-decoration: none;
    letter-spacing: 0.01em;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }
  .hs-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(0,0,0,0.18);
  }

  .hs-tabs-row {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: clamp(10px, 0.9vw, 18px);
    padding: clamp(16px, 2.4vw, 40px);
  }

  .hs-tab {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    background: rgba(255,255,255,0.92);
    border-radius: clamp(14px, 1vw, 18px);
    padding: clamp(10px, 0.9vw, 14px) clamp(14px, 1.1vw, 22px);
    cursor: pointer;
    border: 2.5px solid transparent;
    transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease;
    width: clamp(132px, 8.7vw, 165px);
    box-shadow: 0 2px 10px rgba(0,0,0,0.06);
  }
  .hs-tab:hover { transform: translateY(-2px); box-shadow: 0 6px 18px rgba(0,0,0,0.1); }
  .hs-tab.active { box-shadow: 0 4px 18px rgba(0,0,0,0.12); }
  .hs-tab-label {
    font-size: 13px;
    font-weight: 700;
    color: #333;
    white-space: nowrap;
  }

  .hs-arrow {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: rgba(255,255,255,0.92);
    border: 1.5px solid #ddd;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 17px;
    color: #444;
    transition: background 0.2s, color 0.2s, border-color 0.2s, transform 0.15s;
    flex-shrink: 0;
    line-height: 1;
    padding: 0;
  }
  .hs-arrow:hover { background: #222; color: #fff; border-color: #222; transform: scale(1.08); }

  /* ---- Animations ---- */
  @keyframes hs-up-in {
    from { transform: translateY(55px); opacity: 0; }
    to   { transform: translateY(0);    opacity: 1; }
  }
  @keyframes hs-down-in {
    from { transform: translateY(-55px); opacity: 0; }
    to   { transform: translateY(0);     opacity: 1; }
  }
  @keyframes hs-fade-scale {
    from { transform: translate(-50%, -50%) scale(0.92); opacity: 0; }
    to   { transform: translate(-50%, -50%) scale(1);    opacity: 1; }
  }
  @keyframes hs-stage-in-next {
    from { transform: translateY(100%) scale(var(--hs-stage-scale, 1)); }
    to   { transform: translateY(0) scale(var(--hs-stage-scale, 1)); }
  }
  @keyframes hs-stage-in-prev {
    from { transform: translateY(-100%) scale(var(--hs-stage-scale, 1)); }
    to   { transform: translateY(0) scale(var(--hs-stage-scale, 1)); }
  }
  @keyframes hs-cup-vertical-next {
    from { transform: translateY(100vh); }
    to   { transform: translateY(0); }
  }
  @keyframes hs-cup-vertical-prev {
    from { transform: translateY(-100vh); }
    to   { transform: translateY(0); }
  }
  @keyframes hs-cup-out-next {
    from { transform: translateY(0); }
    to   { transform: translateY(-100vh); }
  }
  @keyframes hs-cup-out-prev {
    from { transform: translateY(0); }
    to   { transform: translateY(100vh); }
  }
  @keyframes hs-float-in-bob {
    0%   { transform: scale(0.6) translateY(20px); opacity: 0; }
    60%  { transform: scale(1.05) translateY(-6px); opacity: 1; }
    100% { transform: scale(1) translateY(0px); opacity: 1; }
  }
  @keyframes hs-bob {
    0%,100% { transform: translateY(0px); }
    50%     { transform: translateY(-10px); }
  }

  .hs-anim-up   { animation: hs-up-in   0.6s cubic-bezier(0.22, 1, 0.36, 1) both; }
  .hs-anim-down { animation: hs-down-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) both; }
  .hs-anim-up-delay   { animation: hs-up-in   0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.12s both; }
  .hs-anim-down-delay { animation: hs-down-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.12s both; }
  .hs-anim-card-up   { animation: hs-up-in   0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.18s both; }
  .hs-anim-card-down { animation: hs-down-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.18s both; }
  .hs-anim-watermark { animation: hs-fade-scale 0.55s cubic-bezier(0.22, 1, 0.36, 1) both; }
  .hs-anim-cup-next { animation: hs-cup-vertical-next 1.2s cubic-bezier(0.22, 1, 0.36, 1) both; }
  .hs-anim-cup-prev { animation: hs-cup-vertical-prev 1.2s cubic-bezier(0.22, 1, 0.36, 1) both; }
  .hs-anim-cup-out-next { animation: hs-cup-out-next 1.2s cubic-bezier(0.22, 1, 0.36, 1) both; }
  .hs-anim-cup-out-prev { animation: hs-cup-out-prev 1.2s cubic-bezier(0.22, 1, 0.36, 1) both; }

  @media (min-width: 2560px) {
    .hs-grid {
      min-height: 860px;
      grid-template-columns: 1.1fr 2.8fr 1.1fr;
      padding: 56px 72px;
      gap: 24px;
    }
    .hs-center { height: 680px; }
    .hs-bowl-wrap { width: 620px; height: 620px; }
    .hs-tabs-row { padding: 22px 72px 52px; }
    .hs-tab { width: 182px; }
    .hs-watermark { font-size: 190px; }
  }
`;

export default function Hero1() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState("next");
  const [animKey, setAnimKey] = useState(0);
  const [stageScale, setStageScale] = useState(1);
  const [prevCup, setPrevCup] = useState(null);
  const [cupAnimating, setCupAnimating] = useState(false);

  const slide = SLIDES[current];
  const watermarkGradient = (slide.watermarkGradient || "")
    .replace(/^background\s*:\s*/i, "")
    .replace(/;$/, "")
    .trim();

  const navigate = useCallback((direction) => {
    setDir(direction);
    setAnimKey((k) => k + 1);
    setCurrent((c) => {
      setPrevCup(c);
      setCupAnimating(true);
      return direction === "next"
        ? (c + 1) % SLIDES.length
        : (c - 1 + SLIDES.length) % SLIDES.length;
    });
  }, []);

  const goTo = useCallback(
    (index) => {
      if (index === current) return;
      const direction = index > current ? "next" : "prev";
      setDir(direction);
      setAnimKey((k) => k + 1);
      setPrevCup(current);
      setCupAnimating(true);
      setCurrent(index);
    },
    [current],
  );

  const titleAnim = dir === "next" ? "hs-anim-up" : "hs-anim-down";
  const subtitleAnim =
    dir === "next" ? "hs-anim-up-delay" : "hs-anim-down-delay";
  const cardAnim = dir === "next" ? "hs-anim-card-up" : "hs-anim-card-down";
  const cupInAnim = dir === "next" ? "hs-anim-cup-next" : "hs-anim-cup-prev";
  const cupOutAnim =
    dir === "next" ? "hs-anim-cup-out-next" : "hs-anim-cup-out-prev";

  useEffect(() => {
    const updateScale = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const widthScale = vw / BASE_STAGE_WIDTH;
      const heightScale = (vh - 80) / BASE_STAGE_HEIGHT;
      const nextScale = Math.min(widthScale, heightScale);
      setStageScale(Math.max(0.55, nextScale));
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  const stageHeight = Math.ceil(BASE_STAGE_HEIGHT * stageScale);

  return (
    <>
      <style>{CSS}</style>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@800&display=swap"
      />

      <section className="hs-root" style={{ backgroundColor: slide.bgColor }}>
        {/* Gradient overlay */}
        <div
          className="hs-bg-gradient visible"
          style={{
            background: `linear-gradient(155deg, ${slide.bgColor} 30%, ${slide.gradientEnd} 100%)`,
          }}
        />

        <div className="hs-stage-outer" style={{ height: stageHeight }}>
          <div
            key={`stage-${animKey}`}
            className="hs-stage"
            style={{ "--hs-stage-scale": stageScale }}
          >
            {/* Background watermark text */}
            <div
              key={`wm-${animKey}`}
              className="hs-watermark hs-anim-watermark"
              style={{
                backgroundImage: watermarkGradient,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                letterSpacing: "-5px",
              }}
            >
              {slide.bgText}
            </div>

            {/* Main 3-column grid */}
            <div className="hs-grid">
              {/* LEFT: Title + Subtitle */}
              <div className="hs-left">
                <h1
                  key={`title-${animKey}`}
                  className={`hs-title ${titleAnim}`}
                >
                  {slide.line1}
                  <br />
                  {slide.line2}
                </h1>
                <p
                  key={`sub-${animKey}`}
                  className={`hs-subtitle ${subtitleAnim}`}
                >
                  {slide.subtitle}
                </p>
              </div>

              {/* CENTER: Bowl + Floating Ingredients */}
              <div className="hs-center">
                {/* Bowl image */}
                <div className="hs-bowl-wrap">
                  {cupAnimating && prevCup !== null && (
                    <div
                      className={`hs-bowl-item ${cupOutAnim}`}
                      onAnimationEnd={() => {
                        setCupAnimating(false);
                        setPrevCup(null);
                      }}
                    >
                      <Image
                        src={SLIDES[prevCup].mainImg}
                        alt={`${SLIDES[prevCup].line1} ${SLIDES[prevCup].line2} bowl`}
                        fill
                        sizes="(max-width: 768px) 320px, 493px"
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                  )}
                  <div
                    key={`cup-in-${animKey}-${current}`}
                    className={`hs-bowl-item ${cupAnimating ? cupInAnim : ""}`}
                  >
                    <Image
                      src={slide.mainImg}
                      alt={`${slide.line1} ${slide.line2} bowl`}
                      fill
                      sizes="(max-width: 768px) 320px, 493px"
                      style={{ objectFit: "contain" }}
                      priority
                    />
                  </div>
                </div>

                {/* Floating items */}
                {slide.floats.map((item, i) =>
                  (() => {
                    const floatWidth = normalizeDimension(
                      item.width ?? item.size,
                    );
                    const floatHeight = normalizeDimension(
                      item.height ?? item.size,
                    );
                    return (
                      <div
                        key={`fl-${animKey}-${i}`}
                        className="hs-float"
                        style={{
                          top: item.top ?? "auto",
                          left: item.left ?? "auto",
                          right: item.right ?? "auto",
                          bottom: item.bottom ?? "auto",
                          width: floatWidth,
                          height: floatHeight,
                          animation: `hs-float-in-bob 0.7s cubic-bezier(0.22,1,0.36,1) ${item.delay} both,
                               hs-bob 3.5s ease-in-out ${item.delay} infinite`,
                        }}
                      >
                        <Image
                          src={item.src}
                          alt={item.alt}
                          fill
                          sizes="(max-width: 768px) 30vw, 140px"
                          style={{
                            objectFit: "contain",
                          }}
                        />
                      </div>
                    );
                  })(),
                )}
              </div>

              {/* RIGHT: Info Card */}
              <div key={`card-${animKey}`} className={`hs-card ${cardAnim}`}>
                <p className="hs-card-title">{slide.card.title}</p>
                <p className="hs-card-desc">{slide.card.desc}</p>
                <Link
                  href="/products/1"
                  className="hs-btn"
                  style={{ backgroundColor: slide.accent }}
                >
                  View more details
                </Link>
              </div>
            </div>

            {/* Floating items */}
            {slide.floats.map((item, i) =>
              (() => {
                const floatWidth = normalizeDimension(item.width ?? item.size);
                const floatHeight = normalizeDimension(
                  item.height ?? item.size,
                );
                return (
                  <div
                    key={`fl-${animKey}-${i}`}
                    className="hs-float"
                    style={{
                      top: item.top ?? "auto",
                      left: item.left ?? "auto",
                      right: item.right ?? "auto",
                      bottom: item.bottom ?? "auto",
                      width: floatWidth,
                      height: floatHeight,
                      animation: `hs-float-in-bob 0.7s cubic-bezier(0.22,1,0.36,1) ${item.delay} both,
                               hs-bob 3.5s ease-in-out ${item.delay} infinite`,
                    }}
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 768px) 30vw, 140px"
                      style={{
                        objectFit: "contain",
                      }}
                    />
                  </div>
                );
              })(),
            )}
          </div>

          {/* RIGHT: Info Card */}
          <div key={`card-${animKey}`} className={`hs-card ${cardAnim}`}>
            <p className="hs-card-title">{slide.card.title}</p>
            <p className="hs-card-desc">{slide.card.desc}</p>
            <Link
              href="/products"
              className="hs-btn"
              style={{ backgroundColor: slide.accent }}
            >
              View more details
            </Link>
          </div>
        </div>

        {/* BOTTOM: Category tabs + arrows */}
        <div className="hs-tabs-row">
          <button
            className="hs-arrow"
            onClick={() => navigate("prev")}
            aria-label="Previous"
          >
            &#8592;
          </button>

          {SLIDES.map((s, i) => (
            <div
              key={s.id}
              className={`hs-tab${i === current ? " active" : ""}`}
              style={i === current ? { borderColor: s.accent } : {}}
              onClick={() => goTo(i)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && goTo(i)}
            >
              <Image
                src={s.tabIcon}
                alt={s.tabLabel}
                width={48}
                height={48}
                style={{ objectFit: "contain" }}
              />
              <span
                className="hs-tab-label"
                style={i === current ? { color: s.accent } : {}}
              >
                &#8592;
              </span>

              {SLIDES.map((s, i) => (
                <div
                  key={s.id}
                  className={`hs-tab${i === current ? " active" : ""}`}
                  style={i === current ? { borderColor: s.accent } : {}}
                  onClick={() => goTo(i)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && goTo(i)}
                >
                  <Image
                    src={s.tabIcon}
                    alt={s.tabLabel}
                    width={48}
                    height={48}
                    style={{ objectFit: "contain" }}
                  />
                  <span
                    className="hs-tab-label"
                    style={i === current ? { color: s.accent } : {}}
                  >
                    {s.tabLabel}
                  </span>
                </div>
              ))}

              <button
                className="hs-arrow"
                onClick={() => navigate("next")}
                aria-label="Next"
              >
                &#8594;
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
