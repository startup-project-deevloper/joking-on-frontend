import { useCallback } from "react";
import Router from "next/router";

import NavItem from "./navItem";
import Bell from "../public/icons/bell.js";

const Nav = ({ children }) => {
  const logoHandleChange = useCallback(() => {}, []);

  const bellHandleChange = useCallback(() => {});

  const profileHandleChange = useCallback(() => {});

  return (
    <>
      <nav className="flex justify-between bg-gray-400">
        <NavItem handleChange={logoHandleChange} icon={<Bell />} />
        <div className="flex justify-around">
          <NavItem handleChange={bellHandleChange} icon={null} />
          <NavItem handleChange={profileHandleChange} icon={null} />
        </div>
      </nav>

      {children}
    </>
  );
};

export default Nav;
