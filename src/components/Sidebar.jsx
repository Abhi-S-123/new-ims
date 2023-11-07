/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import {
  BsCart3,
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsListCheck,
  BsFillCreditCard2BackFill,
  BsFillCreditCard2FrontFill,
  BsFillBarChartFill,
} from "react-icons/bs";
import "./Dash.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export function Sidebar() {
  const navigate = useNavigate();

  const handleClick = async () => {
    Swal.fire({
      title: "Are You Sure To Logout ?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Log Out",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/");
      }
    });
  };
  //   }
  return (
    <aside id="sidebar" className={"sidebar-responsive"}>
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <BsCart3 className="icon_header" /> Inventory
        </div>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <Link to="/dashboard">
            <BsGrid1X2Fill className="icon" /> Dashboard
          </Link>
        </li>

        <li className="sidebar-list-item">
          <Link to="/AddProducts">
            <BsFillArchiveFill className="icon" /> Products
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/AddSuppliers">
            <BsFillGrid3X3GapFill className="icon" /> Suppliers
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/AddCustomers">
            <BsPeopleFill className="icon" /> Customers
          </Link>
        </li>

        <li className="sidebar-list-item">
          <Link to="/InTransaction">
            <BsFillCreditCard2BackFill className="icon" /> InTransaction
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/OutTransaction">
            <BsFillCreditCard2FrontFill className="icon" /> OutTransaction
          </Link>
        </li>

        <li className="sidebar-list-item">
          <Link to="/Reports">
            <BsFillBarChartFill className="icon" /> Reports
          </Link>
        </li>

        <li className="sidebar-list-item" onClick={handleClick}>
          <BsListCheck className="icon" /> Logout
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
