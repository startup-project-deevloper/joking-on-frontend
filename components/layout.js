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

import { useContext, useReducer, useRef } from "react";
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

  const userProfilePictureButtonRef = useRef(null);

  const router = useRouter();

  return (
    <>
      <nav className="flex h-16 min-w-full px-4 border-b-2 border-black bg-maximum-red">
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
        {children}
      </div>
    </>
  );
};

export default Layout;
