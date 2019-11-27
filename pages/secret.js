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

  //   const token = "1233";

  //   axios
  //     .get("/secret1", {
  //       headers: {
  //         Authorization: "Bearer " + token
  //       }
  //     })
  //     .then(res => console.log(res.data))
  //     .catch(err => console.log(err));
  // };

  return {};
};
export default withAuth(Secret);
