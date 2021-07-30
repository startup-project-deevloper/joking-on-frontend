import { useState, useEffect, useRef, useCallback } from "react";

function DropdownItem(props) {
  return (
    <a
      href="#"
      className="menu-item"
      onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
    >
      <span className="icon-button">{props.leftIcon}</span>
      {props.children}
      <span className="icon-right">{props.rightIcon}</span>
    </a>
  );
}

const DropdownMenu = () => {
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
  }, []);

  const calcHeight = useCallback((el) => {
    const height = el.offsetHeight;
    setMenuHeight(height);
  });

  return (
    <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
      <div className="menu">
        <DropdownItem>My Profile</DropdownItem>
        <DropdownItem
          leftIcon={<CogIcon />}
          rightIcon={<ChevronIcon />}
          goToMenu="settings"
        >
          Settings
        </DropdownItem>
        <DropdownItem
          leftIcon="🦧"
          rightIcon={<ChevronIcon />}
          goToMenu="animals"
        >
          Animals
        </DropdownItem>
      </div>

      <div className="menu">
        <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
          <h2>My Tutorial</h2>
        </DropdownItem>
        <DropdownItem leftIcon={<BoltIcon />}>HTML</DropdownItem>
        <DropdownItem leftIcon={<BoltIcon />}>CSS</DropdownItem>
        <DropdownItem leftIcon={<BoltIcon />}>JavaScript</DropdownItem>
        <DropdownItem leftIcon={<BoltIcon />}>Awesome!</DropdownItem>
      </div>

      <div className="menu">
        <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
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