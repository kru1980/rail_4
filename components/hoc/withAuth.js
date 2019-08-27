import React from "react";

import BaseLayout from "../layouts/BaseLayout";
import BasePage from "../layouts/BasePage";

export default function(Component) {
  return class withAuth extends React.Component {
    renderProtectedPage() {
      const { isAuth } = this.props;

      if (!isAuth) {
        return (
          <BaseLayout {...this.props.isAuth}>
            <BasePage>
              <h1>
                {" "}
                You are not authenticated. Please Login to access this page.{" "}
              </h1>
            </BasePage>
          </BaseLayout>
        );
      } else {
        return <Component {...this.props} />;
      }
    }

    render() {
      return this.renderProtectedPage();
    }
  };
}
