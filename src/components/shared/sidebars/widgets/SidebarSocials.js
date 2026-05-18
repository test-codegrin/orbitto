import Link from "next/link";
import React from "react";
import { socialUrls } from "@/libs/contactInfo";

const SidebarSocials = () => {
  return (
    <div className="widget ltn__social-media-widget">
      <h4 className="ltn__widget-title ltn__widget-title-border">
        Never Miss News
      </h4>
      <div className="ltn__social-media-2">
        <ul>
          <li>
            <Link
              href={socialUrls.facebook}
              title="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook-f"></i>
            </Link>
          </li>
          <li>
            <Link
              href={socialUrls.x}
              title="Twitter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-twitter"></i>
            </Link>
          </li>
          <li>
            <Link
              href={socialUrls.linkedin}
              title="Linkedin"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin"></i>
            </Link>
          </li>
          <li>
            <Link
              href={socialUrls.instagram}
              title="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram"></i>
            </Link>
          </li>
          <li>
            <Link
              href={socialUrls.behance}
              title="Behance"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-behance"></i>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SidebarSocials;
