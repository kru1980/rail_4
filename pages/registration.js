import React, { useState } from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/layouts/BasePage";
import RegistrationForm from "../components/registration/RegistrationForm";
import { Container, Row, Col } from "reactstrap";

const Registration = ({ messagesFromServer }) => {
  const [messages, setMessages] = useState(messagesFromServer);
  return (
    <BaseLayout>
      <BasePage>
        <Container>
          <Row>
            <Col xs="6"> Registration page</Col>
            <Col xs="6">
              {messages ? <div>Сообщение с сервера = {messages}</div> : null}{" "}
              <RegistrationForm />
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
