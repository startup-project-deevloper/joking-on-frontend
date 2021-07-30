import NavItem from "./navItem";
import DropdownMenu from "./dropdownMenu";

import { LOGO } from "../public/icons/logo.svg";

const Layout = ({ children }) => {
  return (
    <>
      <nav>
        <ul>
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
