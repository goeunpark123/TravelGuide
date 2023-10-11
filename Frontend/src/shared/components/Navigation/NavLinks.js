import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./NavLinks.css";

const NavLinks = (props) => {
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          MAP
        </NavLink>
      </li>
      <li>
        <NavLink to="/places" exact>
          ALL PLACES
        </NavLink>
      </li>
      <li>
        <NavLink to="/places/new">ADD PLACE</NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
