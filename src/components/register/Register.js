import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Register.module.css";
import axios from "axios";
import Input from "../element/Input";
const Register = () => {
  const navigate = useNavigate();

  const [error, setError] = useState({
    fullName: false,
    email: false,
    password: false,
    confirmPassword: false,
    phone: false,
  });

  const [data, setData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const dataChangeHandler = (e) => {
    if (e.target.placeholder === "Full Name") {
      setData(() => ({
        ...data,
        fullName: e.target.value,
      }));
      setError(() => ({ ...error, fullName: false }));
    }
    if (e.target.placeholder === "Password") {
      setData(() => ({
        ...data,
        password: e.target.value,
      }));
      setError(() => ({ ...error, password: false }));
    }
    if (e.target.placeholder === "Confirm Password") {
      setData(() => ({
        ...data,
        confirmPassword: e.target.value,
      }));
      setError(() => ({ ...error, confirmPassword: false }));
    }
    if (e.target.placeholder === "Phone") {
      setData(() => ({
        ...data,
        phone: e.target.value,
      }));
      setError(() => ({ ...error, phone: false }));
    }
    if (e.target.placeholder === "Email") {
      setData(() => ({
        ...data,
        email: e.target.value,
      }));
      setError(() => ({ ...error, email: false }));
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    axios.post("/register", data).then((result) => {
      if (result.status === 203) {
        const errorData = { ...error };
        result.data.map((err) => {
          if (err.path === "fullName") {
            errorData.fullName = true;
          } else if (err.path === "email") {
            errorData.email = true;
          } else if (err.path === "password") {
            errorData.password = true;
          } else if (err.path === "confirmPassword") {
            errorData.confirmPassword = true;
          } else if (err.path === "phone") {
            errorData.phone = true;
          }
        });
        setError(errorData);
      }
      if (result.status === 201) {
        navigate("/login");
      }
    });
  };
  return (
    <div className={classes.register}>
      <img
        className={classes["register_logo"]}
        src={process.env.PUBLIC_URL + "/img/logo_lock.png"}
        alt="logo"
      />
      <form onSubmit={submitHandler} className={classes["form_register"]}>
        <h1>Sign Up</h1>
        <Input
          cb={dataChangeHandler}
          type={"text"}
          placeholder={"Full Name"}
          err={error.fullName}
        />
        <Input
          cb={dataChangeHandler}
          type={"email"}
          placeholder={"Email"}
          err={error.email}
        />
        <Input
          cb={dataChangeHandler}
          type={"password"}
          placeholder={"Password"}
          err={error.password}
        />
        <Input
          cb={dataChangeHandler}
          type={"password"}
          placeholder={"Confirm Password"}
          err={error.password ? error.password : error.confirmPassword}
        />
        <Input
          cb={dataChangeHandler}
          type={"number"}
          placeholder={"Phone"}
          err={error.phone}
        />
        <button>SIGN UP</button>
        <p>
          Login?
          <span
            onClick={() => {
              navigate("/login");
            }}
          >
            Click
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
