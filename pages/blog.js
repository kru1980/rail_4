import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/layouts/BasePage";

const Blog = ({ isAuthenticated }) => {
  return (
    <BaseLayout title="Blog page" isAuthenticated={isAuthenticated}>
      <BasePage>Blog page</BasePage>
    </BaseLayout>
  );
};

export default Blog;
