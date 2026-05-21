"use client";

/* eslint-disable @next/next/no-img-element */

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  splitLineSeparatedText,
  splitProductApplicationText,
} from "@/libs/productApplications";
import {
  rowsToOrderedSpecification,
  specificationToRows,
} from "@/libs/productSpecifications";

const emptyProductForm = {
  categories_id: "",
  product_name: "",
  product_description: "",
  product_application: "",
};

const defaultProductPagination = {
  page: 1,
  limit: 10,
  totalItems: 0,
  totalPages: 0,
  hasNextPage: false,
  hasPrevPage: false,
};

const buildAdminProductsUrl = ({ page, limit, search, category }) => {
  const params = new URLSearchParams();
  params.set("page", String(page || 1));
  params.set("limit", String(limit || 10));
  if (search) params.set("search", search);
  if (category) params.set("category", category);
  return `/api/admin/products?${params.toString()}`;
};

const createSpecRow = (key = "", value = "") => ({
  id: globalThis.crypto?.randomUUID
    ? globalThis.crypto.randomUUID()
    : `${Date.now()}-${Math.random()}`,
  key,
  value,
});

const formatDate = (value) => {
  if (!value) return "-";
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(new Date(value));
};

const AdminPanel = () => {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sessionChecked, setSessionChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [notice, setNotice] = useState(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const [productForm, setProductForm] = useState(emptyProductForm);
  const [specRows, setSpecRows] = useState([createSpecRow()]);
  const [imageFile, setImageFile] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
  const [isProductsLoading, setIsProductsLoading] = useState(false);
  const [productSearchInput, setProductSearchInput] = useState("");
  const [appliedProductSearch, setAppliedProductSearch] = useState("");
  const [selectedProductCategory, setSelectedProductCategory] = useState("");
  const [productPage, setProductPage] = useState(1);
  const [productLimit, setProductLimit] = useState(10);
  const [productPagination, setProductPagination] = useState(
    defaultProductPagination
  );

  const recentCategories = useMemo(() => categories.slice(0, 5), [categories]);
  const recentProducts = useMemo(() => products.slice(0, 5), [products]);

  const showNotice = useCallback((type, text) => {
    setNotice({ type, text });
    window.setTimeout(() => setNotice(null), 3500);
  }, []);

  const adminFetch = useCallback(
    async (url, options = {}) => {
      const response = await fetch(url, {
        ...options,
        headers:
          options.body instanceof FormData
            ? options.headers
            : {
                "Content-Type": "application/json",
                ...(options.headers || {}),
              },
      });
      const result = await response.json().catch(() => ({}));

      if (response.status === 401) {
        router.replace("/login");
        throw new Error("Your admin session expired. Please log in again.");
      }

      if (!response.ok) {
        throw new Error(result?.error || "Request failed.");
      }

      return result;
    },
    [router]
  );

  const loadProducts = useCallback(
    async ({
      page = 1,
      limit = 10,
      search = "",
      category = "",
    } = {}) => {
      setIsProductsLoading(true);

      try {
        const result = await adminFetch(
          buildAdminProductsUrl({ page, limit, search, category })
        );

        setProducts(result.products || []);
        setProductPagination(result.pagination || defaultProductPagination);
        if (result.pagination?.page) setProductPage(result.pagination.page);
      } catch (error) {
        showNotice("error", error.message || "Unable to load products.");
      } finally {
        setIsProductsLoading(false);
      }
    },
    [adminFetch, showNotice]
  );

  const loadAdminData = useCallback(async () => {
    setIsLoading(true);

    try {
      const categoriesResult = await adminFetch("/api/admin/categories");

      setCategories(categoriesResult.categories || []);
    } catch (error) {
      showNotice("error", error.message || "Unable to load admin data.");
    } finally {
      setIsLoading(false);
    }
  }, [
    adminFetch,
    showNotice,
  ]);

  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch("/api/admin/me", { cache: "no-store" });

      if (!response.ok) {
        router.replace("/login");
        return;
      }

      setSessionChecked(true);
    };

    checkAuth();
  }, [router]);

  useEffect(() => {
    if (!sessionChecked) return;
    loadAdminData();
  }, [sessionChecked, loadAdminData]);

  useEffect(() => {
    if (!sessionChecked || isLoading) return;
    loadProducts({
      page: productPage,
      limit: productLimit,
      search: appliedProductSearch,
      category: selectedProductCategory,
    });
  }, [
    sessionChecked,
    isLoading,
    loadProducts,
    productPage,
    productLimit,
    appliedProductSearch,
    selectedProductCategory,
  ]);

  useEffect(() => {
    const nextSearch = productSearchInput.trim();
    const timer = window.setTimeout(() => {
      setAppliedProductSearch((currentSearch) => {
        if (currentSearch === nextSearch) return currentSearch;
        return nextSearch;
      });
      setProductPage(1);
    }, 500);

    return () => window.clearTimeout(timer);
  }, [productSearchInput]);

  const resetCategoryForm = () => {
    setCategoryName("");
    setEditingCategory(null);
  };

  const handleCategorySubmit = async (event) => {
    event.preventDefault();
    const trimmedName = categoryName.trim();

    if (!trimmedName) {
      showNotice("error", "Category name is required.");
      return;
    }

    setIsSaving(true);

    try {
      await adminFetch(
        editingCategory
          ? `/api/admin/categories/${editingCategory.categories_id}`
          : "/api/admin/categories",
        {
          method: editingCategory ? "PUT" : "POST",
          body: JSON.stringify({ category_name: trimmedName }),
        }
      );

      showNotice("success", editingCategory ? "Category updated." : "Category added.");
      resetCategoryForm();
      loadAdminData();
    } catch (error) {
      showNotice("error", error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditCategory = (category) => {
    setActiveSection("categories");
    setEditingCategory(category);
    setCategoryName(category.category_name);
  };

  const handleDeleteCategory = async (category) => {
    const confirmed = window.confirm(
      `Delete "${category.category_name}"? Products in this category will also be removed by your database cascade.`
    );
    if (!confirmed) return;

    setIsSaving(true);
    try {
      await adminFetch(`/api/admin/categories/${category.categories_id}`, {
        method: "DELETE",
      });
      showNotice("success", "Category deleted.");
      loadAdminData();
    } catch (error) {
      showNotice("error", error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const openProductForm = (product = null) => {
    setActiveSection("products");
    setEditingProduct(product);
    setIsProductFormOpen(true);
    setImageFile(null);

    if (product) {
      setProductForm({
        categories_id: product.categories_id || "",
        product_name: product.product_name || "",
        product_description: product.product_description || "",
        product_application: product.product_application || "",
      });
      setSpecRows(specificationToRows(product.product_specification, createSpecRow));
      return;
    }

    setProductForm(emptyProductForm);
    setSpecRows([createSpecRow()]);
  };

  const closeProductForm = () => {
    setIsProductFormOpen(false);
    setEditingProduct(null);
    setProductForm(emptyProductForm);
    setSpecRows([createSpecRow()]);
    setImageFile(null);
  };

  const handleProductSubmit = async (event) => {
    event.preventDefault();

    if (!productForm.product_name.trim() || !productForm.categories_id) {
      showNotice("error", "Product name and category are required.");
      return;
    }

    setIsSaving(true);

    try {
      const formData = new FormData();
      formData.append("categories_id", productForm.categories_id);
      formData.append("product_name", productForm.product_name.trim());
      formData.append(
        "product_description",
        productForm.product_description.trim()
      );
      formData.append(
        "product_specification",
        JSON.stringify(rowsToOrderedSpecification(specRows))
      );
      formData.append(
        "product_application",
        productForm.product_application
      );

      if (imageFile) {
        formData.append("image", imageFile);
      }

      await adminFetch(
        editingProduct ? `/api/admin/products/${editingProduct.products_id}` : "/api/admin/products",
        {
          method: editingProduct ? "PUT" : "POST",
          body: formData,
        }
      );

      showNotice("success", editingProduct ? "Product updated." : "Product added.");
      closeProductForm();
      if (productPage === 1) {
        loadProducts({ page: 1 });
      } else {
        setProductPage(1);
      }
    } catch (error) {
      showNotice("error", error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteProduct = async (product) => {
    const confirmed = window.confirm(`Delete "${product.product_name}"?`);
    if (!confirmed) return;

    setIsSaving(true);
    try {
      await adminFetch(`/api/admin/products/${product.products_id}`, {
        method: "DELETE",
      });
      showNotice("success", "Product deleted.");

      if (products.length <= 1 && productPage > 1) {
        setProductPage((page) => page - 1);
      } else {
        loadProducts();
      }
    } catch (error) {
      showNotice("error", error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleProductSearchSubmit = (event) => {
    event.preventDefault();
    const nextSearch = productSearchInput.trim();
    setAppliedProductSearch(nextSearch);
    setProductPage(1);
  };

  const handleProductCategoryChange = (value) => {
    setSelectedProductCategory(value);
    setProductPage(1);
  };

  const handleProductLimitChange = (value) => {
    setProductLimit(Number(value));
    setProductPage(1);
  };

  const handleProductClearFilters = () => {
    setProductSearchInput("");
    setAppliedProductSearch("");
    setSelectedProductCategory("");
    setProductPage(1);
  };

  const handleProductPageChange = (page) => {
    if (page < 1 || page > productPagination.totalPages) return;
    setProductPage(page);
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/login");
    router.refresh();
  };

  const handleRefresh = () => {
    loadAdminData();
    if (!sessionChecked) return;
    loadProducts({
      page: productPage,
      limit: productLimit,
      search: appliedProductSearch,
      category: selectedProductCategory,
    });
  };

  const updateSpecRow = (index, field, value) => {
    setSpecRows((currentRows) =>
      currentRows.map((row, rowIndex) =>
        rowIndex === index ? { ...row, [field]: value } : row
      )
    );
  };

  const removeSpecRow = (index) => {
    setSpecRows((currentRows) =>
      currentRows.length === 1 ? [createSpecRow()] : currentRows.filter((_, rowIndex) => rowIndex !== index)
    );
  };

  const moveSpecRow = (fromIndex, toIndex) => {
    setSpecRows((currentRows) => {
      if (
        fromIndex === toIndex ||
        fromIndex < 0 ||
        toIndex < 0 ||
        fromIndex >= currentRows.length ||
        toIndex >= currentRows.length
      ) {
        return currentRows;
      }

      const nextRows = [...currentRows];
      const [movedRow] = nextRows.splice(fromIndex, 1);
      nextRows.splice(toIndex, 0, movedRow);
      return nextRows;
    });
  };

  if (!sessionChecked) {
    return (
      <main className="admin-shell admin-shell-loading">
        <div className="admin-card">Checking admin access...</div>
      </main>
    );
  }

  return (
    <main className="admin-shell">
      <aside className="admin-sidebar">
        <div>
          <div className="admin-logo">Orbitto Admin</div>
          <nav className="admin-nav" aria-label="Admin navigation">
            {["dashboard", "categories", "products"].map((section) => (
              <button
                key={section}
                type="button"
                className={activeSection === section ? "active" : ""}
                onClick={() => setActiveSection(section)}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </nav>
        </div>
        <button type="button" className="admin-logout" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      <section className="admin-main">
        <header className="admin-header">
          <div>
            <p>Admin Panel</p>
            <h1>{activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}</h1>
          </div>
          <button type="button" className="admin-button admin-button-light" onClick={handleRefresh}>
            Refresh
          </button>
        </header>

        {notice ? (
          <div className={`admin-alert admin-alert-${notice.type}`}>{notice.text}</div>
        ) : null}

        {isLoading ? <div className="admin-card">Loading admin data...</div> : null}

        {!isLoading && activeSection === "dashboard" ? (
          <Dashboard
            categories={categories}
            products={products}
            totalProducts={productPagination.totalItems}
            recentCategories={recentCategories}
            recentProducts={recentProducts}
          />
        ) : null}

        {!isLoading && activeSection === "categories" ? (
          <CategoriesManager
            categories={categories}
            categoryName={categoryName}
            editingCategory={editingCategory}
            isSaving={isSaving}
            onCategoryNameChange={setCategoryName}
            onSubmit={handleCategorySubmit}
            onCancel={resetCategoryForm}
            onEdit={handleEditCategory}
            onDelete={handleDeleteCategory}
          />
        ) : null}

        {!isLoading && activeSection === "products" ? (
          <ProductsManager
            categories={categories}
            products={products}
            productForm={productForm}
            specRows={specRows}
            editingProduct={editingProduct}
            isProductFormOpen={isProductFormOpen}
            isSaving={isSaving}
            isProductsLoading={isProductsLoading}
            productSearchInput={productSearchInput}
            selectedProductCategory={selectedProductCategory}
            productLimit={productLimit}
            productPagination={productPagination}
            onOpenForm={openProductForm}
            onCloseForm={closeProductForm}
            onProductFormChange={setProductForm}
            onProductSearchInputChange={setProductSearchInput}
            onProductSearchSubmit={handleProductSearchSubmit}
            onProductCategoryChange={handleProductCategoryChange}
            onProductLimitChange={handleProductLimitChange}
            onProductClearFilters={handleProductClearFilters}
            onProductPageChange={handleProductPageChange}
            onSpecRowChange={updateSpecRow}
            onAddSpecRow={() => setSpecRows((rows) => [...rows, createSpecRow()])}
            onRemoveSpecRow={removeSpecRow}
            onMoveSpecRow={moveSpecRow}
            onImageFileChange={setImageFile}
            imageFile={imageFile}
            onSubmit={handleProductSubmit}
            onDelete={handleDeleteProduct}
          />
        ) : null}
      </section>
    </main>
  );
};

const Dashboard = ({ categories, totalProducts, recentCategories, recentProducts }) => (
  <div className="admin-grid">
    <article className="admin-stat-card">
      <span>Total Categories</span>
      <strong>{categories.length}</strong>
    </article>
    <article className="admin-stat-card">
      <span>Total Products</span>
      <strong>{totalProducts}</strong>
    </article>
    <RecentList title="Recently Added Products" items={recentProducts} labelKey="product_name" />
    <RecentList title="Recently Added Categories" items={recentCategories} labelKey="category_name" />
  </div>
);

const RecentList = ({ title, items, labelKey }) => (
  <article className="admin-card">
    <h2>{title}</h2>
    {items.length ? (
      <ul className="admin-recent-list">
        {items.map((item) => (
          <li key={item.products_id || item.categories_id}>
            <span>{item[labelKey]}</span>
            <small>{formatDate(item.created_at)}</small>
          </li>
        ))}
      </ul>
    ) : (
      <p className="admin-empty">No records found.</p>
    )}
  </article>
);

const CategoriesManager = ({
  categories,
  categoryName,
  editingCategory,
  isSaving,
  onCategoryNameChange,
  onSubmit,
  onCancel,
  onEdit,
  onDelete,
}) => (
  <div className="admin-stack">
    <article className="admin-card">
      <h2>{editingCategory ? "Edit Category" : "Add Category"}</h2>
      <form className="admin-form admin-inline-form" onSubmit={onSubmit}>
        <label>
          Category Name
          <input
            value={categoryName}
            onChange={(event) => onCategoryNameChange(event.target.value)}
            required
          />
        </label>
        <div className="admin-form-actions">
          <button type="submit" className="admin-button admin-button-primary" disabled={isSaving}>
            {isSaving ? "Saving..." : editingCategory ? "Update Category" : "Add Category"}
          </button>
          {editingCategory ? (
            <button type="button" className="admin-button admin-button-light" onClick={onCancel}>
              Cancel
            </button>
          ) : null}
        </div>
      </form>
    </article>

    <article className="admin-card">
      <h2>Categories</h2>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Category Name</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length ? (
              categories.map((category) => (
                <tr key={category.categories_id}>
                  <td>{category.category_name}</td>
                  <td>{formatDate(category.created_at)}</td>
                  <td>{formatDate(category.updated_at)}</td>
                  <td>
                    <div className="admin-row-actions">
                      <button type="button" onClick={() => onEdit(category)}>
                        Edit
                      </button>
                      <button type="button" className="danger" onClick={() => onDelete(category)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="admin-empty-cell">
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </article>
  </div>
);

const ProductsManager = ({
  categories,
  products,
  productForm,
  specRows,
  editingProduct,
  isProductFormOpen,
  isSaving,
  isProductsLoading,
  productSearchInput,
  selectedProductCategory,
  productLimit,
  productPagination,
  onOpenForm,
  onCloseForm,
  onProductFormChange,
  onProductSearchInputChange,
  onProductSearchSubmit,
  onProductCategoryChange,
  onProductLimitChange,
  onProductClearFilters,
  onProductPageChange,
  onSpecRowChange,
  onAddSpecRow,
  onRemoveSpecRow,
  onMoveSpecRow,
  onImageFileChange,
  imageFile,
  onSubmit,
  onDelete,
}) => {
  const applicationPreviewItems = splitProductApplicationText(
    productForm.product_application
  );

  const handleSpecDragStart = (event, index) => {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", String(index));
  };

  const handleSpecDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const handleSpecDrop = (event, index) => {
    event.preventDefault();
    const fromIndex = Number(event.dataTransfer.getData("text/plain"));

    if (Number.isInteger(fromIndex)) {
      onMoveSpecRow(fromIndex, index);
    }
  };

  return (
  <div className="admin-stack">
    <div className="admin-section-actions">
      <button type="button" className="admin-button admin-button-primary" onClick={() => onOpenForm()}>
        Add Product
      </button>
    </div>

    {isProductFormOpen ? (
      <article className="admin-card">
        <div className="admin-card-header">
          <h2>{editingProduct ? "Edit Product" : "Add Product"}</h2>
          <button type="button" className="admin-button admin-button-light" onClick={onCloseForm}>
            Close
          </button>
        </div>
        <form className="admin-form admin-product-form" onSubmit={onSubmit}>
          <label>
            Category
            <select
              value={productForm.categories_id}
              onChange={(event) =>
                onProductFormChange((form) => ({ ...form, categories_id: event.target.value }))
              }
              required
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category.categories_id} value={category.categories_id}>
                  {category.category_name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Product Name
            <input
              value={productForm.product_name}
              onChange={(event) =>
                onProductFormChange((form) => ({ ...form, product_name: event.target.value }))
              }
              required
            />
          </label>

          <label>
            Product Description
            <textarea
              value={productForm.product_description}
              onChange={(event) =>
                onProductFormChange((form) => ({
                  ...form,
                  product_description: event.target.value,
                }))
              }
              rows="4"
            />
          </label>

          <label>
            Product Application
            <textarea
              value={productForm.product_application}
              placeholder={`Enter each application on a new line
Example:
Used in food processing
Suitable for herbal products
Used in nutraceutical applications`}
              onChange={(event) =>
                onProductFormChange((form) => ({
                  ...form,
                  product_application: event.target.value,
                }))
              }
              rows="6"
            />
          </label>

          {applicationPreviewItems.length ? (
            <div className="admin-application-preview">
              <strong>Application Preview</strong>
              <ul>
                {applicationPreviewItems.map((item, index) => (
                  <li key={`${item}-${index}`}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="admin-spec-box">
            <div className="admin-card-header">
              <h3>Product Specification</h3>
              <button type="button" className="admin-button admin-button-light" onClick={onAddSpecRow}>
                Add Row
              </button>
            </div>
            {specRows.map((row, index) => (
              <div
                className="admin-spec-row"
                key={row.id}
                draggable
                onDragStart={(event) => handleSpecDragStart(event, index)}
                onDragOver={handleSpecDragOver}
                onDrop={(event) => handleSpecDrop(event, index)}
              >
                <span className="admin-spec-drag-handle" aria-hidden="true">
                  {index + 1}
                </span>
                <input
                  placeholder="Key"
                  value={row.key}
                  onChange={(event) => onSpecRowChange(index, "key", event.target.value)}
                />
                <div className="admin-spec-value-cell">
                  <textarea
                    placeholder={`Value
Enter multiple values on separate lines`}
                    rows="2"
                    value={row.value}
                    onChange={(event) => onSpecRowChange(index, "value", event.target.value)}
                  />
                  {splitLineSeparatedText(row.value).length > 1 ? (
                    <ul className="admin-spec-value-preview">
                      {splitLineSeparatedText(row.value).map((item, itemIndex) => (
                        <li key={`${row.id}-${itemIndex}`}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
                <button type="button" onClick={() => onRemoveSpecRow(index)}>
                  Remove
                </button>
              </div>
            ))}
          </div>

          <label>
            Upload Product Image
            <input
              type="file"
              accept="image/*"
              onChange={(event) => onImageFileChange(event.target.files?.[0] || null)}
            />
          </label>

          {editingProduct?.image_name || imageFile ? (
            <div className="admin-current-image">
              {editingProduct?.image_name ? (
                <img
                  className="admin-product-preview"
                  src={`/api/products/${editingProduct.products_id}/image`}
                  alt={editingProduct.product_name}
                />
              ) : null}
              <small>
                {imageFile
                  ? `New image: ${imageFile.name}`
                  : `Current image: ${editingProduct.image_name}`}
              </small>
            </div>
          ) : null}

          <div className="admin-form-actions">
            <button type="submit" className="admin-button admin-button-primary" disabled={isSaving}>
              {isSaving ? "Saving..." : editingProduct ? "Update Product" : "Add Product"}
            </button>
          </div>
        </form>
      </article>
    ) : null}

    <article className="admin-card">
      <div className="admin-products-table-header">
        <h2>Products</h2>
        <span>
          {productPagination.totalItems}{" "}
          {productPagination.totalItems === 1 ? "product" : "products"}
        </span>
      </div>

      <form className="admin-product-filters" onSubmit={onProductSearchSubmit}>
        <label>
          Search Products
          <input
            value={productSearchInput}
            onChange={(event) => onProductSearchInputChange(event.target.value)}
            placeholder="Search by name, category, or description"
          />
        </label>
        <label>
          Category
          <select
            value={selectedProductCategory}
            onChange={(event) => onProductCategoryChange(event.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.categories_id} value={category.category_name}>
                {category.category_name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Page Size
          <select
            value={productLimit}
            onChange={(event) => onProductLimitChange(event.target.value)}
          >
            {[10, 20, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>
        <div className="admin-product-filter-actions">
          <button type="submit" className="admin-button admin-button-primary">
            Search
          </button>
          <button
            type="button"
            className="admin-button admin-button-light"
            onClick={onProductClearFilters}
          >
            Clear
          </button>
        </div>
      </form>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Product Image</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isProductsLoading ? (
              <tr>
                <td colSpan="6" className="admin-empty-cell">
                  Loading products...
                </td>
              </tr>
            ) : products.length ? (
              products.map((product) => (
                <tr key={product.products_id}>
                  <td>
                    {product.image_name ? (
                      <img
                        className="admin-product-thumb"
                        src={`/api/products/${product.products_id}/image`}
                        alt={product.product_name || "Product image"}
                      />
                    ) : (
                      <span
                        className="admin-product-thumb admin-product-thumb-empty"
                        aria-label="No product image"
                      />
                    )}
                  </td>
                  <td>{product.product_name}</td>
                  <td>{product.categories?.category_name || "-"}</td>
                  <td>{formatDate(product.created_at)}</td>
                  <td>{formatDate(product.updated_at)}</td>
                  <td>
                    <div className="admin-row-actions">
                      <button type="button" onClick={() => onOpenForm(product)}>
                        Edit
                      </button>
                      <button type="button" className="danger" onClick={() => onDelete(product)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="admin-empty-cell">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="admin-pagination">
        <button
          type="button"
          className="admin-button admin-button-light"
          disabled={!productPagination.hasPrevPage || isProductsLoading}
          onClick={() => onProductPageChange(productPagination.page - 1)}
        >
          Previous
        </button>
        <span>
          Page {productPagination.totalPages ? productPagination.page : 0} of{" "}
          {productPagination.totalPages}
        </span>
        <button
          type="button"
          className="admin-button admin-button-light"
          disabled={!productPagination.hasNextPage || isProductsLoading}
          onClick={() => onProductPageChange(productPagination.page + 1)}
        >
          Next
        </button>
      </div>
    </article>
  </div>
  );
};

export default AdminPanel;
