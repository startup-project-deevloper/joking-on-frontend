import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { withRouter, useRouter } from "next/router";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";

import { useEffect, useReducer } from "react";
import { useUserAgent } from "next-useragent";

import dynamic from "next/dynamic";

const DesktopLayout = dynamic(() => import("../../components/layout"));

import Sidebar from "../../components/sidebar";
import Layout from "../../components/layout";
import ShopFilter from "../../components/shopFilter";
import ShopItems from "../../components/shopItems";

const Collectables = ({ useragent }) => {
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

  const { user,isUserLoggedIn } = useAuth();
  const router = useRouter();

 
  return (
    <DesktopLayout>
      <div class="min-w-screen flex">
        <Head>
          <title>Collectables</title>
          <meta
            name="description"
            content="Visit here to view the collectables that are now available!"
          />
        </Head>

        <ShopFilter />
        <ShopItems />
      </div>
    </DesktopLayout>
  );
}



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
  }

};

export default withRouter(Collectables);
