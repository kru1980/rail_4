import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/layouts/BasePage";
import withAuth from "../components/hoc/withAuth";

const Secret = props => {
  console.log("secret page props", props);

  return (
    <BaseLayout>
      <BasePage>secret page</BasePage>
    </BaseLayout>
  );
};

export default withAuth(Secret);
