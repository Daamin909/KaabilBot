import React from "react";

import Logo from "../../assets/Images/Logo.png";
import "./NavBar.css";
const NavBar = () => {
  return (
    <div className="navbar">
      <div className="branding">
        <img className="logo-image" src={Logo} />
        <a className="logo-name">KaabilBot™</a>
      </div>
    </div>
  );
};

export default NavBar;
