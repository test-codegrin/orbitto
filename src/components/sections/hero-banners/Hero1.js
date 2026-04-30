"use client";
import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

const SLIDES = [
  {
    id: 0,
    line1: "Fruit",
    line2: "Powder",
    subtitle: "From fruit to fine powder perfection",
    bgText: "FRUIT POWDER",
    bgColor: "#fff5f8",
    gradientEnd: "#fce4ec",
    card: {
      title: "Premium Fruit Powder",
      desc: "Bringing the goodness of fresh fruits into every serving.",
    },
    mainImg: "/img/slider/FruitePowder.png",
    floats: [
      {
        src: "/img/slider/CoconutBlur.png",
        alt: "Coconut",
        top: "18%",
        left: "16%",
        size: 110,
        delay: "0s",
      },

      {
        src: "/img/slider/Avocado.png",
        alt: "Avocado",
        top: "18%",
        left: "26%",
        size: 110,
        delay: "0s",
      },
      {
        src: "/img/slider/Cherry.png",
        alt: "Cherry",
        bottom: "30%",
        left: "0",
        size: 110,
        delay: "0.35s",
      },
       {
        src: "/img/slider/BlueberryBlur.png",
        alt: "Blueberry",
        bottom: "10%",
        left: "-59%",
        size: 110,
        delay: "0.35s",
      },
      {
        src: "/img/slider/Blueberry.png",
        alt: "Blueberry",
        bottom: "26%",
        right: "27%",
        size: 110,
        delay: "0.55s",
      },
      {
        src: "/img/slider/KiwiBlur.png",
        alt: "Kiwi",
        top: "12%",
        left: "7%",
        size: 65,
        delay: "0.2s",
      },
      {
        src: "/img/slider/CherryBlur.png",
        alt: "Small Strawberry",
        bottom: "8%",
        right: "-61%",
        size: 150,
        delay: "0.45s",
      },
      {
        src: "/img/slider/Blackberry.png",
        alt: "Blackberry",
        bottom: "8%",
        right: "7%",
        size: 150,
        delay: "0.6s",
      },
      {
        src: "/img/slider/GreenappleBlur.png",
        alt: "Green Apple",
        top: "4%",
        right: "22%",
        size: 100,
        delay: "0.15s",
      },
    ],
    accent: "#d63f6e",
    tabIcon: "/img/icons/fruit-basket.png",
    tabLabel: "Fruit Powder",
  },
  {
    id: 1,
    line1: "Vegetable",
    line2: "Powder",
    subtitle: "From farm to fine powder perfection",
    bgText: "VEGETABLE POWDER",
    bgColor: "#f0fff5",
    gradientEnd: "#d4f5df",
    card: {
      title: "Natural Vegetable Powder",
      desc: "Processed to preserve natural flavor and rich nutrients.",
    },
    mainImg: "/img/slider/23.png",
    floats: [
      {
        src: "/img/vegetables/tomato.png",
        alt: "Tomato",
        top: "22%",
        left: "25%",
        size: 115,
        delay: "0s",
      },
      {
        src: "/img/vegetables/broccoli.png",
        alt: "Broccoli",
        bottom: "22%",
        right: "24%",
        size: 105,
        delay: "0.4s",
      },
      {
        src: "/img/vegetables/bellpepper.png",
        alt: "Bell Pepper",
        top: "4%",
        left: "3%",
        size: 65,
        delay: "0.15s",
      },
      {
        src: "/img/vegetables/onion-ring.png",
        alt: "Onion Ring",
        top: "5%",
        right: "3%",
        size: 105,
        delay: "0.3s",
      },
      {
        src: "/img/vegetables/spinach.png",
        alt: "Spinach",
        bottom: "12%",
        left: "3%",
        size: 50,
        delay: "0.5s",
      },
      {
        src: "/img/vegetables/yellow-pepper.png",
        alt: "Yellow Pepper",
        top: "2%",
        left: "3%",
        size: 65,
        delay: "0.1s",
      },
    ],
    accent: "#2a7d3e",
    tabIcon: "/img/icons/veg-basket.png",
    tabLabel: "Vegetable Powder",
  },
  {
    id: 2,
    line1: "Pure",
    line2: "Honey",
    subtitle: "Nature's golden sweetness refined",
    bgText: "PURE HONEY",
    bgColor: "#fffbf0",
    gradientEnd: "#fef0c7",
    card: {
      title: "Raw Pure Honey",
      desc: "Directly sourced from natural hives for authentic golden taste.",
    },
    mainImg: "/img/slider/honey.png",
    floats: [
      {
        src: "/img/honey/honeycomb.png",
        alt: "Honeycomb",
        top: "18%",
        right: "27%",
        size: 95,
        delay: "0s",
      },
      {
        src: "/img/honey/flower.png",
        alt: "Flower",
        top: "10%",
        left: "8%",
        size: 60,
        delay: "0.25s",
      },
      {
        src: "/img/honey/bee.png",
        alt: "Bee",
        bottom: "28%",
        left: "28%",
        size: 55,
        delay: "0.4s",
      },
      {
        src: "/img/honey/jar.png",
        alt: "Honey Jar",
        bottom: "20%",
        right: "10%",
        size: 70,
        delay: "0.55s",
      },
    ],
    accent: "#d97706",
    tabIcon: "/img/icons/honey.png",
    tabLabel: "Pure Honey",
  },
  {
    id: 3,
    line1: "Premium",
    line2: "Spices",
    subtitle: "Handpicked spices bursting with bold flavor",
    bgText: "SPICES",
    bgColor: "#fff8f2",
    gradientEnd: "#ffe0cc",
    card: {
      title: "Exotic Spice Blends",
      desc: "Sun-dried and stone-ground for maximum aroma and authentic taste.",
    },
    mainImg: "/img/slider/spices.png",
    floats: [
      {
        src: "/img/spices/chili.png",
        alt: "Red Chili",
        top: "16%",
        left: "25%",
        size: 105,
        delay: "0s",
      },
      {
        src: "/img/spices/turmeric.png",
        alt: "Turmeric",
        bottom: "28%",
        left: "32%",
        size: 80,
        delay: "0.35s",
      },
      {
        src: "/img/spices/cinnamon.png",
        alt: "Cinnamon",
        bottom: "24%",
        right: "26%",
        size: 90,
        delay: "0.5s",
      },
      {
        src: "/img/spices/cardamom.png",
        alt: "Cardamom",
        top: "10%",
        left: "6%",
        size: 60,
        delay: "0.2s",
      },
      {
        src: "/img/spices/pepper.png",
        alt: "Black Pepper",
        top: "6%",
        right: "8%",
        size: 50,
        delay: "0.45s",
      },
      {
        src: "/img/spices/star-anise.png",
        alt: "Star Anise",
        bottom: "10%",
        right: "6%",
        size: 70,
        delay: "0.6s",
      },
      {
        src: "/img/spices/clove.png",
        alt: "Clove",
        top: "3%",
        right: "22%",
        size: 40,
        delay: "0.15s",
      },
    ],
    accent: "#c2410c",
    tabIcon: "/img/icons/spices.png",
    tabLabel: "Spices",
  },
  {
    id: 4,
    line1: "Herbal",
    line2: "Powder",
    subtitle: "Pure herbs transformed into healing powder",
    bgText: "HERBAL POWDER",
    bgColor: "#f4fbf5",
    gradientEnd: "#c8edcf",
    card: {
      title: "Pure Herbal Powder",
      desc: "Cold-processed medicinal herbs retaining full nutritional potency.",
    },
    mainImg: "/img/slider/herbal.png",
    floats: [
      {
        src: "/img/herbs/moringa.png",
        alt: "Moringa Leaf",
        top: "18%",
        left: "26%",
        size: 105,
        delay: "0s",
      },
      {
        src: "/img/herbs/ashwagandha.png",
        alt: "Ashwagandha",
        bottom: "28%",
        left: "32%",
        size: 85,
        delay: "0.35s",
      },
      {
        src: "/img/herbs/tulsi.png",
        alt: "Tulsi",
        bottom: "22%",
        right: "25%",
        size: 75,
        delay: "0.5s",
      },
      {
        src: "/img/herbs/neem.png",
        alt: "Neem Leaves",
        top: "10%",
        left: "6%",
        size: 65,
        delay: "0.2s",
      },
      {
        src: "/img/herbs/aloe.png",
        alt: "Aloe Vera",
        top: "5%",
        right: "7%",
        size: 60,
        delay: "0.45s",
      },
      {
        src: "/img/herbs/amla.png",
        alt: "Amla",
        bottom: "9%",
        right: "6%",
        size: 75,
        delay: "0.6s",
      },
      {
        src: "/img/herbs/ginger.png",
        alt: "Ginger Root",
        top: "3%",
        right: "22%",
        size: 45,
        delay: "0.15s",
      },
    ],
    accent: "#166534",
    tabIcon: "/img/icons/herbal.png",
    tabLabel: "Herbal Powder",
  },
];

const CSS = `
  .hs-root {
    position: relative;
    width: 100%;
    min-height: 680px;
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

  .hs-watermark {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: clamp(52px, 9vw, 115px);
    font-weight: 900;
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
    grid-template-columns: 1fr 2.2fr 1fr;
    align-items: center;
    min-height: 560px;
    padding: 56px 48px 16px;
    gap: 16px;
  }

  .hs-left { }

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
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 520px;
  }

  .hs-bowl-wrap {
    position: relative;
    z-index: 2;
    width: clamp(200px, 28vw, 370px);
    height: clamp(200px, 28vw, 370px);
  }

  .hs-float {
    position: absolute;
    z-index: 3;
    pointer-events: none;
  }

  .hs-card {
    background: rgba(255,255,255,0.88);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-radius: 20px;
    padding: 26px 22px;
    box-shadow: 0 6px 28px rgba(0,0,0,0.09);
    max-width: 255px;
    justify-self: end;
    border: 1px solid rgba(255,255,255,0.9);
  }

  .hs-card-title {
    font-size: 18px;
    font-weight: 700;
    color: #111;
    margin: 0 0 8px;
    line-height: 1.3;
    font-family: 'Playfair Display', Georgia, serif;
  }

  .hs-card-desc {
    font-size: 13.5px;
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
    gap: 14px;
    padding: 8px 48px 44px;
  }

  .hs-tab {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    background: rgba(255,255,255,0.92);
    border-radius: 18px;
    padding: 14px 22px;
    cursor: pointer;
    border: 2.5px solid transparent;
    transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease;
    min-width: 120px;
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
  @keyframes hs-scale-in {
    from { transform: scale(0.78); opacity: 0; }
    to   { transform: scale(1);    opacity: 1; }
  }
  @keyframes hs-fade-scale {
    from { transform: translate(-50%, -50%) scale(0.92); opacity: 0; }
    to   { transform: translate(-50%, -50%) scale(1);    opacity: 1; }
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
  .hs-anim-bowl { animation: hs-scale-in 0.65s cubic-bezier(0.22, 1, 0.36, 1) 0.05s both; }
  .hs-anim-card-up   { animation: hs-up-in   0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.18s both; }
  .hs-anim-card-down { animation: hs-down-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.18s both; }
  .hs-anim-watermark { animation: hs-fade-scale 0.55s cubic-bezier(0.22, 1, 0.36, 1) both; }
`;

export default function Hero1() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState("next");
  const [animKey, setAnimKey] = useState(0);

  const slide = SLIDES[current];

  const navigate = useCallback((direction) => {
    setDir(direction);
    setAnimKey((k) => k + 1);
    setCurrent((c) =>
      direction === "next"
        ? (c + 1) % SLIDES.length
        : (c - 1 + SLIDES.length) % SLIDES.length,
    );
  }, []);

  const goTo = useCallback(
    (index) => {
      if (index === current) return;
      const direction = index > current ? "next" : "prev";
      setDir(direction);
      setAnimKey((k) => k + 1);
      setCurrent(index);
    },
    [current],
  );

  const titleAnim = dir === "next" ? "hs-anim-up" : "hs-anim-down";
  const subtitleAnim =
    dir === "next" ? "hs-anim-up-delay" : "hs-anim-down-delay";
  const cardAnim = dir === "next" ? "hs-anim-card-up" : "hs-anim-card-down";

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

        {/* Background watermark text */}
        <div key={`wm-${animKey}`} className="hs-watermark hs-anim-watermark">
          {slide.bgText}
        </div>

        {/* Main 3-column grid */}
        <div className="hs-grid">
          {/* LEFT: Title + Subtitle */}
          <div className="hs-left">
            <h1 key={`title-${animKey}`} className={`hs-title ${titleAnim}`}>
              {slide.line1}
              <br />
              {slide.line2}
            </h1>
            <p key={`sub-${animKey}`} className={`hs-subtitle ${subtitleAnim}`}>
              {slide.subtitle}
            </p>
          </div>

          {/* CENTER: Bowl + Floating Ingredients */}
          <div className="hs-center">
            {/* Bowl image */}
            <div key={`bowl-${animKey}`} className="hs-bowl-wrap hs-anim-bowl">
              <Image
                src={slide.mainImg}
                alt={`${slide.line1} ${slide.line2} bowl`}
                fill
                sizes="(max-width: 768px) 200px, 370px"
                style={{ objectFit: "contain" }}
                priority
              />
            </div>

            {/* Floating items */}
            {slide.floats.map((item, i) => (
              <div
                key={`fl-${animKey}-${i}`}
                className="hs-float"
                style={{
                  top: item.top ?? "auto",
                  left: item.left ?? "auto",
                  right: item.right ?? "auto",
                  bottom: item.bottom ?? "auto",
                  width: item.size,
                  height: item.size,
                  animation: `hs-float-in-bob 0.7s cubic-bezier(0.22,1,0.36,1) ${item.delay} both,
                               hs-bob 3.5s ease-in-out ${item.delay} infinite`,
                }}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.size}
                  height={item.size}
                  style={{
                    objectFit: "contain",
                    width: "100%",
                    height: "100%",
                  }}
                />
              </div>
            ))}
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
      </section>
    </>
  );
}
