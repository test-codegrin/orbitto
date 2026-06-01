import Image from "next/image";
import React from "react";

const applicationSections = [
  {
    title: "Application of Fruit Powder",
    subtitle: "Add Real Fruit Goodness to Every Application",
    items: [
      {
        title: "Beverages",
        image: "/img/applications/Beverages.webp",
      },
      {
        title: "Smoothies & Shakes",
        image: "/img/applications/Beverages.webp",
      },
      {
        title: "Bakery Items",
        image: "/img/applications/Bakery.webp",
      },
      {
        title: "Desserts",
        image: "/img/applications/Desserts.webp",
      },
      {
        title: "Ice Creams",
        image: "/img/applications/IceCreams.webp",
      },
      {
        title: "Confectionery",
        image: "/img/applications/Confectionery.webp",
      },
      {
        title: "Snacks",
        image: "/img/applications/SavorySnacks.webp",
      },
      {
        title: "Breakfast Items",
        image: "/img/applications/Breakfast.webp",
      },
    ],
  },
  {
    title: "Application of Vegetable Powder",
    subtitle: "Natural Vegetable Nutrition for Savory Food Applications",
    items: [
      {
        title: "Soups",
        image: "/img/applications/Soups.webp",
      },
      {
        title: "Sauces",
        image: "/img/applications/Sauces.webp",
      },
      {
        title: "Seasonings",
        image: "/img/applications/Seasonings.webp",
      },
      {
        title: "Ready Meals",
        image: "/img/applications/Meals.webp",
      },
      {
        title: "Instant Mixes",
        image: "/img/applications/InstantMixes.webp",
      },
      {
        title: "Noodles & Pasta",
        image: "/img/applications/NoodlesPasta.webp",
      },
      {
        title: "Savory Snacks",
        image: "/img/applications/SavorySnacks.webp",
      },
      {
        title: "Health Foods",
        image: "/img/applications/HealthFoods.webp",
      },
    ],
  },
  {
    title: "Application of Honey",
    subtitle: "Natural Sweetness for Everyday Food and Beverage Products",
    items: [
      {
        title: "Beverages",
        image: "/img/applications/HoneyBeverages.webp",
      },
      {
        title: "Bakery Items",
        image: "/img/applications/HoneyBakery.webp",
      },
      {
        title: "Confectionery",
        image: "/img/applications/HoneyConfectionery.webp",
      },
      {
        title: "Breakfast Items",
        image: "/img/applications/HoneyBreakfast.webp",
      },
      {
        title: "Dairy Desserts",
        image: "/img/applications/HoneyDairyDesserts.webp",
      },
      {
        title: "Sauces & Dressings",
        image: "/img/applications/HoneySaucesDressings.webp",
      },
      {
        title: "Nutraceuticals",
        image: "/img/applications/HoneyNutraceuticals.webp",
      },
      {
        title: "Ready Mixes",
        image: "/img/applications/HoneyReadyMixes.webp",
      },
    ],
  },
  {
    title: "Application of Spices",
    subtitle: "Bold Flavor and Aroma for Processed Food Applications",
    items: [
      {
        title: "Spice Blends",
        image: "/img/applications/SpiceBlends.webp",
      },
      {
        title: "Seasonings",
        image: "/img/applications/SpiceSeasonings.webp",
      },
      {
        title: "Savory Snacks",
        image: "/img/applications/SpiceSavorySnacks.webp",
      },
      {
        title: "Sauces",
        image: "/img/applications/SpiceSauces.webp",
      },
      {
        title: "Marinades",
        image: "/img/applications/SpiceMarinades.webp",
      },
      {
        title: "Pickles",
        image: "/img/applications/SpicePickles.webp",
      },
      {
        title: "Instant Noodles",
        image: "/img/applications/SpiceInstantNoodles.webp",
      },
      {
        title: "Ready Meals",
        image: "/img/applications/SpiceReadyMeals.webp",
      },
    ],
  },
  {
    title: "Application of Herbal Powder",
    subtitle: "Clean Botanical Ingredients for Wellness-Led Products",
    items: [
      {
        title: "Herbal Tea",
        image: "/img/applications/HerbalTea.webp",
      },
      {
        title: "Functional Drinks",
        image: "/img/applications/HerbalFunctionalDrinks.webp",
      },
      {
        title: "Supplements",
        image: "/img/applications/HerbalSupplements.webp",
      },
      {
        title: "Wellness Mixes",
        image: "/img/applications/HerbalWellnessMixes.webp",
      },
      {
        title: "Health Foods",
        image: "/img/applications/HerbalHealthFoods.webp",
      },
      {
        title: "Dairy Products",
        image: "/img/applications/HerbalDairyProducts.webp",
      },
      {
        title: "Bakery Items",
        image: "/img/applications/HerbalBakeryItems.webp",
      },
      {
        title: "Nutraceuticals",
        image: "/img/applications/HerbalNutraceuticals.webp",
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

