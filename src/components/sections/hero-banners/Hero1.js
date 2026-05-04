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
    mainImg: "/img/slider/main/fruit_powder.png",
    floats: [
      {
        src: "/img/slider/Fruit/kiwi_blur.png",
        alt: "Kiwi",
        top: "-2%",
        left: "7%",
        size: "100",
      },
      // {
      //   src: "/img/slider/Fruit/coconut_blur.png",
      //   alt: "Coconut",
      //   top: "18%",
      //   left: "16%",
      //   size: 130,
      // },

      // {
      //   src: "/img/slider/Fruit/avocado.png",
      //   alt: "Avocado",
      //   top: "18%",
      //   left: "26%",
      //   size: 230,
      //   delay: "0.53s",
      // },
      // {
      //   src: "/img/slider/Fruit/cherry.png",
      //   alt: "Cherry",
      //   bottom: "30%",
      //   left: "35%",
      //   size: 210,
      //   delay: "0.35s",
      // },
      // {
      //   src: "/img/slider/Fruit/berry_blur.png",
      //   alt: "Blueberry",
      //   bottom: "10%",
      //   left: "-1%",
      //   size: 110,
      //   delay: "0.35s",
      // },
      // {
      //   src: "/img/slider/Fruit/berry.png",
      //   alt: "Blueberry",
      //   bottom: "26%",
      //   right: "27%",
      //   size: 110,
      //   delay: "0.55s",
      // },

      // {
      //   src: "/img/slider/Fruit/cherry_blur.png",
      //   alt: "Small Strawberry",
      //   bottom: "8%",
      //   right: "-61%",
      //   size: 150,
      //   delay: "0.45s",
      // },
      // {
      //   src: "/img/slider/Fruit/cherry_blur.png",
      //   alt: "Blackberry",
      //   bottom: "0%",
      //   right: "0%",
      //   size: 150,
      //   delay: "0.6s",
      // },
      // {
      //   src: "/img/slider/Fruit/GreenappleBlur.png",
      //   alt: "Green Apple",
      //   top: "2%",
      //   right: "22%",
      //   size: 100,
      // },
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
    bgColor: "#f0fff5",
    gradientEnd: "#d4f5df",
    card: {
      title: "Natural Vegetable Powder",
      desc: "Processed to preserve natural flavor and rich nutrients.",
    },
    mainImg: "/img/slider/main/vegetable_powder.png",
    floats: [
      {
        src: "/img/slider/BeetsRootBlur.png",
        alt: "Beetroot",
        top: "22%",
        left: "25%",
        size: 115,
        delay: "0s",
      },
      {
        src: "/img/slider/Coriander.png",
        alt: "Coriander Leaves",
        top: "22%",
        left: "40%",
        size: 115,
        delay: "0s",
      },
      {
        src: "/img/slider/Broccoli.png",
        alt: "Broccoli",
        bottom: "22%",
        right: "24%",
        size: 105,
        delay: "0.4s",
      },
      {
        src: "/img/slider/CarrotBlur.png",
        alt: "Carrot",
        bottom: "22%",
        right: "-55%",
        size: 105,
        delay: "0.4s",
      },
      {
        src: "/img/slider/BitterGourd.png",
        alt: "Bitter Gourd",
        top: "4%",
        left: "3%",
        size: 65,
        delay: "0.15s",
      },
      {
        src: "/img/slider/OnionRing.png",
        alt: "Onion Ring",
        top: "5%",
        right: "3%",
        size: 105,
        delay: "0.3s",
      },
      {
        src: "/img/slider/SpinachBlur.png",
        alt: "Spinach",
        bottom: "12%",
        left: "-50%",
        size: 50,
        delay: "0.5s",
      },
      {
        src: "/img/slider/GreenChiliBlur.png",
        alt: "Green Chili",
        bottom: "12%",
        left: "3%",
        size: 50,
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
    bgColor: "#fffbf0",
    gradientEnd: "#fef0c7",
    card: {
      title: "Raw Pure Honey",
      desc: "Directly sourced from natural hives for authentic golden taste.",
    },
    mainImg: "/img/slider/main/honey.png",
    floats: [
      {
        src: "/img/slider/HoneySunFlower.png",
        alt: "Sunflower",
        top: "18%",
        right: "27%",
        size: 200,
        delay: "0s",
      },
      {
        src: "/img/slider/HoneyBee.gif",
        alt: "Bee",
        top: "18%",
        right: "27%",
        size: 125,
        delay: "0s",
      },
      {
        src: "/img/slider/HoneyDrop.png",
        alt: "Honey Drop",
        top: "10%",
        left: "8%",
        size: 200,
      },
      {
        src: "/img/slider/HoneyBeeQ.gif",
        alt: "Bee",
        bottom: "28%",
        left: "28%",
        size: 125,
        delay: "0.4s",
      },
      {
        src: "/img/slider/HoneyPad.png",
        alt: "Honey Jar",
        bottom: "20%",
        right: "10%",
        size: 70,
        delay: "0.55s",
      },
      {
        src: "/img/slider/HoneyPadBlur.png",
        alt: "Honey Jar",
        bottom: "20%",
        right: "-50%",
        size: 70,
        delay: "0.55s",
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
    bgText: "SPICES",
    bgColor: "#fff8f2",
    gradientEnd: "#ffe0cc",
    card: {
      title: "Exotic Spice Blends",
      desc: "Sun-dried and stone-ground for maximum aroma and authentic taste.",
    },
    mainImg: "/img/slider/main/spices.png",
    floats: [
      {
        src: "/img/slider/GaramMsala.png",
        alt: "Garam Masala",
        top: "16%",
        left: "2%",
        size: 205,
        delay: "0s",
      },
      {
        src: "/img/slider/DryChilli.png",
        alt: "Red Chili",
        top: "16%",
        left: "25%",
        size: 205,
        delay: "0s",
      },
      {
        src: "/img/slider/Clove.png",
        alt: "Clove",
        bottom: "-2%",
        left: "32%",
        size: 280,
        delay: "0.35s",
      },
      {
        src: "/img/slider/RedChilli.png",
        alt: "Red Chili",
        bottom: "2%",
        right: "26%",
        size: 190,
        delay: "0.5s",
      },
      {
        src: "/img/slider/Cardamom.png",
        alt: "Cardamom",
        bottom: "1%",
        right: "-63%",
        size: 260,
        delay: "0.2s",
      },
      {
        src: "/img/slider/Turmeric.png",
        alt: "Turmeric",
        top: "6%",
        right: "8%",
        size: 150,
        delay: "0.45s",
      },
      {
        src: "/img/slider/StarAnise.png",
        alt: "Star Anise",
        bottom: "10%",
        left: "-54%",
        size: 170,
        delay: "0.6s",
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
    bgColor: "#f4fbf5",
    gradientEnd: "#c8edcf",
    card: {
      title: "Pure Herbal Powder",
      desc: "Cold-processed medicinal herbs retaining full nutritional potency.",
    },
    mainImg: "/img/slider/main/natural_herbs.png",
    floats: [
      {
        src: "/img/slider/amla.png",
        alt: "Amla",
        top: "18%",
        left: "26%",
        size: 105,
        delay: "0s",
      },
      {
        src: "/img/slider/PricklyPear.png",
        alt: "Prickly Pear",
        top: "10%",
        left: "6%",
        size: 65,
        delay: "0.2s",
      },

      {
        src: "/img/slider/Rose.png",
        alt: "Rose",
        bottom: "22%",
        right: "25%",
        size: 75,
        delay: "0.5s",
      },
      {
        src: "/img/slider/MoringaLeaf.png",
        alt: "Moringa Leaf",
        bottom: "9%",
        right: "6%",
        size: 75,
        delay: "0.6s",
      },
      {
        src: "/img/slider/AloeveraBlur.png",
        alt: "Aloe Vera",
        bottom: "9%",
        right: "6%",
        size: 75,
        delay: "0.6s",
      },
      {
        src: "/img/slider/GreenFennel.png",
        alt: "Green Fennel",
        top: "3%",
        right: "22%",
        size: 200,
        delay: "0.15s",
      },
      {
        src: "/img/slider/Rose.png",
        alt: "Rose",
        top: "3%",
        right: "22%",
        size: 45,
        delay: "0.15s",
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

  .hs-watermark {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: clamp(60px, 11vw, 130px);
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
  grid-template-columns: 1fr 3fr 1fr;
  align-items: center;
  min-height: 600px;
  padding: 40px 48px 16px;
  gap: 8px;
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
    // position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 520px;
  }

  .hs-bowl-wrap {
  position: relative;
  z-index: 2;
  width: clamp(320px, 42vw, 450px);
  height: clamp(320px, 42vw, 450px);
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
  max-width: 230px;
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
                sizes="(max-width: 768px) 320px, 493px"
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
