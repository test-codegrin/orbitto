import NavItem from "./NavItem";
import Link from "next/link";
import { useHeaderContex } from "@/providers/HeaderContex";
import Logo from "./Logo";

const Navbar = () => {
  const { headerStyle, headerSize, isNavbarAppointmentBtn, isTextWhite } =
    useHeaderContex();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Product", path: "/product" },
    { name: "News", path: "/blogs" },
    { name: "Pages", path: "/portfolio" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <div
      className={`col header-menu-column ${
        headerStyle === 2 || isTextWhite
          ? "menu-color-white"
          : headerStyle === 5
          ? "justify-content-center align-items-center"
          : ""
      }`}
    >
      <nav>
        <div className="ltn__main-menu">
          <ul>
            {navItems?.map((item, idx) => (
              <NavItem key={idx} item={item} />
            ))}
            {headerStyle === 5 && <Logo sticky={true} />}
            <div
              className={`header-menu ${
                headerStyle === 5 ? "header-menu-2" : "d-none d-xl-block"
              }`}
            />
            {(isNavbarAppointmentBtn ||
              headerSize === "lg" ||
              headerStyle === 2 ||
              headerStyle === 4) && (
              <li className="special-link text-uppercase">
                <Link href="/contact">GET A Quote</Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;