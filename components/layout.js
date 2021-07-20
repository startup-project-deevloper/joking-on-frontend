import React, { useState, useEffect, useRef, useCallback } from "react";
import { CSSTransition } from "react-transition-group";

import Nav from "./nav";
import NavItem from "./navItem";
import DropdownMenu from "./dowpdownMenu";

import CapIcon from "../public/icons/academic_cap.svg";

const Layout = ({ children }) => {
  return (
    <>
      <Nav>
        <NavItem icon={<CapIcon />} />
        <NavItem icon={<CapIcon />} />
        <NavItem icon={<CapIcon />} />

        <NavItem icon={<CapIcon />}>
          <DropdownMenu></DropdownMenu>
        </NavItem>
      </Nav>
      <body>{children}</body>`
    </>
  );
};

export default Layout;
