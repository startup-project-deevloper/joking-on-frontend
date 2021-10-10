import { createContext, useState, useEffect, useCallback } from "react";
import { Magic } from "magic-sdk";
import { AvalancheExtension } from "@magic-ext/avalanche";
import { Avalanche, BinTools, Buffer, BN } from "avalanche";
import { useRouter } from "next/router";
import parseCookies from "../utils/parseCookies";
import axios from "axios";
import { getStrapiURL } from "../lib/strapi";
import { useCookies } from 'react-cookie';

export const AuthContext = createContext(null);

let magic;

const userSkeleton = {
  username: "",
  firstName: "",
  lastName: "",
  confirmed: false,
  blocked: false,
  bio: null,
  isComedian: false,
  laughsLaughedAt: null,
  addresses: [
    {
      name: "",
      publicKey: "",
      type: "",
    },
  ],
  profilePhoto: {
    url: "",
  },
  nonfungibleTokens: [],
  links: [],
  videos: [
    {
      content: {
        url: "",
      },
    },
  ],
  avatar: null,
  items: [],
  laughedAtVideos: [],
  laughedAtComments: [],
  following: [],
  followers: [],
  isSetup: false,
};


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(userSkeleton);
  const router = useRouter();
  const [magic, setMagic] = useState(null);
  const [beforeLogout, setBeforeLogout] = useState([]);
  const [magicCookie, setMagicCookie] = useCookies("magic");
  const [userCookie, setUserCookie] = useCookies("user");
  /**
   * Log the user in
   * @param {string} email
   */
  const loginUser = useCallback(async (email) => {
    let u;
    try {

        const did = await magic.auth.loginWithMagicLink({ email: email });
        
        parseCookies(
          (await axios({
            method: "post",
            url: `${
              process.env.NEXT_PUBLIC_MODE === "production"
                ? "https://app.jokingon.com/api/login"
                : "http://localhost:3000/api/login"
            }`,
            headers: { Authorization: `Bearer ${await getToken()}` },
          })
        ).data.cookieArray, ["magic","user"]
      );

       
        if (!userCookie?.user.isSetup) {
          setUser(userCookie.user);
          router.push({
            path: "/setup",
          });
        }


      } catch (e) {
        console.log(e)
      }
      
      router.push({
        path: "/",
      });
    
  }, [magic]);

  /**
   * Log the user out
   */
  const logoutUser = useCallback(async () => {
    beforeLogout.map((fn) => fn());
    try {
      await magic.user.logout();
      setUser(null);
      setUserCookie("user", undefined);
      setStrapiCookie("strapi", undefined);
      router.push("/login");
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


  const customNodeOptions = {
    rpcUrl: "https://api.avax-test.network/ext/bc/C/rpc",
    chainId: 43113,
  };
  /**
   * Reload user login on app refresh
   */
  useEffect(async () => {
    if (magic === null) {
      setMagic(new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLIC_KEY, {
        extensions: {
          xchain: new AvalancheExtension({
            rpcUrl: "https://api.avax-test.network/ext/bc/C/rpc",
            chainId: 'X',
            networkId: 1, // Avalanche networkId
          }),
        },
        network: customNodeOptions
      }));
    }

    if(magic) {
      magic.preload();
    }
    
    if ((user.username !== "" || !userCookie?.user) && magicCookie?.token && magic && !magic.auth.isUserLoggedIn) {
      if (user.username === "" & userCookie?.user) {
        setUser(userCookie.user);
       } else if (user.username !== "") {
        try {
          parseCookies(
            (
              await axios({
                method: "post",
                url: `${
                  process.env.NEXT_PUBLIC_MODE === "production"
                    ? "https://app.jokingon.com/api/login"
                    : "http://localhost:3000/api/login"
                }`,
                headers: { Authorization: `Bearer ${await magicCookie.token}` },
              })
            ).data.cookieArray,
            ["magic", "user"]
          );
          if (u.status === 200) {
            setUser(u.data);
            setUserCookie(u.data);
          }
        } catch (e) {
          console.log(e);
        }
      }
    }
  }, [magic, user, userCookie, magicCookie]);

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
