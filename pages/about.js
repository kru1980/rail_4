import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/layouts/BasePage";
import { Button } from "reactstrap";
import axios from "axios";
import Cookies from "js-cookie";

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
  console.log("About page =======================");
  const token = Cookies.get("jwt");
  console.log("cookie token", token);
  // const setAuthHeader = () => {
  //   const token = Cookies.get("jwt");

  //   if (token) {
  //     return { headers: { authorization: `Bearer ${token}` } };
  //   }

  //   return undefined;
  // };

  // const res = await axios.get("/v1/secret", {
  //   headers: { Authorization: `Bearer ${token}` }
  // });

  // console.log(res);

  return {};
};

export default About;
