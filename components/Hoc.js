import React from "react";

const Hoc = ({ Component }) => {
  return () => (
    <React.Fragment>
      <Component />
      <p>Я обернутый компонент</p>
    </React.Fragment>
  );
};

export default Hoc;
