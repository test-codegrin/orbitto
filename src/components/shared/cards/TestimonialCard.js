import Image from "next/image";
import React from "react";

const TestimonialCard = ({ testimonial }) => {
  const { name, image, imageSmall, desc, desig } = testimonial;
  return (
    <div className="ltn__testimonial-item ltn__testimonial-item-3">
      <div className="ltn__testimonial-img">
        <Image src={image} width={400} height={400} alt={`${name} testimonial`} />
      </div>
      <div className="ltn__testimoni-info">
        <p>{desc} </p>
        <div className="ltn__testimoni-info-inner">
          <div className="ltn__testimoni-img">
            <Image src={imageSmall} width={400} height={400} alt={`${name} profile`} />
          </div>
          <div className="ltn__testimoni-name-designation">
            <h3 className="ltn__testimoni-name">{name}</h3>
            <p className="ltn__testimoni-designation">{desig}</p>
          </div>
        </div>
        <div className="ltn__testimoni-bg-icon">
          <i className="far fa-comments"></i>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
