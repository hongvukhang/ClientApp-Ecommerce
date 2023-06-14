import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import axios from "axios";

import classes from "../register/Register.module.css";
import Input from "../element/Input";

const LoginPage = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [cookie, setCookie] = useCookies(["user"]);

  useEffect(() => {
    if (cookie.login === "true") {
      navigate("/");
    }
  }, [cookie]);

  const [dataLogin, setDataLogin] = useState({ email: "", password: "" });
  const [error, setError] = useState({ email: false, password: false });

  const emailInputChangHandler = (e) => {
    if (e.target.placeholder === "Email") {
      setDataLogin(() => ({
        ...dataLogin,
        email: e.target.value,
      }));
      setError(() => ({ ...error, email: false }));
    }
    if (e.target.placeholder === "Password") {
      setDataLogin(() => ({
        ...dataLogin,
        password: e.target.value,
      }));
      setError(() => ({ ...error, password: false }));
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    axios
      .post("/login", dataLogin)
      .then((result) => {
        if (result.status === 203) {
          const errData = { ...error };
          result.data.map((err) => {
            if (err.path === "email") {
              errData.email = true;
            }
            if (err.path === "password") {
              errData.password = true;
            }
          });
          setError(errData);
        }
        if (result.status === 202) {
          setCookie("token", result.data.token, {
            path: "/",
          });
          setCookie("userName", result.data.userName, { path: "/" });
          setCookie("email", dataLogin.email, { path: "/" });
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={classes.register}>
      <img
        className={classes["register_logo"]}
        src={process.env.PUBLIC_URL + "/img/logo_lock.png"}
        alt="logo"
      />
      <form
        onSubmit={submitHandler}
        className={`${classes["form_register"]} ${classes["form_login"]}`}
      >
        <h1>Sign In</h1>
        <Input
          cb={emailInputChangHandler}
          type={"email"}
          placeholder={"Email"}
          err={error.email}
        />
        <Input
          last={true}
          cb={emailInputChangHandler}
          type={"password"}
          placeholder={"Password"}
          err={error.password}
        />

        <button>SIGN IN</button>
        <p>
          Create an account?
          <span
            onClick={() => {
              navigate("/register");
            }}
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
