import Image from "next/image";

const ExportSupport = () => {
  return (
    <section className="export-support">
      <div className="export-support__container">
        <div className="export-support__visual" aria-label="Export products">
          <div className="export-support__image export-support__image--main">
            <Image
              src="/img/service/2.webp"
              alt="Fresh products ready for export packaging"
              width={560}
              height={410}
              sizes="(max-width: 768px) 80vw, 40vw"
            />
          </div>
          <div className="export-support__image export-support__image--top">
            <Image
              src="/img/hero/Container.webp"
              alt="Packed turmeric powder for export"
              width={290}
              height={220}
              sizes="(max-width: 768px) 42vw, 18vw"
            />
          </div>
          <div className="export-support__image export-support__image--bottom">
            <Image
              src="/img/hero/Container2.webp"
              alt="Natural honey product for export"
              width={290}
              height={220}
              sizes="(max-width: 768px) 42vw, 18vw"
            />
          </div>
        </div>

        <div className="export-support__content">
          <span className="export-support__eyebrow">Export Support</span>
          <h2>Orbitto - We are always there for exporting</h2>
          <p>
            Orbitto focuses on the benefits of client satisfaction. The company
            cherishes its clients&rsquo; time and money, so it aims to give the
            best services possible with a speedy turnaround. Client interests
            and requirements are given top priority, as well as their needs in
            terms of purchasing, packing, product protection, legal
            documentation, and customs clearance.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ExportSupport;
