import { useEffect, useState, useRef } from "react";
import { withRouter, useRouter } from "next/router";
import { useUserAgent } from "next-useragent";
import useAuth from "../hooks/useAuth";

import withSession from "../utils/session";
import axios from "axios";

import dynamic from "next/dynamic";

const DesktopLayout = dynamic(() => import("../components/layout"));
const MobileLayout = dynamic(() => import("../components/mobileLayout"));

function Stage({ useragent }) {
  const { user, isUserLoggedIn } = useAuth();
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
    if (false !== (await isUserLoggedIn())) {
      router.push('/login')
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
