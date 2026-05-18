"use client";
import Image from "next/image";
const logoImage1 = "/img/logo.png";
const logoImage2 = "/img/logo-2.png";

import Link from "next/link";
import { useHeaderContex } from "@/providers/HeaderContex";

const Logo = ({ sticky }) => {
  const { headerStyle, navBg, isHeaderSupport } = useHeaderContex();

  return (
    <div className={sticky ? "sticky-logo" : "header-logo-column"}>
      <div
        className={`${
          !isHeaderSupport && (headerStyle === 3 || headerStyle === 5)
            ? ""
            : "site-logo-wrap"
        }`}
        style={{ height: "100%" }}
      >
        <div className="site-logo">
          <Link href="/">
            <Image
              className="orbot-logo"
              src={
                navBg === "secondary" && sticky ? logoImage2 : logoImage1
              }
              alt="Logo"
              width={155}
              height={89}
              priority
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Logo;
