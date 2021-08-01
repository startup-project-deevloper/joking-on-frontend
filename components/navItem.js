import Image from "next/image";

import React from "react";

import { OPEN, CLOSE } from "../constrants";

const NavItem = React.forwardRef(
  ({ children, type, isOpenState, isOpenDispatch }, ref) => {
    return (
      <>
        <li ref={ref} className="flex items-center justify-items-end">
          <a
            href="#"
            className="flex items-center p-1 m-1 bg-lemon-meringue rounded-3xl justify-items-center filter hover:brightness-125 ring-2 ring-black"
            onClick={() =>
              isOpenDispatch(
                isOpenState?.state?.open ? { type: CLOSE } : { type: OPEN }
              )
            }
          >
            <Image
              src={type.value}
              alt={type.key}
              width={24}
              height={24}
              className={`h-full rounded-full`}
            />
          </a>
        </li>
        {isOpenState?.state?.open && children}
      </>
    );
  }
);

export default NavItem;
