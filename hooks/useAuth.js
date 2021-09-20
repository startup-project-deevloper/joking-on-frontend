import { useCallback, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { AuthContext } from "../contexts/auth";
import { signOut } from "next-auth/client";
import Router from "next/router";

const useAuth = () => {
  const [cookie, setCookie] = useCookies("user");
  const { user, logoutUser, loginUser, getToken } = useContext(AuthContext);
  const [reset, setReset] = useState(false);
  const timerRef = useRef(null);
  useEffect(() => {
    if (!timerRef.current) {
      setCookie(
        "user",
        JSON.stringify({ user, token: getToken(), maxAge: 900 })
      );
    }

    if (!timerRef.current || reset) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        setCookie(
          "user",
          JSON.stringify({ user, token: getToken(), maxAge: 900 })
        );
        setReset(true);
      }, 900);
    } else {
      setReset(true);
    }

    return () => clearTimeout(timerRef.current);
  }, [reset]);

  const logout = useCallback(() => {
    setCookie(undefined);
    logoutUser();
    signOut(user);

    Router.push("/");
  });

  const isUserLoggedIn = useCallback(() => {
    return getToken() !== null;
  });

  return { user, logout, isUserLoggedIn, getToken, loginUser };
};

export default useAuth;
