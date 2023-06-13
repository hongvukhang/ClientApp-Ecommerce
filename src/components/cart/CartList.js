import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import {
  useGetLocalStorage,
  priceTransform,
  updateLocalStorage,
} from "../../hooks/useLocalStorage";

import {
  FaGift,
  FaRegTrashAlt,
  FaCaretLeft,
  FaCaretRight,
  FaLongArrowAltLeft,
  FaLongArrowAltRight,
} from "react-icons/fa";

import style from "../detail/DetailTop.module.css";
import classes from "./CartList.module.css";
const CartList = () => {
  const [cookie] = useCookies();
  console.log(cookie);

  const navigate = useNavigate();

  const [total, setTotal] = useState();

  const [cartUser, setCartUser] = useState([]);

  //deleted card items
  const deletedHandler = (id) => {};

  //increment quantity item
  const incrementHandler = (id) => {};

  //decrement quantity item
  const decrementHandler = (id) => {};

  return (
    <div className={classes["cart_container"]}>
      <h1>SHOPPING CART</h1>
      <div className={classes["cart_content"]}>
        <table className={classes["cart_list"]}>
          <thead>
            <tr className={classes["cart_list-title"]}>
              <th>IMAGE</th>
              <th>PRODUCT</th>
              <th>PRICE</th>
              <th>QUANTITY</th>
              <th>TOTAL</th>
              <th>REMOVE</th>
            </tr>
          </thead>

          <tbody>
            {cartUser.map((list) => {
              return (
                <tr key={list.idProducts} className={classes["cart_list-item"]}>
                  <td>
                    <img
                      className={classes.img}
                      src={list.img}
                      alt={list.name}
                    />
                  </td>
                  <td>{list.name}</td>
                  <td>{`${list.price}`}</td>
                  <td>
                    <button
                      onClick={() => decrementHandler(list.idProducts)}
                      className={style["btn_quantity"]}
                    >
                      {<FaCaretLeft />}
                    </button>
                    <p>{list.quantity}</p>
                    <button
                      onClick={() => incrementHandler(list.idProducts)}
                      className={style["btn_quantity"]}
                    >
                      {<FaCaretRight />}
                    </button>
                  </td>
                  <td>{priceTransform(list.priceInit * list.quantity)}</td>
                  <td>
                    <button onClick={() => deletedHandler(list.idProducts)}>
                      <FaRegTrashAlt />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className={classes["cart_total"]}>
          <h1>CART TOTAL</h1>
          <h2 className={classes.subtotal}>
            SUBTOTAL <span>{total}</span>
          </h2>
          <h2 className={classes.total}>
            TOTAL <span>{total}</span>
          </h2>
          <form className={classes["coupon_input"]}>
            <input placeholder="Enter your coupon" />
            <button>
              <FaGift />
              Apply coupon
            </button>
          </form>
        </div>
      </div>
      <div className={classes["cart_section"]}>
        <button
          onClick={() => {
            navigate("/shop");
          }}
        >
          <FaLongArrowAltLeft /> Continue shopping
        </button>
        <button
          onClick={() => {
            navigate("/checkout");
          }}
        >
          {"Proceed to checkout   "} <FaLongArrowAltRight />
        </button>
      </div>
    </div>
  );
};

export default CartList;
