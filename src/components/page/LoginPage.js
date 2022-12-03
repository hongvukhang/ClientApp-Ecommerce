import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import classes from "../register/Register.module.css";

const LoginPage = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [account, setAccount] = useState([]);

  let curAcc;
  useEffect(() => {
    const userArr = JSON.parse(localStorage.getItem("items"));
    if (userArr) {
      setAccount(userArr);
    }

    const isLogin = JSON.parse(localStorage.getItem("current_account"));
    if (isLogin) {
      navigate("/");
      dispatch({ type: "ON_LOGIN" });
    }
  }, []);

  const emailInputChangHandler = (event) => {
    setEmail(event.target.value);
  };
  const passwordInputChangHandler = (event) => {
    setPassword(event.target.value);
  };

  const validate = () => {
    let valAcc = false;
    if (email === "") {
      alert("Email empty");
      return false;
    } else if (password === "") {
      alert("Password empty");
      return false;
    } else {
      account.map((acc) => {
        if (acc.email === email && acc.password === password) {
          curAcc = acc;

          valAcc = true;
        }
      });
      if (!valAcc) {
        alert("Incorrect email and password");
        setPassword("");
      }
    }
    return valAcc;
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (validate()) {
      dispatch({ type: "ON_LOGIN" });
      localStorage.setItem("current_account", JSON.stringify(curAcc));
      navigate("/");
    }
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

        <input
          onChange={emailInputChangHandler}
          type="email"
          placeholder="Email"
        />
        <input
          onChange={passwordInputChangHandler}
          type="password"
          placeholder="Password"
          value={password}
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
