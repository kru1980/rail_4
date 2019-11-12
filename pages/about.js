import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/layouts/BasePage";
import { Button } from "reactstrap";

const About = props => {
  console.log("abour props", props.isAuth);

  return (
    <BaseLayout title="About as">
      <BasePage className="about-page">
        <div>
          <p>about page</p>
          <Button color="danger"></Button>
        </div>
      </BasePage>
    </BaseLayout>
  );
};

// About.getInitialProps = async ({ req, query }) => {
//   const user = req && req.session ? req.session.decodedToken : null;
//   console.log("about", req);

//   return {};
// };

export default About;
