import "../styles/globals.css";

import { ApolloProvider } from "@apollo/client";

import UserContext from "../contexts/user";

import { useApollo } from "../lib/apollo";

function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps);
  console.log(pageProps);
  return (
    <ApolloProvider client={apolloClient}>
      <UserContext.Provider value={pageProps.user}>
        <Component {...pageProps} />
      </UserContext.Provider>
    </ApolloProvider>
  );
}

export default App;
