"use client";
import BlogCardPrimary from "@/components/shared/cards/BlogCardPrimary";
import Nodata from "@/components/shared/no-data/Nodata";
import Pagination from "@/components/shared/paginations/Pagination";
import usePagination from "@/hooks/usePagination";
import { useEffect, useState } from "react";

const BlogsGridPrimary = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const load = async () => {
      const response = await fetch("/api/blog", { cache: "no-store" });
      const result = await response.json().catch(() => ({}));
      const normalized = (result.data || []).map((item) => ({
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
  // get pagination details
  const {
    currentItems,
    currentpage,
    paginationItems,
    currentPaginationItems,
    showMore,
    totalPages,
    handleCurrentPage,
  } = usePagination(blogs, 6, 5);

  return (
    <div className="ltn__blog-area ltn__blog-item-3-normal mb-100">
      <div className="container">
        <div className="row">
          {/* <!-- Blog Item --> */}
          {!currentItems?.length ? (
            <Nodata text="No Blog!" />
          ) : (
            currentItems?.map((blog, idx) => (
              <div key={idx} className="col-lg-4 col-sm-6 col-12">
                <BlogCardPrimary blog={blog} />
              </div>
            ))
          )}
        </div>
        <div className="row">
          <div className="col-lg-12">
            <Pagination
              totalPages={totalPages}
              currentPaginationItems={currentPaginationItems}
              showMore={showMore}
              items={paginationItems}
              currenIndex={currentpage}
              handleCurrentPage={handleCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogsGridPrimary;
