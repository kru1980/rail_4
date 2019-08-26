import React from "react";
import Header from "../shared/Header";

const BaseLayout = props => {
  // console.log("props", props);

  const { children, className } = props;
  return (
    <div className="layout-container">
      <Header />
      <main className={`cover ${className}`}>
        <div className="wrapper">{children}</div>
      </main>
    </div>
  );
};

export default BaseLayout;
