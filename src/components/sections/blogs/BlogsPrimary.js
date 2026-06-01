"use client";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

const categoryColors = {
  Science: { bg: "#e8f0e4", text: "#2d5a1e" },
  Trends: { bg: "#fdf0e0", text: "#7a4a10" },
  Technology: { bg: "#e8edf5", text: "#1e3a5f" },
  Nutrition: { bg: "#e4f0e8", text: "#1a4a2a" },
};

const formatDate = (value) =>
  new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

const normalizeCategoryId = (value = "") => value.toLowerCase().replace(/\s+/g, "-");

const CalendarIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const BlogCard = ({ blog }) => {
  const [hovered, setHovered] = useState(false);
  const blogTitle = blog.title || blog.blog_author || "Orbitto Article";
  const category = blog.blog?.blog_category || "General";
  const cat = categoryColors[category] || categoryColors.Science;
  const coverSrc = blog.blog_images?.length
    ? `/api/blog/image/${blog.blog_images.slice().sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))[0].image_id}`
    : `/api/blog/${blog.blog_detail_id}/image`;

  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ overflow: "hidden", transition: "all 0.35s ease", transform: hovered ? "translateY(-6px)" : "translateY(0px)", display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ height: "260px", overflow: "hidden", position: "relative" }}>
        <Image src={coverSrc} alt={blogTitle} fill sizes="(max-width: 768px) 100vw, 384px" style={{ objectFit: "cover", transition: "transform 0.5s ease", transform: hovered ? "scale(1.06)" : "scale(1)" }} />
        <div style={{ position: "absolute", top: "16px", left: "16px", background: "#ffffff", padding: "6px 14px", borderRadius: "999px", fontSize: "12px", fontWeight: "600", color: "#1d3d19" }}>{category}</div>
      </div>
      <div style={{ background: cat.bg, padding: "24px 26px 26px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#7b7b7b", marginBottom: "18px" }}>
          <CalendarIcon />
          <span>{formatDate(blog.created_at)}</span>
          <span>•</span>
          <span>{blog.blog_read_time || "5 min read"}</span>
        </div>
        <h3 style={{ fontSize: "20px", lineHeight: "1.28", marginBottom: "16px", color: "#1d1d1d", fontWeight: "700", letterSpacing: "-0.03em" }}>{blogTitle}</h3>
        <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#5d5d5d", marginBottom: "28px", flex: 1 }}>{blog.excerpt || ""}</p>
        <Link href={`/blogs/${blog.blog_detail_id}`} style={{ display: "inline-flex", alignItems: "center", gap: "10px", textDecoration: "none", fontSize: "18px", fontWeight: "600", color: cat.text }}>
          Read Article
          <span style={{ width: "34px", height: "34px", borderRadius: "50%", background: "#dce9c9", display: "flex", alignItems: "center", justifyContent: "center", transform: hovered ? "translateX(4px)" : "translateX(0)" }}>
            <ArrowIcon />
          </span>
        </Link>
      </div>
    </div>
  );
};

const BlogsPrimary = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState("all");
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadBlogs = async () => {
      setIsLoading(true);
      const response = await fetch("/api/blog", { cache: "no-store" });
      const result = await response.json().catch(() => ({}));
      setBlogs(result.data || []);
      setIsLoading(false);
    };
    loadBlogs();
  }, []);

  useEffect(() => {
    const selectedCategory = searchParams?.get("category");
    setActiveCategory(selectedCategory ? normalizeCategoryId(selectedCategory) : "all");
  }, [searchParams]);

  const categories = useMemo(() => {
    const all = Array.from(new Set(blogs.map((item) => item.blog?.blog_category).filter(Boolean)));
    return [{ id: "all", label: "All Insights", icon: "✦" }, ...all.map((label) => ({ id: normalizeCategoryId(label), label, icon: "◉" }))];
  }, [blogs]);

  const filtered = activeCategory === "all"
    ? blogs
    : blogs.filter((b) => normalizeCategoryId(b.blog?.blog_category || "") === activeCategory);

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    if (categoryId === "all") {
      router.push("/blogs");
      return;
    }

    const params = new URLSearchParams({
      category: categoryId,
    });
    router.push(`/blogs?${params.toString()}`);
  };

  return (
    <div className="news-page" style={{ background: "#ffffff", minHeight: "100vh", width: "100%" }}>
      <div style={{ textAlign: "center", padding: "60px 24px 40px" }}>
        <h2 style={{ fontSize: "clamp(40px, 6vw, 60px)", fontWeight: "800", color: "#1a3a18", margin: "0 0 16px", letterSpacing: "-0.03em", lineHeight: "1.1" }}>Export Insights & Ingredient Articles</h2>
        <p style={{ fontSize: "15px", color: "#5a7050", maxWidth: "440px", margin: "0 auto", lineHeight: "1.6" }}>
          Explore Orbitto International updates on ingredient applications, export readiness, category trends, and sourcing insights for global buyers.
        </p>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "8px", padding: "0 24px 48px", flexWrap: "wrap" }}>
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button key={cat.id} onClick={() => handleCategoryChange(cat.id)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", padding: "10px 22px", border: "1.5px solid #dde8cc", background: isActive ? "#1e4d14" : "#ffffff", color: isActive ? "#ffffff" : "#4a6a38", fontWeight: "600", fontSize: "12px", cursor: "pointer", minWidth: "140px" }}>
              <span style={{ fontSize: "13px", opacity: isActive ? 1 : 0.7 }}>{cat.icon}</span>
              {cat.label}
            </button>
          );
        })}
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px 64px" }}>
        {isLoading ? (
          <div style={{ textAlign: "center", color: "#7a8f6e", padding: "48px" }}>Loading articles...</div>
        ) : !filtered.length ? (
          <div style={{ textAlign: "center", color: "#7a8f6e", padding: "48px" }}>No articles found in this category.</div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%, 320px),1fr))", gap: "28px", alignItems: "stretch" }}>
            {filtered.map((blog) => (
              <div
                key={blog.blog_detail_id}
                style={
                  filtered.length === 1
                    ? { maxWidth: "420px", marginLeft: "auto", marginRight: "auto", width: "100%" }
                    : undefined
                }
              >
                <BlogCard blog={blog} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogsPrimary;
