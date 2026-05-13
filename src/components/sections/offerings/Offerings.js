import Image from "next/image";

const offerings = [
  {
    icon: "fas fa-building",
    title: "Contract Manufacturing",
    desc: "End-to-end production support for global brands",
  },
  {
    icon: "fas fa-hands-helping",
    title: "Private Label Solutions",
    desc: "Launch your own brand with customized formulations & packaging",
  },
  {
    image: "/img/icons/cargo-ship.svg",
    title: "Bulk Ingredient Supply",
    desc: "High-quality natural food ingredients for industrial use",
  },
  {
    icon: "fas fa-industry",
    title: "Third-Party Manufacturing",
    desc: "Scalable, cost-effective production capabilities",
  },
];

const Offerings = () => {
  return (
    <section className="home-offerings">
      <div className="home-offerings__container">
        <div className="home-offerings__heading">
          <h2>Our Offerings</h2>
          <p>Comprehensive Manufacturing Solutions</p>
        </div>

        <div className="home-offerings__grid">
          {offerings.map(({ icon, image, title, desc }) => (
            <article className="home-offerings__card" key={title}>
              <div className="home-offerings__icon" aria-hidden="true">
                {image ? (
                  <Image
                    src={image}
                    alt=""
                    width={78}
                    height={58}
                    sizes="78px"
                  />
                ) : (
                  <i className={icon}></i>
                )}
              </div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Offerings;
