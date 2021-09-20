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
  const [magic, setMagic] = useState(null);
  const [arbitrumMagic, setArbitrumMagic] = useState(null);
  const [variables, setVariables] = useState({ email: "" });
  const router = useRouter({ email: "" });
  const [beforeLogout, setBeforeLogout] = useState([]);


  /**
   * Log the user in
   * @param {string} email
   */
  const loginUser = useCallback(async (email) => {
    try {
      const didToken = await magic.auth.loginWithMagicLink({ email: email });
      await arbitrumMagic.auth.loginWithMagicCredentials({ token: didToken });
      setVariables({
        where: {
          email: email,
        },
      });

      

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
    beforeLogout.map((fn) => fn());
    try {
      await magic.user.logout();
      setUser(null);
      router.push("/");
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
    if (magic === null) {
      setMagic(new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLIC_KEY));
      setArbitrumMagic(
        new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLIC_KEY, {
          rpcURL:
            "https://arb-rinkeby.g.alchemy.com/v2/dcHQmBXeODzbfJwhrI5dEALMDlPbKAlK",
          chainId: 421611,
        })
      );
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        logoutUser,
        loginUser,
        getToken,
        magic,
        arbitrumMagic,
        beforeLogout,
        setBeforeLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
