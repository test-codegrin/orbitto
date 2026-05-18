import Link from "next/link";
import React from "react";

const LoactionCard = ({ location }) => {
  const {
    provinceDetails,
    proviceDetails,
    address,
    proviceCode,
    path,
    website,
    contact,
  } = location;
  return (
    <div className="ltn__map-item">
      <h3 className="ltn__location-name">
        {provinceDetails || proviceDetails}
      </h3>
      <h5 className="ltn__location-single-info">
        <i className="fas fa-map-marked-alt"></i>
        {address} <br /> {proviceCode}
      </h5>
      <h4 className="ltn__location-single-info">
        <i className="fas fa-phone-volume"></i>
        {contact}
      </h4>
      <div className="btn-wrapper animated">
        <Link
          href={path}
          className="theme-btn-1 btn btn-effect-1 text-uppercase"
        >
          <i className="fas fa-location-arrow"></i> Get An Appointment
        </Link>
      </div>
      <div className="btn-wrapper animated">
        <Link
          href={website}
          className="theme-btn-1 btn btn-effect-1 text-uppercase"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fas fa-globe"></i> View Location
        </Link>
      </div>
    </div>
  );
};

export default LoactionCard;
