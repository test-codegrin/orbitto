import Image from "next/image";

const Features4 = ({ type, mb }) => {
  return (
    <div
      className={`ltn__feature-area  ${type === 2 ? "" : ""}  ${
        mb ? mb : "before-bg-bottom-2"
      } plr--5`}
    >
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="ltn__feature-item-box-wrap ltn__border-between-column white-bg">
              <div className="row">
                <div className="col-xl-3 col-md-6 col-12">
                  <div className="ltn__feature-item ltn__feature-item-8">
                    <div className="ltn__feature-icon">
                      <Image
                        src={"/img/icons/icon-img/11.png"}
                        width={51}
                        height={50}
                        alt="100% Organic"
                        priority={false}
                      />
                    </div>
                    <div className="ltn__feature-info">
                      <h4>100% Organic & Pure</h4>
                      <p>
                        Every product is naturally grown, free from pesticides,
                        preservatives, and artificial additives
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6 col-12">
                  <div className="ltn__feature-item ltn__feature-item-8">
                    <div className="ltn__feature-icon">
                      <Image
                        src={"/img/icons/icon-img/12.png"}
                        width={51}
                        height={50}
                        alt="Traditional Sourcing"
                        priority={false}
                      />
                    </div>
                    <div className="ltn__feature-info">
                      <h4>Traditionally Sourced</h4>
                      <p>
                        Handpicked from trusted farms and spice gardens using
                        age-old, time-honoured farming practices
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6 col-12">
                  <div className="ltn__feature-item ltn__feature-item-8">
                    <div className="ltn__feature-icon">
                      <Image
                        src={"/img/icons/icon-img/13.png"}
                        width={51}
                        height={50}
                        alt="Quality Assured"
                        priority={false}
                      />
                    </div>
                    <div className="ltn__feature-info">
                      <h4>Quality You Can Trust</h4>
                      <p>
                        Rigorously tested for purity, freshness, and authentic
                        flavour before reaching your hands
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6 col-12">
                  <div className="ltn__feature-item ltn__feature-item-8">
                    <div className="ltn__feature-icon">
                      <Image
                        src={"/img/icons/icon-img/14.png"}
                        width={51}
                        height={50}
                        alt="Direct from Farm"
                        priority={false}
                      />
                    </div>
                    <div className="ltn__feature-info">
                      <h4>Farm to Your Doorstep</h4>
                      <p>
                        Sourced directly from farmers, ensuring freshness,
                        fair trade, and zero unnecessary middlemen
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features4;