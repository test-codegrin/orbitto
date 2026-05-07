"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const categories = [
  { id: "all", label: "All Insights", icon: "✦" },
  { id: "science", label: "Science", icon: "⚗" },
  { id: "trends", label: "Trends", icon: "↗" },
  { id: "technology", label: "Technology", icon: "⬡" },
  { id: "nutrition", label: "Nutrition", icon: "◎" },
];

const blogs = [
  {
    id: 1,
    category: "Science",
    date: "Oct 24, 2024",
    readTime: "5 min read",
    title: "The Bioavailability of Plant-Based Proteins",
    excerpt:
      "Understanding how our bodies absorb and utilize different forms of plant proteins, and why micro-milling matters for optimal nutrition.",
    image:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80",
    imageBg: "#2d5a27",
  },
  {
    id: 2,
    category: "Trends",
    date: "Oct 18, 2024",
    readTime: "8 min read",
    title: "Adaptogens: The New Standard in Daily Supplements",
    excerpt:
      "How ancient roots and mushrooms are being standardized into modern functional powders for stress resilience and focus.",
    image:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=80",
    imageBg: "#c87941",
  },
  {
    id: 3,
    category: "Technology",
    date: "Oct 12, 2024",
    readTime: "6 min read",
    title: "Next-Gen Extraction Methods for Maximum Potency",
    excerpt:
      "A deep dive into cold-water extraction techniques that preserve delicate phytonutrients without using harsh chemical solvents.",
    image:
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&q=80",
    imageBg: "#374151",
  },
  {
    id: 4,
    category: "Nutrition",
    date: "Oct 05, 2024",
    readTime: "4 min read",
    title: "The Synergy of Greens and Probiotics",
    excerpt:
      "Why combining your daily greens powder with a robust probiotic blend enhances gut health and overall vitality far beyond taking them separately.",
    image:
      "https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=600&q=80",
    imageBg: "#1a6b3c",
  },
];

const categoryColors = {
  Science: { bg: "#e8f0e4", text: "#2d5a1e", dot: "#3d7a2a" },
  Trends: { bg: "#fdf0e0", text: "#7a4a10", dot: "#c87941" },
  Technology: { bg: "#e8edf5", text: "#1e3a5f", dot: "#3a6aad" },
  Nutrition: { bg: "#e4f0e8", text: "#1a4a2a", dot: "#2d7a48" },
};

const CalendarIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const ArrowIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const BlogCard = ({ blog }) => {
  const [hovered, setHovered] = useState(false);

  const cardBg = {
    Science: "#f7f4ef",
    Trends: "#f8eded",
    Technology: "#eef6df",
    Nutrition: "#edf6ea",
  };
  const cat = categoryColors[blog.category] || categoryColors.Science;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        overflow: "hidden",
        transition: "all 0.35s ease",
        transform: hovered ? "translateY(-6px)" : "translateY(0px)",
        boxShadow: hovered
          ? "0 18px 45px rgba(20,40,10,0.12)"
          : "0 4px 18px rgba(20,40,10,0.06)",
      }}
    >
      {/* IMAGE */}
      <div
        style={{
          height: "260px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 384px"
          style={{
            objectFit: "cover",
            transition: "transform 0.5s ease",
            transform: hovered ? "scale(1.06)" : "scale(1)",
          }}
        />

        {/* CATEGORY */}
        <div
          style={{
            position: "absolute",
            top: "16px",
            left: "16px",
            background: "#ffffff",
            padding: "6px 14px",
            borderRadius: "999px",
            fontSize: "12px",
            fontWeight: "600",
            color: "#1d3d19",
            boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
          }}
        >
          {blog.category}
        </div>
      </div>

      {/* CONTENT */}
      <div
        style={{
          background: cardBg[blog.category],
          padding: "24px 26px 26px",
          position: "relative",
          zIndex: 2,
          minHeight: "300px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* CURVE EFFECT */}
        <div
          style={{
            position: "absolute",
            // top: "2px",
            left: 0,
            width: "100%",
            height: "45px",
            background: cardBg[blog.category],
            zIndex: -1,
          }}
        />

        {/* META */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "13px",
            color: "#7b7b7b",
            marginBottom: "18px",
          }}
        >
          <CalendarIcon />
          <span>{blog.date}</span>
          <span>•</span>
          <span>{blog.readTime}</span>
        </div>

        {/* TITLE */}
        <h3
          style={{
            fontSize: "20px",
            lineHeight: "1.28",
            marginBottom: "16px",
            color: "#1d1d1d",
            fontWeight: "700",
            letterSpacing: "-0.03em",
          }}
        >
          {blog.title}
        </h3>

        {/* DESCRIPTION */}
        <p
          style={{
            fontSize: "15px",
            lineHeight: "1.7",
            color: "#5d5d5d",
            marginBottom: "28px",
            flex: 1,
          }}
        >
          {blog.excerpt}
        </p>

        {/* BUTTON */}
        <Link
          href={`/blogs/${blog.id}`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
            fontSize: "18px",
            fontWeight: "600",
            color: blog.category === "Trends" ? "#b96a2b" : "#3d6b1f",
          }}
        >
          Read Article
          <span
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "50%",
              background: blog.category === "Trends" ? "#f6dcc6" : "#dce9c9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s ease",
              transform: hovered ? "translateX(4px)" : "translateX(0)",
            }}
          >
            <ArrowIcon />
          </span>
        </Link>
      </div>
    </div>
  );
};

const BlogsPrimary = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [email, setEmail] = useState("");
  const [newsletterImageError, setNewsletterImageError] = useState(false);

  const filtered =
    activeCategory === "all"
      ? blogs
      : blogs.filter((b) => b.category.toLowerCase() === activeCategory);

  return (
    <div
      style={{
        background: "#ffffff",
        minHeight: "100vh",
      }}
    >
      {/* Header Section */}
      <div style={{ textAlign: "center", padding: "60px 24px 40px" }}>

        {/* Title */}
        <h1
          style={{
            fontSize: "clamp(40px, 6vw, 60px)",
            fontWeight: "800",
            color: "#1a3a18",
            margin: "0 0 16px",
            letterSpacing: "-0.03em",
            fontFamily: "'Georgia', 'Times New Roman', serif",
            lineHeight: "1.1",
          }}
        >
          F&amp;B Insights
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "15px",
            color: "#5a7050",
            maxWidth: "440px",
            margin: "0 auto",
            lineHeight: "1.6",
          }}
        >
          Discover the science, trends, and innovations shaping the future of
          nutritional powders and holistic health.
        </p>
      </div>

      {/* Category Tabs */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "8px",
          padding: "0 24px 48px",
          flexWrap: "wrap",
        }}
      >
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "4px",
                padding: "10px 22px",
                border: isActive ? "none" : "1.5px solid #dde8cc",
                background: isActive ? "#1e4d14" : "#ffffff",
                color: isActive ? "#ffffff" : "#4a6a38",
                fontWeight: "600",
                fontSize: "12px",
                cursor: "pointer",
                transition: "all 0.2s ease",
                letterSpacing: "0.01em",
              }}
            >
              <span style={{ fontSize: "13px", opacity: isActive ? 1 : 0.7 }}>
                {cat.icon}
              </span>
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Blog Grid */}
      <div
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px 64px" }}
      >
        {filtered.length === 0 ? (
          <div
            style={{ textAlign: "center", color: "#7a8f6e", padding: "48px" }}
          >
            No articles found in this category.
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
              gap: "28px",
            }}
          >
            {filtered.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        )}

        {/* View All Button */}
        <div style={{ textAlign: "center", marginTop: "48px" }}>
          <div className="btn-wrapper animated">
            <button className="theme-btn-1 btn btn-effect-1 text-uppercase">
              View All Insights
              <ArrowIcon />
            </button>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div
        style={{ padding: "0 24px 60px", maxWidth: "1100px", margin: "0 auto" }}
      >
        <div
          style={{
            background: "#e6edda",
            padding: "48px 52px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "32px",
            flexWrap: "wrap",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative circle */}
          <div
            style={{
              position: "absolute",
              right: "-40px",
              bottom: "-40px",
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.2)",
              pointerEvents: "none",
            }}
          />

          {/* Left: Text + Input */}
          <div style={{ flex: "1", minWidth: "260px", maxWidth: "440px" }}>
            <h2
              style={{
                fontSize: "clamp(24px, 4vw, 34px)",
                fontWeight: "800",
                color: "#1a3a18",
                margin: "0 0 12px",
                fontFamily: "'Georgia', serif",
                letterSpacing: "-0.02em",
                lineHeight: "1.2",
              }}
            >
              Stay Ahead of the Curve
            </h2>
            <p
              style={{
                fontSize: "14px",
                color: "#4a6a38",
                lineHeight: "1.6",
                margin: "0 0 24px",
              }}
            >
              Join our community of health-conscious professionals. Get the
              latest insights, research, and exclusive product updates delivered
              to your inbox.
            </p>

            <div
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
                alignItems: "flex-start",
              }}
            >
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  flex: "1",
                  minWidth: "240px",
                  height: "55px",
                  // padding: "0 23px",
                  border: "1.5px solid #b8d89a",
                  background: "#ffffff",
                  fontSize: "14px",
                  color: "#1a3a18",
                  outline: "none",
                  fontFamily: "inherit",
                  boxSizing: "border-box",
                }}
              />

              <div className="btn-wrapper animated">
                <button 
                className="theme-btn-1 btn btn-effect-1 text-uppercase"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Right: Visual */}
          <div
            style={{
              width: "200px",
              height: "180px",
              borderRadius: "20px",
              overflow: "hidden",
              flexShrink: 0,
              position: "relative",
              background: newsletterImageError
                ? "linear-gradient(135deg,#a8e063,#56ab2f)"
                : "transparent",
            }}
          >
            {!newsletterImageError && (
              <Image
                src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80"
                alt="Colorful nutrition powders"
                fill
                sizes="200px"
                style={{ objectFit: "cover" }}
                onError={() => setNewsletterImageError(true)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogsPrimary;
