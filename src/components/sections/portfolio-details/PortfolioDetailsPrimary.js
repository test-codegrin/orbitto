"use client";

import getAllPortfolios from "@/libs/getAllPortfolios";
import getAllTestimonials from "@/libs/getAllTestimonials";
import Image from "next/image";
import { useParams } from "next/navigation";
import TestimonialCard from "@/components/shared/cards/TestimonialCard";

const PortfolioDetailsPrimary = () => {
  const { id: currentId } = useParams();
  const currentPortfolio = getAllPortfolios()?.find(
    ({ id }) => id === parseInt(currentId)
  );
  const testimonials = getAllTestimonials()?.filter(
    ({ id }) => id > 0 && id < 3
  );
  const { imgLarge } = currentPortfolio ? currentPortfolio : {};
  return (
    <div className="ltn__page-details-area ltn__service-details-area mb-105">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="ltn__page-details-inner ltn__service-details-inner">
              <div className="ltn__blog-img">
                <Image src={imgLarge} alt="Image" width={800} height={520} />
              </div>
              <p>
                {" "}
                <span className="ltn__first-letter">O</span>ur portfolio
                highlights how Orbitto ingredients support food, beverage, and
                wellness applications with dependable taste, color, and
                formulation performance.
              </p>
              <p>
                We work with fruit powders, vegetable powders, spices, honey,
                and herbal ingredients that can be used across instant mixes,
                bakery items, beverages, confectionery, nutraceuticals, and
                other value-added products.{" "}
              </p>
              <div className="row">
                {testimonials?.map((testimonial, idx) => (
                  <div key={idx} className="col-lg-6">
                    <TestimonialCard testimonial={testimonial} />
                  </div>
                ))}
              </div>

              <p>
                Each product is chosen with practical use in mind, helping
                manufacturers maintain flavor impact, visual appeal, and clean
                ingredient positioning across production batches.{" "}
              </p>
              <div className="row">
                <div className="col-lg-6">
                  <Image
                    src="/img/service/33.jpg"
                    alt="image"
                    width={600}
                    height={600}
                  />
                  <label>Ingredient preparation and product application.</label>
                </div>
                <div className="col-lg-6">
                  <Image
                    src="/img/service/34.jpg"
                    alt="image"
                    width={600}
                    height={600}
                  />
                </div>
              </div>
              <p>
                Our team supports customers with product selection, packaging
                options, and dispatch coordination so every order is aligned
                with its intended market and application.{" "}
              </p>
              <p>
                Whether you need powders for beverages, seasonings for savory
                foods, honey-based ingredients, or herbal formulations, Orbitto
                helps deliver consistent ingredients for repeatable results.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioDetailsPrimary;
