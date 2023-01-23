//NavigationBar
import React from "react";
import ***REMOVED*** Nav, NavLink, NavMenu } 
from "./NavbarElements.js";

const Navbar = () => ***REMOVED***
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
        Legg til emner
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