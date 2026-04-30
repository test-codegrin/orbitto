import React from "react";
import Link from "next/link";
import TabDescription from "./TabDescription";

const ProductDetailsTab = ({ product }) => {
  return (
    <div className="ltn__Product-details-tab-inner ltn__Product-details-tab-inner-2">
      <div className="ltn__Product-details-tab-menu">
        <div className="nav">
          <Link
            className="active show"
            data-bs-toggle="tab"
            href="#liton_tab_details_1_1"
          >
            Description
          </Link>
        </div>
      </div>

      <div className="tab-content">
        <div className="tab-pane fade active show" id="liton_tab_details_1_1">
          <TabDescription />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsTab;