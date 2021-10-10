import { useEffect, useReducer } from "react";
import { withRouter, useRouter } from "next/router";
import Link from 'next/link'
import { useUserAgent } from "next-useragent";
import axios from "axios";

import useAuth from '../../hooks/useAuth';

import dynamic from "next/dynamic";

const DesktopLayout = dynamic(() => import("../../components/layout"));
const MobileLayout = dynamic(() => import("../../components/mobileLayout"));

function Dashboard({ useragent }) {
  const {user, isUserLoggedIn} = useAuth();
  const router = useRouter();
  
  let ua = {
    isMobile: false,
  };
  if (useragent) {
    ua = useUserAgent(useragent);
  }
   useEffect(async () => {
     if (user.username === "") {
       router.push("/login");
     }

     if (!useragent) {
       ua = useUserAgent(window.navigator.userAgent);
     }
   }, [useragent, router, isUserLoggedIn, user]);

  return (
    <>
      {ua.isMobile ? (
        <MobileLayout>
          <div>
            Please login to the desktop site for the comedian dashboard.
          </div>
        </MobileLayout>
      ) : (
        <DesktopLayout>
          <div className="w-full h-[90vw] flex flex-col justify-center items-center space-y-4">
          <Link href="/upload">
          <a className="px-4 py-2 bg-black rounded text-lemon-meringue active:scale-75">Upload</a>
          
          </Link>
          <Link href="/create">
          <a className="px-4 py-2 bg-black rounded text-lemon-meringue active:scale-75">Create Joke NFT</a>
          </Link>
          </div>
        </DesktopLayout>
      )}
    </>
  );
}

export default withRouter(Dashboard);

const tempUserAuth = {
  where: {
    email: "patrick@unenunciate.com",
  },
};

const tempVideosVars = {
  where: {
    id: 1,
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


  return {
    props: {
      useragent: context.req.headers["user-agent"],
      styles: [
        { name: "slapstick" },
        { name: "cringe" },
        { name: "deadpan" },
        { name: "improv" },
        { name: "prop" },
        { name: "shock" },
        { name: "ventriloquism" },
        { name: "wit" },
        { name: "observational" },
        { name: "anecdotal" },
      ],
    },
  };
};
