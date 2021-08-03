import { useEffect, useReducer } from "react";
import { useUserAgent } from "next-useragent";

import UserContext from "../contexts/user";

import FIND_VIDEO_QUERY from "../graphql/queries/findUser";
import FIND_USER_QUERY from "../graphql/queries/findUser";

import { initializeApollo, addApolloState } from "../lib/apollo";

import dynamic from "next/dynamic";

const DesktopLayout = dynamic(() => import("../components/layout"));
const MobileLayout = dynamic(() => import("../components/mobileLayout"));
const MobileFeed = dynamic(() => import("../components/mobileFeed"));
const MobileSidebar = dynamic(() => import("../components/mobileSidebar"));

import Feed from "../components/feed";
import Sidebar from "../components/sidebar";

function Home({ user, videos, suggestions, styles, useragent }) {
  let ua = {
    isMobile: false,
  };
  if (useragent) {
    ua = useUserAgent(useragent);
  }
  useEffect(() => {
    if (!useragent) {
      ua = useUserAgent(window.navigator.userAgent);
    }
  }, [useragent]);

  const [sessionState, sessionDispatch] = useReducer(() => ({}), { state: {} });
  useEffect(() => {}, [useragent]);

  console.log(videos);

  return (
    <>
      {ua.isMobile ? (
        <UserContext.Provider value={user}>
          <MobileLayout>
            <MobileFeed videos={videos} sessionDispatch={sessionDispatch} />
            <MobileSidebar suggestions={suggestions} styles={styles} />
          </MobileLayout>
        </UserContext.Provider>
      ) : (
        <UserContext.Provider value={user}>
          <DesktopLayout>
            <Sidebar suggestions={suggestions} styles={styles} />
            <Feed videos={videos} />
          </DesktopLayout>
        </UserContext.Provider>
      )}
    </>
  );
}

export default Home;

const tempUserAuth = {
  where: {
    username: "unenunciate",
  },
};

const tempVideos = [
  {
    laughers: [],
    publishedAt: "2021-08-01T16:00:00.000Z",
    owner: {
      addresses: [
        {
          isActive: true,
          publicKey: "0xc0b71AeAe2eae9EcB0ebDd5E1e14901127525709",
        },
      ],
      username: "unenunciate",
      isComedian: true,
      profilePhoto: {
        url: "https://res.cloudinary.com/joking-on/image/upload/v1627719058/profile_936ca77835.jpg",
      },
    },
    tags: [
      { content: "weed" },
      { content: "420" },
      { content: "observational" },
    ],
    description: "This is a sample video.",
    laughPoints: [],
    laughs: null,
    content: {
      url: "https://res.cloudinary.com/joking-on/video/upload/v1627820003/Stoner_Jokes_7e0c401d33.mp4",
    },
    views: null,
    comments: [],
    slug: "unenunciate",
    uid: "1",
  },
  {
    laughers: [],
    publishedAt: "2021-08-01T16:00:00.000Z",
    owner: {
      addresses: [
        {
          isActive: true,
          publicKey: "0xc0b71AeAe2eae9EcB0ebDd5E1e14901127525709",
        },
      ],
      username: "unenunciate",
      isComedian: true,
      profilePhoto: {
        url: "https://res.cloudinary.com/joking-on/image/upload/v1627719058/profile_936ca77835.jpg",
      },
    },
    tags: [
      { content: "weed" },
      { content: "420" },
      { content: "observational" },
    ],
    description: "This is a sample video.",
    laughPoints: [],
    laughs: null,
    content: {
      url: "https://res.cloudinary.com/joking-on/video/upload/v1627820003/Stoner_Jokes_7e0c401d33.mp4",
    },
    views: null,
    comments: [],
    slug: "unenunciate",
    uid: "1",
  },
  {
    laughers: [],
    publishedAt: "2021-08-01T16:00:00.000Z",
    owner: {
      addresses: [
        {
          isActive: true,
          publicKey: "0xc0b71AeAe2eae9EcB0ebDd5E1e14901127525709",
        },
      ],
      username: "unenunciate",
      isComedian: true,
      profilePhoto: {
        url: "https://res.cloudinary.com/joking-on/image/upload/v1627719058/profile_936ca77835.jpg",
      },
    },
    tags: [
      { content: "weed" },
      { content: "420" },
      { content: "observational" },
    ],
    description: "This is a sample video.",
    laughPoints: [],
    laughs: null,
    content: {
      url: "https://res.cloudinary.com/joking-on/video/upload/v1627820003/Stoner_Jokes_7e0c401d33.mp4",
    },
    views: null,
    comments: [],
    slug: "unenunciate",
    uid: "1",
  },
];

export const getServerSideProps = async (context) => {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({
    query: FIND_USER_QUERY,
    variables: tempUserAuth,
  });
  console.log(data);

  const user = data.users[0];

  return addApolloState(apolloClient, {
    props: {
      user: user,
      videos: tempVideos,
      useragent: context.req.headers["user-agent"],
      suggestions: [user, user, user, user, user, user, user, user, user, user],
      styles: [
        { name: "slapstick" },
        { name: "cringe" },
        { name: "deadpan" },
        { name: "improv" },
        { name: "prop" },
        { name: "shock" },
        { name: "sitcom" },
        { name: "ventriloquism" },
        { name: "wit" },
        { name: "observational" },
        { name: "anecdotal" },
        { name: "blue" },
      ],
      phase: { title: "feed", content: null, publicID: "" },
    },
  });
};
