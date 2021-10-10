import { useEffect, useState, useCallback } from "react";
import { withRouter, useRouter } from "next/router";
import { useUserAgent } from "next-useragent";
import useAuth from "../hooks/useAuth";

import withSession from "../utils/session";
import axios from "axios";

import dynamic from "next/dynamic";

const DesktopLayout = dynamic(() => import("../components/layout"));
const MobileLayout = dynamic(() => import("../components/mobileLayout"));

import { getStrapiURL } from "../lib/strapi";

function SignUp({ useragent }) {
  const { user, isUserLoggedIn, getStrapiToken, magic, loginUser, getToken } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("")
  const [isComedian, setIsComedian] = useState(false);

  let ua = {
    isMobile: false,
  };

  if (useragent) {
    ua = useUserAgent(useragent);
  }

  const handleSubmit = useCallback(async () => {
      if(magic.auth.isUserLoggedIn) {
    const data = {
      email: (await magic.user.getMetadata()).email,
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
      address: (await magic.user.getMetadata()).publicAddress,
      bio: bio,
      joinDate: Date.now(),
      xChainAddress: await magic.xchain.publicAddress,
      isComedian: false,
      contactEmail: (await magic.user.getMetadata()).email,
      isSetup: true,
      token: await getToken(),
    };
    
    const result = await axios({
      method: "post",
      data: data,
      url: getStrapiURL("auth/local/register"),
    });

    
    if (result.status === 200)  {
      router.push("/login");
    } else {
       console.log("Failure", result.status)
    }
}
}, [username, password, firstName, lastName, bio])

  useEffect(async () => {
    if (user.isSetup === true) {
        router.push('/');
    }

    if (!useragent) {
      ua = useUserAgent(window.navigator.userAgent);
    }
  }, [useragent, router, isUserLoggedIn, user]);

  useEffect(() => {}, [useragent]);

  return (
    <>
      {ua.isMobile ? (
        <MobileLayout></MobileLayout>
      ) : (
        <DesktopLayout>
          <div className="flex flex-col items-center justify-center min-w-full min-h-[90vh]">
            <form className="flex flex-col items-center justify-center">
              <div className="flex flex-col my-4">
                <label>Email</label>
                <input
                  type="password"
                  className="my-4 text-center placeholder-black rounded outline-none bg-lemon-meringue ring-2 ring-black"
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
                <button
                  className="px-4 py-2 my-2 bg-black active:scale-75 text-lemon-meringue"
                  onClick={() => {
                    loginUser(email);
                    setEmailVerified(true);
                  }}
                >
                  Verify
                </button>
              </div>
              <div className="flex flex-col my-4">
                <label>Password</label>
                <input
                  disabled={emailVerified}
                  type="password"
                  className="my-4 text-center placeholder-black rounded outline-none bg-lemon-meringue ring-2 ring-black"
                  onChange={(e) => setPassword(e.target.value)}
                ></input>{" "}
              </div>
              <div className="flex flex-col my-4">
                <label>First Name</label>
                <input
                  disabled={emailVerified}
                  className="my-4 text-center placeholder-black rounded outline-none bg-lemon-meringue ring-2 ring-black"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="flex flex-col my-4">
                <label>Last Name</label>
                <input
                  disabled={emailVerified}
                  className="my-4 text-center placeholder-black rounded outline-none bg-lemon-meringue ring-2 ring-black"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="flex flex-col min-w-full my-4">
                <label>Bio</label>
                <input
                  disabled={emailVerified}
                  type="textarea"
                  className="w-2/3 h-32 my-4 text-center placeholder-black rounded outline-none sm:w-1/3 bg-lemon-meringue ring-2 ring-black"
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
              <div className="flex flex-col my-4">
                <label>Would you like to signup as a comedian?</label>
                <select
                  disabled={emailVerified}
                  onChange={(e) => {
                    e.target.value === "Yes"
                      ? setIsComedian(true)
                      : setIsComedian(false);
                  }}
                >
                  <opinion value="No">No</opinion>
                  <opinion value="Yes">Yes</opinion>
                </select>
              </div>
              <button
                disabled={emailVerified}
                className="px-4 py-2 bg-black rounded ring-2 ring-black hover:bg-black text-lemon-meringue active:scale-75"
                onClick={async (e) => {
                  e.preventDefault();
                  await handleSubmit();
                }}
              >
                Submit
              </button>
            </form>
          </div>
        </DesktopLayout>
      )}
    </>
  );
}

export default withRouter(SignUp);

export const getServerSideProps = withSession(async (context) => {
  return {
    props: {
      useragent: context.req.headers["user-agent"],
    },
  };
});
