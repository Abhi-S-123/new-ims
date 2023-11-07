import Header from "./Header";
import Sidebar from "./Sidebar";
import React, { useRef } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import moment from "moment";

const OutTransaction = () => {
  const componentRef = useRef();

  const [dataList, setDataList] = useState([]);

  const getalloutTransactionData = async () => {
    const data = await axios.get("http://localhost:7200/getallouttranscation");

    if (data.data.status === 200) {
      setDataList(data.data.data);
    } else {
      setDataList([]);
    }
  };

  useEffect(() => {
    getalloutTransactionData();
  }, []);

  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    console.log(data);

    try {
      let save = {
        customer_id: data.customer_id,
        product_id: data.product_id,
        qty: data.qty,
      };

      let resp = await axios.post(
        "http://localhost:7200/out-transaction",
        save
      );
      console.log(resp);
      if (resp.data.status === 404) {
        alert(resp.data.message);
      }
      window.location.reload();
    } catch {
      // eslint-disable-next-line no-undef
      console.log(error);
    }
  };

  //   useEffect(() => {
  //     onSubmit();
  //   }, [onSubmit]);

  const [selectedOpted, setSelectedOpted] = useState("");
  const [opt, setOpt] = useState(["Opt 1", "Opt 2", "Opt 3", "Opt 4", "Opt 5"]);

  const [selectedOpte, setSelectedOpte] = useState("");

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

  const GetAllCustomer = async () => {
    const data = await axios.get("http://localhost:7200/customer");

    if (data.data.status === 200) {
      setOpt(data.data.data);
    } else {
      setOpt([]);
    }
  };
  useEffect(() => {
    setOpt();
    GetAllCustomer();
  }, []);

  const handleOptedClick = (e) => {
    console.log(e.target.value);
  };
  console.log(option);
  const GetAllProduct = async () => {
    const data = await axios.get("http://localhost:7200/product");

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
      <div ref={componentRef} class="container" style={{ marginLeft: "200px" }}>
        <div class="card" style={{ backgroundColor: "white" }}>
          <div
            class="card-header text-center"
            style={{ backgroundColor: "gray" }}
          >
            <h1>INVENTORY OUT-TRANSACTION </h1>
          </div>
          <div class="card-body">
            <div class="row">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div class="col-8">
                  <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">
                      Customer Name
                    </span>
                    <select
                      {...register("customer_id", { required: true })}
                      class="form-select"
                      id="inputGroupSelect01"
                      onChange={handleOptionClick}
                    >
                      <option value="" selected>
                        select
                      </option>
                      {opt &&
                        opt.map((item, index) => (
                          <option key={index} value={item._id}>
                            {console.log(item.id, "<<<<<<<")}

                            {item.name}
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

                  <table class="table table-bordered mt-5">
                    <thead class="table-dark">
                      <tr>
                        <th scope="col" class="text-center">
                          Id
                        </th>
                        <th scope="col" class="text-center">
                          Customer Name
                        </th>
                        <th scope="col" class="text-center">
                          Product Name
                        </th>
                        <th scope="col" class="text-center">
                          Quantity
                        </th>
                        <th scope="col" class="text-center">
                          Amount (₹)
                        </th>

                        <th scope="col" class="text-center">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataList?.length > 0 ? (
                        dataList.map((el, i) => {
                          return (
                            <tr>
                              <td className="text-center">{i}</td>
                              <td className="text-center">
                                {el.customer_name}
                              </td>
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutTransaction;
