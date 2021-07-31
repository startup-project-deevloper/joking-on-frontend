import "../styles/globals.css";

import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apollo";

import UserContext from "../contexts/user";
import CloudinaryContext from "../contexts/couldinary";

import { Cloudinary } from "@cloudinary/base";

import React from "react";

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
      <Head>
        <title>JOKING ON: {pageProps.phase.title.toUpperCase()}</title>
      </Head>
      <ApolloProvider client={apolloClient}>
        <CloudinaryContext.Provider value={cloudinaryCDN}>
          <UserContext.Provider value={pageProps.user}>
            <div id="escape-hatch">
              <Component {...pageProps} />
            </div>
          </UserContext.Provider>
        </CloudinaryContext.Provider>
      </ApolloProvider>
    </>
  );
}

export default App;
