/* eslint-disable @next/next/no-page-custom-font */
import Head from "next/head";
import App, { Container } from "next/app";
import Layout from "../components/layout/Layout";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import theme from "../styles/theme";
import GlobalStyle from "../styles/global";
import TagManager from "react-gtm-module";

export default class MyApp extends App {
  // componentDidMount() {
  //   TagManager.initialize({
  //     gtmId: "GTM-5VLWHR5",
  //   });
  // }
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Abril+Fatface&display=swap"
            rel="stylesheet"
          />

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin={true}
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
            rel="stylesheet"
          />
        </Head>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </>
    );
  }
}
