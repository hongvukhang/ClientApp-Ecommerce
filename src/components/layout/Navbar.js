import classes from "./Navbar.module.css";
import { FaShoppingCart, FaUser, FaCaretDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { useCookies } from "react-cookie";
const Navbar = () => {
  const navigate = useNavigate();

  const [cookies, setCookie, removeCookie] = useCookies();

  const goToCard = () => {
    if (cookies.login) {
      navigate("/cart");
    } else {
      navigate("/login");
    }
  };

  const logoutHandler = () => {
    removeCookie("userName", { path: "/" });
    removeCookie("login", { path: "/" });
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
        {cookies.login && (
          <li>
            <FaUser />
            {cookies.login && `${cookies.userName}`}
            <FaCaretDown />
            <span onClick={logoutHandler}>{`  (Logout)`}</span>
          </li>
        )}
        {!cookies.login && (
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
