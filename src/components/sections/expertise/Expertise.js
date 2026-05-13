const expertiseItems = [
  {
    icon: "fas fa-stopwatch",
    title: "Timely Service",
    desc: "Structured order planning and coordinated execution for dependable timelines.",
  },
  {
    icon: "fas fa-award",
    title: "Consistent Quality",
    desc: "Quality-focused sourcing, handling, and supply processes across every shipment.",
  },
  {
    icon: "fas fa-globe-asia",
    title: "Global Reach",
    desc: "Export-ready product support for buyers, brands, and distributors worldwide.",
  },
  {
    icon: "fas fa-shield-alt",
    title: "Goods Safety",
    desc: "Careful packaging, documentation, and product protection for safer delivery.",
  },
];

const Expertise = () => {
  return (
    <section className="home-expertise">
      <div className="home-expertise__container">
        <div className="home-expertise__heading">
          <span>Our Expertise</span>
          <h2>Reliable Export Support From Planning to Delivery</h2>
          <p>
            To provide efficient services to clients, we believe each order must
            be strategically planned and stringently implemented.
          </p>
        </div>

        <div className="home-expertise__grid">
          {expertiseItems.map(({ icon, title, desc }) => (
            <article className="home-expertise__card" key={title}>
              <div className="home-expertise__icon" aria-hidden="true">
                <i className={icon}></i>
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

export default Expertise;
