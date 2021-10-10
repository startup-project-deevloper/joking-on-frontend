import {useRef, useEffect, useState} from 'react';  
import { withRouter, useRouter } from "next/router";
import { useUserAgent } from "next-useragent";
import useAuth from "../hooks/useAuth";

import withSession from "../utils/session";

import dynamic from "next/dynamic";

const DesktopLayout = dynamic(() => import("../components/layout"));
const MobileLayout = dynamic(() => import("../components/mobileLayout"));

import { getStrapiURL } from "../lib/strapi";

const Upload = ({ useragent }) => {
  const formRef = useRef(null);
  const { user, isUserLoggedIn } = useAuth();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
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

  const handleSubmit = (e) => {
        e.preventDefault();
        if(file) {
        const request = new XMLHttpRequest();

        const formData = new FormData();

        const formElements = formRef.current.elements;

        const data = {
          title: title,
          description: description,
          owner: user.id,
          slug: `${title}_${Math.floor(Math.random() * 10000)}`,
        };

        for (let i = 0; i < formElements.length; i++) {
          const currentElement = formElements[i];
          if (currentElement.type === "file") {
            for (let i = 0; i < currentElement.files.length; i++) {
              const file = currentElement.files[i];
              formData.append(`files.${currentElement.name}`, file, file.name);
            }
          }
        }

        formData.append("data", JSON.stringify(data));

        request.open("POST", `${getStrapiURL()}/videos`);

        request.send(formData);
    }
    else {
        console.log("Must submit file");
    }
}
  useEffect(() => {
    if (formRef.current) {
      formRef.current.addEventListener("submit", handleSubmit)
    }

    return () => formRef.current.removeEventListener("submit", handleSubmit) 
  }, [formRef.current]);
  return (
    <>
      {ua.isMobile ? (
        <MobileLayout></MobileLayout>
      ) : (
        <DesktopLayout>
            <div className="flex flex-col items-center justify-center min-w-full min-h-[90vh]">
          <form ref={formRef}>
            <input
              type="text"
              name="title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              name="description"
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="file"
              name="original"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <input type="submit" value="Submit" />
          </form>
          </div>
        </DesktopLayout>
      )}
    </>
  );
  
};

export default withRouter(Upload);

export const getServerSideProps = withSession(async (context) => {
  return {
    props: {
      useragent: context.req.headers["user-agent"],
    },
  };
});