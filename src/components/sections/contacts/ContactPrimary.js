"use client";

import getAllProducts from "@/libs/getAllProducts";
import { useEffect, useMemo, useRef, useState } from "react";

const products = getAllProducts();

const ContactPrimary = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    agree: false,
    serviceType: "Select Service Type",
    product: [],
    message: "",
  });
  const [serviceType, setServiceType] = useState("Select Service Type");
  const [productSearch, setProductSearch] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [status, setStatus] = useState("");
  const productDropdownRef = useRef(null);
  const productSearchInputRef = useRef(null);

  const filteredProducts = useMemo(() => {
    const searchValue = productSearch.trim().toLowerCase();

    return products.filter(
      (product) =>
        !selectedProducts.includes(product.title) &&
        (!searchValue || product.title.toLowerCase().includes(searchValue))
    );
  }, [productSearch, selectedProducts]);

  // get value from input
  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData((currentData) => ({
      ...currentData,
      [name]: name === "agree" ? checked : value,
      serviceType,
      product: selectedProducts,
    }));
  };

  const handleProductSelect = (productName) => {
    if (selectedProducts.includes(productName)) {
      return;
    }

    const nextProducts = [...selectedProducts, productName];
    setSelectedProducts(nextProducts);
    setProductSearch("");
    setIsProductDropdownOpen(true);
    setTimeout(() => productSearchInputRef.current?.focus(), 0);
    setFormData((currentData) => ({
      ...currentData,
      serviceType,
      product: nextProducts,
    }));
  };

  const handleProductRemove = (productName) => {
    const nextProducts = selectedProducts.filter(
      (product) => product !== productName
    );
    setSelectedProducts(nextProducts);
    setFormData((currentData) => ({
      ...currentData,
      serviceType,
      product: nextProducts,
    }));
  };

  const handleServiceTypeChange = (e) => {
    const value = e.target.value;
    setServiceType(value);
    setFormData((currentData) => ({
      ...currentData,
      serviceType: value,
      product: selectedProducts,
    }));
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    const selectCurrent = document.querySelector(".nice-select .current");
    const currentServiceType = selectCurrent?.innerText || serviceType;
    const submitData = {
      ...formData,
      serviceType: currentServiceType,
      product: selectedProducts,
    };

    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });
      if (response.ok) {
        setStatus("Thanks! Your message has been sent.");
        setServiceType("Select Service Type");
        setFormData({
          name: "",
          email: "",
          phone: "",
          agree: false,
          serviceType: "Select Service Type",
          product: [],
          message: "",
        });
        setSelectedProducts([]);
        setProductSearch("");
        setIsProductDropdownOpen(false);
      } else {
        setStatus("Failed to send email.");
      }
    } catch (error) {
      setStatus("Failed to send email.");
    }
  };
  useEffect(() => {
    let selectCurrent = document.querySelector(".nice-select .current");
    const currentServiceType = selectCurrent?.innerText;
    if (currentServiceType) {
      setServiceType(currentServiceType);
    }
    if (status && selectCurrent) {
      setServiceType("Select Service Type");
      selectCurrent.innerText = "Select Service Type";
    }
  }, [formData.agree, status]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        productDropdownRef.current &&
        !productDropdownRef.current.contains(event.target)
      ) {
        setIsProductDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="ltn__contact-message-area mb-120 mb--100">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="ltn__form-box contact-form-box box-shadow white-bg">
              <h4 className="title-2">Get A Quote</h4>
              <form id="contact-form" onSubmit={(e) => handleSubmit(e)}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="input-item input-item-name ltn__custom-icon">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={(e) => handleChange(e)}
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-item input-item-email ltn__custom-icon">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={(e) => handleChange(e)}
                        placeholder="Enter email address"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-item">
                      <select
                        name="serviceType"
                        className="nice-select"
                        onChange={handleServiceTypeChange}
                      >
                        <option>Select Service Type</option>
                        <option>MOQ</option>
                        <option>Price </option>
                        <option>Product Details</option>
                        <option>Bulk/Wholesale Supply</option>
                        <option>Private Labeling</option>
                        <option>Sample Request</option>
                        <option>Packaging Type</option>

                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-item input-item-phone ltn__custom-icon">
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={(e) => handleChange(e)}
                        placeholder="Enter phone number"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div
                      className="product-selection-box"
                      ref={productDropdownRef}
                    >
                      <label className="product-selection-title">
                        Select Product
                      </label>
                      <div className="product-dropdown">
                        <div
                          className="product-search-control"
                          onClick={() => {
                            setIsProductDropdownOpen(true);
                            productSearchInputRef.current?.focus();
                          }}
                        >
                          {selectedProducts.map((productName) => (
                            <span className="product-chip" key={productName}>
                              {productName}
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleProductRemove(productName);
                                }}
                                aria-label={`Remove ${productName}`}
                              >
                                &times;
                              </button>
                            </span>
                          ))}
                          <input
                            ref={productSearchInputRef}
                            type="search"
                            className="product-search-input"
                            value={productSearch}
                            onChange={(e) => {
                              setProductSearch(e.target.value);
                              setIsProductDropdownOpen(true);
                            }}
                            onFocus={() => setIsProductDropdownOpen(true)}
                            placeholder={
                              selectedProducts.length
                                ? "Search more products"
                                : "Search or select products"
                            }
                            aria-label="Search or select products"
                            aria-autocomplete="list"
                            aria-haspopup="listbox"
                            aria-expanded={isProductDropdownOpen}
                            aria-controls="product-dropdown-list"
                            autoComplete="off"
                            role="combobox"
                          />
                          <span className="product-dropdown-arrow" />
                        </div>
                        {isProductDropdownOpen ? (
                          <div
                            className="product-list"
                            id="product-dropdown-list"
                            role="listbox"
                          >
                            {filteredProducts.length ? (
                              filteredProducts.map((product) => (
                                <button
                                  type="button"
                                  key={product.id}
                                  className="product-option"
                                  onClick={() =>
                                    handleProductSelect(product.title)
                                  }
                                  aria-selected={false}
                                  role="option"
                                >
                                  {product.title}
                                </button>
                              ))
                            ) : (
                              <p className="product-empty-message">
                                No products found.
                              </p>
                            )}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="input-item input-item-textarea contact-message-field">
                  <label htmlFor="contact-message">
                    Describe Your Requirement
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    placeholder="I would like to..."
                    value={formData.message}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </div>
                <p>
                  <label className="input-info-save mb-0">
                    <input
                      type="checkbox"
                      name="agree"
                      onChange={(e) => handleChange(e)}
                      checked={formData.agree}
                    />{" "}
                    Save my name, email, and website in this browser for the
                    next time I comment.
                  </label>
                </p>
                <div className="btn-wrapper animated mt-0">
                  <button
                    className="theme-btn-1 btn btn-effect-1 text-uppercase"
                    type="submit"
                    disabled={!formData.agree}
                  >
                    get an free service
                  </button>
                </div>
                {status ? (
                  <p
                    className="form-messege mb-0 mt-20"
                    style={{
                      color: status?.includes("Failed") ? "red" : "green",
                    }}
                  >
                    {status}
                  </p>
                ) : (
                  ""
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPrimary;
