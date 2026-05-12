"use client";
import BrandSocialLinks from "@/components/shared/socials/BrandSocialLinks";
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
        <div className="row">
          <div className="col-lg-7 col-md-8">
            <div className="ltn__top-bar-menu">
              <ul className="top-header-contact-list">
                <li>
                  <Link href="/locations">
                    <i className="icon-placeholder"></i> 15/A, Nest Tower, NYC
                  </Link>
                </li>
                <li>
                  <Link href="mailto:info@webmail.com?Subject=Flower%20greetings%20to%20you">
                    <i className="icon-mail"></i> info@webmail.com
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-5 col-md-4">
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
