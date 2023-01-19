//NavigationBar
import React from "react";
import ***REMOVED*** Nav, NavLink, NavMenu } 
from "./NavbarElements.js";

const Navbar = () => ***REMOVED***
return (
<>
  <Nav>
    <NavMenu>
      <NavLink to="/" activeStyle>
        OmegaUtveksling
      </NavLink>
      <NavLink to="/overview" activeStyle>
        Oversikt
      </NavLink>
      <NavLink to="/newCourses" activeStyle>
        Legg til emner
      </NavLink>
      <NavLink to="/about" activeStyle>
        Om
      </NavLink>
    </NavMenu>
  </Nav>
</>
);
};

export default Navbar;