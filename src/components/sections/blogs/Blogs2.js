"use client";

import BlogCard2 from "@/components/shared/cards/BlogCard2";
import React, { useEffect, useState } from "react";

const Blogs2 = ({ type, title, pt, pb }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const load = async () => {
      const response = await fetch("/api/blog", { cache: "no-store" });
      const result = await response.json().catch(() => ({}));
      const normalized = (result.data || []).slice(0, 6).map((item) => ({
        id: item.blog_detail_id,
        image: item.blog_images?.length
          ? `/api/blog/image/${item.blog_images[0].image_id}`
          : `/api/blog/${item.blog_detail_id}/image`,
        title: item.blog_author || "Blog Post",
        desc: item.excerpt || "",
        publishDate: item.created_at,
        category: item.blog?.blog_category || "General",
        author: { desig: item.blog_author_info || "Admin" },
      }));
      setBlogs(normalized);
    };
    load();
  }, []);
  return (
    <div
      className={`ltn__blog-area ${pb ? pb : " pb-90"}   ${pt ? pt : "pt-115"}`}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title-area ltn__section-title-2 text-center">
              <h1 className="section-title">
                {title ? title : "Leatest Blog"}
              </h1>
            </div>
          </div>
        </div>
        <div
          className={`row  ltn__blog-slider-one-active slick-arrow-1  ${
            type === 2 ? "ltn__blog-item-3-normal" : ""
          }`}
        >
          {blogs?.map((blog, idx) => (
            <div
              key={idx}
              className="col-lg-12"
              style={
                blogs.length === 1
                  ? { maxWidth: "420px", marginLeft: "auto", marginRight: "auto" }
                  : undefined
              }
            >
              <BlogCard2 blog={blog} type={type} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs2;
