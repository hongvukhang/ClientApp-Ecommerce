import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Register.module.css";

const Register = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("items"));
    if (users) {
      setAccounts(users);
    }
  }, []);

  const nameChangHandler = (event) => {
    setFullName(event.target.value);
  };

  const emailChangHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordChangHandler = (event) => {
    setPassword(event.target.value);
  };

  const phoneChangHandler = (event) => {
    setPhone(event.target.value);
  };

  const validate = () => {
    let valAcc = true;
    if (fullName === "") {
      alert("Full name empty");
      return false;
    } else if (email === "") {
      alert("Email empty");
      return false;
    } else if (password === "" || password.length < 8) {
      password === ""
        ? alert("Password empty")
        : alert("Password length must be greater than 8");
      return false;
    } else if (phone === "" || phone.length < 10) {
      phone === ""
        ? alert("Phone empty")
        : alert("Phone length must be greater than 10");
      return false;
    } else {
      accounts.map((acc) => {
        if (acc.email === email) {
          alert("Email already used");
          valAcc = false;
        }
        return acc;
      });
    }
    return valAcc;
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (validate()) {
      const addAccount = [
        ...accounts,
        { fullName, email, password, phone, cart: [] },
      ];

      localStorage.setItem("items", JSON.stringify(addAccount));

      navigate("/login");
    }
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
        <input
          onChange={nameChangHandler}
          type="text"
          placeholder="Full Name"
        />
        <input onChange={emailChangHandler} type="email" placeholder="Email" />
        <input
          onChange={passwordChangHandler}
          type="password"
          placeholder="Password"
        />

        <input onChange={phoneChangHandler} type="number" placeholder="Phone" />

        <button>SIGN UP</button>
        <p>
          Login?{" "}
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
