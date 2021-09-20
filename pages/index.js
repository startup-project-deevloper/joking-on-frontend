import { useEffect, useReducer } from "react";
import { useUserAgent } from "next-useragent";

import { AuthProvider } from "../contexts/auth";

import FIND_VIDEO_QUERY from "../graphql/queries/findUser";
import FIND_USER_QUERY from "../graphql/queries/findUser";

import { initializeApollo, addApolloState } from "../lib/apollo";

import dynamic from "next/dynamic";

const DesktopLayout = dynamic(() => import("../components/layout"));
const MobileLayout = dynamic(() => import("../components/mobileLayout"));

import HomeMobile from "../components/homeMobile";
import HomeDesktop from "../components/homeDesktop";

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

  useEffect(() => {
    const params = new URLSearchParams();
    params.append("userId", user.id);
    axios.send({
      method: "post",
      url: "http://localhost:1337/videos",
      data: {},
    });
  }, [useragent]);

  return (
    <>
      {ua.isMobile ? (
        <MobileLayout>
          <HomeMobile />
        </MobileLayout>
      ) : (
        <DesktopLayout>
          <HomeDesktop />
        </DesktopLayout>
      )}
    </>
  );
}

export default Home;

const tempUserAuth = {
  where: {
    email: "patrick@unenunciate.com",
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
