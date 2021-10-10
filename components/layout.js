import NavItem from "./navItem";
import DropdownMenu from "./dropdownMenu";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import {
  LOGO,
  COG,
  BELL,
  CHAT,
  CLOUD_UPLOAD,
  OPEN,
  CLOSE,
} from "../constrants";

import { useContext, useEffect, useReducer, useRef } from "react";
import { AuthContext } from "../contexts/auth";

const isOpenReducer = (state, action) => {
  switch (action.type) {
    case OPEN:
      return { state: { open: true } };
    case CLOSE:
      return { state: { open: false } };
    default:
      return new Error();
  }
};

const Layout = ({ children }) => {
  const { user } = useContext(AuthContext);
  console.log(user);
  const profilePhoto = {
    key: user.username,
    value: user?.profilePhoto?.url,
  };

  const [isOpenState, isOpenDispatch] = useReducer(isOpenReducer, {
    state: { open: false },
  });

  const userProfilePictureButtonRef = useRef(null);
  const navRef = useRef(null);

  const router = useRouter();

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

    navRef.current.addEventListener("mouseenter", disableScroll);
    navRef.current.addEventListener("mouseleave", enableScroll);
  });

  return (
    <>
      <nav
        ref={navRef}
        className="flex h-[10vh] min-w-full px-4 border-b-2 border-black bg-maximum-red"
      >
        <ul className="flex justify-between h-full min-w-full">
          <div className="flex items-center cursor-pointer justify-items-start">
            <Link href="/">
              <Image
                src={LOGO.value}
                alt={LOGO.key}
                height={64}
                width={64}
                layout="fixed"
                className="rounded hover:bg-lemon-meringue"
              />
            </Link>
          </div>
          <div className="flex">
            <NavItem type={CLOUD_UPLOAD} action={() => router.push('/dashboard')} isOpenDispatch={() => null} />
            <NavItem type={BELL} />
            <NavItem type={CHAT} />

            <NavItem
              type={profilePhoto}
              isOpenDispatch={isOpenDispatch}
              isOpenState={isOpenState}
              ref={userProfilePictureButtonRef}
            >
              <DropdownMenu
                isOpenDispatch={isOpenDispatch}
                parentRef={userProfilePictureButtonRef}
              ></DropdownMenu>
            </NavItem>
          </div>
        </ul>
      </nav>
      <div className="flex min-w-full min-h-full bg-maximum-red ">
        <div className="z-30" id="escape-hatch" />
        {children}
      </div>
    </>
  );
};

export default Layout;
