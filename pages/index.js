import { useContext } from "react";

import Layout from "../components/layout";

import UserContext from "../contexts/user";

import FIND_USER_QUERY from "../graphql/queries/findUser";
import { initializeApollo, addApolloState } from "../lib/apollo";

function Home({}) {
  const user = useContext(UserContext);

  return <Layout></Layout>;
}

export default Home;

const tempUserAuth = {
  where: {
    username: "unenunciate",
  },
};

export const getServerSideProps = async (context) => {
  const apolloClient = initializeApollo();

  let { data } = await apolloClient.query({
    query: FIND_USER_QUERY,
    variables: tempUserAuth,
  });

  const user = data.users[0];

  return addApolloState(apolloClient, {
    props: {
      user: user,
      phase: { title: "feed", content: null, publicID: "" },
    },
  });
};
