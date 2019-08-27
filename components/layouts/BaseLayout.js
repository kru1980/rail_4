import React from "react";
import Header from "../shared/Header";

const BaseLayout = props => {
  const { children, className, isAuth } = props;
  return (
    <div className="layout-container">
      <Header isAuth={isAuth} />
      <main className={`cover ${className}`}>
        <div className="wrapper">{children}</div>
      </main>
    </div>
  );
};

export default BaseLayout;
