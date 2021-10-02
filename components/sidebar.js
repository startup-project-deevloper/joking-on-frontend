import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import useAuth from "../hooks/useAuth";

const Sidebar = () => {

  const suggestions = [];
  const styles = [];

  const { user } = useAuth();
  const router = useRouter();

  const seeMoreSuggestionsButtonRef = useRef(null);
  const [seeMoreSuggestions, setSeeMoreSuggestions] = useState(false);
  const [renderedSuggestions, setRenderedSuggestions] = useState(
    suggestions.slice(0, 4)
  );
  
  const seeMoreStylesButtonRef = useRef(null);
  const [seeMoreStyles, setSeeMoreStyles] = useState(false);
  const [renderedStyles, setRenderedStyles] = useState(styles.slice(0, 6));

  const sidebarRef = useRef(null);
  const scrollbarPlaceholderRef = useRef(null);
  const [sidebarIsExtended, setSidebarIsExtended] = useState(false);

  const [firstUpdate, setFirstUpdate] = useState(true);

  useLayoutEffect(() => {
    if (firstUpdate) {
      setFirstUpdate(false);
      setSidebarIsExtended(window.innerWidth <= 768);
    }
  }, []);

  useEffect(() => {
    function handleResize() {
      setSidebarIsExtended(window.innerWidth <= 768);
    }

    window.addEventListener("resize", handleResize);
  }, []);

  useLayoutEffect(() => {
    let timer;

    const handler = () => {
      sidebarRef.current.classList.remove("remove-scrollbar");
      scrollbarPlaceholderRef.current.classList.add("hidden");
      timer = setTimeout(function () {
        sidebarRef.current.classList.add("remove-scrollbar");
        scrollbarPlaceholderRef.current.classList.remove("hidden");
      }, 2500);
    };

    sidebarRef.current.addEventListener("scroll", handler);

    return () => {
      clearTimeout(timer);
      sidebarRef.current?.removeEventListener("scroll", handler);
    };
  });

  useEffect(() => {
    var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

    function preventDefault(e) {
      e.preventDefault();
    }

    function preventDefaultForScrollKeys(e) {
      if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
      }
    }

    // modern Chrome requires { passive: false } when adding event
    var supportsPassive = false;
    try {
      window.addEventListener(
        "test",
        null,
        Object.defineProperty({}, "passive", {
          get: function () {
            supportsPassive = true;
          },
        })
      );
    } catch (e) {}

    var wheelOpt = supportsPassive ? { passive: false } : false;
    var wheelEvent =
      "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

    function disableScroll() {
      window.addEventListener("DOMMouseScroll", preventDefault, false); // older FF
      window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
      window.addEventListener("touchmove", preventDefault, wheelOpt); // mobile
      window.addEventListener("keydown", preventDefaultForScrollKeys, false);
    }

    function enableScroll() {
      window.removeEventListener("DOMMouseScroll", preventDefault, false);
      window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
      window.removeEventListener("touchmove", preventDefault, wheelOpt);
      window.removeEventListener("keydown", preventDefaultForScrollKeys, false);
    }

    function handleResize() {
      if (window.innerWidth <= 768) {
        sidebarRef.current.addEventListener("mouseenter", disableScroll);
        sidebarRef.current.addEventListener("mouseleave", enableScroll);
      } else {
        sidebarRef.current.removeEventListener("mouseenter", disableScroll);
        sidebarRef.current.removeEventListener("mouseleave", enableScroll);
      }
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      sidebarRef.current?.removeEventListener("mouseenter", disableScroll);
      sidebarRef.current?.removeEventListener("mouseleave", enableScroll);
    };
  });

  return (
    <div
      ref={sidebarRef}
      className="flex h-screen min-w-[56px] sm:w-1/4 xl:w-1/3 border-r-2 border-black overflow-y-scroll overscroll-contain style-scrollbar justify-items-center remove-scrollbar"
    >
      <div className="flex flex-col items-center w-full min-h-full mt-8 ">
        {/*finerprint*/}
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center w-full pb-1">
            <button className="flex w-6 h-6 rounded hover:bg-lemon-meringue md:w-full">
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

              <div className="hidden ml-4 md:flex">
                <span>For You</span>
              </div>
            </button>
            {/*following*/}
            <button className="flex w-6 h-6 my-2 rounded hover:bg-lemon-meringue md:w-full">
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
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <div className="hidden ml-4 md:flex">
                <span>Following</span>
              </div>
            </button>
            {/*#*/}
            <button className="flex w-6 h-6 my-2 rounded hover:bg-lemon-meringue md:w-full">
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
              <div className="hidden ml-4 md:flex">
                <span>Discover</span>
              </div>
            </button>

            <button
              className="flex w-6 h-6 my-2 rounded hover:bg-lemon-meringue md:w-full"
              onClick={() => router.push("/collectables")}
            >
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
                  d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                />
              </svg>
              <div className="hidden ml-4 md:flex">
                <span>Collectables</span>
              </div>
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center py-2 border-t-2 border-b-2 border-black">
          {renderedSuggestions.map((suggestion) => {
            return (
              <Link href={`/${suggestion.username}}`} key={suggestion.username}>
                <div className="flex items-center justify-center my-2 rounded cursor-pointer hover:brightness-125 md:hover:bg-lemon-meringue md:w-full md:h-12 md:mx-2">
                  <Image
                    src={suggestion.profilePhoto.url}
                    alt={suggestion.username}
                    width={24}
                    height={24}
                    layout="fixed"
                    className="w-6 h-6 rounded-full md:ml-4"
                  />

                  <div className="flex-col hidden ml-4 md:flex">
                    <span>{suggestion.username}</span>
                    <span className="text-xs">
                      {`${suggestion.firstName} ${suggestion.lastName}`}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
          <button
            ref={seeMoreSuggestionsButtonRef}
            className="hidden text-xs md:flex md:px-12"
            onClick={() => {
              setRenderedSuggestions(
                !seeMoreSuggestions ? suggestions : suggestions.slice(0, 4)
              );
              setSeeMoreSuggestions(!seeMoreSuggestions);
              seeMoreSuggestionsButtonRef.current.innerHTML = seeMoreSuggestions
                ? "See More"
                : "See Less";
            }}
          >
            See More
          </button>
        </div>

        <div className="flex flex-col items-center pt-2">
          <div className="flex flex-wrap items-center justify-around w-2/3">
            {renderedStyles.map((style) => {
              return (
                <Link
                  href={{ pathname: "/search", query: { keyword: style.name } }}
                  key={style.name}
                >
                  <div className="flex items-center justify-center my-2 rounded cursor-pointer hover:brightness-125 md:hover:bg-lemon-meringue md:h-12 md:mx-2 md:px-2">
                    <div className="hidden min-w-full md:flex">
                      <span className="min-w-full">{`#${style.name}`}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <button
            ref={seeMoreStylesButtonRef}
            className="hidden pb-2 text-xs md:flex md:border-b-2 md:border-black md:px-12"
            onClick={() => {
              setRenderedStyles(!seeMoreStyles ? styles : styles.slice(0, 6));
              setSeeMoreStyles(!seeMoreStyles);
              seeMoreStylesButtonRef.current.innerHTML = seeMoreStyles
                ? "See More"
                : "See Less";
            }}
          >
            See More
          </button>
        </div>
        <div class="flex flex-col items-center justify-center py-2">
          <div className="flex-wrap items-center justify-center hidden mb-24 text-sm md:flex md:w-2/3">
            <Link href="/about">
              <a className="px-4 py-2 my-2 rounded hover:bg-lemon-meringue ">
                About
              </a>
            </Link>

            <Link href="/store">
              <a className="px-4 py-2 my-2 rounded hover:bg-lemon-meringue ">
                Store
              </a>
            </Link>

            <Link href="/help">
              <a className="px-4 py-2 my-2 rounded hover:bg-lemon-meringue ">
                Help
              </a>
            </Link>
            {user.isComedian ? (
              <Link href="/dashboard">
                <a className="px-4 py-2 my-2 rounded hover:bg-lemon-meringue">
                  Comedian Dashboard
                </a>
              </Link>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <div ref={scrollbarPlaceholderRef} className="w-[12px] h-full"></div>
    </div>
  );
};

export default Sidebar;
