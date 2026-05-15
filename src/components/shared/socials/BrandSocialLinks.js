import Image from "next/image";
import Link from "next/link";

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com",
    icon: "/img/social/facebook.svg",
  },
  {
    name: "X",
    href: "https://x.com",
    icon: "/img/social/x.svg",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com",
    icon: "/img/social/instagram.svg",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com",
    icon: "/img/social/linkedin.svg",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com",
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
