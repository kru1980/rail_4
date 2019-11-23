import React from "react";
import App, { Container } from "next/app";
import Cookies from "js-cookie";
const jwtDecode = require("jwt-decode");
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/main.scss";

class MyApp extends App {
  static async getInitialProps(appContext) {
    const appProps = await App.getInitialProps(appContext);
    console.log("=========Супер важно!! _App ===============");

    const checkCookie = async () => {
      const token = await Cookies.get("jwt");
      if (!token) return undefined;
      try {
        return await jwtDecode(token);
      } catch (error) {
        console.log(error);
      }
    };
    const checkCookieFromServer = async req => {
      try {
        const cookie = await req.headers.cookie;
        const token = cookie ? cookie.split("=")[1] : "";
        const decodedToken = token ? jwtDecode(token) : undefined;
        return decodedToken;
      } catch (error) {
        console.log(error);
      }
    };

    const user = process.browser
      ? await checkCookie()
      : await checkCookieFromServer(appContext.ctx.req);
    // await checkCookieFromServer(appContext.ctx.req);
    console.log("user _app=", user);
    const auth = { user, isAuthenticated: !!user };
    return { ...appProps, auth };
  }

  render() {
    const { Component, pageProps, auth } = this.props;

    return <Component {...pageProps} {...auth} />;
  }
}

export default MyApp;
