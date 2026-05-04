import Image from "next/image";
import Link from "next/link";

const About = () => {
  return (
    <section className="home-about">
      {/* <div className="home-about__bg-text">ABOUT</div> */}
      <div className="home-about__container">
        <div className="home-about__content">
          <h2>About our Products</h2>
          <p>
            At Orbitto, we manufacture high-quality food powders including fruit
            powder, vegetable powder, dairy ingredients, herbal blends, and
            premium spice mixes. Using advanced low-temperature spray drying and
            dehydration technology, we ensure maximum retention of natural
            flavor, color, and nutritional value.
          </p>
          <p>
            We source fresh ingredients from trusted farms and process every
            batch with precision to deliver consistent quality and performance.
            Our dehydrated powders and spice blends are ideal for food
            manufacturing, culinary applications, and health products.
          </p>
          <p>
            With a strong focus on purity and innovation, Orbitto products are
            free from unnecessary additives and made to meet the highest quality
            standards. Whether you need reliable ingredients or authentic taste,
            Orbitto delivers natural, clean, and high-performance food
            solutions.
          </p>
          <Link href="/products/1" className="home-about__btn">
            View more details
          </Link>
        </div>

        <div className="home-about__image-wrap">
          <Image
            src="/img/hero/about.png"
            alt="Orbitto premium fruit powder"
            width={760}
            height={520}
            className="home-about__image"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
