import Image from "next/image";

const Features4 = ({ type, mb }) => {
  return (
    <div
      className={`ltn__feature-area  ${type === 2 ? "" : ""}  ${
        mb ? mb : "before-bg-bottom-2"
      } plr--5`}
      style={{ marginTop: "32px" }}
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
                        src={"/img/icons/icon-img/11.webp"}
                        width={51}
                        height={50}
                        alt="Organic"
                        priority={false}
                      />
                    </div>
                    <div className="ltn__feature-info">
                      <h3 className="ltn__feature-title">Quality-Focused Ingredients</h3>
                      <p>
                        Product quality, consistency, and suitability remain central to every commercial supply discussion.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6 col-12">
                  <div className="ltn__feature-item ltn__feature-item-8">
                    <div className="ltn__feature-icon">
                      <Image
                        src={"/img/icons/icon-img/12.webp"}
                        width={51}
                        height={50}
                        alt="Traditional Sourcing"
                        priority={false}
                      />
                    </div>
                    <div className="ltn__feature-info">
                      <h3 className="ltn__feature-title">Export Documentation Support</h3>
                      <p>
                        We align product movement with documentation and export coordination requirements for smoother international supply.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6 col-12">
                  <div className="ltn__feature-item ltn__feature-item-8">
                    <div className="ltn__feature-icon">
                      <Image
                        src={"/img/icons/icon-img/13.webp"}
                        width={51}
                        height={50}
                        alt="Quality Assured"
                        priority={false}
                      />
                    </div>
                    <div className="ltn__feature-info">
                      <h3 className="ltn__feature-title">Consistent Supply Planning</h3>
                      <p>
                        Orbitto supports repeat orders, buyer timelines, and dependable communication for long-term sourcing relationships.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6 col-12">
                  <div className="ltn__feature-item ltn__feature-item-8">
                    <div className="ltn__feature-icon">
                      <Image
                        src={"/img/icons/icon-img/14.webp"}
                        width={51}
                        height={50}
                        alt="Direct from Farm"
                        priority={false}
                      />
                    </div>
                    <div className="ltn__feature-info">
                      <h3 className="ltn__feature-title">Flexible Packaging Options</h3>
                      <p>
                        Bulk supply, packaging preferences, and private label discussions can be aligned to buyer and market requirements.
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
