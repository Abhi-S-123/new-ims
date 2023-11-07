import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const validationSchema = yup.object().shape({
  first_name: yup
    .string()
    .matches(/^[a-zA-Z]*$/, "Please Enter Your First name.")
    .required("First Name is Required"),
  last_name: yup
    .string()
    .matches(/^[a-zA-Z]*$/, "Please Enter Your Last name.")
    .required("Last Name is Required"),
  email: yup
    .string()
    .email(" Invalid email format")
    .required("Email is Required"),
  password: yup
    .string()
    .min(4)
    .required("password At least 4 character")
    .max(10)
    .required(),
  checkbox: yup.bool().oneOf([true], "Checkbox selection is required"),
});

const SignUp = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  console.log(
    "watch",
    watch("first_name"),
    errors.first_name,
    !!errors.first_name
  );
  const onSubmit = async (data) => {
    try {
      let save = {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: data.password,
      };

      let resp = await axios.post("http://localhost:7200/signup", save);
      console.log(resp);
      toast.success("Sign Up successfully!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch {
      // eslint-disable-next-line no-undef
      console.log(error);
    }
  };

  return (
    <div className="sign-up template d-flex justify-content-center align-items-center  vh-100 bg-primary">
      <div className=" form_container p-5 rounded bg-white">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-center">Sign Up</h1>

          <div className="mb-2">
            <label htmlFor="f name">First Name</label>
            <input
              isInvalid={!!errors.first_name}
              {...register("first_name")}
              type="text"
              placeholder="Enter First Name"
              className="form-control"
            />
            <p className="field-name">{errors?.first_name?.message}</p>
          </div>

          <div className="mb-2">
            <label htmlFor="l name">Last Name</label>
            <input
              isInvalid={!!errors.last_name}
              {...register("last_name")}
              type="text"
              placeholder="Enter Last Name"
              className="form-control"
            />
            <p className="field-name">{errors?.last_name?.message}</p>
          </div>

          <div className="mb-2">
            <label htmlFor="email">Email</label>
            <input
              isInvalid={!!errors.email}
              {...register("email")}
              type="email"
              placeholder="Email"
              className="form-control"
            />
            <p className="field-name">{errors?.email?.message}</p>
          </div>

          <div className="mb-2">
            <label htmlFor="password">Password</label>
            <input
              isInvalid={!!errors.password}
              {...register("password")}
              type="password"
              placeholder="Password"
              className="form-control"
            />
            <p className="field-name">{errors?.password?.message}</p>
          </div>

          <div className="mb-2">
            <input
              isInvalid={!!errors.checkbox}
              {...register("checkbox")}
              type="checkbox"
              className="custom-control custom-checkbox"
              id="check"
            />
            <label htmlFor="check" className="custom-input-label ms-2">
              Remember me
            </label>
            <p className="field-name">{errors?.checkbox?.message}</p>
          </div>

          <div className="d-grid">
            <button className="btn btn-primary">Sign Up</button>
          </div>

          <p className="text-end mt-2">
            Already Registered
            <Link to="/" className="ms-2">
              Sign in
            </Link>
          </p>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default SignUp;
