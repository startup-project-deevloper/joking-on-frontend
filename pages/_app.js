import "../styles/globals.css";

import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apollo";

import CloudinaryContext from "../contexts/couldinary";

import { Cloudinary } from "@cloudinary/base";

import React, { useEffect, useState } from "react";

import Head from "next/head";
import dynamic from "next/dynamic";
import { AuthProvider } from "../contexts/auth";
import { CookiesProvider } from "react-cookie";

const VR = dynamic(
  () => {
    return import("../components/vr");
  },
  { ssr: false }
);

function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps);

  const cloudinaryCDN = new Cloudinary({
    cloud: {
      cloudName: "joking-on",
    },
    url: {
      secureDistribution: "www.jokingon.com",
      secure: true,
    },
  });

  return (
    <CookiesProvider>
      <ApolloProvider client={apolloClient}>
        <AuthProvider>
          <CloudinaryContext.Provider value={cloudinaryCDN}>
            <Component {...pageProps} />
          </CloudinaryContext.Provider>
        </AuthProvider>
      </ApolloProvider>
    </CookiesProvider>
  );
}

export default App;
