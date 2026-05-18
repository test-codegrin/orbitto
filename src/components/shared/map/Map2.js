import React from "react";
import { mapEmbedUrl } from "@/libs/contactInfo";

const Map2 = () => {
  return (
    <div className="google-map mb-120">
      <iframe
        src={mapEmbedUrl}
        width="100%"
        height="100%"
        frameBorder="0"
        allowFullScreen=""
        aria-hidden="false"
        tabIndex="0"
      ></iframe>
    </div>
  );
};

export default Map2;
