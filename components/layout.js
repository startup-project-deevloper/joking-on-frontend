import NavItem from "./navItem";
import DropdownMenu from "./dropdownMenu";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { LOGO, COG, BELL, CHAT, CLOUD_UPLOAD } from "../constrants";

import { useContext, useState } from "react";
import UserContext from "../contexts/user";

const Layout = ({ children }) => {
  const user = useContext(UserContext);
  const [profilePhoto, setProfilePhoto] = useState({
    key: user.username,
    value: user.profilePhoto.url,
  });

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
            {user.isComedian ? (
              <NavItem handleChange={() => true} type={CLOUD_UPLOAD} />
            ) : (
              <></>
            )}
            <NavItem handleChange={() => true} type={BELL} />
            <NavItem handleChange={() => true} type={CHAT} />

            <NavItem handleChange={() => true} type={profilePhoto}>
              <DropdownMenu></DropdownMenu>
            </NavItem>
          </div>
        </ul>
      </nav>
      <>{children}</>
    </>
  );
};

export default Layout;
