import React from "react";
import Header from "../shared/Header";

import "../../style/main.scss";

const BaseLayout = ({ children }) => {
  return (
    <div className="example">
      <Header />
      <div>{children}</div>
    </div>
  );
};

export default BaseLayout;
