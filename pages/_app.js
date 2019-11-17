import React from "react";
import App, { Container } from "next/app";

import "bootstrap/dist/css/bootstrap.min.css";
import "../style/main.scss";
import Cookies from "js-cookie";

class MyApp extends App {
  static async getInitialProps(appContext) {
    const appProps = await App.getInitialProps(appContext);

    console.log("=========Супер важно!! _App ===============");

    const clientAuth = async () => {
      const user = await Cookies.get("user");
      console.log("cooky _app=", Cookies.get());

      return user;
    };
    // console.log("appContext.ctx.user _app ", appContext.ctx.req);
    const user = process.browser ? await clientAuth() : appContext.ctx.req.user;
    // Важно!! в любом случае чтобы  юзер появился в _арр на стороне клиента, юзера сохраняем в куках. Использовать куки и сессии неправильно?
    // const user = appContext.ctx.req ? appContext.ctx.req.user : undefined;
    const auth = { user, isAuthenticated: !!user };
    return { ...appProps, auth };
  }

  render() {
    const { Component, pageProps, auth } = this.props;

    return <Component {...pageProps} {...auth} />;
  }
}

export default MyApp;
