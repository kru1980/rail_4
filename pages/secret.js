import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/layouts/BasePage";
import withAuth from "../components/hoc/withAuth";
import axios from "axios";

const Secret = ({ user, isAuthenticated }) => {
  return (
    <BaseLayout
      title="secret page"
      isAuthenticated={isAuthenticated}
      user={user}
    >
      <BasePage>secret page</BasePage>
    </BaseLayout>
  );
};

Secret.getInitialProps = async ({ req }) => {
  console.log("Secret page =======================");
  const instance = axios.create({
    baseURL: "https://some-domain.com/api/",
    timeout: 1000,
    headers: { "X-Custom-Header": "foobar" }
  });
  instance.defaults.headers.common["Authorization"] = "Bearer 123654";

  const res = await axios.get("/v1/secret", {});

  return {};
};

export default withAuth(Secret);
