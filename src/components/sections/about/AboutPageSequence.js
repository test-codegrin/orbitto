import Image from "next/image";

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

const companyOwners = [
  {
    name: "YASH PATEL",
    role: "MARKETING MANAGER & FOUNDER",
    phone: "+91 99047 27348",
    image: "/img/OwnerProfile/YashPatel.webp",
  },
  {
    name: "PARTH PATEL",
    role: "MARKETING MANAGER & MANAGEMENT MANAGER & FOUNDER",
    phone: "+91 97266 87849",
    image: "/img/OwnerProfile/ParthPatel.webp",
  },
  {
    name: "DHRUV PATEL",
    role: "PURCHASE & PRODUCTION MANAGER & FOUNDER",
    phone: "+91 77790 69188",
    image: null,
  },
];

const companyHighlights = [
  {
    icon: "fas fa-industry",
    title: "Manufacturer",
    subtitle: "MANUFACTURER, SUPPLIER & EXPORT",
  },
  {
    icon: "fas fa-certificate",
    title: "GST NO",
    subtitle: "24AAKFO1682L1ZX",
  },
  {
    icon: "fas fa-globe-americas",
    title: "MARKET COVERED",
    subtitle: "GLOBAL",
  },
];

const fortes = [
  "100% vegetarian, non-GMO, natural and safe products",
  "Traceability across the supply chain",
  "Authentic and natural raw materials",
  "A wide product range for evolving customer needs",
  "Consistency in taste, profile, and flavor delivery",
];

const qualityPoints = [
  "Achieving high levels of customer satisfaction by building quality and food safety into every process.",
  "Continual improvement of our quality and food safety management systems through team-wide participation.",
  "Consistently meeting changing customer needs with compliant, reliable, and hygienic production standards.",
];

const AboutPageSequence = () => {
  return (
    <div className="about-sequence">
      <section className="about-sequence__section about-intro">
        <div className="about-sequence__container about-intro__grid">
          <div className="about-intro__image">
            <Image
              src="/img/about/VegetablePowder.webp"
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

      <section className="about-sequence__section about-quality">
        <div className="about-sequence__container">
          <div className="about-quality__heading">
            <span className="about-sequence__eyebrow">Quality &amp; Food safety</span>
            <h2>What we do to ensure process and product quality</h2>
            <p>
              Food safety is not a destination for us, but a journey of continual
              improvement and development. We follow high standards across all
              operations and maintain strict benchmark practices.
            </p>
          </div>

          <div className="about-quality__grid">
            <div className="about-quality__image">
              <Image
                src="/img/service/2.webp"
                alt="Food safety policy and process quality checks"
                width={760}
                height={450}
                sizes="(max-width: 991px) 100vw, 52vw"
              />
            </div>

            <div className="about-quality__content">
              <p>
                At Orbitto, we are dedicated to manufacturing spray-dried food
                ingredients with hygienic processing, careful controls, and
                quality-first execution to achieve measurable consistency.
              </p>
              <ul>
                {qualityPoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="about-sequence__section about-commitment">
        <div className="about-sequence__container about-commitment__grid">
          <div className="about-commitment__visual" aria-hidden="true">
            <div>
              <Image
                src="/img/about/OurCommitment.webp"
                alt=""
                width={300}
                height={300}
                sizes="(max-width: 991px) 100vw, 30vw"
              />            
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
        <div className="about-sequence__container">
          <div className="about-forte__header">
            <div>
              <span className="about-sequence__eyebrow">Our Strength</span>
              <h2>Orbitto&rsquo;s Forte</h2>
            </div>
            <p>
              A practical foundation for consistent sourcing, processing, and
              delivery across every Orbitto ingredient solution.
            </p>
          </div>

          <div className="about-forte__layout">
            <div className="about-forte__visual" aria-hidden="true">
              <Image
                src="/img/about/forte-powder-spoons.webp"
                alt=""
                width={680}
                height={420}
                sizes="(max-width: 991px) 100vw, 36vw"
              />
            </div>

            <div className="about-forte__list">
              {fortes.map((item, index) => (
                <article className="about-forte__item" key={item}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span>{item}</span>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="about-sequence__section about-leadership">
        <div className="about-sequence__container">
          <div className="about-leadership__heading">
            <span className="about-sequence__eyebrow">Our Leadership</span>
            <h2>Company Owners</h2>
            <p>
              Meet the leadership team guiding Orbitto International with a
              focus on quality, reliable supply, and long-term customer
              partnerships.
            </p>
          </div>

          <div className="about-leadership__grid">
            {companyOwners.map(({ name, role, phone, image }) => (
              <article className="about-leadership__card" key={phone}>
                <div className="about-leadership__avatar">
                  {image ? (
                    <Image
                      src={image}
                      alt={name}
                      width={168}
                      height={168}
                      sizes="84px"
                    />
                  ) : (
                    <i
                      className="fas fa-user about-leadership__placeholder-icon"
                      aria-hidden="true"
                    ></i>
                  )}
                </div>
                <div className="about-leadership__body">
                  <span className="about-leadership__role">{role}</span>
                  <h3>{name}</h3>
                  <a
                    className="about-leadership__phone"
                    href={`tel:${phone.replace(/\s/g, "")}`}
                  >
                    <i className="fas fa-phone-alt"></i>
                    {phone}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-company-highlights">
        <div className="about-sequence__container about-company-highlights__grid">
          {companyHighlights.map(({ icon, title, subtitle }) => (
            <article className="about-company-highlights__item" key={title}>
              <div className="about-company-highlights__icon">
                <i className={icon}></i>
              </div>
              <h3>{title}</h3>
              <p>{subtitle}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPageSequence;
