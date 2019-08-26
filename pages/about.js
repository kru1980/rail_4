import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";

const About = () => {
  return (
    <BaseLayout>
      <div>
        <p>about page</p>
      </div>
    </BaseLayout>
  );
};

About.getInitialProps = async ({ query }) => {
  const id = query.id;
  console.log("about id", id);

  return {};
};

export default About;
