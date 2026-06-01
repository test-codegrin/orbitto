"use client";
import Image from "next/image";
const logoImage = "/img/logo.webp";
const logoImage2 = "/img/logo-2.webp";
import Link from "next/link";
import { useFooterContex } from "@/providers/FooterContext";
import {
  locationUrl,
  officeAddress,
  officeAddressTitle,
} from "@/libs/contactInfo";

const FooterAbout2 = () => {
  const { footerBg } = useFooterContex();
  return (
    <div className="col-xl-3 col-md-6 col-sm-6 col-12">
      <div className="footer-widget footer-about-widget">
        <div className="footer-logo mb-10">
          <div className="site-logo">
            <Image
              src={footerBg === "dark" ? logoImage2 : logoImage}
              alt="Logo"
              width={254}
              height={52}
            />
          </div>
        </div>
        <p>
          Orbitto International delivers quality-focused fruits, vegetables,
          fruit powders, vegetable powders, spices, honey, and herbal
          ingredients crafted for reliable sourcing, consistent standards, and
          global export needs.
        </p>
        <div className="footer-address">
          <ul>
            <li>
              <div className="footer-address-icon">
                <i className="icon-placeholder"></i>
              </div>
              <div className="footer-address-info">
                <p>
                  <Link
                    href={locationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <strong className="footer-address-title">
                      {officeAddressTitle} :
                    </strong>
                    <br />
                    <span>{officeAddress}</span>
                  </Link>
                </p>
              </div>
            </li>
            <li>
              <div className="footer-address-icon">
                <i className="icon-call"></i>
              </div>
              <div className="footer-address-info">
                <p>
                  <Link href="tel:+91 99047 27348">+91 99047 27348</Link>
                </p>
              </div>
            </li>
            <li>
              <div className="footer-address-icon">
                <i className="icon-mail"></i>
              </div>
              <div className="footer-address-info">
                <p>
                  <Link href="mailto:orbittointernational@gmail.com">
                    orbittointernational@gmail.com
                  </Link>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FooterAbout2;
