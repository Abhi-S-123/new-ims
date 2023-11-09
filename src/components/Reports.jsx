/* eslint-disable jsx-a11y/anchor-is-valid */
// import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
// import {} from "react-bootstrap";
// import { Link } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Sidebar from "./Sidebar";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import "./Reports.css";
// import { useForm } from "react-hook-form";
// import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const Reports = () => {
  const componentRef = useRef();

  const [reportActive, setReportActive] = useState(false);
  const [report, setReport] = useState([]);

  const handleReportClick = (e) => {
    console.log(e.target.value);
  };

  const GetAllReports = async () => {
    const data = await axios.get(
      "http://localhost:7200/get-all-transaction-reports"
    );
    console.log(data);

    if (data.status === 200) {
      setReport(data.data);
    } else {
      setReport([]);
    }
  };
  useEffect(() => {
    setReport();
    GetAllReports();
  }, []);

  return (
    <div>
      <Header />
      <Sidebar />

      <div ref={componentRef} class="container" style={{ marginLeft: "200px" }}>
        <div class="card" style={{ backgroundColor: "white" }}>
          <div
            class="card-header text-center"
            style={{ backgroundColor: "gray" }}
          >
            <h1>INVENTORY REPORT</h1>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-6  ">
                <div class="input-group">
                  <span class="input-group-text" id="basic-addon1">
                    Start Date
                  </span>
                  <input
                    type="date"
                    class="form-control"
                    placeholder=" Invoice Date"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </div>
              </div>
              <div class="col-6 ">
                <div class="input-group">
                  <span class="input-group-text" id="basic-addon1">
                    End Date
                  </span>
                  <input
                    type="date"
                    class="form-control"
                    placeholder=" End Date"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </div>
              </div>
              <div class="col-6 mt-3 ">
                <div class="btn-group" role="group" aria-label="Basic example">
                  <button type="Submit" class="btn btn-primary btn-lg">
                    Get Report
                  </button>
                </div>
              </div>
            </div>
            <div>
              {reportActive ? (
                <div>
                  <br />
                  <br />
                  Lorem ipsum dolor sit amet consectetur adipisicing elit
                </div>
              ) : (
                <>
                  <br />
                  <br />

                  <table class="table table-bordered border-primary mt-5">
                    <thead class="table-dark">
                      <tr>
                        <th className="text-center" scope="col">
                          Sr No.
                        </th>
                        <th scope="col" class="text-center">
                          Transaction_Name
                        </th>
                        <th scope="col" class="text-center">
                          Transaction_Count
                        </th>
                        <th scope="col" class="text-center">
                          Total_Qty
                        </th>

                        <th scope="col" class="text-center">
                          Total_Amount
                        </th>
                        <th scope="col" class="text-center">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="table-info border-dark">
                        <th class="text-center" scope="row">
                          1.
                        </th>

                        <td class="text-center">
                          {" "}
                          <b>In-Transaction </b>
                        </td>

                        <td class="text-center">
                          {report && report?.inTransaction}
                        </td>
                        <td class="text-center">
                          {report && report?.inTransactionQty}
                        </td>
                        <td class="text-center">
                          {report && report?.inTransactionAmt}
                        </td>
                        <td class="text-center">-</td>
                      </tr>

                      <tr class="table-primary">
                        <th class="text-center" scope="row">
                          2.
                        </th>

                        <td class="text-center">
                          {" "}
                          <b>Out-Transaction </b>
                        </td>

                        <td class="text-center">
                          {report && report?.outTransaction}
                        </td>
                        <td class="text-center">
                          {report && report.outTransactionQty}
                        </td>
                        <td class="text-center">
                          {report && report.outTransactionAmt}
                        </td>
                        <td class="text-center">-</td>
                      </tr>
                      <tr class="table-secondary    ">
                        <th class="text-center" scope="row">
                          3.
                        </th>

                        <td class="text-center">
                          {" "}
                          <b>TOTAL </b>
                        </td>

                        <td class="text-center">
                          {report && report?.totalTransaction}
                        </td>
                        <td class="text-center">
                          {report && report?.totalTransactionQty}
                        </td>
                        <td class="text-center">
                          {report && report?.totalTransactionAmt}
                        </td>
                        <td class="text-center">-</td>
                      </tr>
                    </tbody>
                  </table>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
