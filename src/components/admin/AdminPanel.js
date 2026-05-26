"use client";

/* eslint-disable @next/next/no-img-element */

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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

const emptyBlogForm = {
  blog_id: "",
  blog_read_time: "",
  blog_description: "",
  blog_video_url: "",
  blog_author: "",
  blog_quote: "",
  blog_metrics: [],
  blog_author_info: "",
};

const defaultPagination = {
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 0,
};

const buildAdminProductsUrl = ({ page, limit, search, category }) => {
  const params = new URLSearchParams();
  params.set("page", String(page || 1));
  params.set("limit", String(limit || 10));
  if (search) params.set("search", search);
  if (category) params.set("category", category);
  return `/api/admin/products?${params.toString()}`;
};

const buildAdminBlogCategoriesUrl = ({ page, limit, search }) => {
  const params = new URLSearchParams();
  params.set("page", String(page || 1));
  params.set("limit", String(limit || 10));
  if (search) params.set("search", search);
  return `/api/admin/blog/categories?${params.toString()}`;
};

const buildAdminBlogsUrl = ({
  page,
  limit,
  search,
  blogId,
  category,
  sortBy,
  sortOrder,
}) => {
  const params = new URLSearchParams();
  params.set("page", String(page || 1));
  params.set("limit", String(limit || 10));
  if (search) params.set("search", search);
  if (blogId) params.set("blog_id", blogId);
  if (category) params.set("category", category);
  if (sortBy) params.set("sortBy", sortBy);
  if (sortOrder) params.set("sortOrder", sortOrder);
  return `/api/admin/blog?${params.toString()}`;
};

const createSpecRow = (key = "", value = "") => ({
  id: globalThis.crypto?.randomUUID
    ? globalThis.crypto.randomUUID()
    : `${Date.now()}-${Math.random()}`,
  key,
  value,
});

const createMetricRow = (key = "", value = "") => ({
  id: globalThis.crypto?.randomUUID
    ? globalThis.crypto.randomUUID()
    : `${Date.now()}-${Math.random()}`,
  key,
  value,
});

const AutoResizeTextarea = ({
  value,
  onChange,
  minRows = 3,
  className = "",
  ...props
}) => {
  const textareaRef = useRef(null);

  const resizeToContent = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, []);

  useEffect(() => {
    resizeToContent();
  }, [value, resizeToContent]);

  return (
    <textarea
      {...props}
      ref={textareaRef}
      className={className}
      rows={minRows}
      value={value}
      onChange={(event) => {
        onChange?.(event);
        resizeToContent();
      }}
    />
  );
};

const stripHtml = (value = "") =>
  value
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();

const formatDate = (value) => {
  if (!value) return "-";
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(new Date(value));
};

const sectionLabel = (section) => {
  if (section === "blogCategories") return "Blog Categories";
  if (section === "blogs") return "Blogs";
  return section.charAt(0).toUpperCase() + section.slice(1);
};

const adminSidebarMenu = [
  { type: "link", section: "dashboard" },
  {
    type: "group",
    key: "productData",
    label: "Product Data",
    children: ["categories", "products"],
  },
  {
    type: "group",
    key: "blogData",
    label: "Blog Data",
    children: ["blogCategories", "blogs"],
  },
];

const AdminPanel = () => {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("dashboard");
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    message: "",
    confirmLabel: "Confirm",
    confirmTone: "primary",
    action: null,
  });
  const [pendingDeleteProduct, setPendingDeleteProduct] = useState(null);
  const [pendingDeleteCategory, setPendingDeleteCategory] = useState(null);
  const [pendingDeleteBlog, setPendingDeleteBlog] = useState(null);
  const [pendingDeleteBlogCategory, setPendingDeleteBlogCategory] = useState(null);
  const [shouldScrollToProductForm, setShouldScrollToProductForm] =
    useState(false);
  const [shouldScrollToBlogForm, setShouldScrollToBlogForm] = useState(false);
  const [openSidebarGroups, setOpenSidebarGroups] = useState(() => ({
    productData: false,
    blogData: false,
  }));
  const productFormRef = useRef(null);
  const blogFormRef = useRef(null);
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
  const [blogCategories, setBlogCategories] = useState([]);
  const [blogCategoryName, setBlogCategoryName] = useState("");
  const [editingBlogCategory, setEditingBlogCategory] = useState(null);
  const [blogCategoriesPage, setBlogCategoriesPage] = useState(1);
  const [blogCategoriesLimit, setBlogCategoriesLimit] = useState(10);
  const [blogCategoriesSearch, setBlogCategoriesSearch] = useState("");
  const [blogCategoriesPagination, setBlogCategoriesPagination] = useState(
    defaultPagination
  );
  const [isBlogCategoriesLoading, setIsBlogCategoriesLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [blogForm, setBlogForm] = useState(emptyBlogForm);
  const [editingBlog, setEditingBlog] = useState(null);
  const [isBlogFormOpen, setIsBlogFormOpen] = useState(false);
  const [blogImageFiles, setBlogImageFiles] = useState([]);
  const [removedBlogImageIds, setRemovedBlogImageIds] = useState([]);
  const [isBlogsLoading, setIsBlogsLoading] = useState(false);
  const [blogsPage, setBlogsPage] = useState(1);
  const [blogsLimit, setBlogsLimit] = useState(10);
  const [blogsSearchInput, setBlogsSearchInput] = useState("");
  const [appliedBlogsSearch, setAppliedBlogsSearch] = useState("");
  const [blogsFilterCategory, setBlogsFilterCategory] = useState("");
  const [blogsPagination, setBlogsPagination] = useState(defaultPagination);

  const recentCategories = useMemo(() => categories.slice(0, 5), [categories]);
  const recentProducts = useMemo(() => products.slice(0, 5), [products]);
  const recentBlogCategories = useMemo(
    () => blogCategories.slice(0, 5),
    [blogCategories]
  );
  const recentBlogs = useMemo(() => blogs.slice(0, 5), [blogs]);

  const isGroupActive = useCallback(
    (groupKey) =>
      adminSidebarMenu.some(
        (item) =>
          item.type === "group" &&
          item.key === groupKey &&
          item.children.includes(activeSection)
      ),
    [activeSection]
  );

  useEffect(() => {
    setOpenSidebarGroups((prev) => ({
      ...prev,
      ...(isGroupActive("productData") ? { productData: true } : {}),
      ...(isGroupActive("blogData") ? { blogData: true } : {}),
    }));
  }, [activeSection, isGroupActive]);

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
        throw new Error(result?.message || result?.error || "Request failed.");
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

  const loadBlogCategories = useCallback(
    async ({ page = 1, limit = 10, search = "" } = {}) => {
      setIsBlogCategoriesLoading(true);

      try {
        const result = await adminFetch(
          buildAdminBlogCategoriesUrl({ page, limit, search })
        );

        setBlogCategories(result.data || []);
        setBlogCategoriesPagination(result.pagination || defaultPagination);
        if (result.pagination?.page) setBlogCategoriesPage(result.pagination.page);
      } catch (error) {
        showNotice("error", error.message || "Unable to load blog categories.");
      } finally {
        setIsBlogCategoriesLoading(false);
      }
    },
    [adminFetch, showNotice]
  );

  const loadBlogs = useCallback(
    async ({
      page = 1,
      limit = 10,
      search = "",
      category = "",
    } = {}) => {
      setIsBlogsLoading(true);

      try {
        const result = await adminFetch(
          buildAdminBlogsUrl({
            page,
            limit,
            search,
            category,
          })
        );

        setBlogs(result.data || []);
        setBlogsPagination(result.pagination || defaultPagination);
        if (result.pagination?.page) setBlogsPage(result.pagination.page);
      } catch (error) {
        showNotice("error", error.message || "Unable to load blogs.");
      } finally {
        setIsBlogsLoading(false);
      }
    },
    [adminFetch, showNotice]
  );

  const loadAdminData = useCallback(async () => {
    setIsLoading(true);

    try {
      const categoriesResult = await adminFetch("/api/admin/categories");

      setCategories(categoriesResult.categories || []);
      await loadBlogCategories({
        page: blogCategoriesPage,
        limit: blogCategoriesLimit,
        search: blogCategoriesSearch,
      });
    } catch (error) {
      showNotice("error", error.message || "Unable to load admin data.");
    } finally {
      setIsLoading(false);
    }
  }, [
    adminFetch,
    showNotice,
    loadBlogCategories,
    blogCategoriesPage,
    blogCategoriesLimit,
    blogCategoriesSearch,
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

  useEffect(() => {
    const nextSearch = blogsSearchInput.trim();
    const timer = window.setTimeout(() => {
      setAppliedBlogsSearch((currentSearch) => {
        if (currentSearch === nextSearch) return currentSearch;
        return nextSearch;
      });
      setBlogsPage(1);
    }, 500);

    return () => window.clearTimeout(timer);
  }, [blogsSearchInput]);

  useEffect(() => {
    if (
      !shouldScrollToProductForm ||
      !isProductFormOpen ||
      activeSection !== "products"
    ) {
      return;
    }

    const timer = window.setTimeout(() => {
      if (productFormRef.current) {
        productFormRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      setShouldScrollToProductForm(false);
    }, 0);

    return () => window.clearTimeout(timer);
  }, [shouldScrollToProductForm, isProductFormOpen, activeSection]);

  useEffect(() => {
    if (!shouldScrollToBlogForm || !isBlogFormOpen || activeSection !== "blogs") {
      return;
    }

    const timer = window.setTimeout(() => {
      if (blogFormRef.current) {
        blogFormRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      setShouldScrollToBlogForm(false);
    }, 0);

    return () => window.clearTimeout(timer);
  }, [shouldScrollToBlogForm, isBlogFormOpen, activeSection]);

  useEffect(() => {
    if (!sessionChecked || isLoading) return;
    loadBlogCategories({
      page: blogCategoriesPage,
      limit: blogCategoriesLimit,
      search: blogCategoriesSearch,
    });
  }, [
    sessionChecked,
    isLoading,
    loadBlogCategories,
    blogCategoriesPage,
    blogCategoriesLimit,
    blogCategoriesSearch,
  ]);

  useEffect(() => {
    if (!sessionChecked || isLoading) return;
    loadBlogs({
      page: blogsPage,
      limit: blogsLimit,
      search: appliedBlogsSearch,
      category: blogsFilterCategory,
    });
  }, [
    sessionChecked,
    isLoading,
    loadBlogs,
    blogsPage,
    blogsLimit,
    appliedBlogsSearch,
    blogsFilterCategory,
  ]);

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

  const performDeleteCategory = async (category) => {
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

  const handleDeleteCategory = (category) => {
    setPendingDeleteCategory(category);
    openConfirmDialog({
      title: "Delete Category?",
      message: `Delete "${category.category_name}"? Products in this category will also be removed by your database cascade.`,
      confirmLabel: "Delete",
      confirmTone: "danger",
      action: "deleteCategory",
    });
  };

  const openProductForm = (product = null) => {
    setActiveSection("products");
    setEditingProduct(product);
    setIsProductFormOpen(true);
    setImageFile(null);
    setShouldScrollToProductForm(true);

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
      await loadProducts({
        page: productPage,
        limit: productLimit,
        search: appliedProductSearch,
        category: selectedProductCategory,
      });
    } catch (error) {
      showNotice("error", error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const performDeleteProduct = async (product) => {
    setIsSaving(true);
    try {
      await adminFetch(`/api/admin/products/${product.products_id}`, {
        method: "DELETE",
      });
      showNotice("success", "Product deleted.");

      if (products.length <= 1 && productPage > 1) {
        setProductPage((page) => page - 1);
      } else {
        await loadProducts({
          page: productPage,
          limit: productLimit,
          search: appliedProductSearch,
          category: selectedProductCategory,
        });
      }
    } catch (error) {
      showNotice("error", error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const openConfirmDialog = ({
    title,
    message,
    confirmLabel,
    confirmTone = "primary",
    action,
  }) => {
    setConfirmDialog({
      isOpen: true,
      title,
      message,
      confirmLabel,
      confirmTone,
      action,
    });
  };

  const closeConfirmDialog = () => {
    setConfirmDialog({
      isOpen: false,
      title: "",
      message: "",
      confirmLabel: "Confirm",
      confirmTone: "primary",
      action: null,
    });
    setPendingDeleteProduct(null);
    setPendingDeleteCategory(null);
    setPendingDeleteBlog(null);
    setPendingDeleteBlogCategory(null);
  };

  const handleDeleteProduct = (product) => {
    setPendingDeleteProduct(product);
    openConfirmDialog({
      title: "Delete Product?",
      message:
        "Are you sure you want to delete this product? This action cannot be undone.",
      confirmLabel: "Delete",
      confirmTone: "danger",
      action: "deleteProduct",
    });
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

  const resetBlogCategoryForm = () => {
    setBlogCategoryName("");
    setEditingBlogCategory(null);
  };

  const handleBlogCategorySubmit = async (event) => {
    event.preventDefault();
    const trimmedName = blogCategoryName.trim();

    if (!trimmedName) {
      showNotice("error", "Blog category is required.");
      return;
    }

    setIsSaving(true);
    try {
      const isEditing = Boolean(editingBlogCategory);
      await adminFetch(
        editingBlogCategory
          ? `/api/admin/blog/categories/${editingBlogCategory.blog_id}`
          : "/api/admin/blog/categories",
        {
          method: editingBlogCategory ? "PUT" : "POST",
          body: JSON.stringify({ blog_category: trimmedName }),
        }
      );
      showNotice(
        "success",
        editingBlogCategory ? "Blog category updated." : "Blog category added."
      );
      resetBlogCategoryForm();
      if (isEditing) {
        loadBlogCategories({
          page: blogCategoriesPage,
          limit: blogCategoriesLimit,
          search: blogCategoriesSearch,
        });
      } else {
        setBlogCategoriesSearch("");
        if (blogCategoriesPage === 1) {
          loadBlogCategories({
            page: 1,
            limit: blogCategoriesLimit,
            search: "",
          });
        } else {
          setBlogCategoriesPage(1);
        }
      }
    } catch (error) {
      showNotice("error", error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditBlogCategory = (category) => {
    setActiveSection("blogCategories");
    setEditingBlogCategory(category);
    setBlogCategoryName(category.blog_category || "");
  };

  const performDeleteBlogCategory = async (category) => {
    setIsSaving(true);
    try {
      await adminFetch(`/api/admin/blog/categories/${category.blog_id}`, {
        method: "DELETE",
      });
      showNotice("success", "Blog category deleted.");
      if (blogCategories.length <= 1 && blogCategoriesPage > 1) {
        setBlogCategoriesPage((page) => page - 1);
      } else {
        loadBlogCategories({
          page: blogCategoriesPage,
          limit: blogCategoriesLimit,
          search: blogCategoriesSearch,
        });
      }
      if (blogsFilterCategory && blogsFilterCategory === String(category.blog_id)) {
        setBlogsFilterCategory("");
      }
    } catch (error) {
      showNotice("error", error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteBlogCategory = (category) => {
    setPendingDeleteBlogCategory(category);
    openConfirmDialog({
      title: "Delete Blog Category?",
      message: `Delete "${category.blog_category}"? Related blog details will also be deleted by cascade.`,
      confirmLabel: "Delete",
      confirmTone: "danger",
      action: "deleteBlogCategory",
    });
  };

  const openBlogForm = (blog = null) => {
    setActiveSection("blogs");
    setEditingBlog(blog);
    setIsBlogFormOpen(true);
    setShouldScrollToBlogForm(true);

    if (blog) {
      setRemovedBlogImageIds([]);
      setBlogForm({
        blog_id: blog.blog_id ? String(blog.blog_id) : "",
        blog_read_time: blog.blog_read_time || "",
        blog_description: blog.blog_description || "",
        blog_video_url: blog.blog_video_url || "",
        blog_author: blog.blog_author || "",
        blog_quote: blog.blog_quote || "",
        blog_metrics:
          blog.blog_metrics && typeof blog.blog_metrics === "object"
            ? Object.entries(blog.blog_metrics).map(([key, value]) =>
                createMetricRow(key, String(value ?? ""))
              )
            : [createMetricRow()],
        blog_author_info: blog.blog_author_info || "",
      });
      return;
    }

    setBlogForm({ ...emptyBlogForm, blog_metrics: [createMetricRow()] });
    setBlogImageFiles([]);
    setRemovedBlogImageIds([]);
  };

  const closeBlogForm = () => {
    setIsBlogFormOpen(false);
    setEditingBlog(null);
    setBlogForm({ ...emptyBlogForm, blog_metrics: [createMetricRow()] });
    setBlogImageFiles([]);
    setRemovedBlogImageIds([]);
  };

  const handleBlogSubmit = async (event) => {
    event.preventDefault();

    if (!blogForm.blog_id) {
      showNotice("error", "Blog category is required.");
      return;
    }
    if (!stripHtml(blogForm.blog_description)) {
      showNotice("error", "Blog description is required.");
      return;
    }
    if (!blogForm.blog_author.trim()) {
      showNotice("error", "Blog author is required.");
      return;
    }

    const metricsRows = Array.isArray(blogForm.blog_metrics) ? blogForm.blog_metrics : [];
    const metricsEntries = metricsRows
      .map((row) => ({
        key: (row?.key || "").trim(),
        value: (row?.value || "").trim(),
      }))
      .filter((row) => row.key || row.value);

    if (metricsEntries.some((row) => !row.key || !row.value)) {
      showNotice("error", "Each blog metric needs both a key and a value.");
      return;
    }

    const parsedMetrics = metricsEntries.length
      ? metricsEntries.reduce((acc, row) => {
          acc[row.key] = row.value;
          return acc;
        }, {})
      : null;

    setIsSaving(true);
    try {
      const formData = new FormData();
      formData.append("blog_id", String(Number(blogForm.blog_id)));
      formData.append("blog_read_time", blogForm.blog_read_time.trim());
      formData.append("blog_description", blogForm.blog_description.trim());
      formData.append("blog_video_url", blogForm.blog_video_url.trim());
      formData.append("blog_author", blogForm.blog_author.trim());
      formData.append("blog_quote", blogForm.blog_quote.trim());
      formData.append("blog_author_info", blogForm.blog_author_info.trim());
      formData.append(
        "blog_metrics",
        parsedMetrics ? JSON.stringify(parsedMetrics) : ""
      );
      blogImageFiles.forEach((file) => {
        formData.append("images", file);
      });
      formData.append("remove_image_ids", JSON.stringify(removedBlogImageIds));

      await adminFetch(
        editingBlog ? `/api/admin/blog/${editingBlog.blog_detail_id}` : "/api/admin/blog",
        {
          method: editingBlog ? "PUT" : "POST",
          body: formData,
        }
      );
      showNotice("success", editingBlog ? "Blog updated." : "Blog added.");
      closeBlogForm();
      if (blogsPage === 1) {
        loadBlogs({
          page: 1,
          limit: blogsLimit,
          search: appliedBlogsSearch,
          category: blogsFilterCategory,
        });
      } else {
        setBlogsPage(1);
      }
    } catch (error) {
      showNotice("error", error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const performDeleteBlog = async (blog) => {
    setIsSaving(true);
    try {
      await adminFetch(`/api/admin/blog/${blog.blog_detail_id}`, { method: "DELETE" });
      showNotice("success", "Blog deleted.");
      if (blogs.length <= 1 && blogsPage > 1) {
        setBlogsPage((page) => page - 1);
      } else {
        loadBlogs({
          page: blogsPage,
          limit: blogsLimit,
          search: appliedBlogsSearch,
          category: blogsFilterCategory,
        });
      }
    } catch (error) {
      showNotice("error", error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteBlog = (blog) => {
    setPendingDeleteBlog(blog);
    openConfirmDialog({
      title: "Delete Blog?",
      message: `Are you sure you want to delete blog entry by "${blog.blog_author || "Unknown"}"? This action cannot be undone.`,
      confirmLabel: "Delete",
      confirmTone: "danger",
      action: "deleteBlog",
    });
  };

  const handleBlogCategoryPageChange = (page) => {
    if (page < 1) return;
    if (blogCategoriesPagination.totalPages > 0 && page > blogCategoriesPagination.totalPages) return;
    setBlogCategoriesPage(page);
  };

  const handleBlogCategoryLimitChange = (value) => {
    setBlogCategoriesLimit(Number(value));
    setBlogCategoriesPage(1);
  };

  const handleBlogCategorySearchSubmit = (event) => {
    event.preventDefault();
    setBlogCategoriesPage(1);
  };

  const handleBlogClearFilters = () => {
    setBlogsSearchInput("");
    setAppliedBlogsSearch("");
    setBlogsFilterCategory("");
    setBlogsPage(1);
  };

  const handleBlogsPageChange = (page) => {
    if (page < 1) return;
    if (blogsPagination.totalPages > 0 && page > blogsPagination.totalPages) return;
    setBlogsPage(page);
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/login");
    router.refresh();
  };

  const handleConfirmDialogConfirm = async () => {
    if (confirmDialog.action === "logout") {
      closeConfirmDialog();
      await handleLogout();
      return;
    }

    if (confirmDialog.action === "deleteProduct" && pendingDeleteProduct) {
      const productToDelete = pendingDeleteProduct;
      closeConfirmDialog();
      await performDeleteProduct(productToDelete);
      return;
    }

    if (confirmDialog.action === "deleteCategory" && pendingDeleteCategory) {
      const categoryToDelete = pendingDeleteCategory;
      closeConfirmDialog();
      await performDeleteCategory(categoryToDelete);
      return;
    }

    if (confirmDialog.action === "deleteBlog" && pendingDeleteBlog) {
      const blogToDelete = pendingDeleteBlog;
      closeConfirmDialog();
      await performDeleteBlog(blogToDelete);
      return;
    }

    if (
      confirmDialog.action === "deleteBlogCategory" &&
      pendingDeleteBlogCategory
    ) {
      const blogCategoryToDelete = pendingDeleteBlogCategory;
      closeConfirmDialog();
      await performDeleteBlogCategory(blogCategoryToDelete);
    }
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
    loadBlogCategories({
      page: blogCategoriesPage,
      limit: blogCategoriesLimit,
      search: blogCategoriesSearch,
    });
    loadBlogs({
      page: blogsPage,
      limit: blogsLimit,
      search: appliedBlogsSearch,
      category: blogsFilterCategory,
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
          <div className="admin-logo">
            <img src="/img/logo.png" alt="Orbitto" />
          </div>
          <nav className="admin-nav" aria-label="Admin navigation">
            {adminSidebarMenu.map((item) => {
              if (item.type === "link") {
                return (
                  <button
                    key={item.section}
                    type="button"
                    className={activeSection === item.section ? "active" : ""}
                    onClick={() => setActiveSection(item.section)}
                  >
                    {sectionLabel(item.section)}
                  </button>
                );
              }

              const isOpen = openSidebarGroups[item.key];
              const isActive = isGroupActive(item.key);

              return (
                <div
                  key={item.key}
                  className={`admin-nav-group ${isOpen ? "open" : ""}`}
                >
                  <button
                    type="button"
                    className={`admin-nav-dropdown-trigger ${isActive ? "active" : ""}`}
                    onClick={() =>
                      setOpenSidebarGroups((prev) => ({
                        ...prev,
                        [item.key]: !prev[item.key],
                      }))
                    }
                    aria-expanded={isOpen}
                  >
                    <span>{item.label}</span>
                    <span className={`admin-nav-chevron ${isOpen ? "open" : ""}`} aria-hidden="true">
                      <i className="fas fa-chevron-down" />
                    </span>
                  </button>

                  <div className="admin-nav-dropdown-panel">
                    {item.children.map((section) => (
                      <button
                        key={section}
                        type="button"
                        className={activeSection === section ? "active" : ""}
                        onClick={() => setActiveSection(section)}
                      >
                        {sectionLabel(section)}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </nav>
        </div>
        <button
          type="button"
          className="admin-logout"
          onClick={() =>
            openConfirmDialog({
              title: "Confirm Logout",
              message: "Are you sure you want to log out of the admin panel?",
              confirmLabel: "Yes, Logout",
              confirmTone: "primary",
              action: "logout",
            })
          }
        >
          <span className="admin-logout-icon" aria-hidden="true">
            <i className="fas fa-sign-out-alt" />
          </span>
          <span>Logout</span>
        </button>
      </aside>

      <section className="admin-main">
        <header className="admin-header">
          <div>
            <p>Admin Panel</p>
            <h1>{sectionLabel(activeSection)}</h1>
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
            blogCategories={blogCategories}
            blogs={blogs}
            totalBlogs={blogsPagination.total}
            recentCategories={recentCategories}
            recentProducts={recentProducts}
            recentBlogCategories={recentBlogCategories}
            recentBlogs={recentBlogs}
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
            formRef={productFormRef}
          />
        ) : null}

        {!isLoading && activeSection === "blogCategories" ? (
          <BlogCategoriesManager
            blogCategories={blogCategories}
            blogCategoryName={blogCategoryName}
            editingBlogCategory={editingBlogCategory}
            isSaving={isSaving}
            isLoading={isBlogCategoriesLoading}
            pagination={blogCategoriesPagination}
            search={blogCategoriesSearch}
            limit={blogCategoriesLimit}
            onSearchChange={setBlogCategoriesSearch}
            onSearchSubmit={handleBlogCategorySearchSubmit}
            onLimitChange={handleBlogCategoryLimitChange}
            onPageChange={handleBlogCategoryPageChange}
            onCategoryNameChange={setBlogCategoryName}
            onSubmit={handleBlogCategorySubmit}
            onCancel={resetBlogCategoryForm}
            onEdit={handleEditBlogCategory}
            onDelete={handleDeleteBlogCategory}
          />
        ) : null}

        {!isLoading && activeSection === "blogs" ? (
          <BlogsManager
            blogCategories={blogCategories}
            blogs={blogs}
            blogForm={blogForm}
            editingBlog={editingBlog}
            isBlogFormOpen={isBlogFormOpen}
            isSaving={isSaving}
            isBlogsLoading={isBlogsLoading}
            blogsSearchInput={blogsSearchInput}
            blogsFilterCategory={blogsFilterCategory}
            blogsLimit={blogsLimit}
            blogsPagination={blogsPagination}
            onOpenForm={openBlogForm}
            onCloseForm={closeBlogForm}
            onBlogFormChange={setBlogForm}
            onBlogsSearchInputChange={setBlogsSearchInput}
            onBlogsFilterCategoryChange={setBlogsFilterCategory}
            onBlogsLimitChange={setBlogsLimit}
            onBlogsPageChange={handleBlogsPageChange}
            onBlogsClearFilters={handleBlogClearFilters}
            onSubmit={handleBlogSubmit}
            onDelete={handleDeleteBlog}
            blogImageFiles={blogImageFiles}
            onBlogImageFilesChange={setBlogImageFiles}
            removedBlogImageIds={removedBlogImageIds}
            onRemovedBlogImageIdsChange={setRemovedBlogImageIds}
            formRef={blogFormRef}
          />
        ) : null}
      </section>
      {confirmDialog.isOpen ? (
        <div
          className="admin-confirm-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="admin-confirm-title"
          onClick={closeConfirmDialog}
        >
          <div className="admin-confirm-card" onClick={(event) => event.stopPropagation()}>
            <h2 id="admin-confirm-title">{confirmDialog.title}</h2>
            <p>{confirmDialog.message}</p>
            <div className="admin-confirm-actions">
              <button
                type="button"
                className="admin-button admin-button-light"
                onClick={closeConfirmDialog}
              >
                Cancel
              </button>
              <button
                type="button"
                className={`admin-button ${
                  confirmDialog.confirmTone === "danger"
                    ? "admin-button-danger"
                    : "admin-button-primary"
                }`}
                onClick={handleConfirmDialogConfirm}
              >
                {confirmDialog.confirmLabel}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
};

const Dashboard = ({
  categories,
  totalProducts,
  blogCategories,
  totalBlogs,
  recentCategories,
  recentProducts,
  recentBlogCategories,
  recentBlogs,
}) => (
  <div className="admin-grid">
    <article className="admin-stat-card">
      <span>Total Categories</span>
      <strong>{categories.length}</strong>
    </article>
    <article className="admin-stat-card">
      <span>Total Products</span>
      <strong>{totalProducts}</strong>
    </article>
    <article className="admin-stat-card">
      <span>Total Blog Categories</span>
      <strong>{blogCategories.length}</strong>
    </article>
    <article className="admin-stat-card">
      <span>Total Blogs</span>
      <strong>{totalBlogs}</strong>
    </article>
    <RecentList title="Recently Added Products" items={recentProducts} labelKey="product_name" />
    <RecentList title="Recently Added Categories" items={recentCategories} labelKey="category_name" />
    <RecentList
      title="Recently Added Blog Entries"
      items={recentBlogs}
      labelKey="blog_description"
    />
    <RecentList
      title="Recently Added Blog Categories"
      items={recentBlogCategories}
      labelKey="blog_category"
    />
  </div>
);

const RecentList = ({ title, items, labelKey }) => (
  <article className="admin-card">
    <h2>{title}</h2>
    {items.length ? (
      <ul className="admin-recent-list">
        {items.map((item) => (
          <li
            key={
              item.products_id ||
              item.categories_id ||
              item.blog_detail_id ||
              item.blog_id
            }
          >
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

const BlogCategoriesManager = ({
  blogCategories,
  blogCategoryName,
  editingBlogCategory,
  isSaving,
  isLoading,
  pagination,
  search,
  limit,
  onSearchChange,
  onSearchSubmit,
  onLimitChange,
  onPageChange,
  onCategoryNameChange,
  onSubmit,
  onCancel,
  onEdit,
  onDelete,
}) => (
  <div className="admin-stack">
    <article className="admin-card">
      <h2>{editingBlogCategory ? "Edit Blog Category" : "Add Blog Category"}</h2>
      <form className="admin-form admin-inline-form" onSubmit={onSubmit}>
        <label>
          Blog Category
          <input
            value={blogCategoryName}
            onChange={(event) => onCategoryNameChange(event.target.value)}
            required
          />
        </label>
        <div className="admin-form-actions">
          <button type="submit" className="admin-button admin-button-primary" disabled={isSaving}>
            {isSaving
              ? "Saving..."
              : editingBlogCategory
                ? "Update Blog Category"
                : "Add Blog Category"}
          </button>
          {editingBlogCategory ? (
            <button type="button" className="admin-button admin-button-light" onClick={onCancel}>
              Cancel
            </button>
          ) : null}
        </div>
      </form>
    </article>

    <article className="admin-card">
      <div className="admin-products-table-header">
        <h2>Blog Categories</h2>
        <span>
          {pagination.total} {pagination.total === 1 ? "category" : "categories"}
        </span>
      </div>

      <form className="admin-product-filters" onSubmit={onSearchSubmit}>
        <label>
          Search Blog Categories
          <input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search by category name"
          />
        </label>
        <label>
          Page Size
          <select value={limit} onChange={(event) => onLimitChange(event.target.value)}>
            {[10, 20, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>
      </form>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Blog ID</th>
              <th>Category Name</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="4" className="admin-empty-cell">
                  Loading blog categories...
                </td>
              </tr>
            ) : blogCategories.length ? (
              blogCategories.map((category) => (
                <tr key={category.blog_id}>
                  <td>{category.blog_id}</td>
                  <td>{category.blog_category}</td>
                  <td>{formatDate(category.created_at)}</td>
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
                  No blog categories found.
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
          disabled={pagination.page <= 1 || isLoading}
          onClick={() => onPageChange(pagination.page - 1)}
        >
          Previous
        </button>
        <span>
          Page {pagination.totalPages ? pagination.page : 0} of {pagination.totalPages}
        </span>
        <button
          type="button"
          className="admin-button admin-button-light"
          disabled={pagination.page >= pagination.totalPages || isLoading}
          onClick={() => onPageChange(pagination.page + 1)}
        >
          Next
        </button>
      </div>
    </article>
  </div>
);

const BlogDescriptionEditor = ({ blogForm, onBlogFormChange }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (!editorRef.current) return;
    if (editorRef.current.innerHTML === (blogForm.blog_description || "")) return;
    editorRef.current.innerHTML = blogForm.blog_description || "";
  }, [blogForm.blog_description]);

  const applyFormat = (command, value = null) => {
    editorRef.current?.focus();
    document.execCommand(command, false, value);
    onBlogFormChange((form) => ({
      ...form,
      blog_description: editorRef.current?.innerHTML || "",
    }));
  };

  return (
    <label className="admin-blog-description-field">
      Blog Description
      <div className="admin-rich-editor-wrap">
        <div className="admin-rich-editor-toolbar">
          <button type="button" className="admin-button admin-button-light" onClick={() => applyFormat("bold")}>
            Bold
          </button>
          <button type="button" className="admin-button admin-button-light" onClick={() => applyFormat("italic")}>
            Italic
          </button>
          <button
            type="button"
            className="admin-button admin-button-light"
            onClick={() => applyFormat("fontSize", "4")}
          >
            Large
          </button>
          <button
            type="button"
            className="admin-button admin-button-light"
            onClick={() => applyFormat("fontSize", "3")}
          >
            Normal
          </button>
        </div>
        <div
          ref={editorRef}
          className="admin-rich-editor-canvas"
          contentEditable
          suppressContentEditableWarning
          onInput={() =>
            onBlogFormChange((form) => ({
              ...form,
              blog_description: editorRef.current?.innerHTML || "",
            }))
          }
          data-placeholder="Write formatted blog content here..."
        />
      </div>
    </label>
  );
};

const BlogImageUploadField = ({
  editingBlog,
  blogImageFiles,
  onBlogImageFilesChange,
  removedBlogImageIds,
  onRemovedBlogImageIdsChange,
}) => {
  const uploadedImagePreviewUrls = useMemo(
    () => (blogImageFiles || []).map((file) => URL.createObjectURL(file)),
    [blogImageFiles]
  );

  useEffect(() => {
    return () => {
      uploadedImagePreviewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [uploadedImagePreviewUrls]);

  const existingImages = (editingBlog?.blog_images || [])
    .slice()
    .filter((item) => !removedBlogImageIds.includes(item.image_id))
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
  const hasExistingImage = Boolean(existingImages.length || editingBlog?.blog_image);
  const fallbackExistingImageSrc =
    editingBlog?.blog_detail_id ? `/api/blog/${editingBlog.blog_detail_id}/image` : "";

  const combinedPreviewItems = [
    ...existingImages.map((image, index) => ({
      kind: "saved",
      id: image.image_id || `saved-${index}`,
      src: `/api/blog/image/${image.image_id}`,
      label: index === 0 ? "Saved primary image" : `Saved image ${index + 1}`,
      imageId: image.image_id,
    })),
    ...uploadedImagePreviewUrls.map((previewUrl, index) => ({
      kind: "new",
      id: `new-${index}-${previewUrl}`,
      src: previewUrl,
      label:
        index === 0
          ? `New image: ${blogImageFiles[index]?.name || "Selected"}`
          : `New image: ${blogImageFiles[index]?.name || "Selected"}`,
      fileIndex: index,
    })),
  ];

  if (!combinedPreviewItems.length && hasExistingImage && fallbackExistingImageSrc) {
    combinedPreviewItems.push({
      kind: "saved-fallback",
      id: "saved-fallback",
      src: fallbackExistingImageSrc,
      label: "Current image from saved blog",
    });
  }

  return (
    <label>
      Upload Blog Image
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={(event) =>
          onBlogImageFilesChange([
            ...(blogImageFiles || []),
            ...Array.from(event.target.files || []),
          ])
        }
      />
      {combinedPreviewItems.length ? (
        <div className="admin-blog-upload-previews">
          {combinedPreviewItems.map((item, index) => (
            <div key={item.id || index} className="admin-current-image admin-blog-image-card">
              <img
                src={item.src}
                alt={`Blog upload preview ${index + 1}`}
                className="admin-product-thumb"
              />
              <small className="admin-blog-image-name">{item.label}</small>
              {item.kind === "saved" ? (
                <button
                  type="button"
                  className="admin-button admin-button-light admin-button-compact"
                  onClick={() =>
                    onRemovedBlogImageIdsChange([
                      ...(removedBlogImageIds || []),
                      item.imageId,
                    ])
                  }
                >
                  Delete
                </button>
              ) : null}
              {item.kind === "new" ? (
                <button
                  type="button"
                  className="admin-button admin-button-light admin-button-compact"
                  onClick={() =>
                    onBlogImageFilesChange(
                      (blogImageFiles || []).filter((_, fileIndex) => fileIndex !== item.fileIndex)
                    )
                  }
                >
                  Remove
                </button>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}
    </label>
  );
};

const BlogsManager = ({
  blogCategories,
  blogs,
  blogForm,
  editingBlog,
  isBlogFormOpen,
  isSaving,
  isBlogsLoading,
  blogsSearchInput,
  blogsFilterCategory,
  blogsLimit,
  blogsPagination,
  onOpenForm,
  onCloseForm,
  onBlogFormChange,
  onBlogsSearchInputChange,
  onBlogsFilterCategoryChange,
  onBlogsLimitChange,
  onBlogsPageChange,
  onBlogsClearFilters,
  onSubmit,
  onDelete,
  blogImageFiles,
  onBlogImageFilesChange,
  removedBlogImageIds,
  onRemovedBlogImageIdsChange,
  formRef,
}) => (
  <div className="admin-stack">
    <div className="admin-section-actions">
      <button type="button" className="admin-button admin-button-primary" onClick={() => onOpenForm()}>
        Add Blog
      </button>
    </div>

    {isBlogFormOpen ? (
      <article className="admin-card" ref={formRef}>
        <div className="admin-card-header">
          <h2>{editingBlog ? "Edit Blog" : "Add Blog"}</h2>
          <button type="button" className="admin-button admin-button-light" onClick={onCloseForm}>
            Close
          </button>
        </div>

        <form className="admin-form admin-product-form" onSubmit={onSubmit}>
          <label>
            Blog Category
            <select
              value={blogForm.blog_id}
              onChange={(event) =>
                onBlogFormChange((form) => ({ ...form, blog_id: event.target.value }))
              }
              required
            >
              <option value="">Select blog category</option>
              {blogCategories.map((category) => (
                <option key={category.blog_id} value={category.blog_id}>
                  {category.blog_category}
                </option>
              ))}
            </select>
          </label>

          <label>
            Blog Author
            <input
              value={blogForm.blog_author}
              onChange={(event) =>
                onBlogFormChange((form) => ({ ...form, blog_author: event.target.value }))
              }
              required
            />
          </label>

          <label>
            Read Time
            <input
              value={blogForm.blog_read_time}
              onChange={(event) =>
                onBlogFormChange((form) => ({ ...form, blog_read_time: event.target.value }))
              }
            />
          </label>

          <BlogImageUploadField
            editingBlog={editingBlog}
            blogImageFiles={blogImageFiles}
            onBlogImageFilesChange={onBlogImageFilesChange}
            removedBlogImageIds={removedBlogImageIds}
            onRemovedBlogImageIdsChange={onRemovedBlogImageIdsChange}
          />

          <label>
            Video URL
            <input
              value={blogForm.blog_video_url}
              onChange={(event) =>
                onBlogFormChange((form) => ({ ...form, blog_video_url: event.target.value }))
              }
            />
          </label>

          <label>
            Blog Quote
            <input
              value={blogForm.blog_quote}
              onChange={(event) =>
                onBlogFormChange((form) => ({ ...form, blog_quote: event.target.value }))
              }
            />
          </label>

          <BlogDescriptionEditor blogForm={blogForm} onBlogFormChange={onBlogFormChange} />

          <label className="admin-blog-metrics-field">
            Blog Metrics
            <div className="admin-metric-list">
              {(blogForm.blog_metrics || []).map((metric, index) => (
                <div className="admin-metric-row" key={metric.id || index}>
                  <input
                    placeholder="Metric Key"
                    value={metric.key}
                    onChange={(event) =>
                      onBlogFormChange((form) => ({
                        ...form,
                        blog_metrics: (form.blog_metrics || []).map((row, rowIndex) =>
                          rowIndex === index ? { ...row, key: event.target.value } : row
                        ),
                      }))
                    }
                  />
                  <input
                    placeholder="Metric Value"
                    value={metric.value}
                    onChange={(event) =>
                      onBlogFormChange((form) => ({
                        ...form,
                        blog_metrics: (form.blog_metrics || []).map((row, rowIndex) =>
                          rowIndex === index ? { ...row, value: event.target.value } : row
                        ),
                      }))
                    }
                  />
                  <button
                    type="button"
                    className="admin-button admin-button-light admin-button-compact"
                    onClick={() =>
                      onBlogFormChange((form) => ({
                        ...form,
                        blog_metrics: (form.blog_metrics || []).filter((_, rowIndex) => rowIndex !== index),
                      }))
                    }
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="admin-button admin-button-light admin-button-compact admin-metric-add-button"
                onClick={() =>
                  onBlogFormChange((form) => ({
                    ...form,
                    blog_metrics: [...(form.blog_metrics || []), createMetricRow()],
                  }))
                }
              >
                Add Metric
              </button>
            </div>
          </label>

          <label>
            Author Info
            <textarea
              rows="4"
              value={blogForm.blog_author_info}
              onChange={(event) =>
                onBlogFormChange((form) => ({ ...form, blog_author_info: event.target.value }))
              }
            />
          </label>

          <div className="admin-form-actions">
            <button type="submit" className="admin-button admin-button-primary" disabled={isSaving}>
              {isSaving ? "Saving..." : editingBlog ? "Update Blog" : "Add Blog"}
            </button>
          </div>
        </form>
      </article>
    ) : null}

    <article className="admin-card">
      <div className="admin-products-table-header">
        <h2>Blogs</h2>
        <span>{blogsPagination.total} entries</span>
      </div>

      <form className="admin-product-filters" onSubmit={(event) => event.preventDefault()}>
        <label>
          Search
          <input
            value={blogsSearchInput}
            onChange={(event) => onBlogsSearchInputChange(event.target.value)}
            placeholder="Search by description, author, or category"
          />
        </label>
        <label>
          Blog Category
          <select
            value={blogsFilterCategory}
            onChange={(event) => {
              onBlogsFilterCategoryChange(event.target.value);
              onBlogsPageChange(1);
            }}
          >
            <option value="">All Categories</option>
            {blogCategories.map((category) => (
              <option key={category.blog_id} value={category.blog_id}>
                {category.blog_category}
              </option>
            ))}
          </select>
        </label>
        <label>
          Page Size
          <select
            value={blogsLimit}
            onChange={(event) => {
              onBlogsLimitChange(Number(event.target.value));
              onBlogsPageChange(1);
            }}
          >
            {[10, 20, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>
        <div className="admin-product-filter-actions">
          <button type="button" className="admin-button admin-button-light" onClick={onBlogsClearFilters}>
            Clear
          </button>
        </div>
      </form>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Detail ID</th>
              <th>Image</th>
              <th>Category</th>
              <th>Author</th>
              <th>Description</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isBlogsLoading ? (
              <tr>
                <td colSpan="8" className="admin-empty-cell">
                  Loading blogs...
                </td>
              </tr>
            ) : blogs.length ? (
              blogs.map((blog) => (
                <tr key={blog.blog_detail_id}>
                  <td>{blog.blog_detail_id}</td>
                  <td>
                    {blog.blog_images?.length ? (
                      <img
                        className="admin-product-thumb"
                        src={`/api/blog/image/${blog.blog_images
                          .slice()
                          .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))[0]?.image_id}`}
                        alt={blog.blog_author || "Blog image"}
                      />
                    ) : blog.blog_image ? (
                      <img
                        className="admin-product-thumb"
                        src={`/api/blog/${blog.blog_detail_id}/image`}
                        alt={blog.blog_author || "Blog image"}
                      />
                    ) : (
                      <span
                        className="admin-product-thumb admin-product-thumb-empty"
                        aria-label="No blog image"
                      >
                        N/A
                      </span>
                    )}
                  </td>
                  <td>{blog.blog?.blog_category || "-"}</td>
                  <td>{blog.blog_author || "-"}</td>
                  <td>{(blog.blog_description || "").slice(0, 80)}</td>
                  <td>{formatDate(blog.created_at)}</td>
                  <td>{formatDate(blog.updated_at)}</td>
                  <td>
                    <div className="admin-row-actions">
                      <button type="button" onClick={() => onOpenForm(blog)}>
                        Edit
                      </button>
                      <button type="button" className="danger" onClick={() => onDelete(blog)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="admin-empty-cell">
                  No blogs found.
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
          disabled={blogsPagination.page <= 1 || isBlogsLoading}
          onClick={() => onBlogsPageChange(blogsPagination.page - 1)}
        >
          Previous
        </button>
        <span>
          Page {blogsPagination.totalPages ? blogsPagination.page : 0} of {blogsPagination.totalPages}
        </span>
        <button
          type="button"
          className="admin-button admin-button-light"
          disabled={blogsPagination.page >= blogsPagination.totalPages || isBlogsLoading}
          onClick={() => onBlogsPageChange(blogsPagination.page + 1)}
        >
          Next
        </button>
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
  formRef,
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
      <article className="admin-card" ref={formRef}>
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
            <AutoResizeTextarea
              value={productForm.product_description}
              onChange={(event) =>
                onProductFormChange((form) => ({
                  ...form,
                  product_description: event.target.value,
                }))
              }
              minRows={4}
            />
          </label>

          <label>
            Product Application
            <AutoResizeTextarea
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
              minRows={6}
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
                  <AutoResizeTextarea
                    placeholder={`Value
Enter multiple values on separate lines`}
                    minRows={2}
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


