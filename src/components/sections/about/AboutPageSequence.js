import Image from "next/image";
import Link from "next/link";

const coreValues = [
  {
    icon: "far fa-gem",
    title: "Purity",
    desc: "Natural, safe, and carefully processed ingredients with no compromise on quality.",
    tone: "lavender",
  },
  {
    icon: "fas fa-random",
    title: "Versatility",
    desc: "Solutions that support food, beverage, nutraceutical, and wellness applications.",
    tone: "peach",
  },
  {
    icon: "fas fa-cogs",
    title: "Reliability",
    desc: "Long-term partnerships built on consistency, timely delivery, and practical support.",
    tone: "mint",
  },
];

const missionVision = [
  {
    icon: "fas fa-bullseye",
    title: "Mission",
    desc: "To enhance everyday nutrition by producing dependable natural powders and ingredients that combine purity, consistency, and modern food-processing standards.",
  },
  {
    icon: "fas fa-atom",
    title: "Vision",
    desc: "To become a trusted global partner for food and beverage brands through innovation, integrity, and a passion for enriching lives worldwide.",
  },
];

const fortes = [
  "100% vegetarian, non-GMO, natural and safe products",
  "Traceability across the supply chain",
  "Authentic and natural raw materials",
  "A wide product range for evolving customer needs",
  "Consistency in taste, profile, and flavor delivery",
];

const AboutPageSequence = () => {
  return (
    <div className="about-sequence">
      <section className="about-sequence__section about-intro">
        <div className="about-sequence__container about-intro__grid">
          <div className="about-intro__image">
            <Image
              src="/img/hero/about.png"
              alt="Orbitto premium fruit powder product"
              width={640}
              height={430}
              sizes="(max-width: 991px) 100vw, 44vw"
            />
          </div>

          <div className="about-intro__content">
            <span className="about-sequence__eyebrow">About Us</span>
            <h2>ORBITTO INTERNATIONAL</h2>
            <p>
              Orbitto International is focused on natural fruit, vegetable,
              herbal, spice, and specialty powders for modern food, beverage,
              wellness, and manufacturing needs.
            </p>
            <p>
              With a strong focus on purity, consistency, and client support,
              we help brands source dependable ingredients that are practical
              for production and aligned with global quality expectations.
            </p>
          </div>
        </div>
      </section>

      <section className="about-sequence__section about-values">
        <div className="about-sequence__container about-values__grid">
          <div className="about-values__content">
            <span className="about-sequence__eyebrow">Core Values</span>
            <h2>OUR WORK IS GUIDED BY THREE CORE VALUES:</h2>
            <p>
              Our portfolio spans fruit powders, vegetable powders, spices,
              herbs, honey, and customized ingredient solutions tailored to
              evolving global needs.
            </p>
            <p>
              Our commitment is simple: deliver quality you can trust, backed
              by scale, flexibility, and clear communication.
            </p>
          </div>

          <div className="about-values__cards">
            {coreValues.map(({ icon, title, desc, tone }) => (
              <article
                className={`about-values__card about-values__card--${tone}`}
                key={title}
              >
                <div className="about-values__icon">
                  <i className={icon}></i>
                </div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-sequence__section about-mission">
        <div className="about-sequence__container about-mission__grid">
          {missionVision.map(({ icon, title, desc }) => (
            <article className="about-mission__card" key={title}>
              <i className={icon}></i>
              <h3>{title}</h3>
              <p>{desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-sequence__section about-commitment">
        <div className="about-sequence__container about-commitment__grid">
          <div className="about-commitment__visual" aria-hidden="true">
            <div className="about-commitment__stamp">
              <i className="fas fa-certificate"></i>
              <span>Our Commitment</span>
            </div>
          </div>

          <div className="about-commitment__content">
            <span className="about-sequence__eyebrow">Our Commitment</span>
            <h2>
              Dedicated To Excellence, Innovation, And Trust, Surpassing
              Expectations And Fostering Success Through Unwavering Commitment
              In All Endeavors
            </h2>
            <p>
              Quality is the cornerstone of our business. We work closely with
              trusted growers, suppliers, and partners to support fair,
              sustainable practices and dependable ingredient sourcing.
            </p>
            <p>
              Our quality control process helps ensure every Orbitto product is
              handled with care and meets the standards our customers expect.
            </p>
          </div>
        </div>
      </section>

      <section className="about-sequence__section about-forte">
        <div className="about-sequence__container about-forte__grid">
          <div className="about-forte__image" aria-hidden="true">
            <Image
              src="/img/about/forte-powder-spoons.png"
              alt=""
              width={980}
              height={460}
              sizes="(max-width: 991px) 100vw, 50vw"
            />
          </div>

          <div className="about-forte__content">
            <h2>Orbitto&rsquo;s Forte</h2>
            <ul>
              {fortes.map((item) => (
                <li key={item}>
                  <i className="fas fa-leaf"></i>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="about-forte-info">
          <div className="about-sequence__container about-forte-info__grid">
            <div className="about-forte-info__column">
              <h3>Get in Touch</h3>
              <p>
                Ahmedabad, Gujarat, India.
                <br />
                Natural food powders, ingredients, and export support for
                growing brands.
              </p>
            </div>

            <div className="about-forte-info__column">
              <h3>Quick Links</h3>
              <ul>
                <li>
                  <Link href="/products">Products</Link>
                </li>
                <li>
                  <Link href="/about">About Us</Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
              </ul>
            </div>

            <div className="about-forte-info__column">
              <h3>Contact Us</h3>
              <ul className="about-forte-info__contact">
                <li>
                  <i className="fas fa-phone-alt"></i>
                  <Link href="/contact">Request a call</Link>
                </li>
                <li>
                  <i className="fas fa-envelope"></i>
                  <Link href="/contact">Send an enquiry</Link>
                </li>
              </ul>
              <span>Follow Us</span>
              <div className="about-forte-info__socials">
                <Link href="#" aria-label="Facebook">
                  <i className="fab fa-facebook-f"></i>
                </Link>
                <Link href="#" aria-label="Twitter">
                  <i className="fab fa-twitter"></i>
                </Link>
                <Link href="#" aria-label="LinkedIn">
                  <i className="fab fa-linkedin-in"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPageSequence;
