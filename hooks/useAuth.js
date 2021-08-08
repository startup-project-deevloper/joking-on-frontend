import { useCallback, useContext, useEffect } from "react";
import { useCookies } from "react-cookie";
import { AuthContext } from "../contexts/auth";
import { signOut } from "next-auth/client";

const useAuth = () => {
  const [cookie, setCookie] = useCookies("user");
  const { user, logoutUser, loginUser, getToken } = useContext(AuthContext);
  const [countDownToReset, setCountDownToReset] = useState(900);

  useEffect(() => {
    let timer;
    if (!timer || countDownToReset === 0) {
      timer.setTimeout(function () {
        if (cookie.load("exp") < new Date().getTime()) {
          setCountDownToReset(0);
          setCookie(
            "user",
            JSON.stringify({ user, token: getToken(), maxAge: 900 })
          );
        }
      }, 900001);
    }

    return () => timer?.clearTimeout();
  }, [countDownToReset]);

  const logout = useCallback(() => {
    setCookie(user.username);
    logoutUser();
    signOut(user);
    router.push("/");
  });

  const isUserLoggedIn = useCallback(() => {
    return getToken() !== null;
  });

  return { user, logout, isUserLoggedIn, getToken, loginUser };
};

export default useAuth;
