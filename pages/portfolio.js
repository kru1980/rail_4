import React from "react";
import { useRouter } from "next/router";

const Portfolio = ({ postId }) => {
  return (
    <div>
      <h3>Portfolio page</h3>
      <main>
        <br />
        postId: {postId}
        {/* client id: {idClient} */}
        <h4>null</h4>
      </main>
    </div>
  );
};

Portfolio.getInitialProps = async ({ query }) => {
  const postId = query.id;

  return { postId };
};

export default Portfolio;
