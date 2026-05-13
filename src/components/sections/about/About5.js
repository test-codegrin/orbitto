import Image from "next/image";

const About5 = ({ pt }) => {
  return (
    <div className={`ltn__about-us-area ${pt ? pt : "pt-120"} pb-120`}>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 align-self-center">
            <div className="about-us-img-wrap about-img-left">
              <Image
                src="/img/others/6.png"
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
                <h1 className="section-title">Orbitto</h1>
                <p>
                  Orbitto is a manufacturer of spray-dried fruit, vegetable,
                  dairy, and specialty powders - delivering natural ingredients
                  that bring nutrition, functionality, and convenience to food
                  and beverage innovations worldwide.
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
