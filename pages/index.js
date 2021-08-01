import { useContext } from "react";

import Layout from "../components/layout";
import Feed from "../components/feed";
import Spacer from "../components/spacer";
import Sidebar from "../components/sidebar";

import UserContext from "../contexts/user";

import FIND_USER_QUERY from "../graphql/queries/findUser";
import { initializeApollo, addApolloState } from "../lib/apollo";

function Home({}) {
  const user = useContext(UserContext);

  return (
    <Layout>
      <Sidebar />
      <Feed />
      <Spacer />
    </Layout>
  );
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
