import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/layouts/BasePage";
import { Button } from "reactstrap";

const About = ({ isAuthenticated }) => {
  return (
    <BaseLayout title="About as" isAuthenticated={isAuthenticated}>
      <BasePage className="about-page">
        <div>
          <p>about page</p>
          <Button color="danger"></Button>
        </div>
      </BasePage>
    </BaseLayout>
  );
};

About.getInitialProps = async ({ req }) => {
  // const user = req && req.session ? req.session.decodedToken : null;
  // const session = (await req.session) || null;
  console.log("about =======================");
  console.log("about req.sesion=", req);
  // console.log("about req.passport=", req.passport || null);
  // console.log("about req.user=", req.user || null);
  // console.log("about req=", req);

  return {};
};

export default About;
