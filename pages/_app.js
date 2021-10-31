import "../styles/globals.css";

import React, { useEffect, useState } from "react";
import { AuthProvider } from "../contexts/auth";
import { LaughProvider } from "../contexts/laugh";
import { CookiesProvider } from "react-cookie";

function App({ Component, pageProps }) {
  return (
    <CookiesProvider>
        <AuthProvider>
          <LaughProvider>
              <Component {...pageProps} />
          </LaughProvider>
        </AuthProvider>
    </CookiesProvider>
  );
}

export default App;
