import { useContext } from "react";

import Layout from "../components/layout";
import Feed from "../components/feed";
import Sidebar from "../components/sidebar";

import UserContext from "../contexts/user";

import FIND_VIDEO_QUERY from "../graphql/queries/findUser";
import FIND_USER_QUERY from "../graphql/queries/findUser";

import { initializeApollo, addApolloState } from "../lib/apollo";

function Home({ videos, suggestions }) {
  const user = useContext(UserContext);

  console.log(suggestions);

  return (
    <Layout>
      <Sidebar suggestions={suggestions} />
      <Feed videos={videos} />
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

  const { data } = await apolloClient.query({
    query: FIND_USER_QUERY,
    variables: tempUserAuth,
  });

  const user = data.users[0];

  return addApolloState(apolloClient, {
    props: {
      user: user,
      videos: "videos",
      suggestions: [user, user, user],
      phase: { title: "feed", content: null, publicID: "" },
    },
  });
};
