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
  name: yup
    .string()
    .matches(/^[a-zA-Z]*$/, "Please Enter Your Name.")
    .required(" Name is Required"),

  address: yup.string().required("Address is Required"),

  city: yup.string().required("City is Required"),

  country: yup.string().required("Country is Required"),

  mobile: yup.string().max(10).required("Mobile number must be 10 character "),
});

const AddCustomers = () => {
  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    country: "",
    mobile: "",
  });

  const [dataList, setDataList] = useState([]);
  const [formDataEdit, setFormDataEdit] = useState({
    id: "",
    name: "",
    address: "",
    city: "",
    country: "",
    mobile: "",
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
    const data = await axios.post(
      "http://localhost:7200/customer/create",
      formData
    );

    console.log(data);
    setFormData({
      name: "",
      address: "",
      city: "",
      country: "",
      mobile: "",
    });
    getFetchData();
  };

  const getFetchData = async () => {
    const data = await axios.get("http://localhost:7200/customer");

    if (data.data.status === 200) {
      setDataList(data.data.data);
    } else {
      setDataList([]);
    }
  };

  useEffect(() => {
    getFetchData();
  }, []);

  const handleDelete = async (id) => {
    const data = await axios.post(
      "http://localhost:7200/customer/delete/" + id
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
    const data = await axios.patch(
      "http://localhost:7200/customer/update",
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
      name: el?.name,
      address: el?.address,
      city: el?.city,
      country: el?.country,
      mobile: el?.mobile,
    });
  };

  return (
    <div>
      <Header />
      <Sidebar />
      <div className="container ">
        <div
          className="crud shadow-lg p-3 mb-1  bg-body rounded w-100"
          style={{ marginLeft: "98px", marginTop: "20px" }}
        >
          <div className="row ">
            <div className="col-sm-6 mt-5 mb-1  text-gred"></div>
            <div className="d-flex justify-content-between mt-3 ">
              <h1>
                <b style={{ color: "green" }}>Customers Records</b>
              </h1>

              <button
                onSubmit={handleSubmit}
                type="submit"
                className="btn btn-primary"
                data-toggle="modal"
                data-target="#addCustomers"
              >
                Add New Customers
              </button>
            </div>
            <div className="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred"></div>
            <div class="input-group mb-3">
              <div class="form-outline">
                <input
                  id="search-focus"
                  type="search"
                  class="form-control"
                  placeholder="Search"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="table-responsive ">
              <table className="table table-striped table-hover table-bordered">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name </th>
                    <th>Address</th>
                    <th>City </th>
                    <th>Country </th>
                    <th>mobile</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {dataList?.length > 0 ? (
                    dataList.map((el, i) => {
                      return (
                        <tr>
                          <td>{i}</td>
                          <td>{el.name}</td>
                          <td>{el.address}</td>
                          <td>{el.city}</td>
                          <td>{el.country}</td>
                          <td>{el.mobile}</td>
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
                    Customers Records
                  </h1>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="form-group ">
                      <input
                        isInvalid={!!errors.name}
                        {...register("name")}
                        type="Text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleOnChange}
                        placeholder="Enter Name"
                      />
                      <p className="field-name">{errors?.name?.message}</p>
                    </div>
                    <div className="form-group mt-3">
                      <input
                        isInvalid={!!errors.address}
                        {...register("address")}
                        type="Text"
                        className="form-control"
                        name="address"
                        value={formData.address}
                        onChange={handleOnChange}
                        placeholder="Address"
                      />
                      <p className="field-name">{errors?.address?.message}</p>
                    </div>
                    <div className="form-group mt-3">
                      <input
                        isInvalid={!!errors.city}
                        {...register("city")}
                        type="Text"
                        className="form-control"
                        name="city"
                        value={formData.city}
                        onChange={handleOnChange}
                        placeholder=" Enter City"
                      />
                      <p className="field-name">{errors?.city?.message}</p>
                    </div>
                    <div className="form-group mt-3">
                      <input
                        isInvalid={!!errors.country}
                        {...register("country")}
                        type="Text"
                        className="form-control"
                        name="country"
                        value={formData.country}
                        onChange={handleOnChange}
                        placeholder="Enter Country"
                      />
                      <p className="field-name">{errors?.country?.message}</p>
                    </div>

                    <div className="form-group mt-3">
                      <input
                        isInvalid={!!errors.mobile}
                        {...register("mobile")}
                        type="Text"
                        className="form-control"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleOnChange}
                        placeholder="Enter Mobile"
                      />
                      <p className="field-name">{errors?.mobile?.message}</p>
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
                    Customers Records
                  </h1>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="form-group ">
                      <input
                        type="Text"
                        className="form-control"
                        name="name"
                        value={formDataEdit.name}
                        onChange={handleEditOnChange}
                        placeholder="Enter Name"
                      />
                    </div>
                    <div className="form-group mt-3">
                      <input
                        type="Text"
                        className="form-control"
                        name="address"
                        value={formDataEdit.address}
                        onChange={handleEditOnChange}
                        placeholder="Address"
                      />
                    </div>
                    <div className="form-group mt-3">
                      <input
                        type="Text"
                        className="form-control"
                        name="city"
                        value={formDataEdit.city}
                        onChange={handleEditOnChange}
                        placeholder=" Enter City"
                      />
                    </div>
                    <div className="form-group mt-3">
                      <input
                        type="Text"
                        className="form-control"
                        name="country"
                        value={formDataEdit.country}
                        onChange={handleEditOnChange}
                        placeholder="Enter Country"
                      />
                    </div>

                    <div className="form-group mt-3">
                      <input
                        type="Text"
                        className="form-control"
                        name="mobile"
                        value={formDataEdit.mobile}
                        onChange={handleEditOnChange}
                        placeholder="Enter Mobile"
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

export default AddCustomers;
