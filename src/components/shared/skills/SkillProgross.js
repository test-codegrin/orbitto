import React from "react";

const SkillProgross = () => {
  return (
    <div className="ltn__progress-bar-wrap">
      <div className="section-title-area ltn__section-title-2">
        <h6 className="section-subtitle ltn__secondary-color">{"//"} skills</h6>
        <h1 className="section-title">
          We Have A Skillest Team Ever<span>.</span>
        </h1>
        <p>
          Our team focuses on careful sourcing, hygienic processing, and
          dependable export support for natural food ingredients.
        </p>
      </div>
      <div className="ltn__progress-bar-inner">
        <div className="ltn__progress-bar-item">
          <p>Product Sourcing</p>
          <div className="progress">
            <div
              className="progress-bar wow fadeInLeft"
              data-wow-duration="0.5s"
              data-wow-delay=".5s"
              role="progressbar"
              aria-label="Product Sourcing progress"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={72}
              style={{ width: "72%" }}
            >
              <span>72%</span>
            </div>
          </div>
        </div>
        <div className="ltn__progress-bar-item">
          <p>Processing Support</p>
          <div className="progress">
            <div
              className="progress-bar wow fadeInLeft"
              data-wow-duration="0.5s"
              data-wow-delay=".5s"
              role="progressbar"
              aria-label="Processing Support progress"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={74}
              style={{ width: "74%" }}
            >
              <span>74%</span>
            </div>
          </div>
        </div>
        <div className="ltn__progress-bar-item">
          <p>Export Coordination</p>
          <div className="progress">
            <div
              className="progress-bar wow fadeInLeft"
              data-wow-duration="0.5s"
              data-wow-delay=".5s"
              role="progressbar"
              aria-label="Export Coordination progress"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={81}
              style={{ width: "81%" }}
            >
              <span>81%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillProgross;
