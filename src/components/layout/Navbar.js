import classes from "./Navbar.module.css";
import { FaShoppingCart, FaUser, FaCaretDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();

  const isLogin = useSelector((state) => state.isLogin);
  const dispatch = useDispatch();

  const [login, setLogin] = useState();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("current_account"));
    if (user) {
      setLogin(user);
      dispatch({ type: "ON_LOGIN" });
    }
  }, [isLogin]);
  const logoutHandler = () => {
    localStorage.removeItem("current_account");
    dispatch({ type: "ON_LOGOUT" });
  };
  const goToCard = () => {
    if (isLogin) {
      navigate("/cart");
    } else {
      navigate("/login");
    }
  };
  return (
    <div className={classes.navbar}>
      <ul className={classes["navbar-left"]}>
        <li
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </li>
        <li
          onClick={() => {
            navigate("/shop");
          }}
        >
          Shop
        </li>
      </ul>
      <h2>BOUTIQUE</h2>
      <ul className={classes["navbar-right"]}>
        <li onClick={goToCard}>
          <FaShoppingCart />
          Cart
        </li>
        {isLogin && (
          <li>
            <FaUser />
            {login === undefined ? "Loading" : `${login.fullName} `}{" "}
            <FaCaretDown />
            <span onClick={logoutHandler}>{`  (Logout)`}</span>
          </li>
        )}
        {!isLogin && (
          <li
            onClick={() => {
              navigate("/login");
            }}
          >
            <FaUser /> Login
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
