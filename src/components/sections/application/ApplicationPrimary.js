import Image from "next/image";
import React from "react";

const applicationSections = [
  {
    title: "Application of Fruit Powder",
    subtitle: "Add Real Fruit Goodness to Every Application",
    items: [
      {
        title: "Beverages",
        image: "/img/applications/Beverages.png",
      },
      {
        title: "Smoothies & Shakes",
        image: "/img/applications/Beverages.png",
      },
      {
        title: "Bakery Items",
        image: "/img/applications/Bakery.jpg",
      },
      {
        title: "Desserts",
        image: "/img/applications/Desserts.jpg",
      },
      {
        title: "Ice Creams",
        image: "/img/applications/IceCreams.jpg",
      },
      {
        title: "Confectionery",
        image: "/img/applications/Confectionery.jpg",
      },
      {
        title: "Snacks",
        image: "/img/applications/SavorySnacks.jpg",
      },
      {
        title: "Breakfast Items",
        image: "/img/applications/Breakfast.jpg",
      },
    ],
  },
  {
    title: "Application of Vegetable Powder",
    subtitle: "Natural Vegetable Nutrition for Savory Food Applications",
    items: [
      {
        title: "Soups",
        image: "/img/applications/Soups.jpg",
      },
      {
        title: "Sauces",
        image: "/img/applications/Sauces.jpg",
      },
      {
        title: "Seasonings",
        image: "/img/applications/Seasonings.jpg",
      },
      {
        title: "Ready Meals",
        image: "/img/applications/Meals.jpg",
      },
      {
        title: "Instant Mixes",
        image: "/img/applications/InstantMixes.jpg",
      },
      {
        title: "Noodles & Pasta",
        image: "/img/applications/NoodlesPasta.jpg",
      },
      {
        title: "Savory Snacks",
        image: "/img/applications/SavorySnacks.jpg",
      },
      {
        title: "Health Foods",
        image: "/img/applications/HealthFoods.jpg",
      },
    ],
  },
  {
    title: "Application of Honey",
    subtitle: "Natural Sweetness for Everyday Food and Beverage Products",
    items: [
      {
        title: "Beverages",
        image: "/img/applications/HoneyBeverages.jpg",
      },
      {
        title: "Bakery Items",
        image: "/img/applications/HoneyBakery.jpg",
      },
      {
        title: "Confectionery",
        image: "/img/applications/HoneyConfectionery.jpg",
      },
      {
        title: "Breakfast Items",
        image: "/img/applications/HoneyBreakfast.jpg",
      },
      {
        title: "Dairy Desserts",
        image: "/img/applications/HoneyDairyDesserts.jpg",
      },
      {
        title: "Sauces & Dressings",
        image: "/img/applications/HoneySaucesDressings.jpg",
      },
      {
        title: "Nutraceuticals",
        image: "/img/applications/HoneyNutraceuticals.jpg",
      },
      {
        title: "Ready Mixes",
        image: "/img/applications/HoneyReadyMixes.jpg",
      },
    ],
  },
  {
    title: "Application of Spices",
    subtitle: "Bold Flavor and Aroma for Processed Food Applications",
    items: [
      {
        title: "Spice Blends",
        image: "/img/applications/SpiceBlends.jpg",
      },
      {
        title: "Seasonings",
        image: "/img/applications/SpiceSeasonings.jpg",
      },
      {
        title: "Savory Snacks",
        image: "/img/applications/SpiceSavorySnacks.jpg",
      },
      {
        title: "Sauces",
        image: "/img/applications/SpiceSauces.jpg",
      },
      {
        title: "Marinades",
        image: "/img/applications/SpiceMarinades.jpg",
      },
      {
        title: "Pickles",
        image: "/img/applications/SpicePickles.jpg",
      },
      {
        title: "Instant Noodles",
        image: "/img/applications/SpiceInstantNoodles.jpg",
      },
      {
        title: "Ready Meals",
        image: "/img/applications/SpiceReadyMeals.jpg",
      },
    ],
  },
  {
    title: "Application of Herbal Powder",
    subtitle: "Clean Botanical Ingredients for Wellness-Led Products",
    items: [
      {
        title: "Herbal Tea",
        image: "/img/applications/HerbalTea.jpg",
      },
      {
        title: "Functional Drinks",
        image: "/img/applications/HerbalFunctionalDrinks.jpg",
      },
      {
        title: "Supplements",
        image: "/img/applications/HerbalSupplements.jpg",
      },
      {
        title: "Wellness Mixes",
        image: "/img/applications/HerbalWellnessMixes.jpg",
      },
      {
        title: "Health Foods",
        image: "/img/applications/HerbalHealthFoods.jpg",
      },
      {
        title: "Dairy Products",
        image: "/img/applications/HerbalDairyProducts.jpg",
      },
      {
        title: "Bakery Items",
        image: "/img/applications/HerbalBakeryItems.jpg",
      },
      {
        title: "Nutraceuticals",
        image: "/img/applications/HerbalNutraceuticals.jpg",
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
