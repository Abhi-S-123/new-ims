/* eslint-disable jsx-a11y/anchor-is-valid */
import Header from "./Header";
import Sidebar from "./Sidebar";
import React, { useRef } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import moment from "moment";

const InTransaction = () => {
  const [dataList, setDataList] = useState([]);
  console.log(dataList);
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    console.log(data);

    try {
      let save = {
        supplier_id: data.supplier_id,
        product_id: data.product_id,
        qty: data.qty,
      };

      let resp = await axios.post("http://localhost:7200/in-transaction", save);
      console.log(resp);
      window.location.reload();
    } catch {
      // eslint-disable-next-line no-undef
      console.log(error);
    }
  };

  const getintransactionData = async () => {
    const data = await axios.get("http://localhost:7200/getallintranscation");

    if (data.data.status === 200) {
      setDataList(data.data.data);
    } else {
      setDataList([]);
    }
  };

  useEffect(() => {
    getintransactionData();
  }, []);

  const componentRef = useRef();
  const [selectedOption, setSelectedOption] = useState("");
  const [options, setOptions] = useState([
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 4",
    "Option 5",
  ]);

  const [selectedOpted, setSelectedOpted] = useState("");

  const [option, setOption] = useState([
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 4",
    "Option 5",
  ]);

  const handleOptionClick = (e) => {
    console.log(e.target.value);
  };
  console.log(options);
  const GetAllSupplier = async () => {
    const data = await axios.get("http://localhost:7200/supplier");
    console.log(data, "asldkfja;lkd");
    if (data.data.status === 200) {
      setOptions(data.data.data);
    } else {
      setOptions([]);
    }
  };
  useEffect(() => {
    setOptions();
    GetAllSupplier();
  }, []);

  const handleOptedClick = (e) => {
    console.log(e.target.value);
  };
  console.log(option);
  const GetAllProduct = async () => {
    const data = await axios.get("http://localhost:7200/product");
    console.log(data, "asldkfja;lkd");
    if (data.data.status === 200) {
      setOption(data.data.data);
    } else {
      setOption([]);
    }
  };
  useEffect(() => {
    setOption();
    GetAllProduct();
  }, []);

  return (
    <div>
      <Header />
      <Sidebar />

      <div
        ref={componentRef}
        class="container w-100"
        style={{ marginLeft: "225px" }}
      >
        <div class="card" style={{ backgroundColor: "white" }}>
          <div
            class="card-header text-center"
            style={{ backgroundColor: "gray" }}
          >
            <h1>INVENTORY IN-TRANSACTION </h1>
          </div>
          <div class="card-body">
            <div class="row">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div class="col-8">
                  <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">
                      Supplier Name
                    </span>
                    <select
                      {...register("supplier_id", { required: true })}
                      class="form-select"
                      id="inputGroupSelect01"
                      onChange={handleOptionClick}
                    >
                      <option value="" selected>
                        select
                      </option>
                      {options &&
                        options.map((item, index) => (
                          <option key={index} value={item._id}>
                            {item.company_name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">
                      Product Name
                    </span>
                    <select
                      {...register("product_id", { required: true })}
                      class="form-select"
                      id="inputGroupSelect01"
                      onChange={handleOptedClick}
                    >
                      <option value="" selected>
                        select
                      </option>
                      {option &&
                        option.map((item, index) => (
                          <option key={index} value={item._id}>
                            {console.log(item)}

                            {item.product_name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <div class="col-4">
                  <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">
                      Quantity
                    </span>
                    <input
                      {...register("qty", { required: true, minLength: 1 })}
                      type="Number"
                      class="form-control"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                </div>

                <div class="d-grid gap-2 d-md-block">
                  <button class="btn btn-primary" type="submit">
                    Button
                  </button>
                </div>
              </form>

              <table class="table table-bordered mt-5">
                <thead class="table-dark">
                  <tr>
                    <th scope="col" class="text-center">
                      Id
                    </th>
                    <th scope="col" class="text-center">
                      Supplier_Name
                    </th>
                    <th scope="col" class="text-center">
                      Product_Name
                    </th>
                    <th scope="col" class="text-center">
                      Quantity
                    </th>
                    <th scope="col" class="text-center">
                      Amount (₹)
                    </th>
                    <th scope="col" class="text-center">
                      Date_Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dataList?.length > 0 ? (
                    dataList.map((el, i) => {
                      return (
                        <tr>
                          <td className="text-center">{i}</td>
                          <td className="text-center">{el.company_name}</td>
                          <td className="text-center">{el.product_name}</td>
                          <td className="text-center">{el.qty}</td>
                          <td className="text-center">{el.amount}</td>

                          <td className="text-center">
                            {moment(el.date).format("MMMM Do YYYY, h:mm a")}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <h5 style={{ color: "yellow" }}>No Data</h5>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InTransaction;
