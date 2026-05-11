import React from "react";

const Nodata = ({ text, className = "" }) => {
  return <p className={`empty ${className}`.trim()}>{text}</p>;
};

export default Nodata;
