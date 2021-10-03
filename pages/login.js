import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { withRouter, useRouter } from "next/router";
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";

import { LOGO } from "../constrants";

const Login = () => {
  const [input, setInput] = useState("");
  const { loginUser, isUserLoggedIn } = useAuth();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(input);
  };

  useEffect(async () => {
  if (typeof window !== "undefined") {
    if (false !== (await isUserLoggedIn())) {
      router.push("/");
    }
  }
  }, []);

  return (
    <div>
      <Head>
        <title>Login</title>
        <meta
          name="description"
          content="Login here to be able to access a Joking On account"
        />
      </Head>

      <div className="relative items-center content-center justify-center min-w-full min-h-screen bg-maximum-red">
        <Link href="/">
          <a className="flex justify-center min-w-full py-12 text-center rounded ">
            <Image src={LOGO.value} width={128} height={128} />
          </a>
        </Link>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <input
            className="my-4 text-center placeholder-black rounded bg-lemon-meringue ring-2 ring-black focus:outline-none "
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="email"
            placeholder="Email address"
          />
          <input
            className="px-4 py-2 rounded bg-lemon-meringue ring-2 ring-black hover:ring-lemon-meringue hover:bg-black hover:text-lemon-meringue"
            type="submit"
            content="Login"
          />
        </form>
      </div>
    </div>
  );
};

export default withRouter(Login);
