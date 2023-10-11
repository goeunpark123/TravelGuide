import React from "react";
import { Link } from "react-router-dom";
import "./MainNavigation.css";

import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";

//add SideDrawer
const MainNavigation = (props) => {
  return (
    <MainHeader>
      <button className="main-navigation__menu-btn">
        <span />
        <span />
        <span />
      </button>
      <h1 className="main-navigation__title">
        <Link to="/">Travel Guide</Link>
      </h1>
      <nav className="main-navigation__header-nav">
        <NavLinks />
      </nav>
    </MainHeader>
  );
};

export default MainNavigation;
