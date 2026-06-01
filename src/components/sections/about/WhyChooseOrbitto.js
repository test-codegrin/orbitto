"use client";

import { useState } from "react";
import Image from "next/image";

const slides = [
  {
    image: "/img/bg/16.webp",
    imageAlt: "Fresh products packed for reliable delivery",
    copy: [
      "We do not just make great powders - we build long-term partnerships. At Orbitto, our goal is simple: deliver high-quality ingredients with consistency, reliability, and care.",
      "From raw material selection to packaging and delivery, we maintain strict quality controls at every stage so the entire process feels easier for our clients.",
    ],
    cards: [
      {
        icon: "fas fa-project-diagram",
        title: "Versatile Range",
        desc: "From fruit, vegetable, and herbal powders to taste enhancers, dairy, and functional blends, we cover modern food production needs.",
      },
      {
        icon: "fas fa-award",
        title: "Consistent Quality, Every Time",
        desc: "Each batch undergoes careful checks to help ensure every product meets dependable quality standards.",
      },
      {
        icon: "fas fa-box-open",
        title: "Flexible Packaging & Delivery",
        desc: "We handle everything from bulk to small-batch orders with careful packaging and reliable logistics.",
      },
      {
        icon: "fas fa-shipping-fast",
        title: "Fast, Reliable Delivery",
        desc: "With strong logistics support, we keep deliveries moving faster without cutting corners.",
      },
    ],
  },
  {
    image: "/img/service/2.webp",
    imageAlt: "Export support and product handling process",
    copy: [
      "Our export process is planned around client priorities, product safety, and dependable movement from purchase to dispatch.",
      "Every order is supported with careful coordination across sourcing, packing, documentation, and logistics so clients can move faster with confidence.",
    ],
    cards: [
      {
        icon: "fas fa-seedling",
        title: "Careful Sourcing",
        desc: "We focus on practical purchasing support that keeps client requirements, quality, and timelines aligned.",
      },
      {
        icon: "fas fa-shield-alt",
        title: "Product Protection",
        desc: "Packaging decisions are made to protect product condition through storage, handling, and transport.",
      },
      {
        icon: "fas fa-file-signature",
        title: "Legal Documentation",
        desc: "We help keep export documentation clear, organized, and ready for smoother shipment processing.",
      },
      {
        icon: "fas fa-clipboard-check",
        title: "Customs Clearance",
        desc: "Our team supports the clearance process with accurate details and practical coordination.",
      },
    ],
  },
  {
    image: "/img/about/Grinder.webp",
    imageAlt: "Premium product packaging for export clients",
    copy: [
      "Orbitto values the time and money clients invest in every order, so service speed and clarity are always part of the work.",
      "We stay responsive from enquiry to delivery, keeping decisions simple and helping clients receive the right product support at the right time.",
    ],
    cards: [
      {
        icon: "fas fa-users",
        title: "Client-First Support",
        desc: "Client interests and requirements stay at the center of every discussion, update, and shipment plan.",
      },
      {
        icon: "fas fa-stopwatch",
        title: "Speedy Turnaround",
        desc: "We move with urgency while keeping quality checks, packing, and communication steady.",
      },
      {
        icon: "fas fa-layer-group",
        title: "Flexible Order Handling",
        desc: "Our process supports different product needs, packing preferences, and export requirements.",
      },
      {
        icon: "fas fa-handshake",
        title: "Reliable Partnerships",
        desc: "We aim to build repeatable service experiences that clients can trust for long-term growth.",
      },
    ],
  },
];

const cardEntryDirections = [
  "from-left",
  "from-right",
  "from-bottom",
  "from-top",
];

const WhyChooseOrbitto = () => {
  const [activePage, setActivePage] = useState(0);
  const [animationCycle, setAnimationCycle] = useState(0);
  const storyContent = slides[2];
  const cardPages = slides.map((slide) => slide.cards);
  const currentCards = cardPages[activePage];

  const handlePrev = () => {
    setActivePage((current) => (current === 0 ? cardPages.length - 1 : current - 1));
    setAnimationCycle((current) => current + 1);
  };

  const handleNext = () => {
    setActivePage((current) =>
      current === cardPages.length - 1 ? 0 : current + 1
    );
    setAnimationCycle((current) => current + 1);
  };

  return (
    <section className="why-orbitto-section">
      <div className="why-orbitto-container">
        <div className="why-orbitto-heading">
          <span>Why Us</span>
          <h2>WHY CHOOSE ORBITTO?</h2>
          <p>
            Because we are built around quality, flexibility, and the needs of
            modern food production.
          </p>
        </div>

        <div className="why-orbitto-grid">
          <div className="why-orbitto-left">
            <div className="why-orbitto-story">
              <Image
                src={storyContent.image}
                alt={storyContent.imageAlt}
                width={640}
                height={380}
                className="why-orbitto-story__image"
              />
              <div className="why-orbitto-story__copy">
                {storyContent.copy.map((text) => (
                  <p key={text}>{text}</p>
                ))}
              </div>
            </div>

            <div className="why-orbitto-controls">
              <button
                type="button"
                aria-label="Show previous Orbitto feature set"
                onClick={handlePrev}
              >
                <i className="fas fa-arrow-left"></i>
              </button>
              <button
                type="button"
                aria-label="Show next Orbitto feature set"
                onClick={handleNext}
              >
                <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>

          <div className="why-orbitto-features" key={`features-${animationCycle}`}>
            {currentCards.map(({ icon, title, desc }, index) => (
              <div
                className={`why-orbitto-card ${cardEntryDirections[index]}`}
                key={`${title}-${animationCycle}`}
                style={{ "--card-delay": `${index * 0.08}s` }}
              >
                <i className={icon}></i>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <Image
          src="/img/slider/Fruit/avocado.webp"
          alt=""
          width={120}
          height={120}
          className="why-orbitto-decor why-orbitto-decor--left"
        />
        <Image
          src="/img/slider/Fruit/berry.webp"
          alt=""
          width={130}
          height={130}
          className="why-orbitto-decor why-orbitto-decor--right"
        />
      </div>
    </section>
  );
};

export default WhyChooseOrbitto;
