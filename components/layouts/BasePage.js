import React from "react";
import { Container, Row, Col } from "reactstrap";

const BasePage = ({ className, children }) => {
  // const className = props.className || "";

  return (
    <div className={`base-page ${className}`}>
      <Container>{children}</Container>
    </div>
  );
};
BasePage.defaultProps = {
  className: ""
};
export default BasePage;
