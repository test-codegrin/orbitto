import Image from "next/image";
import Link from "next/link";
import {
  locationUrl,
  manufacturingAddressTitle,
  officeAddress3,
  officeAddressTitle,
  officeAddress2,
} from "@/libs/contactInfo";

const Adress = () => {
  return (
    <div className="ltn__contact-address-area mb-90">
      <div className="container">
        <div className="row ltn__contact-address-row">
          
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
              <p className="contact-phone-list">
                <span>
                  <strong>Marketing Manager</strong>
                  <br />
                  <Link href="tel:+919904727348">+91 99047 27348</Link>
                </span>
                <span>
                  <strong>Marketing Manager &amp; Management Manager</strong>
                  <br />
                  <Link href="tel:+919726687849">+91 97266 87849</Link>
                </span>
                <span>
                  <strong>Purchase &amp; Production Manager</strong>
                  <br />
                  <Link href="tel:+917779069188">+91 77790 69188</Link>
                </span>
              </p>
            </div>
          </div>
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
                  src="/img/icons/Address_Icon.jpg"
                  width={84}
                  height={82}
                  alt="Icon Image"
                />
              </div>
              <h3>Office Address</h3>
              <p>
                <Link
                  href={locationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <strong className="contact-address-title">
                    {officeAddressTitle} :
                  </strong>
                  <br />
                  <span>{officeAddress3}</span>
                  <br />
                  <br />
                  <strong className="contact-address-title">
                    {manufacturingAddressTitle} :
                  </strong>
                  <br />
                  <span>{officeAddress2}</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adress;
