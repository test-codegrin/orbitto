import Image from "next/image";
import Link from "next/link";
import { socialUrls } from "@/libs/contactInfo";

const socialLinks = [
  {
    name: "Facebook",
    href: socialUrls.facebook,
    icon: "/img/social/facebook.svg",
  },
  {
    name: "X",
    href: socialUrls.x,
    icon: "/img/social/x.svg",
  },
  {
    name: "Instagram",
    href: socialUrls.instagram,
    icon: "/img/social/instagram.svg",
  },
  {
    name: "LinkedIn",
    href: socialUrls.linkedin,
    icon: "/img/social/linkedin.svg",
  },
  {
    name: "YouTube",
    href: socialUrls.youtube,
    icon: "/img/social/youtube.svg",
  },
];

const BrandSocialLinks = ({ className = "" }) => {
  return (
    <ul className={`brand-social-links ${className}`}>
      {socialLinks.map(({ name, href, icon }) => (
        <li key={name}>
          <Link
            href={href}
            title={name}
            aria-label={name}
            className="brand-social-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={icon} alt="" width={36} height={36} />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default BrandSocialLinks;
