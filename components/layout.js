import { useState, useEffect, useRef, useCallback } from "react";
import { CSSTransition } from "react-transition-group";

import Nav from "./nav";
import NavItem from "./navItem";

import { AcademicCapIcon, BellIcon, CashIcon, ChatIcon, CogIcon, LogoIcon, ChevronDownIcon, ChevronRightIcon, ClipboardCopyBlankIcon, ClipboardCopyCheckedIcon, CloudUploadIcon, CloudIcon, CollectionsIcon, DollarSymbol, QRCodeIcon, ShareIcon, SortAcendingIcon, SortDecendingIcon, VerifiedIcon  } from '../../public/icons';


const Layout = ({ children }) => {
    return (
      <>
      <Nav>
        <NavItem icon={<BellIcon />} />
        <NavItem icon={<BellIcon />} />
        <NavItem icon={<BellIcon />} />

        <NavItem icon={<BellIcon />}>
          <DropdownMenu></DropdownMenu>
        </NavItem>
      </Nav>
      <body>

      </body>`
      </>
    );
  }

  function Navbar(props) {
    return (
      <nav className="navbar">
        <ul className="navbar-nav">{props.children}</ul>
      </nav>
    );
  }

  function NavItem(props) {
    const [open, setOpen] = useState(false);

    return (
      <li className="nav-item">
        <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
          {props.icon}
        </a>

        {open && props.children}
      </li>
    );
  }
  }

export default Layout;
