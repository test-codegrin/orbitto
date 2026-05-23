import Link from "next/link";
import React from "react";
import { socialUrls } from "@/libs/contactInfo";

const socialLinks = [
  { href: socialUrls.facebook, title: "Facebook", icon: "fab fa-facebook-f" },
  { href: socialUrls.x, title: "X", icon: "fab fa-x-twitter" },
  { href: socialUrls.linkedin, title: "LinkedIn", icon: "fab fa-linkedin" },
  { href: socialUrls.instagram, title: "Instagram", icon: "fab fa-instagram" },
].filter((item) => item.href);

const SidebarSocials = () => {
  return (
    <div className="widget ltn__social-media-widget">
      <h4 className="ltn__widget-title ltn__widget-title-border">
        Follow Orbitto International
      </h4>
      <div className="ltn__social-media-2">
        <ul>
          {socialLinks.map((socialLink) => (
            <li key={socialLink.title}>
              <Link
                href={socialLink.href}
                title={socialLink.title}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className={socialLink.icon}></i>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SidebarSocials;
