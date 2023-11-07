/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "./Dash.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Home from "./Home";
import axios from "axios";

const Dashboard = () => {
  const [totalRecords, setTotalRecords] = useState(0);
  const getCount = async () => {
    const data = await axios.get("http://localhost:7200/customer/list");
    setTotalRecords(data.data.data);
  };

  useEffect(() => {
    getCount();
  }, []);
  return (
    <div className="grid-container">
      <div>
        <Sidebar />
      </div>
      <div>
        <Header />
      </div>

      <Home totalRecords={totalRecords} />
    </div>
  );
};

export default Dashboard;
