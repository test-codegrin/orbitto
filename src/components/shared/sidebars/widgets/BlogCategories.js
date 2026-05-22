"use client";
import makePath from "@/libs/makePath";
import { useCommonContext } from "@/providers/CommonContext";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";

const BlogCategories = () => {
  const { currentPath, category: currentCategory } = useCommonContext();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const load = async () => {
      const response = await fetch("/api/blog", { cache: "no-store" });
      const result = await response.json().catch(() => ({}));
      setBlogs(result.data || []);
    };
    load();
  }, []);

  const categories = useMemo(
    () =>
      Array.from(new Set((blogs || []).map((item) => item.blog?.blog_category).filter(Boolean))),
    [blogs]
  );

  const countByCategory = (category) =>
    (blogs || []).filter((item) => item.blog?.blog_category === category).length;

  return (
    <div className="widget ltn__menu-widget ltn__menu-widget-2 ltn__menu-widget-2-color-2">
      <h4 className="ltn__widget-title ltn__widget-title-border">Categories</h4>
      <ul>
        {categories?.map((category, idx) => (
          <li
            key={idx}
            className={currentCategory === makePath(category) ? "active" : ""}
          >
            <Link
              href={`${
                currentPath ? currentPath : "/blogs"
              }?category=${makePath(category)}`}
            >
              {category}{" "}
              <span>{countByCategory(category)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogCategories;
