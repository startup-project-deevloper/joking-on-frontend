import "../styles/globals.css";

import React, { useEffect, useState } from "react";

import Head from "next/head";
import dynamic from "next/dynamic";
import { AuthProvider } from "../contexts/auth";
import { LaughProvider } from "../contexts/laugh";
import { CookiesProvider } from "react-cookie";

function App({ Component, pageProps }) {

  return (
    <CookiesProvider>
        <AuthProvider>
          
              <Component {...pageProps} />
          
        </AuthProvider>
    </CookiesProvider>
  );
}

export default App;
