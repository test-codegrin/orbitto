"use client";
import BrandSocialLinks from "@/components/shared/socials/BrandSocialLinks";
import { locationUrl, officeAddress3 } from "@/libs/contactInfo";
import { useHeaderContex } from "@/providers/HeaderContex";
import Link from "next/link";

const HeaderTop = () => {
  const { headerStyle, headerSize, headerTopBg } = useHeaderContex();
  return (
    <div
      className={`ltn__header-top-area ${
        headerStyle === 2 || headerStyle === 4 || headerTopBg === "dark"
          ? "top-area-color-white "
          : ""
      } ${headerSize === "lg" ? "plr--9" : ""}`}
    >
      <div
        className={` ${headerSize === "lg" ? "container-fluid" : "container"}`}
      >
        <div className="row header-top-row">
          <div className="col-xl-8 col-lg-7 col-md-12 header-top-contact-col">
            <div className="ltn__top-bar-menu">
              <ul className="top-header-contact-list">
                <li>
                  <Link
                    href={locationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="icon-placeholder"></i> {officeAddress3}
                  </Link>
                </li>
                <li>
                  <Link href="mailto:orbittointernational@gmail.com">
                    <i className="icon-mail"></i> orbittointernational@gmail.com
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-xl-4 col-lg-5 col-md-12 header-top-social-col">
            <div className="top-bar-right text-end">
              <div className="ltn__social-media top-header-socials">
                <BrandSocialLinks className="brand-social-links--top" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
