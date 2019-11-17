import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/layouts/BasePage";
import withAuth from "../components/hoc/withAuth";

const Secret = ({ isAuthenticated }) => {
  return (
    <BaseLayout title="secret page" isAuthenticated={isAuthenticated}>
      <BasePage>secret page</BasePage>
    </BaseLayout>
  );
};

export default withAuth(Secret);
