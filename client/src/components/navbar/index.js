//NavigationBar
import React from "react";
import { Nav, NavLink, NavMenu } 
from "./NavbarElements.js";

const Navbar = () => {
return (
<>
  <Nav>
    <NavMenu>
      <NavLink to="/" activestyle="true">
        OmegaUtveksling
      </NavLink>
      <NavLink to="/overview" activestyle="true">
        Oversikt
      </NavLink>
      <NavLink to="/newCourses" activestyle="true">
        Legg til emne
      </NavLink>
      <NavLink to="/about" activestyle="true">
        Om
      </NavLink>
    </NavMenu>
  </Nav>
</>
);
};

export default Navbar;