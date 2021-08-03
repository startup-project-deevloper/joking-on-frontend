import "../styles/globals.css";

import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apollo";

import CloudinaryContext from "../contexts/couldinary";

import { Cloudinary } from "@cloudinary/base";

import React, { useEffect, useState } from "react";

import Head from "next/head";
import dynamic from "next/dynamic";

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
    <>
      <ApolloProvider client={apolloClient}>
        <CloudinaryContext.Provider value={cloudinaryCDN}>
          <Component {...pageProps} />
        </CloudinaryContext.Provider>
      </ApolloProvider>
    </>
  );
}

export default App;
