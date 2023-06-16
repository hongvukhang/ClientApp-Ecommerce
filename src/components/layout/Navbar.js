import classes from "./Navbar.module.css";
import { FaShoppingCart, FaUser, FaCaretDown } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

import { useCookies } from "react-cookie";
const Navbar = () => {
  const navigate = useNavigate();

  const [cookies, setCookie, removeCookie] = useCookies();

  const logoutHandler = () => {
    removeCookie("token", { path: "/" });
    removeCookie("userName", { path: "/" });
    removeCookie("email", { path: "/" });
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
        {cookies.token && (
          <li>
            <GrTransaction />

            <span onClick={() => navigate("/history")}>History</span>
          </li>
        )}
        <li
          onClick={() => {
            navigate("/cart");
          }}
        >
          <FaShoppingCart />
          Cart
        </li>
        {cookies.token && (
          <li>
            <FaUser />
            {cookies.token && `${cookies.userName}`}
            <FaCaretDown />
            <span onClick={logoutHandler}>{`  (Logout)`}</span>
          </li>
        )}
        {!cookies.token && (
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
