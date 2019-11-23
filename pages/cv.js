import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/layouts/BasePage";

const Cv = ({ isAuthenticated }) => {
  return (
    <BaseLayout title="cv page" isAuthenticated={isAuthenticated}>
      <BasePage>cv page</BasePage>
    </BaseLayout>
  );
};

export default Cv;
