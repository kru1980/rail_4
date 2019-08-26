import React from "react";
import App, { Container } from "next/app";

import "bootstrap/dist/css/bootstrap.min.css";
import "../style/main.scss";

class MyApp extends App {
  // Only uncomment this method if you have blocking data requirements for
  // every single page in your application. This disables the ability to
  // perform automatic static optimization, causing every page in your app to
  // be server-side rendered.
  //
  //   componentDidCatch(error, errorInfo) {
  //     console.log("CUSTOM ERROR HANDLING", error);
  //     // This is needed to render errors correctly in development / production
  //     super.componentDidCatch(error, errorInfo);
  //   }

  static async getInitialProps(appContext) {
    // console.log("appContext", appContext);
    // calls page's `getInitialProps` and fills `appProps.pageProps`
    const appProps = await App.getInitialProps(appContext);

    return { ...appProps };
  }

  render() {
    const { Component, pageProps, logic } = this.props;
    // console.log("logic const _app", logic);

    return <Component {...pageProps} />;
  }
}

export default MyApp;
