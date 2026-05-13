import Image from "next/image";

const Adress = () => {
  return (
    <div className="ltn__contact-address-area mb-90">
      <div className="container">
        <div className="row ltn__contact-address-row">
          <div className="col-lg-4">
            <div className="ltn__contact-address-item ltn__contact-address-item-3 box-shadow">
              <div className="ltn__contact-address-icon">
                <Image
                  src="/img/icons/Mail_Icon.jpg"
                  width={84}
                  height={82}
                  alt="Icon Image"
                />
              </div>
              <h3>Email Address</h3>
              <p>
                orbittointernational@gmail.com
              </p>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="ltn__contact-address-item ltn__contact-address-item-3 box-shadow">
              <div className="ltn__contact-address-icon">
                <Image
                  src="/img/icons/Phone_Icon.jpg"
                  width={84}
                  height={82}
                  alt="Icon Image"
                />
              </div>
              <h3>Phone Number</h3>
              <p>
                +91 99047 27348 <br /> +91 97266 87849 <br />+91 77790 69188
              </p>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="ltn__contact-address-item ltn__contact-address-item-3 box-shadow">
              <div className="ltn__contact-address-icon">
                <Image
                  src="/img/icons/Address_Icon.jpg"
                  width={84}
                  height={82}
                  alt="Icon Image"
                />
              </div>
              <h3>Office Address</h3>
              <p>
                NH-27, Wankaner, Morbi, Gujarat-363621
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adress;
