import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/layouts/BasePage";
import { Button } from "reactstrap";

const About = () => {
  return (
    <BaseLayout>
      <BasePage className="about-page">
        <div>
          <p>about page</p>
          <Button color="danger"></Button>
        </div>
      </BasePage>
    </BaseLayout>
  );
};

About.getInitialProps = async ({ query }) => {
  const id = query.id;

  return {};
};

export default About;
