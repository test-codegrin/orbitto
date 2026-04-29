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
                        alt="#"
                        priority={false}
                      />
                    </div>
                    <div className="ltn__feature-info">
                      <h4>Product Information Hub</h4>
                      <p>
                        Explore details about fruits, vegetables,
                        spices, and herbal products
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
                        alt="#"
                        priority={false}
                      />
                    </div>
                    <div className="ltn__feature-info">
                      <h4>Handmade</h4>
                      <p>We ensure the product quality that is our main goal</p>
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
                        alt="#"
                        priority={false}
                      />
                    </div>
                    <div className="ltn__feature-info">
                      <h4>Natural Food</h4>
                      <p>
                        Return product within 3 days for any product you buy
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
                        alt="#"
                        priority={false}
                      />
                    </div>
                    <div className="ltn__feature-info">
                      <h4>Global Export Quality</h4>
                      <p>
                        We provide high-quality export-ready products from
                        trusted sources
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
