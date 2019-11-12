import React, { useState } from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/layouts/BasePage";
import RegistrationForm from "../components/registration/RegistrationForm";
import { Container, Row, Col, Alert } from "reactstrap";
import axios from "axios";
// import Router from "next/router";
import { useRouter } from "next/router";
import { handleErrors } from "../server/services/actions";

const Registration = () => {
  const [errorsMessages, setErrorsMessages] = useState(undefined);
  const [visible, setVisible] = useState(false);

  const onDismiss = () => setVisible(false);
  const router = useRouter();

  const reqCredentialData = credentialsValues => {
    axios
      .post("/users/registration", credentialsValues)
      .then(user => {
        // console.log("response new user from server =", user);
        // router.push("/login");
        setTimeout(() => router.push("/login"), 1000);
      })
      .catch(async error => {
        const err = await handleErrors(error);
        setErrorsMessages(err.message);
        setVisible(true);
        console.log(
          "error from server =",
          error.message,
          error.status,
          error.stack
        );
      });
  };

  return (
    <BaseLayout>
      <BasePage>
        <Container>
          <Row>
            <Col xs="6"> Registration page</Col>
            <Col xs="6">
              {errorsMessages ? (
                <Alert color="danger" isOpen={visible} toggle={onDismiss}>
                  {errorsMessages}
                </Alert>
              ) : (
                undefined
              )}
              <RegistrationForm handleSubmit={reqCredentialData} />
            </Col>
          </Row>
        </Container>
      </BasePage>
    </BaseLayout>
  );
};

Registration.getInitialProps = async ({ req }) => {
  // let messagesFromServer = await req.status;
  // if (messagesFromServer != 200) {
  //   console.log("ответ сервера", messagesFromServer);
  // }

  return {};
};
export default Registration;
