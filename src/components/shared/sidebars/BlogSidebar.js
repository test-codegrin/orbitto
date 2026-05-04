import React from "react";
import SidebarSearch from "./widgets/SidebarSearch";
import BlogCategories from "./widgets/BlogCategories";
import SidebarSocials from "./widgets/SidebarSocials";

const BlogSidebar = () => {
  return (
    <aside className="sidebar-area blog-sidebar ltn__right-sidebar">
      {/* <!-- Search Widget --> */}
      <SidebarSearch />
      {/* <!-- Popular Post Widget --> */}
      <BlogCategories />
      {/* <!-- Social Media Widget --> */}
      <SidebarSocials />     
    </aside>
  );
};

export default BlogSidebar;
