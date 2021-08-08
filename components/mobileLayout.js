import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import MobileSidebar from "./mobileSidebar";

import { LOGO } from "../constrants/";

const MobileLayout = ({ children }) => {
  const [followingIsOpen, setFollowingIsOpen] = useState(false);
  const [forYouIsOpen, setForYouIsOpen] = useState(true);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [displayVideoHeader, setDisplayVideoHeader] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (Object.keys(router.query).length === 0 || router.query === "videos") {
      setDisplayVideoHeader(true);
    }
  }, []);

  return (
    <div className="relative min-w-full min-h-screen">
      {displayVideoHeader ? (
        <nav className="fixed top-0 z-40 flex min-w-full">
          <button
            className="absolute top-0 px-4 py-2"
            onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 fill-current text-lemon-meringue"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <div className="flex items-center justify-center min-w-full text-lemon-meringue">
            <button
              className={`px-4 py-2 mr-2 ${
                followingIsOpen ? "" : "brightness-50"
              }`}
              onClick={() => {
                setFollowingIsOpen(true);
                setForYouIsOpen(false);
              }}
            >
              Following
            </button>
            <button
              className={`px-4 py-2 ml-2 ${
                forYouIsOpen ? "" : "brightness-50"
              }`}
              onClick={() => {
                setForYouIsOpen(true);
                setFollowingIsOpen(false);
              }}
            >
              For You
            </button>
          </div>
        </nav>
      ) : (
        <nav className="fixed top-0 z-40 flex justify-start min-w-full bg-maximum-red">
          <Link href="/" className="absolute top-0 px-4 py-2">
            <a>
              <Image
                src={LOGO.value}
                alt={LOGO.key}
                height={32}
                width={32}
                layout="fixed"
                className="rounded hover:bg-lemon-meringue"
              />
            </a>
          </Link>
        </nav>
      )}

      {children}
      <footer className="fixed bottom-0 z-30 flex min-w-full h-14 bg-maximum-red">
        <div className="flex items-center justify-around min-w-full">
          <button className="flex p-4 my-2 rounded hover:bg-lemon-meringue md:w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
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

          <button className="flex p-4 my-2 rounded hover:bg-lemon-meringue md:w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
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

          <button className="flex p-4 my-2 rounded hover:bg-lemon-meringue md:w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          {/*following*/}
          <button className="flex p-4 my-2 rounded hover:bg-lemon-meringue md:w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </button>

          <button className="flex p-4 my-2 rounded hover:bg-lemon-meringue md:w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </button>
        </div>
      </footer>

      <MobileSidebar isOpen={sidebarIsOpen} setIsOpen={setSidebarIsOpen} />
    </div>
  );
};

export default MobileLayout;
