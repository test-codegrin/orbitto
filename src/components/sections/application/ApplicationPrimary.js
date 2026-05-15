import Image from "next/image";
import React from "react";

const applicationSections = [
  {
    title: "Application of Fruit Powder",
    subtitle: "Add Real Fruit Goodness to Every Application",
    items: [
      {
        title: "Beverages",
        image: "/img/banner/15.png",
        imagePosition: "72% center",
      },
      {
        title: "Smoothies & Shakes",
        image: "/img/applications/smoothies-shakes.jpg",
      },
      {
        title: "Bakery Items",
        image: "/img/applications/desserts.jpg",
      },
      {
        title: "Desserts",
        image: "/img/applications/bakery-items.jpg",
      },
      {
        title: "Ice Creams",
        image: "/img/applications/ice-creams.jpg",
      },
      {
        title: "Confectionery",
        image: "/img/applications/confectionery.jpg",
      },
      {
        title: "Snacks",
        image: "/img/applications/snacks.jpg",
      },
      {
        title: "Breakfast Items",
        image: "/img/applications/breakfast-items.jpg",
      },
    ],
  },
  {
    title: "Application of Vegetable Powder",
    subtitle: "Natural Vegetable Nutrition for Savory Food Applications",
    items: [
      {
        title: "Soups",
        image: "/img/slider/main/vegetable_powder.png",
      },
      {
        title: "Sauces",
        image: "/img/service/1.jpg",
      },
      {
        title: "Seasonings",
        image: "/img/applications/snacks.jpg",
      },
      {
        title: "Ready Meals",
        image: "/img/img-slide/11.jpg",
      },
      {
        title: "Instant Mixes",
        image: "/img/product/Vegetable/Tomato.png",
      },
      {
        title: "Noodles & Pasta",
        image: "/img/applications/bakery-items.jpg",
      },
      {
        title: "Savory Snacks",
        image: "/img/applications/snacks.jpg",
      },
      {
        title: "Health Foods",
        image: "/img/slider/main/brocili.png",
      },
    ],
  },
  {
    title: "Application of Honey",
    subtitle: "Natural Sweetness for Everyday Food and Beverage Products",
    items: [
      {
        title: "Beverages",
        image: "/img/slider/main/honey.png",
      },
      {
        title: "Bakery Items",
        image: "/img/applications/desserts.jpg",
      },
      {
        title: "Confectionery",
        image: "/img/applications/confectionery.jpg",
      },
      {
        title: "Breakfast Items",
        image: "/img/applications/breakfast-items.jpg",
      },
      {
        title: "Dairy Desserts",
        image: "/img/applications/ice-creams.jpg",
      },
      {
        title: "Sauces & Dressings",
        image: "/img/banner/11.png",
      },
      {
        title: "Nutraceuticals",
        image: "/img/slider/main/HoneyBowl.png",
      },
      {
        title: "Ready Mixes",
        image: "/img/banner/14.png",
      },
    ],
  },
  {
    title: "Application of Spices",
    subtitle: "Bold Flavor and Aroma for Processed Food Applications",
    items: [
      {
        title: "Spice Blends",
        image: "/img/slider/main/spices.png",
      },
      {
        title: "Seasonings",
        image: "/img/slider/main/Red chilli.png",
      },
      {
        title: "Savory Snacks",
        image: "/img/applications/snacks.jpg",
      },
      {
        title: "Sauces",
        image: "/img/product/Spices/Redchilli.png",
      },
      {
        title: "Marinades",
        image: "/img/product/Spices/Garammasala.png",
      },
      {
        title: "Pickles",
        image: "/img/product/Spices/Turmeric.png",
      },
      {
        title: "Instant Noodles",
        image: "/img/applications/bakery-items.jpg",
      },
      {
        title: "Ready Meals",
        image: "/img/img-slide/11.jpg",
      },
    ],
  },
  {
    title: "Application of Herbal Powder",
    subtitle: "Clean Botanical Ingredients for Wellness-Led Products",
    items: [
      {
        title: "Herbal Tea",
        image: "/img/slider/main/natural_herbs.png",
      },
      {
        title: "Functional Drinks",
        image: "/img/banner/13.png",
      },
      {
        title: "Supplements",
        image: "/img/product/Herbs/Amla.png",
      },
      {
        title: "Wellness Mixes",
        image: "/img/slider/main/aloe vera.png",
      },
      {
        title: "Health Foods",
        image: "/img/applications/breakfast-items.jpg",
      },
      {
        title: "Dairy Products",
        image: "/img/applications/ice-creams.jpg",
      },
      {
        title: "Bakery Items",
        image: "/img/applications/desserts.jpg",
      },
      {
        title: "Nutraceuticals",
        image: "/img/product/Herbs/Moringaleaf.png",
      },
    ],
  },
];

const ApplicationPrimary = () => {
  return (
    <section className="application-page-area">
      <div className="application-page-container">
        {applicationSections.map(({ title, subtitle, items }) => (
          <div className="application-section" key={title}>
            <div className="application-page-heading text-center">
              <h2>{title}</h2>
              <p>{subtitle}</p>
            </div>

            <div className="application-card-grid">
              {items.map(({ title: itemTitle, image, imagePosition }) => (
                <article className="application-card" key={`${title}-${itemTitle}`}>
                  <Image
                    src={image}
                    alt={itemTitle}
                    fill
                    sizes="(max-width: 575px) 100vw, (max-width: 991px) 50vw, 20vw"
                    className="application-card__image"
                    style={{ objectPosition: imagePosition || "center" }}
                  />
                  <div className="application-card__label application-card__label--effect">
                    <h3>{itemTitle}</h3>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ApplicationPrimary;
