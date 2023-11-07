/* eslint-disable no-undef */
// eslint-disable-next-line
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email(" Invalid email format")
    .required("Email is Required"),
  password: yup
    .string()
    .min(4)
    .required("Password At least 4 character")
    .max(10)
    .required(),
  checkbox: yup.bool().oneOf([true], "Checkbox selection is required"),
});

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const submit = async (formValues) => {
    try {
      console.log(formValues);

      const value = { email: formValues.email, password: formValues.password };
      const data = await axios.post("http://localhost:7200/login", value);
      console.log(data.data.data);

      if (data.data.status === 1) {
        toast.success("Sign Up successfully!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      } else {
        toast.error("Credential wrong!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch {
      console.log(errors);
    }
  };
  return (
    <div className="login template d-flex justify-content-center align-items-center  vh-100 bg-primary">
      <div className=" form_container p-5  rounded bg-white">
        <form onSubmit={handleSubmit(submit)}>
          <h1 className="text-center">Sign in</h1>

          <div className="mb-2">
            <label htmlFor="email">Email address</label>
            <input
              className="form-control"
              type="email"
              name="email"
              placeholder="Enter Email"
              isInvalid={!!errors.email}
              {...register("email")}
            />

            <p className="field-name">{errors?.email?.message}</p>
          </div>

          <div className="mb-2">
            <label htmlFor="password">Password</label>
            <input
              className="form-control"
              type="password"
              name="password"
              placeholder="Password"
              isInvalid={!!errors.password}
              {...register("password")}
            />
            <p className="field-name">{errors?.password?.message}</p>
          </div>

          <div className="mb-2">
            <input
              type="checkbox"
              className="custom-control custom-checkbox"
              id="check"
              isInvalid={!!errors.checkbox}
              {...register("checkbox")}
            />

            <label htmlFor="check" className="custom-input-label ms-2">
              Remember me
            </label>
            <p className="field-name">{errors?.checkbox?.message}</p>
          </div>

          <div className="d-grid mt-2">
            <button className="btn btn-primary" type="submit">
              Log in
            </button>
          </div>

          <p className="text-end mt-2">
            Forget Password?
            <Link to="/SignUp" className="ms-2">
              Sign up
            </Link>
          </p>
        </form>

        <ToastContainer />
      </div>
    </div>
  );
};
export default Login;
