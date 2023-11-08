/* eslint-disable jsx-a11y/anchor-is-valid */
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import {} from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const validationSchema = yup.object().shape({
  product_name: yup.string().required("Product  Name is Required"),
  price: yup.number().required("Price is Required"),
  uom: yup.string().required("uom is Required"),
  description: yup.string().required("Description is Required"),
});

const AddProducts = () => {
  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [formData, setFormData] = useState({
    product_name: "",
    price: "",
    margin: "",
    uom: "",
    description: "",
  });

  const [dataList, setDataList] = useState([]);
  const [formDataEdit, setFormDataEdit] = useState({
    id: "",
    product_name: "",
    price: "",
    quantity: "",
    uom: "",
    description: "",
    margin: "",
  });

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleAdd = async (e) => {
    // e.preventDefault();
    console.log(formData);
    const data = await axios.post(
      "http://localhost:7200/product/create",
      formData
    );

    console.log(data);
    setFormData({
      product_name: "",
      price: "",
      margin: "",
      uom: "",
      description: "",
    });
    getFetchData();
  };
  const getFetchData = async () => {
    const data = await axios.get("http://localhost:7200/product");
    if (data.data.status === 200) {
      setDataList(data.data.data);
    } else {
      setDataList([]);
    }
  };
  console.log("Abhishek");
  useEffect(() => {
    getFetchData();
  }, []);

  const handleDelete = async (id) => {
    const data = await axios.delete(
      "http://localhost:7200/product/delete/" + id
    );

    if (data.data.status === 201) {
      toast.success("Delete successfully!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 10,
      });
    }
    getFetchData();
  };

  const handleUpdate = async (e, id) => {
    console.log(id);
    e.preventDefault();
    const data = await axios.put(
      "http://localhost:7200/product/update",
      formDataEdit,
      id
    );
    if (data.data.status === 201) {
      toast.success("Update successfully!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 10,
      });
    }
    getFetchData();
  };

  const handleEditOnChange = async (e) => {
    const { value, name } = e.target;
    setFormDataEdit((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleEdit = (el) => {
    setFormDataEdit({
      id: el?._id,
      product_name: el?.product_name,
      price: el?.price,
      margin: el?.margin,
      uom: el?.uom,
      description: el?.description,
    });
  };

  return (
    <div>
      <Header />
      <Sidebar />
      <div className="container ">
        <div
          className="crud container shadow-lg p-3 mb-5  bg-body rounded"
          style={{ marginLeft: "7%", marginTop: "20px" }}
        >
          <div className="row ">
            <div className="col-sm-3 mt-5 mb-4  text-gred"></div>
            <div className="d-flex justify-content-between mt-3 ">
              <h1>
                <b style={{ color: "green" }}>Products Records</b>
              </h1>
              <button
                onSubmit={handleSubmit}
                type="submit"
                className="btn btn-primary"
                data-toggle="modal"
                data-target="#addCustomers"
              >
                Add New Products
              </button>
            </div>
            <div className="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred"></div>
          </div>
          <div className="row">
            <div className="table-responsive ">
              <table className="table table-striped table-hover table-bordered">
                <thead>
                  <tr>
                    <th className="text-center">Id</th>
                    <th className="text-center">Product_Name </th>
                    <th className="text-center">Price in Rs</th>
                    <th className="text-center">
                      <b>Available Quantity</b>
                    </th>
                    <th className="text-center">UOM</th>
                    <th className="text-center">Description</th>
                    <th className="text-center">Margin</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {dataList?.length > 0 ? (
                    dataList.map((el, i) => {
                      return (
                        <tr>
                          <td className="text-center">{i}</td>
                          <td className="text-center">{el.product_name}</td>
                          <td className="text-center">{el.price}</td>
                          <td className="text-center">
                            <b>{el.quantity}</b>
                          </td>
                          <td className="text-center">{el.uom}</td>
                          <td className="text-center">{el.description}</td>
                          <td className="text-center">{el.margin}</td>
                          <td>
                            <a
                              onClick={() => handleEdit(el)}
                              href="#"
                              className="edit"
                              title="Edit"
                              type="button"
                              data-toggle="modal"
                              data-target="#EditCustomer"
                            >
                              <i className="material-icons">&#xE254;</i>
                            </a>

                            <a
                              onClick={() => handleDelete(el._id)}
                              href="#"
                              className="delete"
                              title="Delete"
                              data-toggle="tooltip"
                              style={{ color: "red" }}
                            >
                              <i className="material-icons">&#xE872;</i>
                            </a>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <h5 style={{ color: "black" }}>No Data</h5>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div
            className="modal fade mb-5"
            id="addCustomers"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div
              className="modal-dialog"
              role="document"
              style={{ top: "-35px" }}
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h1
                    className="modal-title "
                    style={{ color: "black" }}
                    id="exampleModalLabel"
                  >
                    Products Records
                  </h1>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="form-group ">
                      <input
                        isInvalid={!!errors.product_name}
                        {...register("product_name")}
                        type="Text"
                        className="form-control"
                        name="product_name"
                        value={formData.product_name}
                        onChange={handleOnChange}
                        placeholder="Enter Product Name"
                      />
                      <p className="field-name">
                        {errors?.product_name?.message}
                      </p>
                    </div>
                    <div className="form-group mt-3">
                      <input
                        isInvalid={!!errors.price}
                        {...register("price")}
                        type="Number"
                        className="form-control"
                        name="price"
                        value={formData.price}
                        onChange={handleOnChange}
                        placeholder="Price"
                      />
                      <p className="field-name">{errors?.price?.message}</p>
                    </div>
                    <div className="form-group mt-3">
                      <input
                        // isInvalid={!!errors.margin}
                        {...register("margin")}
                        type="Number"
                        className="form-control"
                        name="margin"
                        value={formData.margin}
                        onChange={handleOnChange}
                        placeholder="Enter margin"
                      />
                      {/* <p className="field-name">{errors?.margin?.message}</p> */}
                    </div>
                    <div className="form-group mt-3">
                      <input
                        isInvalid={!!errors.uom}
                        {...register("uom")}
                        type="Number"
                        className="form-control"
                        name="uom"
                        value={formData.uom}
                        onChange={handleOnChange}
                        placeholder=" Enter UOM"
                      />
                      <p className="field-name">{errors?.uom?.message}</p>
                    </div>

                    <div className="form-group mt-3">
                      <input
                        isInvalid={!!errors.description}
                        {...register("description")}
                        type="Text"
                        className="form-control"
                        name="description"
                        value={formData.description}
                        onChange={handleOnChange}
                        placeholder="Enter Description"
                      />
                      <p className="field-name">
                        {errors?.description?.message}
                      </p>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleSubmit(handleAdd)}
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Model Box Finsihs 1*/}

          <div
            className="modal fade mb-5 w-50% h-50% "
            id="EditCustomer"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div
              className="modal-dialog"
              role="document"
              style={{ top: "-35px" }}
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h1
                    className="modal-title "
                    style={{ color: "black" }}
                    id="exampleModalLabel"
                  >
                    Products Records
                  </h1>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="form-group ">
                      <input
                        type="Text"
                        className="form-control"
                        name="product_name"
                        value={formDataEdit.product_name}
                        onChange={handleEditOnChange}
                        placeholder="Enter Product Name"
                      />
                    </div>
                    <div className="form-group mt-3">
                      <input
                        type="Number"
                        className="form-control"
                        name="price"
                        value={formDataEdit.price}
                        onChange={handleEditOnChange}
                        placeholder="Price"
                      />
                    </div>
                    <div className="form-group mt-3">
                      <input
                        type="Number"
                        className="form-control"
                        name="margin"
                        value={formDataEdit.margin}
                        onChange={handleEditOnChange}
                        placeholder=" Enter Margin"
                      />
                    </div>
                    <div className="form-group mt-3">
                      <input
                        type="Number"
                        className="form-control"
                        name="uom"
                        value={formDataEdit.uom}
                        onChange={handleEditOnChange}
                        placeholder="Enter Weight"
                      />
                    </div>

                    <div className="form-group mt-3">
                      <input
                        type="Text"
                        className="form-control"
                        name="description"
                        value={formDataEdit.description}
                        onChange={handleEditOnChange}
                        placeholder="Enter Description"
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    onClick={(e) => handleUpdate(e, formDataEdit.id)}
                    type="submit"
                    className="btn btn-primary"
                    data-dismiss="modal"
                  >
                    Updated
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Model Box Finsihs 2*/}
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default AddProducts;
