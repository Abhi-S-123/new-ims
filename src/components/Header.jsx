/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-expressions */
import React from "react";
import { BsPersonCircle, BsSearch, BsJustify } from "react-icons/bs";
import "./Dash.css";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="header">
      <div className="menu-icon">
        {/* <BsJustify className="icon" /> */}
        <h1>INVENTORY MANAGMENT SYSTEM</h1>
      </div>

      {/* <div className="header-left">
        <BsSearch className="icon" />
        <input type="text" placeholder="Search items..." />
      </div> */}
      {/* 
      <div className="header-right">
        <div class="dropdown">
          <button
            class="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <BsPersonCircle className="icon" />
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <Link to="/">
              <a class="dropdown-item" href="#">
                Logout
              </a>
            </Link>
          </div>
        </div>
      </div> */}
    </header>
  );
}

export default Header;
