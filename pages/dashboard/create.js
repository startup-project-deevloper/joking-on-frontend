import {useRef, useEffect, useState} from 'react';  
import { withRouter, useRouter } from "next/router";
import { useUserAgent } from "next-useragent";
import useAuth from "../../hooks/useAuth";

import axios from "axios";

import withSession from "../../utils/session";

import dynamic from "next/dynamic";

const DesktopLayout = dynamic(() => import("../../components/layout"));
const MobileLayout = dynamic(() => import("../../components/mobileLayout"));

import { getStrapiURL } from "../../lib/strapi";
import { NFTCredential } from 'avalanche/dist/apis/avm';

const Create = ({ useragent }) => {
  const formRef = useRef(null);
  const { user, isUserLoggedIn, getToken } = useAuth();
  const router = useRouter();
  const [retry, setRetry] = useState(false);

  const [videos, setVideos] = useState("");
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

    if(videos === null) {
        const token = await getToken()
        const all = (await axios({method:"get", headers:{authorization: `Bearer ${token}`}, url: getStrapiURL('users/me')})).data.videos
        
        const allWithDetail = [Promise.all(all.map((video)=> {
            return axios({method:"get", headers:{authorization: `Bearer ${token}`}, url: getStrapiURL(`videos/${video.id}`)})
        }))];

        allWithDetail.filter((video) => video.nonfungibleToken?.id || video.ready !== true)
        
        if(allWithDetail.length > 0) {
            setVideos(allWithDetail);
        } else {
            setRetry(!retry)
        }
    }

    if (!useragent) {
      ua = useUserAgent(window.navigator.userAgent);
    }
  }, [useragent, router, isUserLoggedIn, user, retry]);

  const handleCreate = (e) => {
       setVideos(null)
    }
  useEffect(() => {
    
  }, []);
  return (
    <>
      {ua.isMobile ? (
        <MobileLayout></MobileLayout>
      ) : (
        <DesktopLayout>
          <div className="flex flex-col items-center justify-center min-w-full min-h-[90vh]">
            {videos.length > 0 ? (
              videos.map((video) => (
                <div
                  className="flex flex-col items-center justify-center min-w-full "
                >
                  <span className="text-2xl font-bold">{video.title}</span>
                  <video src={video.original.url} className="w-2/3 h-64" loop={false}/>
                  <span className="text-lg">{video.description}</span>
                  <button
                    className="w-24 py-2 bg-black rounded active:scale-75 text-lemon-meringue"
                    onClick={() => true}
                  >
                    Create
                  </button>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center min-w-full space-y-8">
                <div className="text-3xl font-bold">
                  No videos ready to create nft...
                </div>
                <button
                  className="w-24 py-2 bg-black rounded active:scale-75 text-lemon-meringue"
                  onClick={() => setRetry(true)}
                >
                  Retry
                </button>
              </div>
            )}
          </div>
        </DesktopLayout>
      )}
    </>
  );
  
};

export default withRouter(Create);

export const getServerSideProps = withSession(async (context) => {
  return {
    props: {
      useragent: context.req.headers["user-agent"],
    },
  };
});