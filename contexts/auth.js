import { createContext, useState, useEffect, useCallback } from "react";
import { Magic } from "magic-sdk";
import { useRouter } from "next/router";
import { useLazyQuery } from "@apollo/client";
import { signIn } from "next-auth/client";

import FIND_USER_QUERY from "../graphql/queries/findUser";

export const AuthContext = createContext(null);

let magic;

const tempQuery = {
  username: "unenunciate",
  firstName: "Patrick",
  lastName: "Kelley",
  confirmed: true,
  blocked: false,
  bio: null,
  isComedian: true,
  laughsLaughedAt: null,
  addresses: [
    {
      name: "Ethereum-0xc0b...709",
      publicKey: "0xc0b71AeAe2eae9EcB0ebDd5E1e14901127525709",
      type: "Ethereum",
    },
  ],
  profilePhoto: {
    url: "https://res.cloudinary.com/joking-on/image/upload/v1627719058/profile_936ca77835.jpg",
  },
  nonfungibleTokens: [],
  links: [],
  videos: [
    {
      content: {
        url: "https://res.cloudinary.com/joking-on/video/upload/v1627820003/Stoner_Jokes_7e0c401d33.mp4",
      },
    },
  ],
  avatar: null,
  items: [],
  laughedAtVideos: [],
  laughedAtComments: [],
  following: [],
  followers: [],
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(tempQuery);
  const [magic, setMagic] = useState();
  const [variables, setVariables] = useState({ email: "" });
  const router = useRouter({ email: "" });

  const [getUserData, { loading, data, error }] = useLazyQuery(
    FIND_USER_QUERY,
    {
      variables,
      onCompleted: (data) => {
        setUser(data.users[0]);
        signIn(data.users[0]);
      },
    }
  );

  /**
   * Log the user in
   * @param {string} email
   */
  const loginUser = useCallback(async (email) => {
    try {
      await magic.auth.loginWithMagicLink({ email });

      setVariables({
        where: {
          email: email,
        },
      });

      await getUserData();

      router.push({
        path: "/",
        query: { username: user.username, token: getToken() },
      });
    } catch (err) {
      console.log(err);
    }
  });

  /**
   * Log the user out
   */
  const logoutUser = useCallback(async () => {
    try {
      await magic.user.logout();
      setUser(null);
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  });

  /**
   * If user is logged in, get data and display it
   */
  const checkUserLoggedIn = useCallback(async () => {
    try {
      const isLoggedIn = await magic.user.isLoggedIn();

      if (isLoggedIn) {
        const { email } = await magic.user.getMetadata();
        setUser({ email });
        //Add this just for test
        const token = await getToken();
        console.log("checkUserLoggedIn token", token);
      }
    } catch (err) {
      console.log(err);
    }
  });

  /**
   * Retrieve Magic Issued Bearer Token
   * This allows User to make authenticated requests
   */
  const getToken = useCallback(async () => {
    try {
      const token = await magic.user.getIdToken();
      return token;
    } catch (err) {
      console.log(err);
      return null;
    }
  });

  /**
   * Reload user login on app refresh
   */
  useEffect(() => {
    setMagic(new Magic("pk_live_D9B045E9D4A5360C"));

    checkUserLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ user, logoutUser, loginUser, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};
