import sliceText from "@/libs/sliceText";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ServiceCard = ({ service, isPrimary }) => {
  const { title, image, desc } = service;
  return (
    <div className="ltn__service-item-1">
      <div className="service-item-img">
        <Link href="/services">
          <Image
            src={image}
            alt="#"
            width={600}
            height={357}
            style={{ height: "auto" }}
          />
        </Link>
      </div>
      <div className="service-item-brief">
        <h3>
          <Link href="/services">{sliceText(title, 20)}</Link>
        </h3>
        <p>{sliceText(desc, 100)}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
