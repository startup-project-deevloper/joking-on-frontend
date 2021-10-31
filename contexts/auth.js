import { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

import { Magic } from "magic-sdk";
import { PolkadotExtension } from "@magic-ext/polkadot";
import { getPolkadotRPCURL } from "../lib/polkadot";

import { useRouter } from "next/router";

import parseCookies from "../utils/parseCookies";
import { useCookies } from 'react-cookie';

import { getNextURL } from "../lib/next";

export const AuthContext = createContext(null);

const userSkeleton = {
  username: "",
  email: "",
  phone: "",
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
    },
  ],
  profilePhoto: {
    id: 0,
    original: {
      url: "",
    },
    dreamed: {
      url: "",
    }
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
  const [userCookie, setUserCookie] = useCookies("user");
  const [magic, setMagic] = useState(null);
  const [magicTimer, setMagicTimer] = useState(null);
  const [magicCookie, setMagicCookie] = useCookies("magic");

  const [errorMessage, setErrorMessage] = useState(null);
  const [beforeLogout, setBeforeLogout] = useState([]);
  
  const router = useRouter();

  const loginUser = useCallback(async (email = null, phone = null) => {
    try {
        let did;

        if(email) {
          did = await magic.auth.loginWithMagicLink({ email: email });
        } else {
          did = await magic.auth.loginWithSMS({ phoneNumber: phone });
        }
        
        const u = await axios({
              method: "post",
              url: getNextURL("api/login"),
              headers: { Authorization: `Bearer ${did}` },
              data: {
                identifier: email ?? phone
              },
        });

        if(u.status === 200) {
          parseCookies(
            u.data.cookieArray,
            ["magic","user"]
          );

          setUser(u.data.user);

          router.push({
            path: "/",
          });
        } else {
          if (!u.data?.user?.isSetup && (await magic.auth.isUserLoggedIn())) {
            setUser(u.data?.user);
            setUserCookie({user: u.data?.user});
            setMagicCookie({token: await getToken()});
            router.push({
              path: "/setup",
            });
          } else {
            setErrorMessage(u.data?.message);
            if(await magic.auth.isUserLoggedIn()){
              await magic.auth.logout();
            }
          }
        }
      } catch (e) {
        console.log(e)
      }
  }, [magic]);

  const logoutUser = useCallback(async () => {
    beforeLogout.map((fn) => fn());
    try {
      await magic.user.logout();
      setUser(userSkeleton);
      setUserCookie(undefined);
      setMagicCookie(undefined);
      router.push("/login");
    } catch (e) {
      console.log(e);
    }
  }, [beforeLogout, magic, router]);

  const getToken = useCallback(async () => {
    try {
      const token = await magic.user.getIdToken();
      console.log(token);
      return token;
    } catch (e) {
      console.log(e);
    }
    return null;
  }, [magic]);

  useEffect(async () => {
    if (magic === null) {
      setMagic(
        new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLIC_KEY, {
          extensions: {
            /** 
            polkadot: new PolkadotExtension({
              rpcUrl:
                getPolkadotRPCURL(),
            }),
            */
          },
        })
      );
    }

    if(magic) {
      magic.preload();
    }

    if(magicCookie?.token && !magicTimer) {
      setMagicTimer(setTimeout(async () => {
        setMagicCookie({token: await getToken()});
        setMagicTimer(null);
      }, 900))
    }
    
    if ((user.username !== "" || !userCookie?.user) && magicCookie?.token && magic && !magic.auth.isUserLoggedIn && magicTimer) {
      if (user.username === "" & userCookie?.user) {
        try {
          await magic.auth.loginWithCredentials(magicCookie.token);
          setUser(userCookie.user);
        } catch (e) {
          console.log(e);
        }
       } else if (user.username !== "") {
        try {
          await magic.auth.loginWithCredentials(magicCookie.token);
          const u = await axios({
                method: "post",
                url: getNextURL("/api/login"),
                headers: { Authorization: `Bearer ${magicCookie.token}` },
                data: {
                  identifier: user.username
                },
            });
          if (u.status === 200) {
            parseCookies(u.data.cookieArray, ["magic", "user"]);
            setUser(u.data.user);
          }
        } catch (e) {
          console.log(e);
        }
      }
    }

    return () => {
      if(magicTimer) {
        clearTimeout(magicTimer)
      }
    };
  }, [magic, user, userCookie, magicCookie, getToken, magicTimer]);

  return (
    <AuthContext.Provider
      value={{
        user,
        logoutUser,
        loginUser,
        getToken,
        errorMessage,
        magic,
        beforeLogout,
        setBeforeLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
