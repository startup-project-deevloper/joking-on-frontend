import cookies from "cookies";

import findUser from "../../graphql/queries/findUser";

import { getSession } from "next-auth/client";

import { AuthContext } from "../../contexts/auth";
import { useState, useContext } from "react";

const Login = async ({ useragent }) => {
  const [email, setEmail] = useState("");
  const { logU } = useContext(AuthContext);
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

  useEffect(() => {}, [useragent]);

  try {
  } catch (error) {
    const { response: fetchResponse } = error;
    res.status(fetchResponse?.status || 500).json(error.data);
  }
};

export const getServerSideProps = async ({ req, res }) => {
  // Create a cookies instance
  let headers = {};
  const session = await getSession({ req });
  if (session) {
    headers = { Authorization: `Bearer ${session.jwt}` };
  }
  cookies.set("myCookieName", "some-value", {
    httpOnly: true, // true by default
  });
};
