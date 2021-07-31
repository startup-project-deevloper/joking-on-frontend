import { useState, useLayoutEffect, useRef, useCallback } from "react";

import Image from "next/image";

import {
  ARROWS_EXPAND,
  CHAT,
  CHEVRON_DOWN,
  CHEVRON_RIGHT,
  BELL,
  CLIPBOARD_COPY_BLANK,
  CLIPBOARD_COPY_CHECKED,
  CLOUD_UPLOAD,
  COG,
  COLLECTIONS,
  DOLLAR_SYMBOL,
  LOGO,
  QR_CODE,
  SORT_DECENDING,
  SORT_ACENDING,
  STAR,
  VERIFIED,
} from "../constrants";

import { LEFT, CENTER, RIGHT } from "../constrants";

const DropdownMenu = () => {
  const [activeMenu, setActiveMenu] = useState(LEFT);
  const [lastActiveMenu, setLastActiveMenu] = useState(activeMenu);

  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
  });

  const calcHeight = useCallback(() => {
    if (dropdownRef.current ?? false) {
      setMenuHeight(dropdownRef.current.firstChild.offsetHeight);
      setLastActiveMenu(activeMenu);
    }
  });

  const multiphaseAnimationClassNames = useCallback(() => {
    switch (activeMenu) {
      case LEFT:
        return `translate-transform origin-center translate-x-[300] translate-y-[${menuHeight}]`;
      case CENTER:
        return `origin-center translate-x-[${
          lastActiveMenu === LEFT ? -300 : 300
        }] translate-y-[${menuHeight}]`;
      case RIGHT:
        return `translate-transform origin-center translate-x-[-300] translate-y-[${menuHeight}]`;
      default:
        return new Error();
    }
  });

  function DropdownItem({ leftIcon, rightIcon, children, newActiveMenu }) {
    return (
      <a
        href="#"
        className="flex items-center p-2 transition-colors h-14 ring-black ring-2"
        onClick={() => {
          if (newActiveMenu ?? false) {
            setLastActiveMenu(activeMenu);
            setActiveMenu(newActiveMenu);
            calcHeight();
          }
        }}
      >
        <span className="mr-2">
          <Image
            src={leftIcon.key}
            width={24}
            height={24}
            quality={100}
            priority={true}
            layout="fill"
            className="hover:filter-none hover:bg-purssian-blue"
          />
        </span>
        {children}
        <span className="ml-auto">
          <Image
            src={rightIcon.key}
            width={24}
            height={24}
            quality={100}
            priority={true}
            layout="fill"
            className="hover:filter-none hover:bg-purssian-blue"
          />
        </span>
      </a>
    );
  }

  return (
    <div
      className={`absolute p-4 overflow-hidden transform translate-x-1/2 bg-maximum-red ring-black ring-2 top-16 w-80 ${multiphaseAnimationClassNames()}`}
      ref={dropdownRef}
    >
      <div className="w-full">
        <DropdownItem setActiveMenu={setActiveMenu} calcHeight={calcHeight}>
          My Profile
        </DropdownItem>
        <DropdownItem
          leftIcon={COG}
          rightIcon={CHEVRON_RIGHT}
          newActiveMenu={CENTER}
          setActiveMenu={setActiveMenu}
          calcHeight={calcHeight}
        >
          Settings
        </DropdownItem>
        <DropdownItem
          leftIcon="🦧"
          rightIcon={CHEVRON_RIGHT}
          setActiveMenu={setActiveMenu}
          calcHeight={calcHeight}
        >
          Animals
        </DropdownItem>
      </div>

      <div className="w-full">
        <DropdownItem
          setActiveMenu={setActiveMenu}
          calcHeight={calcHeight}
          leftIcon={CHEVRON_DOWN}
        >
          <h2>My Tutorial</h2>
        </DropdownItem>
        <DropdownItem leftIcon={COLLECTIONS}>HTML</DropdownItem>
        <DropdownItem leftIcon={COLLECTIONS}>CSS</DropdownItem>
        <DropdownItem leftIcon={COLLECTIONS}>JavaScript</DropdownItem>
        <DropdownItem leftIcon={COLLECTIONS}>Awesome!</DropdownItem>
      </div>

      <div className="w-full">
        <DropdownItem goToMenu="main" leftIcon={CHEVRON_DOWN}>
          <h2>Animals</h2>
        </DropdownItem>
        <DropdownItem leftIcon="🦘">Kangaroo</DropdownItem>
        <DropdownItem leftIcon="🐸">Frog</DropdownItem>
        <DropdownItem leftIcon="🦋">Horse?</DropdownItem>
        <DropdownItem leftIcon="🦔">Hedgehog</DropdownItem>
      </div>
    </div>
  );
};

export default DropdownMenu;
