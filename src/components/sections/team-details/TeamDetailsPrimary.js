"use client";
import FeatureCard2 from "@/components/shared/cards/FeatureCard2";
import getAllFeatues from "@/libs/getAllFeatues";
import getTeamMembers from "@/libs/getTeamMembers";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

const TeamDetailsPrimary = () => {
  const { id: currentId } = useParams();
  const currentMember = getTeamMembers()?.find(
    ({ id }) => id === parseInt(currentId)
  );
  const { name, img, desig } = currentMember ? currentMember : {};
  const features = getAllFeatues()?.filter(({ id }) => id > 3 && id < 7);
  return (
    <div className="ltn__team-details-area mb-90">
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <div className="ltn__team-details-member-info text-center mb-40">
              <div className="team-details-img">
                <Image
                  src={img}
                  alt="Team Member Image"
                  width={400}
                  height={400}
                />
              </div>
              <h2>{name}</h2>
              <h6 className="text-uppercase ltn__secondary-color">{desig}</h6>
              <div className="ltn__social-media-3">
                <ul>
                  <li>
                    <Link href="https://www.facebook.com" title="Facebook">
                      <i className="fab fa-facebook-f"></i>
                    </Link>
                  </li>{" "}
                  <li>
                    <Link href="https://x.com" title="Twitter">
                      <i className="fab fa-twitter"></i>
                    </Link>
                  </li>{" "}
                  <li>
                    <Link href="https://www.linkedin.com" title="Linkedin">
                      <i className="fab fa-linkedin"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="ltn__team-details-member-info-details">
              <p>
                Our team brings practical experience in ingredient sourcing,
                quality handling, customer support, and export coordination for
                Orbitto&rsquo;s natural food product range.
              </p>
              <div className="row">
                <div className="col-lg-6">
                  <div className="ltn__team-details-member-about">
                    <ul>
                      <li>
                        <strong>Positions:</strong> Ingredient Specialist
                      </li>
                      <li>
                        <strong>Experience:</strong> 10+ Years
                      </li>
                      <li>
                        <strong>Location:</strong> NH-27, Wankaner, Morbi, Gujarat-363621
                      </li>
                      <li>
                        <strong>Practice Area:</strong> Food Ingredients
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="ltn__team-details-member-about">
                    <ul>
                      <li>
                        <strong>Email:</strong> orbittointernational@gmail.com
                      </li>
                      <li>
                        <strong>Fax:</strong> +0123-456 789
                      </li>
                      <li>
                        <strong>Phone:</strong> +0123-456 789
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <hr />
              <p>
                From first inquiry to dispatch, the team helps customers choose
                suitable fruit powders, vegetable powders, spices, honey, and
                herbal ingredients for their applications. The focus is on clear
                communication, consistent product information, and dependable
                order handling.
              </p>

              <div className="row ltn__custom-gutter mt-50 mb-20">
                {features?.map((feature, idx) => (
                  <div key={idx} className="col-xl-4 col-sm-6 col-12">
                    <FeatureCard2 feature={feature} idx={idx} />
                  </div>
                ))}
              </div>

              <p>
                Orbitto&rsquo;s people work closely with buyers, traders, and
                manufacturers to support repeatable ingredient supply for food,
                beverage, wellness, and export markets.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamDetailsPrimary;
