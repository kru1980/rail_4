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
    const appProps = await App.getInitialProps(appContext);

    console.log("=========Супер важно!! _App ===============");
    // console.log("appContext.ctx.user _app ", appContext.ctx.req);
    // const user = process.browser ? await auth0.clientAuth() : await auth0.serverAuth(ctx.req);
    // Важно!! в любом случае чтобы  юзер появился в _арр на стороне клиента, юзера сохраняем в куках. Использовать куки и сессии неправильно?
    const user = appContext.ctx.req ? appContext.ctx.req.user : undefined;
    const auth = { user, isAuthenticated: !!user };
    return { ...appProps, auth };
  }

  render() {
    const { Component, pageProps, auth } = this.props;

    return <Component {...pageProps} {...auth} />;
  }
}

export default MyApp;
