import { createContext, useState, useEffect, useCallback } from "react";
import { Magic } from "magic-sdk";
import { useRouter } from "next/router";
import parseCookies from "../utils/parseCookies";
import axios from "axios";

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
  const router = useRouter();
  const [beforeLogout, setBeforeLogout] = useState([]);
  const [magicUser, setMagicUser] = useState(null);
  /**
   * Log the user in
   * @param {string} email
   */
  const loginUser = useCallback(async (email) => {
    try {
      const did = await magic.auth.loginWithMagicLink({ email: email });
      const address = (await magic.user.getMetadata()).publicAddress;
      const u = await axios({method:'get', url:'http://strapi.jokingon.com/users/me', headers: {'Authorization': `Bearer ${did}`}});
      parseCookies(
        (
          await axios({
            method: "post",
            url: `${
              process.env.NEXT_PUBLIC_MODE === "production"
                ? "https://app.jokingon.com/api/login"
                : "http://localhost:3000/api/login"
            }`,
            data: { id: u.data.id },
            headers: { Authorization: `Bearer ${await getToken()}` },
          })
        ).body.cookieArray
      );
      
      /*router.push({
        path: "/",
        query: { username: user.username, token: getToken() },
      });
      */
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
      console.log(token);
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
    if (!magic) {
      magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLIC_KEY);
    }
    console.log("magic user",magicUser);
  }, [magicUser]);

  return (
    <AuthContext.Provider
      value={{
        user,
        logoutUser,
        loginUser,
        getToken,
        magic,
        beforeLogout,
        setBeforeLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
