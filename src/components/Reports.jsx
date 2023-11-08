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
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [reportActive, setReportActive] = useState(false);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState();
  const [selectedOption, setSelectedOption] = useState("");
  const [options, setOptions] = useState([
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 4",
    "Option 5",
  ]);

  const [invoiceNumber, setInvoiceNumber] = useState("");

  const addItem = () => {
    setItems([...items, { qty: 0, rate: 0 }]);
  };

  const removeItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const updateItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    newItems[index].amount = newItems[index].qty * newItems[index].rate;
    setItems(newItems);
  };

  const calculateTotal = () => {
    const newTotal = items.reduce((acc, item) => acc + item.qty * item.rate, 0);
    setTotal(newTotal);
  };

  const handleOptionClick = (e) => {
    console.log(e.target.value);
    console.log("Butter");
  };
  console.log(options);
  const GetAllCustometr = async () => {
    const data = await axios.get("http://localhost:7200/customer");
    console.log(data, "asldkfja;lkd");
    if (data.data.status === 200) {
      setOptions(data.data.data);
    } else {
      setOptions([]);
    }
  };

  useEffect(() => {
    setOptions();
    GetAllCustometr();
  }, []);

  const getInvoiceNumber = () => {
    axios
      .get("http://localhost:7200/get-invoice-number")
      .then((response) => {
        setInvoiceNumber(response.data.invoiceNumber);
      })
      .catch((error) => {
        console.error("Error fetching invoice number:", error);
      });
  };

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
            <h1>INVENTORY INVOICE</h1>
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

                  <div class="text-center">
                    <img
                      src="https://www.google.com/search?q=image&sca_esv=580067936&tbm=isch&source=lnms&sa=X&ved=2ahUKEwjY94Oa17GCAxX3zDgGHcHTBW8Q_AUoAXoECAIQAw#imgrc=YmDohMp4T5AODM"
                      class="img-fluid"
                      alt="..."
                    />
                  </div>
                </>
              )}
            </div>

            <table class="table table-bordered mt-5">
              <thead class="table-dark">
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col" class="text-end">
                    Name
                  </th>
                  <th scope="col" class="text-end">
                    Qty
                  </th>
                  <th scope="col" class="text-end">
                    Rate
                  </th>
                  <th scope="col" class="text-end">
                    Amount
                  </th>
                  <th scope="col" class="NoPrint">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                    <th scope="row">1</th>
                    <td>
                      <input
                        type="text"
                        class="form-control"
                        value={item.name}
                        onChange={(e) =>
                          updateItem(index, "name", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        class="form-control text-end"
                        value={item.qty}
                        onChange={(e) =>
                          updateItem(index, "qty", +e.target.value)
                        }
                      />
                    </td>
                    <td>
                      {" "}
                      <input
                        type="number"
                        class="form-control text-end"
                        value={item.rate}
                        onChange={(e) =>
                          updateItem(index, "rate", +e.target.value)
                        }
                      />
                    </td>
                    <td>{item.amount} </td>
                    <td class="NoPrint">
                      <button
                        type="button"
                        class="btn btn-danger"
                        onClick={() => removeItem(index)}
                      >
                        Remove hju
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={addItem}>Add Item</button>

            <div class="row">
              <div class="col-8">
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={handlePrint}
                >
                  Print
                </button>
              </div>

              <div class="col-4">
                <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1">
                    <button onClick={calculateTotal}> Total: {total}</button>
                  </span>
                  <input
                    type="number"
                    class="form-control text-end"
                    id="FTotal"
                    name="FTotal"
                    placeholder=""
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </div>
                <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1">
                    GST
                  </span>
                  <input
                    type="number"
                    class="form-control text-end"
                    id="FGst"
                    name="FGst"
                    placeholder=""
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </div>

                <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1">
                    Net Amount
                  </span>
                  <input
                    type="number"
                    class="form-control text-end"
                    id="FNet"
                    name="FNet"
                    placeholder=""
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
