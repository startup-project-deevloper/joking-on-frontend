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

import { useContext, useReducer } from "react";
import UserContext from "../contexts/user";

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
  const user = useContext(UserContext);
  const profilePhoto = {
    key: user.username,
    value: user.profilePhoto.url,
  };

  const [isOpenState, isOpenDispatch] = useReducer(isOpenReducer, {
    state: { open: false },
  });

  console.log(isOpenState);

  const router = useRouter();

  return (
    <>
      <nav className="flex h-16 px-4 bg-maximum-red ring-black ring-2">
        <ul className="flex justify-between h-full min-w-full">
          <div className="flex items-center cursor-pointer justify-items-start">
            <Link href="/">
              <Image src={LOGO.value} alt={LOGO.key} height={64} width={64} />
            </Link>
          </div>
          <div className="flex">
            {user.isComedian ? <NavItem type={CLOUD_UPLOAD} /> : <></>}
            <NavItem type={BELL} />
            <NavItem type={CHAT} />

            <NavItem
              type={profilePhoto}
              isOpenDispatch={isOpenDispatch}
              isOpenState={isOpenState}
            >
              <DropdownMenu isOpenDispatch={isOpenDispatch}></DropdownMenu>
            </NavItem>
          </div>
        </ul>
      </nav>
      <div className="flex min-w-full min-h-full bg-opacity-25 bg-hero-pattern bg-maximum-yellow">
        {children}
      </div>
      <footer className="h-32 min-w-full bg-maximum-yellow ring-orange ring-2"></footer>
    </>
  );
};

export default Layout;
