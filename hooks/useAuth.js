import { useCallback, useContext, useEffect, useState, useRef } from "react";
import { useCookies } from "react-cookie";
import { AuthContext } from "../contexts/auth";
import { signOut } from "next-auth/client";
import Router from "next/router";

const useAuth = () => {
  const { user, logoutUser, loginUser, getToken } = useContext(AuthContext);
  
  const logout = useCallback(() => {
    setCookie(undefined);
    logoutUser();
    signOut(user);

    Router.push("/");
  });

  const isUserLoggedIn = useCallback(async () => {
    return  null !== (await getToken());
  });

  return { user, logout, isUserLoggedIn, getToken, loginUser };
};

export default useAuth;
