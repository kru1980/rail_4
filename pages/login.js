import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/layouts/BasePage";
import LoginCreateForm from "../components/registration/loginCreateForm";
import { Container, Row, Col } from "reactstrap";

const Login = () => {
  return (
    <BaseLayout>
      <BasePage>
        <Container>
          <Row>
            <Col xs="6"> Login page</Col>
            <Col xs="6">
              {" "}
              <LoginCreateForm />
            </Col>
          </Row>
        </Container>
      </BasePage>
    </BaseLayout>
  );
};

export default Login;
