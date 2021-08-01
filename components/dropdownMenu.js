import { useState, useEffect, useRef, useCallback } from "react";

import { Transition } from "@headlessui/react";

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

import { LEFT, RIGHT, CENTER, CLOSE } from "../constrants";

const DropdownMenu = ({ isOpenDispatch }) => {
  const [activeMenu, setActiveMenu] = useState(LEFT);
  const [lastActiveMenu, setLastActiveMenu] = useState(activeMenu);

  const directionTo = useRef(null);
  const dropdownRef = useRef(null);

  //This causes a race condition when the opening button is clicked
  useEffect(() => {
    const handler = (event) => {
      if (!dropdownRef.current?.contains(event.target)) {
        isOpenDispatch({ type: CLOSE });
      }
    };

    if (dropdownRef.current !== null) {
      document.addEventListener("mousedown", handler);
    }

    return () => {
      dropdownRef.current?.removeEventListener("mousedown", handler);
    };
  }, []);

  const amIVisible = useCallback((who) => {
    switch (who) {
      case LEFT:
        return activeMenu === LEFT;
      case RIGHT:
        return activeMenu === RIGHT;
      case CENTER:
        return activeMenu === CENTER;
    }
  });

  function DropdownItem({
    leftIcon,
    rightIcon,
    children,
    newActiveMenu,
    direction2,
  }) {
    return (
      <a
        href="#"
        className="flex items-center p-2 transition-colors translate-x-[300] h-14 ring-black ring-2 hover:bg-purssian-blue"
        onClick={() => {
          if (newActiveMenu != null) {
            if (newActiveMenu != activeMenu) {
              directionTo.current = direction2 ?? newActiveMenu;
              console.log({
                ref: directionTo,
                paramD2: direction2,
                parmaNAM: newActiveMenu,
              });
              setActiveMenu(newActiveMenu);
            }
          }
        }}
      >
        <span className="w-6 h-6 mr-2">
          {leftIcon ? (
            <img
              src={leftIcon.value}
              quality={100}
              width={24}
              height={24}
              alt={leftIcon.key}
              className="w-6 h-6 hover:filter-none"
            />
          ) : (
            <div></div>
          )}
        </span>
        {children}
        <span className="w-6 h-6 ml-auto">
          {rightIcon ? (
            <img
              src={rightIcon.value}
              quality={100}
              width={24}
              height={24}
              alt={rightIcon.key}
              className="w-6 h-6 hover:filter-none"
            />
          ) : (
            <div></div>
          )}
        </span>
      </a>
    );
  }

  return (
    <div
      ref={dropdownRef}
      className="absolute flex p-4 overflow-hidden font-sans rounded right-2 bg-maximum-red ring-black ring-2 top-16 w-80"
    >
      <Transition
        show={amIVisible(LEFT)}
        enter="transition-transform transform translate-x-full duration-1000 ease-in"
        enterFrom={`${
          directionTo.current === LEFT
            ? "transition-transform transform translate-x-full"
            : "transition-transform transform -translate-x-full"
        }`}
        leave={`${
          directionTo.current === LEFT
            ? "transition-opacity duration-1000"
            : "transition-transform transform -translate-x-full duration-1000 ease-in"
        }`}
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="z-40 flex flex-col min-w-full"
        afterLeave={() => setLastActiveMenu(LEFT)}
      >
        <DropdownItem setActiveMenu={setActiveMenu}>My Profile</DropdownItem>
        <DropdownItem
          leftIcon={COG}
          rightIcon={CHEVRON_RIGHT}
          newActiveMenu={CENTER}
        >
          Settings
        </DropdownItem>
        <DropdownItem leftIcon={STAR} rightIcon={CHEVRON_RIGHT}>
          Stars
        </DropdownItem>
      </Transition>

      <Transition
        show={amIVisible(CENTER)}
        enter={`transition-transform transform translate-x-full duration-1000 ease-in`}
        enterFrom={`${
          directionTo.current === RIGHT
            ? "transition-opacity duration-1000"
            : "transition-transform transform translate-x-full duration-1000 ease-in"
        }`}
        leave={`${
          directionTo.current === LEFT
            ? "transition-opacity duration-1000"
            : "transition-transform transform -translate-x-full duration-1000 ease-in"
        }`}
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="z-30 flex flex-col min-w-full"
        afterLeave={() => setLastActiveMenu(CENTER)}
      >
        <DropdownItem leftIcon={CHEVRON_DOWN}>
          <h2>My Tutorial</h2>
        </DropdownItem>
        <DropdownItem
          leftIcon={COLLECTIONS}
          newActiveMenu={RIGHT}
          direction2={RIGHT}
        >
          HTML
        </DropdownItem>
        <DropdownItem
          leftIcon={COLLECTIONS}
          newActiveMenu={LEFT}
          direction2={LEFT}
        >
          CSS
        </DropdownItem>
        <DropdownItem leftIcon={COLLECTIONS}>JavaScript</DropdownItem>
        <DropdownItem leftIcon={COLLECTIONS}>Awesome!</DropdownItem>
      </Transition>

      <Transition
        show={amIVisible(RIGHT)}
        enter="transition-transform transform -translate-x-full transition-height duration-1000 ease-in"
        enterFrom="transition-transform transform translate-x-full"
        leave={`${
          directionTo.current === CENTER
            ? "transition-opacity duration-1000"
            : "transition-transform transform -translate-x-full duration-1000 ease-in"
        }`}
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="z-20 flex flex-col min-w-full"
        afterLeave={() => setLastActiveMenu(RIGHT)}
      >
        <DropdownItem goToMenu="main" leftIcon={CHEVRON_DOWN}>
          <h2>Animals</h2>
        </DropdownItem>
        <DropdownItem
          leftIcon={STAR}
          setActiveMenu={setActiveMenu}
          newActiveMenu={CENTER}
        >
          Kangaroo
        </DropdownItem>
        <DropdownItem
          leftIcon={STAR}
          setActiveMenu={setActiveMenu}
          newActiveMenu={CENTER}
        >
          Frog
        </DropdownItem>
        <DropdownItem leftIcon={STAR}>Horse?</DropdownItem>
        <DropdownItem leftIcon={STAR}>Hedgehog</DropdownItem>
      </Transition>
    </div>
  );
};

export default DropdownMenu;
