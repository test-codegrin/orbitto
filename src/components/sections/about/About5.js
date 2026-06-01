import Image from "next/image";

const About5 = ({ pt }) => {
  return (
    <div className={`ltn__about-us-area ${pt ? pt : "pt-50"} pb-50`}>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 align-self-center">
            <div className="about-us-img-wrap about-img-left">
              <Image
                src="/img/others/6.webp"
                alt="About Us Image"
                width={570}
                height={531}
              />
            </div>
          </div>
          <div className="col-lg-6 align-self-center">
            <div className="about-us-info-wrap">
              <div className="section-title-area ltn__section-title-2">
                <h6 className="section-subtitle ltn__secondary-color">
                  About Us
                </h6>
                <h2 className="section-title">Orbitto International</h2>
                <p>
                  Orbitto International is an export-focused manufacturer of
                  spray-dried fruit powders, vegetable powders, spices, honey,
                  and specialty ingredients for food, beverage, nutraceutical,
                  and private label buyers worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About5;
