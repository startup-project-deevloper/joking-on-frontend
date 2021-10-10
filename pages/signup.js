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
      firstName: firstName,
      lastName: lastName,
      address: (await magic.user.getMetadata()).publicAddress,
      bio: bio,
      joinDate: Date.now(),
      xChainAddress: await magic.xchain.publicAddress,
      isComedian: isComedian,
      contactEmail: (await magic.user.getMetadata()).email,
      isSetup: true,
      token: await getToken(),
    };
    
    const result = await axios({
      method: "post",
      data: data,
      url: `${process.env.NEXT_PUBLIC_MODE === 'production' ? 'https://app.jokingon.com' : 'http://localhost:3000' }/signup`,
      headers: {
        authorization: `Bearer ${data.token}`,
      }
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
            <form className="flex flex-col items-center justify-center w-full py-12 space-y-4">
              <div className="flex flex-col items-center w-full space-y-4">
                <label>Email</label>
                <input
                  type="text"
                  className="w-2/3 h-12 my-4 text-center placeholder-black rounded outline-none bg-lemon-meringue ring-2 ring-black"
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
                <button
                  className="w-24 py-2 bg-black rounded active:scale-75 text-lemon-meringue"
                  onClick={() => {
                    loginUser(email);
                    setEmailVerified(true);
                  }}
                >
                  Verify
                </button>
              </div>
              <div className="flex flex-col items-center w-full space-y-4">
                <label>First Name</label>
                <input
                  disabled={!emailVerified}
                  className="w-2/3 h-12 my-4 text-center placeholder-black rounded outline-none bg-lemon-meringue ring-2 ring-black"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="flex flex-col items-center w-full space-y-4">
                <label>Last Name</label>
                <input
                  disabled={!emailVerified}
                  className="w-2/3 h-12 my-4 text-center placeholder-black rounded outline-none bg-lemon-meringue ring-2 ring-black"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="flex flex-col items-center min-w-full space-y-4">
                <label>Bio</label>
                <textarea
                  disabled={!emailVerified}
                  rows={5}
                  cols={60}
                  name="bio"
                  className="w-2/3 my-4 placeholder-black rounded outline-none h-44 sm:w-1/3 bg-lemon-meringue ring-2 ring-black"
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
              <div className="flex flex-col items-center w-full space-y-4">
                <label>Would you like to signup as a comedian?</label>
                <select
                  className="w-2/3 text-black bg-lemon-meringue font-bond"
                  disabled={!emailVerified}
                  onChange={(e) => {
                    e.target.value === "Yes"
                      ? setIsComedian(true)
                      : setIsComedian(false);
                  }}
                >
                  <option
                    className="font-bold text-black"
                    value="No"
                    name="No"
                    id="No"
                  >No</option>

                  <option
                    className="font-bold text-black"
                    value="Yes"
                    name="Yes"
                    id="Yes"
                  >Yes</option>
                </select>
              </div>
              <button
                disabled={!emailVerified}
                className="w-24 px-4 py-2 bg-black rounded ring-2 ring-black text-lemon-meringue active:scale-75"
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
