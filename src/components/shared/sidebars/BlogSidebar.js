import React from "react";
import BlogAuthor from "./widgets/BlogAuthor";
import SidebarSearch from "./widgets/SidebarSearch";
import PopularBlog from "./widgets/PopularBlog";
import BlogCategories from "./widgets/BlogCategories";
import SidebarSocials from "./widgets/SidebarSocials";

const BlogSidebar = () => {
  return (
    <aside className="sidebar-area blog-sidebar ltn__right-sidebar">
      {/* <!-- Author Widget --> */}
      <BlogAuthor />
      {/* <!-- Search Widget --> */}
      <SidebarSearch />
      {/* <!-- Popular Post Widget --> */}
      <PopularBlog />
      {/* <!-- Menu Widget (Category) --> */}
      <BlogCategories />
      {/* <!-- Social Media Widget --> */}
      <SidebarSocials />     
    </aside>
  );
};

export default BlogSidebar;
