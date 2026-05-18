import Image from "next/image";
import Link from "next/link";
import React from "react";
import { socialUrls } from "@/libs/contactInfo";

const TeamCardPrimary = ({ teamSingle, isPrimary }) => {
  const { id, name, img, desig, duration } = teamSingle;
  return (
    <div className="ltn__team-item">
      <div className="team-img">
        <Image src={img} alt="Image" width={400} height={400} />
      </div>
      <div className="team-info">
        <h6 className="ltn__secondary-color">
          {isPrimary ? (
            desig
          ) : (
            <>
              {" "}
              {"//"} {desig} {"//"}
            </>
          )}
        </h6>
        <h4>
          <Link href={`/team/${id}`}>{name}</Link>
        </h4>
        <div className="ltn__social-media">
          <ul>
            <li>
              <Link
                href={socialUrls.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook-f"></i>
              </Link>
            </li>
            <li>
              <Link
                href={socialUrls.x}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-twitter"></i>
              </Link>
            </li>
            <li>
              <Link
                href={socialUrls.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-linkedin"></i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TeamCardPrimary;
