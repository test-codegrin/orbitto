"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const ProductTechnicalSpecifications = ({ specifications, applicationsAndUses }) => {
  const specificationEntries = Object.entries(specifications || {}).filter(
    ([, value]) =>
      value !== undefined &&
      value !== null &&
      (!Array.isArray(value) || value.length > 0)
  );
  const applicationItems = useMemo(
    () => (Array.isArray(applicationsAndUses) ? applicationsAndUses.filter(Boolean) : []),
    [applicationsAndUses]
  );
  const hasSpecifications = specificationEntries.length > 0;
  const hasApplications = applicationItems.length > 0;
  const [activeTab, setActiveTab] = useState(
    hasSpecifications ? "specifications" : "applications"
  );
  const sectionTitle =
    activeTab === "applications" ? "Applications & Uses" : "Specifications";
  const specificationTabRef = useRef(null);
  const applicationTabRef = useRef(null);

  useEffect(() => {
    setActiveTab(hasSpecifications ? "specifications" : "applications");
  }, [hasSpecifications, hasApplications]);

  if (!hasSpecifications && !hasApplications) {
    return null;
  }

  const handleTabKeyDown = (event, currentTab) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
      return;
    }

    event.preventDefault();

    if (event.key === "Home") {
      setActiveTab("specifications");
      specificationTabRef.current?.focus();
      return;
    }

    if (event.key === "End") {
      setActiveTab("applications");
      applicationTabRef.current?.focus();
      return;
    }

    const nextTab =
      currentTab === "specifications" ? "applications" : "specifications";
    setActiveTab(nextTab);

    if (nextTab === "specifications") {
      specificationTabRef.current?.focus();
    } else {
      applicationTabRef.current?.focus();
    }
  };

  return (
    <div className="product-specifications-wrap" id="product-specifications">
      <div className="product-info-topbar">
        <h3 className="product-specifications-title">{sectionTitle}</h3>
        {hasSpecifications && hasApplications && (
          <div
            className="product-info-toggle-group"
            role="tablist"
            aria-label="Product details tabs"
          >
            <button
              id="product-tab-specifications"
              ref={specificationTabRef}
              type="button"
              role="tab"
              aria-selected={activeTab === "specifications"}
              aria-controls="product-panel-specifications"
              tabIndex={activeTab === "specifications" ? 0 : -1}
              className={`product-info-toggle-btn ${
                activeTab === "specifications" ? "active" : ""
              }`}
              onClick={() => setActiveTab("specifications")}
              onKeyDown={(event) => handleTabKeyDown(event, "specifications")}
            >
              Specifications
            </button>
            <button
              id="product-tab-applications"
              ref={applicationTabRef}
              type="button"
              role="tab"
              aria-selected={activeTab === "applications"}
              aria-controls="product-panel-applications"
              tabIndex={activeTab === "applications" ? 0 : -1}
              className={`product-info-toggle-btn ${
                activeTab === "applications" ? "active" : ""
              }`}
              onClick={() => setActiveTab("applications")}
              onKeyDown={(event) => handleTabKeyDown(event, "applications")}
            >
              Applications &amp; Uses
            </button>
          </div>
        )}
      </div>

      {activeTab === "specifications" && hasSpecifications && (
        <div
          id="product-panel-specifications"
          role="tabpanel"
          aria-labelledby="product-tab-specifications"
          className="product-specifications-table-wrap"
        >
          <table className="product-specifications-table">
            <tbody>
              {specificationEntries.map(([label, value]) => (
                <tr key={label}>
                  <th scope="row">{label}</th>
                  <td>
                    {Array.isArray(value) ? (
                      <ul className="product-specifications-list">
                        {value.filter(Boolean).map((item, idx) => (
                          <li key={`${label}-${idx}`}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      String(value)
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "applications" && hasApplications && (
        <div
          id="product-panel-applications"
          role="tabpanel"
          aria-labelledby="product-tab-applications"
          className="product-applications-card"
        >
          <ul className="product-applications-list">
            {applicationItems.map((item, idx) => (
              <li key={`${item}-${idx}`}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProductTechnicalSpecifications;
