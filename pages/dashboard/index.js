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
     if (false === (await isUserLoggedIn())) {
      //router.push("/login");
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
          <div className="flex flex-col items-center justify-center w-full h-[90vh] space-y-4">
            <div className="flex flex-col items-center w-1/2 space-y-4 sm:1/3 lg:w-1/6 h-1/3">
              <Link
                href="/dashboard/upload"
                className="flex w-2/3 sm:w-1/2 lg:w-1/6"
              >
                <a className="w-full px-4 py-2 text-center bg-black rounded text-lemon-meringue active:scale-75">
                  Upload
                </a>
              </Link>
              <Link
                href="/dashboard/create"
                className="flex w-2/3 sm:w-1/2 lg:w-1/6"
              >
                <a className="w-full px-4 py-2 text-center bg-black rounded text-lemon-meringue active:scale-75">
                  Create Joke NFT
                </a>
              </Link>
            </div>
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
