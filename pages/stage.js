import { useEffect, useState, useRef } from "react";
import { withRouter, useRouter } from "next/router";
import { useUserAgent } from "next-useragent";
import { useCookies } from "react-cookie";
import useAuth from "../hooks/useAuth";

import cookies from "next-cookies";
import parseCookies from "../utils/parseCookies";
import withSession from "../utils/session";
import axios from "axios";


import { Container } from "@angle-technologies/react-components";

import dynamic from "next/dynamic";

const DesktopLayout = dynamic(() => import("../components/layout"));
const MobileLayout = dynamic(() => import("../components/mobileLayout"));

const MobileFeed = dynamic(() => import("../components/mobileFeed"));
const MobileSidebar = dynamic(() => import("../components/mobileSidebar"));

import Feed from "../components/feed";
import Sidebar from "../components/sidebar";

function Stage({ useragent }) {
    console.log();
  const { user, isUserLoggedIn, getStrapiToken } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const stageRef = useRef(null);

  const router = useRouter();

  let ua = {
    isMobile: false,
  };

  if (useragent) {
    ua = useUserAgent(useragent);
  }

  useEffect(async () => {
    
    console.log(await isUserLoggedIn());
    if (router && (await isUserLoggedIn())) {
      console.log(user);
      if (user.isSetup === false || user.isSetup === null) {
        router.push("/setup");
      }
    }

    if (!useragent) {
      ua = useUserAgent(window.navigator.userAgent);
    }
  }, [useragent, router, isUserLoggedIn, user]);

  useEffect(() => {}, [useragent]);

  return (
    <>
      {ua.isMobile ? (
        <MobileLayout>
          <MobileFeed />
          <MobileSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        </MobileLayout>
      ) : (
        <DesktopLayout>
          <Sidebar />
          <div ref={stageRef} id="stage" name="stage" className="min-w-full min-h-screen">
              <div>
                  
              </div>
          </div>
        </DesktopLayout>
      )}
    </>
  );
}

export default withRouter(Stage);

export const getServerSideProps = withSession(async (context) => {
  return {
    props: {
      useragent: context.req.headers["user-agent"],
    },
  };
});
