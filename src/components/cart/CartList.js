import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const { user, users } = useGetLocalStorage();

  const [total, setTotal] = useState();

  const [cartUser, setCartUser] = useState([]);
  const [accountCurrent, setAccountCurrent] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [resetStorage, setResetStorage] = useState(1);

  useEffect(() => {
    setAccountCurrent(user);
    setCartUser((cart) => user.cart);
    setAccounts(users);
  }, [resetStorage]);

  useEffect(() => {
    let total = 0;
    cartUser.map((cart) => {
      total += cart.priceInit * cart.quantity;
    });
    setTotal(priceTransform(total));
  }, [cartUser]);

  const reloadingStorage = (updateCart) => {
    updateLocalStorage(accountCurrent, accounts, updateCart);
    setResetStorage((reset) => (reset === 1 ? 2 : 1));
  };

  //deleted card items
  const deletedHandler = (id) => {
    const remainingItems = cartUser.filter((cart) => cart.idProducts !== id);
    reloadingStorage(remainingItems);
  };

  //increment quantity item
  const incrementHandler = (id) => {
    const increQuantity = cartUser.map((cart) => {
      if (cart.idProducts === id) {
        return { ...cart, quantity: cart.quantity + 1 };
      } else {
        return cart;
      }
    });
    reloadingStorage(increQuantity);
  };

  //decrement quantity item
  const decrementHandler = (id) => {
    let deleted = false;
    const decreQuantity = cartUser.map((cart) => {
      if (cart.idProducts === id) {
        if (cart.quantity === 1) {
          deleted = true;
        }

        return {
          ...cart,
          quantity: cart.quantity - 1,
        };
      } else {
        return cart;
      }
    });
    if (deleted) {
      const remainingItems = cartUser.filter((cart) => cart.idProducts !== id);
      reloadingStorage(remainingItems);
    } else {
      reloadingStorage(decreQuantity);
    }
  };

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
