import { useCallback, useContext, useEffect, useState, useRef } from "react";
import { useCookies } from "react-cookie";
import { AuthContext } from "../contexts/auth";
import { WalletContext } from "../contexts/wallet";
import { signOut } from "next-auth/client";
import Router from "next/router";

const useAuth = () => {
  const { address } = useContext(WalletContext);
  const { user, logoutUser, loginUser, getToken, getStrapiToken, magic} = useContext(AuthContext);

  const isUserLoggedIn = useCallback(async () => {
    return  null !== (await getToken());
  });

  return { user, logoutUser, isUserLoggedIn, getToken, loginUser, getStrapiToken, magic };
};

export default useAuth;
