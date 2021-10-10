import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { withRouter, useRouter } from "next/router";
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";

import { LOGO } from "../constrants";
import { getStrapiURL } from "../lib/strapi";

const Login = () => {
  const [email, setEmail] = useState("");
  const { user, loginUser, isUserLoggedIn, getStrapiToken } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    loginUser(email);
  };

  useEffect(async () => {
  if (typeof window !== "undefined") {
    /**
    if (false !== (await isUserLoggedIn())) {
      router.push("/");
    }
    if(user.username !== "") {
      router.push("/");
    }
    */
  }
  }, [user]);

  return (
    <div>
      <Head>
        <title>Login</title>
        <meta
          name="description"
          content="Login here to be able to access a Joking On account"
        />
      </Head>

      <div className="relative items-center content-center justify-center h-screen min-w-full space-y-4 bg-maximum-red">
        <Link href="https://www.jokingon.com">
          <a className="flex justify-center min-w-full py-12 text-center rounded ">
            <Image src="/joking-on-logo-alpha.png" width={128} height={128} />
          </a>
        </Link>
        <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
          <input
            className="my-4 text-center placeholder-black rounded outline-none bg-lemon-meringue ring-2 ring-black "
            onChange={(e) => setInput(e.target.value)}
            type="email"
            placeholder="Email"
          />
          <input
            className="px-4 py-2 bg-black rounded text-lemon-meringue active:scale-75"
            type="submit"
          />
        </form>

        <Link href="/signup">
          <a className="px-4 py-2 text-center bg-black rounded active:scale-75 text-lemon-meringue">
            Signup
          </a>
        </Link>
      </div>
    </div>
  );
};

export default withRouter(Login);
