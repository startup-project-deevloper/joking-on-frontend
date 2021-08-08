import { Transition } from "@headlessui/react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useContext } from "react";
import { LOGO } from "../constrants";
import { AuthContext } from "../contexts/auth";

const MobileSidebar = ({ isOpen, setIsOpen }) => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const backgroundRef = useRef(null);

  useEffect(() => {
    if (backgroundRef.current !== null) {
      document.addEventListener("mousedown", (event) => {
        if (backgroundRef.current !== null) {
          if (backgroundRef.current?.contains(event.target)) {
            setIsOpen(false);
          }
        }
      });
    }

    return () => {
      document.removeEventListener("mousedown", (event) => {
        if (backgroundRef.current !== null) {
          if (backgroundRef.current?.contains(event.target)) {
            setIsOpen(false);
          }
        }
      });
    };
  }, [backgroundRef.current, setIsOpen, isOpen]);
  return (
    <>
      <Transition
        show={isOpen ? true : false}
        timeout={500}
        enterFrom="-translate-x-64 tramsform-"
        enter="-translate-x-64 duration-500 transition-translate"
        enterTo="translate-x-0 duration-500 transition-translate"
        leave="-translate-x-64 duration-500 transition-translate"
        className="fixed top-0 left-0 z-[52] justify-center w-64 min-h-screen bg-lemon-meringue -translate-x-64"
        as="nav"
      >
        <div className="flex flex-col items-center w-64 min-h-screen ">
          <Link href="/">
            <a>
              <Image src={LOGO.value} width={64} height={64} layout="fixed" />
            </a>
          </Link>

          <div className="flex flex-col items-center py-8 border-b-2 border-black">
            <button
              className="w-full px-4 py-2 text-2xl bg-black rounded text-lemon-meringue"
              onClick={() => router.push("/login")}
            >
              Login
            </button>
          </div>

          <div className="flex flex-col items-center w-full min-h-full my-4  mr-[-12px]">
            {/*finerprint*/}
            <div className="flex flex-col items-center justify-center">
              <div className="flex flex-col items-center justify-center">
                <button className="flex px-4 py-2 my-4 rounded hover:bg-black hover:text-lemon-meringue">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 fill-current"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                    />
                  </svg>
                </button>
                {/*following*/}
                <button className="flex px-4 py-2 my-4 rounded hover:bg-black hover:text-lemon-meringue">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 fill-current"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <div className="hidden ml-4 md:flex">
                    <span>Following</span>
                  </div>
                </button>
                {/*#*/}
                <button className="flex px-4 py-2 my-4 rounded hover:bg-black hover:text-lemon-meringue">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 fill-current"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center mx-4 mb-24 text-sm border-t-2 border-b-2 border-black">
            <Link href="/about">
              <a className="px-4 py-2 my-2 rounded hover:bg-black hover:text-lemon-meringue">
                About
              </a>
            </Link>

            <Link href="/store">
              <a className="px-4 py-2 my-2 rounded hover:bg-black hover:text-lemon-meringue">
                Store
              </a>
            </Link>

            <Link href="/help">
              <a className="px-4 py-2 my-2 rounded hover:bg-black hover:text-lemon-meringue ">
                Help
              </a>
            </Link>
            {user.isComedian ? (
              <Link href="/dashboard">
                <a className="px-4 py-2 my-2 rounded hover:bg-black hover:text-lemon-meringue">
                  Comedian Dashboard
                </a>
              </Link>
            ) : (
              <></>
            )}
          </div>
        </div>
      </Transition>
      <Transition
        show={isOpen ? true : false}
        timeout={500}
        enterFrom="opacity-0"
        enter="transition-opacity duration-500 opacity-75"
        leaveTo="opacity-0"
        leave="transition-opacity duration-500 opacity-75"
        className="fixed top-0 left-0 z-[51] justify-center w-full min-h-screen bg-black/75 cursor-pointer"
      >
        <div
          ref={backgroundRef}
          className="flex flex-col items-center w-64 min-w-full min-h-screen cursor-pointer"
        ></div>
      </Transition>
    </>
  );
};

export default MobileSidebar;
