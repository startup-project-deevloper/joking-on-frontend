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
     if (false !== (await isUserLoggedIn())) {
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
