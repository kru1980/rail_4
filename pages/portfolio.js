import React from "react";
import { useRouter } from "next/router";
import BasePage from "../components/layouts/BasePage";
import BaseLayout from "../components/layouts/BaseLayout";

const Portfolio = ({ postId, isAuthenticated, user }) => {
  return (
    <BaseLayout title="Blog page" isAuthenticated={isAuthenticated}>

      <BasePage>
      <h3>Portfolio page</h3>
      <main>
        <br />
        postId: {postId}
        {/* client id: {idClient} */}
        <h4>null</h4>
      </main>
      </BasePage>
        </BaseLayout>
>
  );
};

Portfolio.getInitialProps = async ({ query }) => {
  const postId = query.id;

  return { postId };
};

export default Portfolio;
