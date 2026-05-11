"use client";
import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const DEFAULT_FLOAT_SIZE = 100;
const BASE_STAGE_WIDTH = 1920;
const BASE_STAGE_HEIGHT = 940;

const normalizeDimension = (value) => {
  if (value === undefined || value === null || value === "")
    return `${DEFAULT_FLOAT_SIZE}px`;
  if (typeof value === "number") return `${value}px`;
  const trimmed = String(value).trim();
  if (/^\d+(\.\d+)?$/.test(trimmed)) return `${trimmed}px`;
  return trimmed;
};

// ─────────────────────────────────────────────────────────────────────────────
// SLIDES DATA
// fluid breakpoints: 768 | 1024 | 1100 | 1150 | 1280 | 1366 | 1440
// Positions are relative to .hs-fluid-stage (full viewport width).
// At ≥ 1101px fluid viewports, use wide vw-based spread to match desktop feel.
// ─────────────────────────────────────────────────────────────────────────────
const SLIDES = [
  {
    id: 0,
    line1: "Fruit",
    line2: "Powder",
    subtitle: "From fruit to fine powder perfection",
    bgText: "FRUIT POWDER",
    watermarkGradient:
      "background: linear-gradient(180deg, rgba(201, 118, 167, 0.2) 0%, #b05fd333 50%, rgba(245, 222, 110, 0.2) 100%);",
    bgColor: "#fff5f8",
    gradientEnd: "#fce4ec",
    card: {
      title: "Premium Fruit Powder",
      desc: "Bringing the goodness of fresh fruits into every serving.",
    },
    mainImg: "/img/slider/main/Blueberry.png",
    floats: [
      {
        src: "/img/slider/Fruit/kiwi_blur.png",
        alt: "Kiwi",
        top: "0%",
        left: "6%",
        width: "151",
        height: "105",
        fluid: {
          768: { top: "2%", left: "1%", size: "9vw" },
          1024: { top: "2%", left: "1%", size: "10vw" },
          1100: { top: "2%", left: "1%", size: "11vw" },
          1150: { top: "1%", left: "1%", size: "11vw" },
          1280: { top: "1%", left: "1%", size: "10vw" },
          1366: { top: "1%", left: "1%", size: "10vw" },
          1440: { top: "1%", left: "1%", size: "10vw" },
        },
      },
      {
        src: "/img/slider/Fruit/coconut_blur.png",
        alt: "Coconut",
        top: "15%",
        right: "12%",
        width: "120",
        height: "120",
        fluid: {
          768: { top: "20%", right: "9%", size: "7vw" },
          1024: { top: "18%", right: "11%", size: "6vw" },
          1100: { top: "18%", right: "13%", size: "7vw" },
          1150: { top: "18%", right: "12%", size: "6vw" },
          1280: { top: "18%", right: "11%", size: "6vw" },
          1366: { top: "18%", right: "12%", size: "6vw" },
          1440: { top: "18%", right: "13%", size: "6vw" },
        },
      },
      {
        src: "/img/slider/Fruit/avocado.png",
        alt: "Avocado",
        top: "18%",
        left: "21%",
        width: "240",
        height: "240",
        delay: "0.3s",
        fluid: {
          768: { top: "8%", left: "12%", size: "14vw" },
          1024: { top: "10%", left: "15%", size: "13vw" },
          1100: { top: "12%", left: "18%", size: "14vw" },
          1150: { top: "11%", left: "17%", size: "13vw" },
          1280: { top: "10%", left: "15%", size: "13vw" },
          1366: { top: "10%", left: "16%", size: "14vw" },
          1440: { top: "10%", left: "17%", size: "14vw" },
        },
      },
      {
        src: "/img/slider/Fruit/cherry.png",
        alt: "Cherry",
        bottom: "14%",
        left: "35%",
        width: "112",
        height: "102",
        delay: "0.35s",
        fluid: {
          768: { bottom: "10%", left: "20%", size: "8vw" },
          1024: { bottom: "12%", left: "24%", size: "7vw" },
          1100: { bottom: "14%", left: "28%", size: "8vw" },
          1150: { bottom: "12%", left: "27%", size: "8vw" },
          1280: { bottom: "12%", left: "25%", size: "8vw" },
          1366: { bottom: "13%", left: "27%", size: "8vw" },
          1440: { bottom: "14%", left: "28%", size: "8vw" },
        },
      },
      {
        src: "/img/slider/Fruit/berry_blur.png",
        alt: "Blueberry",
        bottom: "-20%",
        left: "-5%",
        width: "239",
        height: "210",
        delay: "0.35s",
        fluid: {
          768: { bottom: "0%", left: "0%", size: "14vw" },
          1024: { bottom: "0%", left: "0%", size: "13vw" },
          1100: { bottom: "0%", left: "0%", size: "15vw" },
          1150: { bottom: "0%", left: "0%", size: "15vw" },
          1280: { bottom: "0%", left: "0%", size: "15vw" },
          1366: { bottom: "0%", left: "0%", size: "16vw" },
          1440: { bottom: "0%", left: "0%", size: "16vw" },
        },
      },
      {
        src: "/img/slider/Fruit/berry.png",
        alt: "Blueberry",
        bottom: "5%",
        right: "31%",
        width: "208",
        height: "206",
        delay: "0.55s",
        fluid: {
          768: { bottom: "6%", right: "17%", size: "14vw" },
          1024: { bottom: "8%", right: "20%", size: "13vw" },
          1100: { bottom: "10%", right: "24%", size: "14vw" },
          1150: { bottom: "8%", right: "23%", size: "13vw" },
          1280: { bottom: "6%", right: "21%", size: "13vw" },
          1366: { bottom: "7%", right: "22%", size: "14vw" },
          1440: { bottom: "8%", right: "24%", size: "14vw" },
        },
      },
      {
        src: "/img/slider/Fruit/cherry_blur.png",
        alt: "Small Strawberry",
        bottom: "0%",
        right: "-10%",
        width: "350",
        height: "320",
        delay: "0.45s",
        fluid: {
          768: { bottom: "0%", right: "0%", size: "20vw" },
          1024: { bottom: "0%", right: "0%", size: "20vw" },
          1100: { bottom: "0%", right: "0%", size: "22vw" },
          1150: { bottom: "0%", right: "0%", size: "21vw" },
          1280: { bottom: "0%", right: "0%", size: "21vw" },
          1366: { bottom: "0%", right: "0%", size: "22vw" },
          1440: { bottom: "0%", right: "0%", size: "24vw" },
        },
      },
      {
        src: "/img/slider/Fruit/berry_loom.png",
        alt: "Blackberry",
        bottom: "-10%",
        right: "18%",
        width: "154",
        height: "129",
        fluid: {
          768: { bottom: "4%", right: "9%", size: "10vw" },
          1024: { bottom: "4%", right: "11%", size: "9vw" },
          1100: { bottom: "4%", right: "13%", size: "10vw" },
          1150: { bottom: "4%", right: "12%", size: "10vw" },
          1280: { bottom: "4%", right: "11%", size: "10vw" },
          1366: { bottom: "4%", right: "12%", size: "10vw" },
          1440: { bottom: "5%", right: "13%", size: "10vw" },
        },
      },
      {
        src: "/img/slider/Fruit/gauvava_blur.png",
        alt: "Green Apple",
        top: "-20%",
        right: "22%",
        width: "198",
        height: "212",
        delay: "0.15s",
        fluid: {
          768: { top: "2%", right: "10%", size: "13vw" },
          1024: { top: "2%", right: "13%", size: "12vw" },
          1100: { top: "2%", right: "16%", size: "13vw" },
          1150: { top: "2%", right: "14%", size: "13vw" },
          1280: { top: "2%", right: "13%", size: "12vw" },
          1366: { top: "2%", right: "14%", size: "13vw" },
          1440: { top: "2%", right: "15%", size: "13vw" },
        },
      },
    ],
    accent: "#432750",
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
    mainImg: "/img/slider/main/brocili.png",
    floats: [
      {
        src: "/img/slider/Vegetable/Beet.png",
        alt: "Beetroot",
        top: "22%",
        left: "25%",
        size: "174",
        delay: "0s",
        fluid: {
          768: { top: "12%", left: "12%", size: "13vw" },
          1024: { top: "14%", left: "15%", size: "12vw" },
          1100: { top: "16%", left: "18%", size: "13vw" },
          1150: { top: "14%", left: "17%", size: "12vw" },
          1280: { top: "13%", left: "16%", size: "12vw" },
          1366: { top: "14%", left: "17%", size: "13vw" },
          1440: { top: "14%", left: "18%", size: "13vw" },
        },
      },
      {
        src: "/img/slider/Vegetable/Coriander.png",
        alt: "Coriander Leaves",
        bottom: "0%",
        left: "25%",
        width: 265,
        height: 234,
        delay: "0s",
        fluid: {
          768: { bottom: "2%", left: "12%", size: "10vw" },
          1024: { bottom: "2%", left: "15%", size: "9vw" },
          1100: { bottom: "2%", left: "18%", size: "10vw" },
          1150: { bottom: "2%", left: "16%", size: "10vw" },
          1280: { bottom: "2%", left: "15%", size: "10vw" },
          1366: { bottom: "2%", left: "16%", size: "10vw" },
          1440: { bottom: "2%", left: "18%", size: "10vw" },
        },
      },
      {
        src: "/img/slider/Vegetable/broccoli.png",
        alt: "Broccoli",
        bottom: "0%",
        right: "30%",
        size: 242,
        delay: "0.4s",
        fluid: {
          768: { bottom: "4%", right: "15%", size: "15vw" },
          1024: { bottom: "6%", right: "18%", size: "14vw" },
          1100: { bottom: "8%", right: "22%", size: "16vw" },
          1150: { bottom: "7%", right: "21%", size: "15vw" },
          1280: { bottom: "6%", right: "19%", size: "15vw" },
          1366: { bottom: "6%", right: "20%", size: "15vw" },
          1440: { bottom: "8%", right: "22%", size: "16vw" },
        },
      },
      {
        src: "/img/slider/Vegetable/Carrot.png",
        alt: "Carrot",
        bottom: "-10%",
        right: "-12%",
        width: 429,
        height: 479,
        delay: "0.4s",
        fluid: {
          768: { bottom: "0%", right: "0%", size: "24vw" },
          1024: { bottom: "0%", right: "0%", size: "24vw" },
          1100: { bottom: "0%", right: "0%", size: "26vw" },
          1150: { bottom: "0%", right: "0%", size: "24vw" },
          1280: { bottom: "0%", right: "0%", size: "24vw" },
          1366: { bottom: "0%", right: "0%", size: "25vw" },
          1440: { bottom: "0%", right: "0%", size: "26vw" },
        },
      },
      {
        src: "/img/slider/Vegetable/Bittermelon.png",
        alt: "BitterGourd",
        top: "-10%",
        left: "-1%",
        size: 334,
        delay: "0.15s",
        fluid: {
          768: { top: "0%", left: "0%", size: "18vw" },
          1024: { top: "0%", left: "0%", size: "18vw" },
          1100: { top: "0%", left: "0%", size: "20vw" },
          1150: { top: "0%", left: "0%", size: "19vw" },
          1280: { top: "0%", left: "0%", size: "19vw" },
          1366: { top: "0%", left: "0%", size: "20vw" },
          1440: { top: "0%", left: "0%", size: "21vw" },
        },
      },
      {
        src: "/img/slider/Vegetable/SlicedOnion.png",
        alt: "Onion Ring",
        top: "-40%",
        right: "20%",
        size: 418,
        delay: "0.3s",
        fluid: {
          768: { top: "0%", right: "8%", size: "22vw" },
          1024: { top: "0%", right: "11%", size: "20vw" },
          1100: { top: "0%", right: "14%", size: "22vw" },
          1150: { top: "0%", right: "13%", size: "21vw" },
          1280: { top: "0%", right: "11%", size: "21vw" },
          1366: { top: "0%", right: "12%", size: "21vw" },
          1440: { top: "0%", right: "14%", size: "22vw" },
        },
      },
      {
        src: "/img/slider/Vegetable/blur.png",
        alt: "Spinach",
        bottom: "-29%",
        left: "5%",
        size: 165,
        delay: "0.5s",
        fluid: {
          768: { bottom: "2%", left: "3%", size: "10vw" },
          1024: { bottom: "2%", left: "4%", size: "9vw" },
          1100: { bottom: "2%", left: "5%", size: "10vw" },
          1150: { bottom: "2%", left: "4%", size: "10vw" },
          1280: { bottom: "2%", left: "4%", size: "10vw" },
          1366: { bottom: "2%", left: "4%", size: "10vw" },
          1440: { bottom: "2%", left: "5%", size: "10vw" },
        },
      },
      {
        src: "/img/slider/Vegetable/Greenchilli.png",
        alt: "Green Chili",
        top: "15%",
        right: "12%",
        width: "320",
        height: "320",
        fluid: {
          768: { top: "20%", right: "9%", size: "7vw" },
          1024: { top: "18%", right: "11%", size: "6vw" },
          1100: { top: "18%", right: "13%", size: "7vw" },
          1150: { top: "18%", right: "12%", size: "6vw" },
          1280: { top: "18%", right: "11%", size: "6vw" },
          1366: { top: "18%", right: "12%", size: "6vw" },
          1440: { top: "18%", right: "13%", size: "6vw" },
        },
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
    mainImg: "/img/slider/main/HoneyBowl.png",
    floats: [
      {
        src: "/img/slider/Honey/bee.gif",
        alt: "Bee",
        top: "50%",
        left: "23%",
        size: 125,
        delay: "0s",
        fluid: {
          768: { top: "14%", left: "18%", size: "8vw" },
          1024: { top: "16%", left: "22%", size: "7vw" },
          1100: { top: "18%", left: "26%", size: "8vw" },
          1150: { top: "17%", left: "24%", size: "8vw" },
          1280: { top: "16%", left: "22%", size: "7vw" },
          1366: { top: "18%", left: "24%", size: "8vw" },
          1440: { top: "18%", left: "26%", size: "8vw" },
        },
      },
      {
        src: "/img/slider/Honey/3.png",
        alt: "Sunflower",
        top: "0%",
        right: "20%",
        size: 314,
        fluid: {
          768: { top: "2%", right: "8%", size: "20vw" },
          1024: { top: "2%", right: "10%", size: "18vw" },
          1100: { top: "2%", right: "12%", size: "20vw" },
          1150: { top: "2%", right: "12%", size: "20vw" },
          1280: { top: "2%", right: "11%", size: "20vw" },
          1366: { top: "2%", right: "12%", size: "20vw" },
          1440: { top: "2%", right: "14%", size: "22vw" },
        },
      },
      {
        src: "/img/slider/Honey/5.png",
        alt: "Honey Drop",
        top: "-5%",
        left: "0%",
        width: 537,
        height: 268,
        fluid: {
          768: { top: "0%", left: "0%", size: "28vw" },
          1024: { top: "-5%", left: "0%", size: "26vw" },
          1100: { top: "0%", left: "0%", size: "28vw" },
          1150: { top: "0%", left: "0%", size: "28vw" },
          1280: { top: "-10%", left: "0%", size: "28vw" },
          1366: { top: "-10%", left: "0%", size: "29vw" },
          1440: { top: "-12%", left: "0%", size: "30vw" },
        },
      },
      {
        src: "/img/slider/Honey/1.png",
        alt: "Honey Jar",
        bottom: "10%",
        right: "30%",
        width: 120,
        height: 88,
        fluid: {
          768: { bottom: "10%", right: "15%", size: "8vw" },
          1024: { bottom: "12%", right: "19%", size: "7vw" },
          1100: { bottom: "14%", right: "23%", size: "8vw" },
          1150: { bottom: "13%", right: "22%", size: "8vw" },
          1280: { bottom: "12%", right: "21%", size: "7vw" },
          1366: { bottom: "13%", right: "22%", size: "8vw" },
          1440: { bottom: "14%", right: "23%", size: "8vw" },
        },
      },
      {
        src: "/img/slider/Honey/2.png",
        alt: "Honey Jar",
        bottom: "-20%",
        right: "-8%",
        width: 369,
        height: 274,
        fluid: {
          768: { bottom: "0%", right: "0%", size: "24vw" },
          1024: { bottom: "0%", right: "0%", size: "22vw" },
          1100: { bottom: "0%", right: "0%", size: "24vw" },
          1150: { bottom: "0%", right: "0%", size: "24vw" },
          1280: { bottom: "0%", right: "0%", size: "24vw" },
          1366: { bottom: "0%", right: "0%", size: "25vw" },
          1440: { bottom: "0%", right: "0%", size: "26vw" },
        },
      },
      {
        src: "/img/slider/Honey/4.png",
        alt: "Honey Jar",
        top: "-5%",
        right: "-3%",
        size: 288,
        fluid: {
          768: { top: "2%", right: "0%", size: "18vw" },
          1024: { top: "2%", right: "1%", size: "16vw" },
          1100: { top: "2%", right: "1%", size: "18vw" },
          1150: { top: "2%", right: "1%", size: "18vw" },
          1280: { top: "2%", right: "1%", size: "17vw" },
          1366: { top: "2%", right: "1%", size: "18vw" },
          1440: { top: "2%", right: "1%", size: "19vw" },
        },
      },
    ],
    accent: "#d97706",
    tabIcon: "/img/slider/HoneyPad.png",
    tabLabel: "Pure Honey",
  },
  {
    id: 3,
    line1: "",
    line2: "Premium Spices",
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
    mainImg: "/img/slider/main/Red chilli.png",
    floats: [
      {
        src: "/img/slider/Spices/GaramMsala.png",
        alt: "GaramMasala",
        top: "-15%",
        left: "-4%",
        size: 410,
        fluid: {
          768: { top: "0%", left: "0%", size: "18vw" },
          1024: { top: "0%", left: "0%", size: "18vw" },
          1100: { top: "0%", left: "0%", size: "20vw" },
          1150: { top: "0%", left: "0%", size: "20vw" },
          1280: { top: "0%", left: "0%", size: "20vw" },
          1366: { top: "0%", left: "0%", size: "20vw" },
          1440: { top: "0%", left: "0%", size: "21vw" },
        },
      },
      {
        src: "/img/slider/Spices/DryChilli.png",
        alt: "Red Chili",
        top: "4%",
        right: "-3%",
        size: 511,
        fluid: {
          768: { bottom: "0%", right: "0%", size: "28vw" },
          1024: { bottom: "0%", right: "0%", size: "28vw" },
          1100: { bottom: "0%", right: "0%", size: "30vw" },
          1150: { bottom: "0%", right: "0%", size: "30vw" },
          1280: { bottom: "0%", right: "0%", size: "29vw" },
          1366: { bottom: "0%", right: "0%", size: "30vw" },
          1440: { bottom: "0%", right: "0%", size: "32vw" },
        },
      },
      {
        src: "/img/slider/Spices/Clove.png",
        alt: "Clove",
        bottom: "-12%",
        left: "15%",
        size: 278,
        fluid: {
          768: { bottom: "2%", left: "5%", size: "17vw" },
          1024: { bottom: "2%", left: "6%", size: "16vw" },
          1100: { bottom: "2%", left: "8%", size: "18vw" },
          1150: { bottom: "2%", left: "7%", size: "17vw" },
          1280: { bottom: "2%", left: "6%", size: "17vw" },
          1366: { bottom: "2%", left: "7%", size: "17vw" },
          1440: { bottom: "2%", left: "8%", size: "18vw" },
        },
      },
      {
        src: "/img/slider/Spices/RedChilli.png",
        alt: "Red Chili",
        bottom: "-5%",
        right: "30%",
        size: 287,
        fluid: {
          768: { bottom: "2%", right: "15%", size: "17vw" },
          1024: { bottom: "2%", right: "18%", size: "16vw" },
          1100: { bottom: "4%", right: "22%", size: "18vw" },
          1150: { bottom: "4%", right: "21%", size: "18vw" },
          1280: { bottom: "3%", right: "20%", size: "17vw" },
          1366: { bottom: "3%", right: "21%", size: "18vw" },
          1440: { bottom: "4%", right: "22%", size: "19vw" },
        },
      },
      {
        src: "/img/slider/Spices/Leaf.png",
        alt: "Tea Leaf",
        bottom: "-50%",
        right: "-12%",
        size: 560,
        fluid: {
          768: { bottom: "0%", right: "0%", size: "0px" },
          1024: { bottom: "0%", right: "0%", size: "0px" },
          1100: { bottom: "0%", right: "0%", size: "0px" },
          1150: { bottom: "0%", right: "0%", size: "0px" },
          1280: { bottom: "0%", right: "0%", size: "0px" },
          1366: { bottom: "0%", right: "0%", size: "0px" },
          1440: { bottom: "0%", right: "0%", size: "0px" },
        },
      },
      {
        src: "/img/slider/Spices/Turmeric.png",
        alt: "Turmeric",
        top: "-10%",
        right: "30%",
        size: 144,
        fluid: {
          768: { top: "6%", right: "4%", size: "10vw" },
          1024: { top: "6%", right: "5%", size: "9vw" },
          1100: { top: "6%", right: "6%", size: "10vw" },
          1150: { top: "5%", right: "5%", size: "10vw" },
          1280: { top: "5%", right: "5%", size: "9vw" },
          1366: { top: "5%", right: "6%", size: "10vw" },
          1440: { top: "6%", right: "6%", size: "10vw" },
        },
      },
      {
        src: "/img/slider/Spices/StarAnise.png",
        alt: "Star Anise",
        bottom: "-46%",
        left: "-8%",
        size: 287,
        fluid: {
          768: { bottom: "0%", left: "0%", size: "15vw" },
          1024: { bottom: "0%", left: "0%", size: "14vw" },
          1100: { bottom: "0%", left: "0%", size: "16vw" },
          1150: { bottom: "0%", left: "0%", size: "16vw" },
          1280: { bottom: "0%", left: "0%", size: "15vw" },
          1366: { bottom: "0%", left: "0%", size: "16vw" },
          1440: { bottom: "0%", left: "0%", size: "17vw" },
        },
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
    mainImg: "/img/slider/main/aloe vera.png",
    floats: [
      {
        src: "/img/slider/Herbs/amla.png",
        alt: "Amla",
        top: "18%",
        left: "26%",
        size: 236,
        delay: "0s",
        fluid: {
          768: { top: "10%", left: "12%", size: "15vw" },
          1024: { top: "12%", left: "15%", size: "14vw" },
          1100: { top: "14%", left: "18%", size: "15vw" },
          1150: { top: "12%", left: "18%", size: "15vw" },
          1280: { top: "12%", left: "17%", size: "15vw" },
          1366: { top: "13%", left: "18%", size: "15vw" },
          1440: { top: "14%", left: "19%", size: "16vw" },
        },
      },
      {
        src: "/img/slider/Herbs/PricklyPear.png",
        alt: "PricklyPear",
        top: "-5%",
        left: "-2%",
        size: 300,
        fluid: {
          768: { top: "0%", left: "0%", size: "18vw" },
          1024: { top: "0%", left: "0%", size: "17vw" },
          1100: { top: "0%", left: "0%", size: "18vw" },
          1150: { top: "0%", left: "0%", size: "18vw" },
          1280: { top: "0%", left: "0%", size: "18vw" },
          1366: { top: "0%", left: "0%", size: "18vw" },
          1440: { top: "0%", left: "0%", size: "19vw" },
        },
      },
      {
        src: "/img/slider/Herbs/Rose.png",
        alt: "Rose",
        bottom: "-20%",
        left: "8%",
        size: 300,
        fluid: {
          768: { bottom: "2%", left: "1%", size: "18vw" },
          1024: { bottom: "2%", left: "2%", size: "17vw" },
          1100: { bottom: "2%", left: "3%", size: "18vw" },
          1150: { bottom: "2%", left: "2%", size: "18vw" },
          1280: { bottom: "2%", left: "2%", size: "18vw" },
          1366: { bottom: "2%", left: "2%", size: "18vw" },
          1440: { bottom: "2%", left: "3%", size: "19vw" },
        },
      },
      {
        src: "/img/slider/Herbs/MoringaLeaf.png",
        alt: "MoringaLeaf",
        bottom: "-5%",
        right: "27%",
        size: 352,
        fluid: {
          768: { bottom: "2%", right: "14%", size: "22vw" },
          1024: { bottom: "2%", right: "17%", size: "20vw" },
          1100: { bottom: "4%", right: "20%", size: "22vw" },
          1150: { bottom: "3%", right: "19%", size: "22vw" },
          1280: { bottom: "2%", right: "18%", size: "22vw" },
          1366: { bottom: "2%", right: "19%", size: "22vw" },
          1440: { bottom: "4%", right: "21%", size: "23vw" },
        },
      },
      // {
      //   src: "/img/slider/Herbs/AloeveraBlur.png",
      //   alt: "Aloe Vera",
      //   bottom: "-20%",
      //   right: "-5%",
      //   size: 438,
      //   fluid: {
      //     768: { bottom: "0%", right: "0%", size: "28vw" },
      //     1024: { bottom: "0%", right: "0%", size: "26vw" },
      //     1100: { bottom: "0%", right: "0%", size: "28vw" },
      //     1150: { bottom: "0%", right: "0%", size: "28vw" },
      //     1280: { bottom: "0%", right: "0%", size: "27vw" },
      //     1366: { bottom: "0%", right: "0%", size: "28vw" },
      //     1440: { bottom: "0%", right: "0%", size: "29vw" },
      //   },
      // },
      {
        src: "/img/slider/Herbs/GreenFennel.png",
        alt: "GreenFennel",
        bottom: "-20%",
        right: "-9%",
        size: 438,
        fluid: {
          768: { bottom: "0%", right: "0%", size: "28vw" },
          1024: { bottom: "0%", right: "0%", size: "26vw" },
          1100: { bottom: "0%", right: "0%", size: "28vw" },
          1150: { bottom: "0%", right: "0%", size: "28vw" },
          1280: { bottom: "0%", right: "0%", size: "27vw" },
          1366: { bottom: "0%", right: "0%", size: "28vw" },
          1440: { bottom: "0%", right: "0%", size: "29vw" },
        },
      },
      {
        src: "/img/slider/Herbs/AloeveraBlur.png",
        alt: "Aloe Vera",
        top: "0",
        right: "12%",
        size: 329,
        fluid: {
          768: { top: "6%", right: "4%", size: "9vw" },
          1024: { top: "6%", right: "5%", size: "8vw" },
          1100: { top: "6%", right: "6%", size: "9vw" },
          1150: { top: "5%", right: "6%", size: "9vw" },
          1280: { top: "5%", right: "5%", size: "8vw" },
          1366: { top: "5%", right: "6%", size: "9vw" },
          1440: { top: "6%", right: "7%", size: "9vw" },
        },
      },
    ],
    accent: "#166534",
    tabIcon: "/img/slider/HerbalBasket.png",
    tabLabel: "Herbal Powder",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Pick the tightest breakpoint override that covers current viewport width.
// Now includes laptop breakpoints: 1150, 1280, 1366, 1440
// ─────────────────────────────────────────────────────────────────────────────
function getFluidOverride(item, viewportW) {
  if (!item.fluid) return null;
  // Sorted ascending — find the smallest bp that is >= viewportW
  const breakpoints = [768, 1024, 1100, 1150, 1280, 1366, 1440];
  const bp = breakpoints.find((b) => viewportW <= b);
  return bp ? (item.fluid[bp] ?? null) : null;
}

const CSS = `
  /* ─────────────────────────── BASE / DESKTOP (> 1440px, unchanged) ────────── */
  .hs-root {
    position: relative; width: 100%; min-height: 100vh;
    padding-top: var(--navbar-height, 80px);
    overflow: hidden; transition: background-color 0.65s ease;
    font-family: 'Roboto', sans-serif;
  }
  .hs-bg-gradient {
    position: absolute; inset: 0; opacity: 0;
    transition: opacity 0.65s ease; pointer-events: none; z-index: 0;
  }
  .hs-bg-gradient.visible { opacity: 1; }

  .hs-stage-outer {
    position: relative; z-index: 1; width: 100%;
    display: flex; justify-content: center; overflow: hidden;
  }
  .hs-stage {
    position: relative;
    width: ${BASE_STAGE_WIDTH}px; height: ${BASE_STAGE_HEIGHT}px;
    transform-origin: top center;
    transform: scale(var(--hs-stage-scale, 1));
  }
  .hs-watermark {
    position: absolute; top: 50%; left: 50%;
    transform: translate(-50%, -50%) scaleY(1.3) !important;
    font-size: clamp(60px, 8.2vw, 180px); font-weight: 700;
    letter-spacing: 0.06em; color: rgba(0,0,0,0.055);
    white-space: nowrap; pointer-events: none; z-index: 0;
    user-select: none; line-height: 1;
  }
  .hs-grid {
    position: relative; z-index: 1;
    display: grid; grid-template-columns: 1fr 3fr 1fr;
    align-items: center;
    min-height: clamp(600px, 66vh, 860px);
    margin-top: clamp(10px, 8vh, 200px);
    padding: clamp(20px, 2.6vw, 50px); gap: clamp(8px, 1vw, 24px);
  }
  .hs-left { margin-top: clamp(20px, 6.5vh, 80px); width: 100%; }
  .hs-title {
    font-size: clamp(34px, 3.8vw, 60px); font-weight: 800;
    line-height: 1.08; color: #111; margin: 0 0 14px;
  }
  .hs-subtitle { font-size: 15px; color: #777; line-height: 1.6; margin: 0; }
  .hs-center {
    display: flex; align-items: center; justify-content: center;
    height: clamp(380px, 50vh, 500px);
  }
  .hs-bowl-wrap {
    position: relative; z-index: 2;
    width: clamp(320px, 38vw, 500px); height: clamp(320px, 38vw, 500px);
    overflow: visible;
  }
  .hs-bowl-item { position: absolute; inset: 0; width: 100%; height: 100%; z-index: 20; }
  .hs-float { position: absolute; display: block; z-index: 3; pointer-events: none; }
  .hs-card {
    margin-bottom: clamp(60px, 18vh, 200px);
    max-width: clamp(280px, 28vw, 530px); justify-self: end;
  }
  .hs-card-title {
    font-size: clamp(34px, 3.8vw, 55px); font-weight: 700; color: #111; margin: 0 0 8px; line-height: 1.08;
  }
  .hs-card-desc { font-size: 15px; color: #666; margin: 0 0 18px; line-height: 1.55; }
  .hs-btn {
    display: inline-block; padding: 10px 22px; border-radius: 10px;
    color: #fff; font-size: 13.5px; font-weight: 600;
    text-decoration: none; letter-spacing: 0.01em;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }
  .hs-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 18px rgba(0,0,0,0.18); }
  .hs-tabs-row {
    position: relative; z-index: 1;
    display: flex; align-items: center; justify-content: center;
    gap: clamp(10px, 0.9vw, 18px); padding: clamp(16px, 2.4vw, 40px);
  }
  .hs-tab {
    display: flex; flex-direction: column; align-items: center; gap: 8px;
    background: rgba(255,255,255,0.92);
    border-radius: clamp(14px, 1vw, 18px);
    padding: clamp(10px, 0.9vw, 14px) clamp(14px, 1.1vw, 22px);
    cursor: pointer; border: 2.5px solid transparent;
    transition: border-color 0.3s, box-shadow 0.3s, transform 0.2s;
    width: clamp(132px, 8.7vw, 165px); box-shadow: 0 2px 10px rgba(0,0,0,0.06);
  }
  .hs-tab:hover { transform: translateY(-2px); box-shadow: 0 6px 18px rgba(0,0,0,0.1); }
  .hs-tab.active { box-shadow: 0 4px 18px rgba(0,0,0,0.12); }
  .hs-tab-label { font-size: 13px; font-weight: 700; color: #333; white-space: nowrap; }
  .hs-arrow {
    width: 42px; height: 42px; border-radius: 50%;
    background: rgba(255,255,255,0.92); border: 1.5px solid #ddd;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; font-size: 17px; color: #444;
    transition: background 0.2s, color 0.2s, border-color 0.2s, transform 0.15s;
    flex-shrink: 0; line-height: 1; padding: 0;
  }
  .hs-arrow:hover { background: #222; color: #fff; border-color: #222; transform: scale(1.08); }

  /* ─────────────────────────── Animations ─────────────────────────────────── */
  @keyframes hs-up-in {
    from { transform: translateY(55px); opacity: 0; }
    to   { transform: translateY(0); opacity: 1; }
  }
  @keyframes hs-down-in {
    from { transform: translateY(-55px); opacity: 0; }
    to   { transform: translateY(0); opacity: 1; }
  }
  @keyframes hs-fade-scale {
    from { transform: translate(-50%,-50%) scale(0.92); opacity: 0; }
    to   { transform: translate(-50%,-50%) scale(1); opacity: 1; }
  }
  @keyframes hs-cup-vertical-next { from { transform: translateY(100vh); } to { transform: translateY(0); } }
  @keyframes hs-cup-vertical-prev { from { transform: translateY(-100vh); } to { transform: translateY(0); } }
  @keyframes hs-cup-out-next { from { transform: translateY(0); } to { transform: translateY(-100vh); } }
  @keyframes hs-cup-out-prev { from { transform: translateY(0); } to { transform: translateY(100vh); } }
  @keyframes hs-float-in-bob {
    0%   { transform: scale(0.6) translateY(20px); opacity: 0; }
    60%  { transform: scale(1.05) translateY(-6px); opacity: 1; }
    100% { transform: scale(1) translateY(0); opacity: 1; }
  }
  @keyframes hs-bob {
    0%,100% { transform: translateY(0); }
    50%     { transform: translateY(-10px); }
  }
  .hs-anim-up         { animation: hs-up-in   0.6s cubic-bezier(0.22,1,0.36,1) both; }
  .hs-anim-down       { animation: hs-down-in 0.6s cubic-bezier(0.22,1,0.36,1) both; }
  .hs-anim-up-delay   { animation: hs-up-in   0.6s cubic-bezier(0.22,1,0.36,1) 0.12s both; }
  .hs-anim-down-delay { animation: hs-down-in 0.6s cubic-bezier(0.22,1,0.36,1) 0.12s both; }
  .hs-anim-card-up    { animation: hs-up-in   0.6s cubic-bezier(0.22,1,0.36,1) 0.18s both; }
  .hs-anim-card-down  { animation: hs-down-in 0.6s cubic-bezier(0.22,1,0.36,1) 0.18s both; }
  .hs-anim-watermark  { animation: hs-fade-scale 0.55s cubic-bezier(0.22,1,0.36,1) both; }
  .hs-anim-cup-next     { animation: hs-cup-vertical-next 1.2s cubic-bezier(0.22,1,0.36,1) both; }
  .hs-anim-cup-prev     { animation: hs-cup-vertical-prev 1.2s cubic-bezier(0.22,1,0.36,1) both; }
  .hs-anim-cup-out-next { animation: hs-cup-out-next 1.2s cubic-bezier(0.22,1,0.36,1) both; }
  .hs-anim-cup-out-prev { animation: hs-cup-out-prev 1.2s cubic-bezier(0.22,1,0.36,1) both; }

  @media (min-width: 2560px) {
    .hs-grid { min-height: 860px; grid-template-columns: 1.1fr 2.8fr; padding: 56px 72px; gap: 24px; }
    .hs-center { height: 680px; }
    .hs-bowl-wrap { width: 620px; height: 620px; }
    .hs-tabs-row { padding: 22px 72px 52px; }
    .hs-tab { width: 182px; }
    .hs-watermark { font-size: 190px; }
  }

  /* ════════════════════════════════════════════════════════════════════════════
     FLUID LAYOUT — now covers ≤ 1440px (was ≤ 1100px)
     Desktop stage only fires for > 1440px (true large desktops).

     ARCHITECTURE:
       .hs-fluid-stage      full-width positioning context
         [floats]           absolute, spread across full viewport width via vw
         .hs-fluid-main     3-col grid, absolute inset:0, z-index 4
           .hs-fluid-center bowl, z-index 5 — always above floats
       .hs-fluid-tabs       below stage, normal flow
  ════════════════════════════════════════════════════════════════════════════ */

  @media (max-width: 1440px) {
    .hs-stage-outer { display: none !important; }
    .hs-fluid       { display: flex !important; }
  }

  .hs-fluid {
    display: none;
    flex-direction: column;
    position: relative; z-index: 1;
    width: 100%;
    min-height: calc(100vh - var(--navbar-height, 80px));
    overflow: hidden;
  }

  .hs-fluid-stage {
    position: relative;
    width: 100%;
    flex: 1;
    overflow: hidden;
    min-height: clamp(380px, 60vh, 700px);
  }

  /* ── Laptop range: larger stage & bowl to use full viewport height ── */
  @media (min-width: 1101px) and (max-width: 1440px) {
    .hs-fluid-stage {
      min-height: clamp(520px, 68vh, 760px);
    }
    .hs-fluid-bowl-wrap {
      width:  clamp(300px, 28vw, 440px) !important;
      height: clamp(300px, 28vw, 440px) !important;
    }
    .hs-fluid-main {
      grid-template-columns: 1fr 2fr !important;
      padding: clamp(20px, 2.5vw, 50px) clamp(24px, 3.5vw, 60px) !important;
      gap: clamp(12px, 1.8vw, 28px) !important;
    }
    .hs-fluid-title {
       font-size: clamp(28px, 3.2vw, 52px) !important;
    }
    .hs-fluid-subtitle {
      font-size: clamp(12px, 1.1vw, 15px) !important;
    }
    .hs-fluid-card-title {
         font-size: clamp(28px, 3.2vw, 52px) !important;
 !important;
    }
    .hs-fluid-card-desc {
      font-size: clamp(11px, 1vw, 15px) !important;
    }
    .hs-fluid-btn {
      font-size: clamp(11px, 0.9vw, 14px) !important;
      padding: clamp(8px, 0.7vw, 11px) clamp(14px, 1.3vw, 22px) !important;
    }
    .hs-fluid-tabs {
      gap: clamp(10px, 1vw, 18px) !important;
      padding: clamp(14px, 1.8vw, 28px) clamp(20px, 3vw, 50px) !important;
    }
    .hs-fluid-tab {
      width: clamp(120px, 9vw, 155px) !important;
      padding: clamp(10px, 0.9vw, 14px) clamp(14px, 1.2vw, 22px) !important;
    }
    .hs-fluid-tab-label {
      font-size: clamp(11px, 0.9vw, 14px) !important;
    }
    .hs-fluid-watermark {
      font-size: clamp(40px, 7vw, 110px) !important;
    }
  }

  .hs-fluid-watermark {
    position: absolute; top: 42%; left: 50%;
    transform: translate(-50%, -50%) scaleY(1.3);
    font-size: clamp(24px, 7.5vw, 90px);
    font-weight: 700; letter-spacing: 0.03em;
    white-space: nowrap; pointer-events: none;
    user-select: none; line-height: 1; z-index: 0;
    animation: hs-fade-scale 0.55s cubic-bezier(0.22,1,0.36,1) both;
  }

  /*
   * Floats — absolute, relative to .hs-fluid-stage (full viewport width).
   * vw-based sizes spread proportionally. z-index 3 — below bowl (5), above watermark (0).
   */
  .hs-fluid-float {
    position: absolute;
    display: block;
    z-index: 3;
    pointer-events: none;
  }

  .hs-fluid-main {
    position: absolute;
    inset: 0;
    z-index: 4;
    display: grid;
    grid-template-columns: 1fr 2fr;
    align-items: center;
    gap: clamp(8px, 1.5vw, 20px);
    padding: clamp(14px, 2vw, 36px) clamp(18px, 3vw, 50px);
    pointer-events: none;
  }
  .hs-fluid-left,
  .hs-fluid-center,
  .hs-fluid-right { pointer-events: auto; }

  .hs-fluid-left {
    display: flex; flex-direction: column; gap: 10px;
    padding-top: clamp(6px, 2vh, 28px);
  }
  .hs-fluid-title {
    font-size: clamp(20px, 3.8vw, 50px);
    font-weight: 800; line-height: 1.08; color: #111; margin: 0;
  }
  .hs-fluid-subtitle {
    font-size: clamp(10px, 1.2vw, 14px);
    color: #777; line-height: 1.6; margin: 0;
  }

  .hs-fluid-center {
    display: flex; align-items: center; justify-content: center;
    position: relative;
  }
  .hs-fluid-bowl-wrap {
    position: relative;
    width:  clamp(160px, 26vw, 380px);
    height: clamp(160px, 26vw, 380px);
    overflow: visible;
    z-index: 5;
  }
  .hs-fluid-bowl-item {
    position: absolute; inset: 0;
    width: 100%; height: 100%; z-index: 5;
  }

  .hs-fluid-right {
    display: flex; flex-direction: column; align-items: flex-start; gap: 8px;
    padding-top: clamp(6px, 2vh, 28px);
    padding-bottom: clamp(16px, 3vh, 48px);
  }
  .hs-fluid-card-title {
    font-size: clamp(20px, 3.8vw, 50px);
    font-weight: 800; line-height: 1.08; color: #111; margin: 0;
  }
  .hs-fluid-card-desc {
    font-size: clamp(10px, 1.1vw, 14px);
    color: #666; margin: 0; line-height: 1.55;
  }
  .hs-fluid-btn {
    display: inline-block;
    padding: clamp(6px, 0.7vw, 10px) clamp(12px, 1.4vw, 20px);
    border-radius: 10px; color: #fff;
    font-size: clamp(10px, 0.95vw, 13px);
    font-weight: 600; text-decoration: none; letter-spacing: 0.01em;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
    white-space: nowrap;
  }
  .hs-fluid-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 18px rgba(0,0,0,0.18); }

  .hs-fluid-tabs {
    position: relative; z-index: 10;
    display: flex; align-items: center; justify-content: center;
    gap: clamp(5px, 0.9vw, 14px);
    padding: clamp(8px, 1.2vw, 20px) clamp(12px, 2vw, 36px) clamp(10px, 1.8vw, 24px);
    flex-wrap: nowrap;
  }
  .hs-fluid-tab {
    display: flex; flex-direction: column; align-items: center; gap: 5px;
    background: rgba(255,255,255,0.92);
    border-radius: clamp(10px, 0.9vw, 16px);
    padding: clamp(7px, 0.7vw, 12px) clamp(8px, 0.9vw, 18px);
    cursor: pointer; border: 2.5px solid transparent;
    transition: border-color 0.3s, box-shadow 0.3s, transform 0.2s;
    width: clamp(78px, 9vw, 145px);
    box-shadow: 0 2px 10px rgba(0,0,0,0.06); flex-shrink: 0;
  }
  .hs-fluid-tab:hover { transform: translateY(-2px); box-shadow: 0 6px 18px rgba(0,0,0,0.1); }
  .hs-fluid-tab.active { box-shadow: 0 4px 18px rgba(0,0,0,0.12); }
  .hs-fluid-tab-label {
    font-size: clamp(9px, 0.95vw, 13px);
    font-weight: 700; color: #333; white-space: nowrap; text-align: center;
  }
  .hs-fluid-arrow {
    width: clamp(28px, 2.8vw, 42px); height: clamp(28px, 2.8vw, 42px);
    border-radius: 50%;
    background: rgba(255,255,255,0.92); border: 1.5px solid #ddd;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; font-size: clamp(12px, 1.3vw, 17px); color: #444;
    transition: background 0.2s, color 0.2s, border-color 0.2s, transform 0.15s;
    flex-shrink: 0; line-height: 1; padding: 0;
  }
  .hs-fluid-arrow:hover { background: #222; color: #fff; border-color: #222; transform: scale(1.08); }

  /* ── 768px fine-tune ── */
  @media (max-width: 768px) {
    .hs-fluid-stage { min-height: clamp(300px, 55vw, 440px); }
    .hs-fluid-main {
      grid-template-columns: 1fr 1.8fr;
      gap: clamp(4px, 1.5vw, 12px);
      padding: 10px 12px;
    }
    .hs-fluid-bowl-wrap {
      width:  clamp(120px, 34vw, 220px) !important;
      height: clamp(120px, 34vw, 220px) !important;
    }
    .hs-fluid-tabs {
      overflow: hidden;
      justify-content: space-between;
      gap: clamp(8px, 2vw, 14px);
      padding: 12px 12px 18px;
      scrollbar-width: none;
    }
    .hs-fluid-tabs::-webkit-scrollbar { display: none; }
    .hs-fluid-tab {
      width: clamp(102px, 24vw, 148px);
      min-height: 88px;
      padding: 8px 10px;
      border-radius: 14px;
    }
    .hs-fluid-tab img {
      width: clamp(34px, 8vw, 54px);
      height: clamp(30px, 7vw, 48px);
    }
    .hs-fluid-tab-label { font-size: clamp(10px, 2.2vw, 14px); }
    .hs-fluid-arrow {
      width: clamp(34px, 8vw, 48px);
      height: 44px;
      border: 0;
      border-radius: 0;
      background: transparent;
      font-size: clamp(24px, 6vw, 34px);
      color: #111;
    }
    .hs-fluid-arrow:hover {
      background: transparent;
      color: #111;
      border-color: transparent;
      transform: translateX(0);
    }
  }

  @media (max-width: 575px) {
    .hs-fluid-stage {
      min-height: 650px;
    }
    .hs-fluid-main {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 14px;
      padding: 18px 16px;
      text-align: center;
    }
    .hs-fluid-left,
    .hs-fluid-right {
      align-items: center;
      padding-top: 0;
      padding-bottom: 0;
    }
    .hs-fluid-center {
      width: 100%;
    }
    .hs-fluid-bowl-wrap {
      width: clamp(170px, 58vw, 240px) !important;
      height: clamp(170px, 58vw, 240px) !important;
    }
    .hs-fluid-tabs {
      gap: 8px;
      padding: 10px 8px 16px;
    }
    .hs-fluid-tab {
      width: clamp(106px, 34vw, 142px);
      min-height: 82px;
      padding: 7px 8px;
    }
    .hs-fluid-arrow {
      width: 32px;
      font-size: 25px;
    }
  }
`;

export default function Hero1() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState("next");
  const [animKey, setAnimKey] = useState(0);
  const [stageScale, setStageScale] = useState(1);
  const [prevCup, setPrevCup] = useState(null);
  const [cupAnimating, setCupAnimating] = useState(false);
  const [viewportW, setViewportW] = useState(1440);

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
    const update = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setViewportW(w);
      // Desktop stage only activates above 1440px — fluid handles everything ≤ 1440px
      if (w > 1440) {
        const ws = w / BASE_STAGE_WIDTH;
        const hs = (h - 80) / BASE_STAGE_HEIGHT;
        setStageScale(Math.max(0.55, Math.min(ws, hs)));
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const stageHeight = Math.ceil(BASE_STAGE_HEIGHT * stageScale);

  // Build fluid float styles using per-breakpoint overrides
  const fluidFloats = slide.floats.map((item) => {
    const ov = getFluidOverride(item, viewportW);
    if (!ov) {
      return {
        ...item,
        _top: item.top ?? "auto",
        _left: item.left ?? "auto",
        _right: item.right ?? "auto",
        _bottom: item.bottom ?? "auto",
        _w: normalizeDimension(item.width ?? item.size),
        _h: normalizeDimension(item.height ?? item.size),
      };
    }
    const sz = ov.size ?? "10vw";
    return {
      ...item,
      _top: ov.top ?? "auto",
      _left: ov.left ?? "auto",
      _right: ov.right ?? "auto",
      _bottom: ov.bottom ?? "auto",
      _w: sz,
      _h: sz,
    };
  });

  const getVisibleTabs = (fluid) => {
    const visibleCount = !fluid
      ? SLIDES.length
      : viewportW <= 575
        ? 2
        : viewportW <= 768
          ? 3
          : SLIDES.length;

    if (visibleCount >= SLIDES.length) {
      return SLIDES.map((slide, index) => ({ slide, index }));
    }

    const startOffset = visibleCount === 2 ? 0 : -Math.floor(visibleCount / 2);

    return Array.from({ length: visibleCount }, (_, itemIndex) => {
      const index =
        (current + startOffset + itemIndex + SLIDES.length) % SLIDES.length;
      return { slide: SLIDES[index], index };
    });
  };

  const Tabs = ({ fluid }) => {
    const visibleTabs = getVisibleTabs(fluid);

    return (
      <div className={fluid ? "hs-fluid-tabs" : "hs-tabs-row"}>
        <button
          className={fluid ? "hs-fluid-arrow" : "hs-arrow"}
          onClick={() => navigate("prev")}
          aria-label="Previous"
        >
          &#8592;
        </button>
        {visibleTabs.map(({ slide: s, index: i }) => (
          <div
            key={s.id}
            className={`${fluid ? "hs-fluid-tab" : "hs-tab"}${i === current ? " active" : ""}`}
            style={i === current ? { borderColor: s.accent } : {}}
            onClick={() => goTo(i)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && goTo(i)}
          >
            <Image
              src={s.tabIcon}
              alt={s.tabLabel}
              width={fluid ? 30 : 48}
              height={fluid ? 30 : 48}
              style={{ objectFit: "contain" }}
            />
            <span
              className={fluid ? "hs-fluid-tab-label" : "hs-tab-label"}
              style={i === current ? { color: s.accent } : {}}
            >
              {s.tabLabel}
            </span>
          </div>
        ))}
        <button
          className={fluid ? "hs-fluid-arrow" : "hs-arrow"}
          onClick={() => navigate("next")}
          aria-label="Next"
        >
          &#8594;
        </button>
      </div>
    );
  };

  return (
    <>
      <style>{CSS}</style>
      <section className="hs-root" style={{ backgroundColor: slide.bgColor }}>
        <div
          className="hs-bg-gradient visible"
          style={{
            background: `linear-gradient(155deg, ${slide.bgColor} 30%, ${slide.gradientEnd} 100%)`,
          }}
        />

        {/* ══════════════════════════════════════════════
            DESKTOP — scaled-stage layout (> 1440px only)
        ════════════════════════════════════════════════ */}
        <div className="hs-stage-outer" style={{ height: stageHeight }}>
          <div
            key={`stage-${animKey}`}
            className="hs-stage"
            style={{ "--hs-stage-scale": stageScale }}
          >
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

            <div className="hs-grid">
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
                <div className="btn-wrapper animated">
                  <Link
                    href="/products/acaiberry-powder"
                    className="theme-btn-1 btn btn-effect-1 text-uppercase"
                    style={{ backgroundColor: slide.accent }}
                  >
                    View more details
                  </Link>
                </div>
              </div>

              <div className="hs-center">
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
                        alt=""
                        fill
                        sizes="500px"
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
                      alt={`${slide.line1} ${slide.line2}`}
                      fill
                      sizes="500px"
                      style={{ objectFit: "contain" }}
                      priority
                    />
                  </div>
                </div>
                {slide.floats.map((item, i) => {
                  const fw = normalizeDimension(item.width ?? item.size);
                  const fh = normalizeDimension(item.height ?? item.size);
                  return (
                    <div
                      key={`fl-${animKey}-${i}`}
                      className="hs-float"
                      style={{
                        top: item.top ?? "auto",
                        left: item.left ?? "auto",
                        right: item.right ?? "auto",
                        bottom: item.bottom ?? "auto",
                        width: fw,
                        height: fh,
                        animation: `hs-float-in-bob 0.7s cubic-bezier(0.22,1,0.36,1) ${item.delay || "0s"} both,
                                    hs-bob 3.5s ease-in-out ${item.delay || "0s"} infinite`,
                      }}
                    >
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        sizes="140px"
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <Tabs fluid={false} />
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            FLUID — ≤ 1440px (tablet, laptop, small desktop)

            Float positions are vw-based, spreading elements to
            screen edges at each breakpoint. The bowl stays centered
            and clear. Breakpoints: 768 | 1024 | 1100 | 1150 | 1280 | 1366 | 1440
        ════════════════════════════════════════════════ */}
        <div className="hs-fluid">
          <div className="hs-fluid-stage">
            {/* Watermark */}
            <div
              key={`fwm-${animKey}`}
              className="hs-fluid-watermark"
              style={{
                backgroundImage: watermarkGradient,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                letterSpacing: "-3px",
              }}
            >
              {slide.bgText}
            </div>

            {/* ── Floats — spread across full stage width ── */}
            {fluidFloats.map((item, i) => {
              const sz = item._w;
              if (sz === "0px" || sz === 0 || sz === "0") return null;
              return (
                <div
                  key={`ffl-${animKey}-${i}`}
                  className="hs-fluid-float"
                  style={{
                    ...(item._top !== "auto" ? { top: item._top } : {}),
                    ...(item._left !== "auto" ? { left: item._left } : {}),
                    ...(item._right !== "auto" ? { right: item._right } : {}),
                    ...(item._bottom !== "auto"
                      ? { bottom: item._bottom }
                      : {}),
                    width: sz,
                    height: item._h,
                    animation: `hs-float-in-bob 0.7s cubic-bezier(0.22,1,0.36,1) ${item.delay || "0s"} both,
                                hs-bob 3.5s ease-in-out ${item.delay || "0s"} infinite`,
                  }}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="20vw"
                    style={{ objectFit: "contain" }}
                  />
                </div>
              );
            })}

            {/* Content grid — above floats */}
            <div className="hs-fluid-main">
              {/* LEFT */}
              <div className="hs-fluid-left">
                <h1
                  key={`ftitle-${animKey}`}
                  className={`hs-fluid-title ${titleAnim}`}
                >
                  {slide.line1}
                  <br />
                  {slide.line2}
                </h1>
                <p
                  key={`fsub-${animKey}`}
                  className={`hs-fluid-subtitle ${subtitleAnim}`}
                >
                  {slide.subtitle}
                </p>
                <div className="btn-wrapper animated">
                  <Link
                    href="/products/acaiberry-powder"
                    className="theme-btn-1 btn btn-effect-1 text-uppercase"
                    style={{ backgroundColor: slide.accent }}
                  >
                    View more details
                  </Link>
                </div>
              </div>

              {/* CENTER — bowl only; floats escape this container */}
              <div className="hs-fluid-center">
                <div className="hs-fluid-bowl-wrap">
                  {cupAnimating && prevCup !== null && (
                    <div
                      className={`hs-fluid-bowl-item ${cupOutAnim}`}
                      onAnimationEnd={() => {
                        setCupAnimating(false);
                        setPrevCup(null);
                      }}
                    >
                      <Image
                        src={SLIDES[prevCup].mainImg}
                        alt=""
                        fill
                        sizes="28vw"
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                  )}
                  <div
                    key={`fcup-${animKey}-${current}`}
                    className={`hs-fluid-bowl-item ${cupAnimating ? cupInAnim : ""}`}
                  >
                    <Image
                      src={slide.mainImg}
                      alt={`${slide.line1} ${slide.line2}`}
                      fill
                      sizes="28vw"
                      style={{ objectFit: "contain" }}
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /hs-fluid-stage */}

          <Tabs fluid={true} />
        </div>
      </section>
    </>
  );
}
