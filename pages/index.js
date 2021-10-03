import { useEffect, useState } from "react";
import { withRouter, useRouter } from "next/router";
import { useUserAgent } from "next-useragent";
import { useCookies } from "react-cookie";
import useAuth from "../hooks/useAuth";

import cookies from "next-cookies"
import parseCookies from "../utils/parseCookies";
import withSession from "../utils/session";
import axios from "axios";

import dynamic from "next/dynamic";

const DesktopLayout = dynamic(() => import("../components/layout"));
const MobileLayout = dynamic(() => import("../components/mobileLayout"));

const MobileFeed = dynamic(() => import("../components/mobileFeed"));
const MobileSidebar = dynamic(() => import("../components/mobileSidebar"));

import Feed from "../components/feed";
import Sidebar from "../components/sidebar";

function Home({useragent }) {
  const { isUserLoggedIn } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  let ua = {
    isMobile: false,
  };

  if (useragent) {
    ua = useUserAgent(useragent);
  }

  useEffect(async () => {
    if(!(await isUserLoggedIn()) && router) {
      router.push("/login");
    }

    if (!useragent) {
      ua = useUserAgent(window.navigator.userAgent);
    }

  }, [useragent, router, isUserLoggedIn]);

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
          <Feed />
          <Sidebar />
        </DesktopLayout>
      )}
    </>
  );
}

export default withRouter(Home);

export const getServerSideProps = withSession(async (context) => {
  return {
    props: {
      useragent: context.req.headers["user-agent"],
    },
  };
});