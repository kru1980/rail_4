import React, { useState } from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/layouts/BasePage";
import LoginCreateForm from "../components/registration/LoginCreateForm";
import { handleErrors } from "../server/services/actions";
import axios from "axios";
// import Router from "next/router";
import { useRouter } from "next/router";
import { Container, Row, Col, Alert } from "reactstrap";

import Cookies from "js-cookie";

const Login = () => {
  const [errorsMessages, setErrorsMessages] = useState(undefined);
  const [visible, setVisible] = useState(false);

  const onDismiss = () => setVisible(false);
  const router = useRouter();

  const handleLoginCredentials = credentials => {
    axios
      .post("/users/login", credentials)
      .then(({ data }) => {
        // если решение паспорта положительное то редирект на /
        console.log("response token from server =", data);
        Cookies.set("jwt", data.token);
        localStorage.setItem("token", data.token);
        console.log("localstorage");

        // setTimeout(() => router.push("/"), 1000);
      })
      .then(() => {
        console.log(localStorage.getItem("token"));
        console.log(Cookies.get("jwt"));
      })
      .catch(async error => {
        // const err = await handleErrors(error);
        setErrorsMessages(error.message);
        setVisible(true);
        console.log(
          "error login from server =",
          error.message,

          error.stack
        );
      });
  };

  return (
    <BaseLayout>
      <BasePage>
        <Container>
          <Row>
            <Col xs="6"> Login page</Col>
            <Col xs="6">
              {errorsMessages ? (
                <Alert color="danger" isOpen={visible} toggle={onDismiss}>
                  {errorsMessages}
                </Alert>
              ) : (
                undefined
              )}
              <LoginCreateForm
                handleLoginCredentials={handleLoginCredentials}
              />
            </Col>
          </Row>
        </Container>
      </BasePage>
    </BaseLayout>
  );
};

export default Login;
