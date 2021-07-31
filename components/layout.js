import NavItem from "./navItem";
import DropdownMenu from "./dropdownMenu";

import { LOGO, COG, CLOUD_UPLOAD } from "../constrants";

const Layout = ({ children }) => {
  return (
    <>
      <nav className="px-4 bg-maximum-red ring-black ring-2">
        <ul className="flex h-full max-w-full justify-items-end">
          <NavItem handleChange={() => true} type={LOGO} />
          <NavItem handleChange={() => true} type={LOGO} />
          <NavItem handleChange={() => true} type={LOGO} />

          <NavItem handleChange={() => true} type={LOGO}>
            <DropdownMenu></DropdownMenu>
          </NavItem>
        </ul>
      </nav>
      <>{children}</>
    </>
  );
};

export default Layout;
