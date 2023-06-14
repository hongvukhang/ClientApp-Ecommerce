import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
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
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState();

  useEffect(() => {
    const dataReq = {
      token: cookie.token,
      email: cookie.email,
    };
    axios
      .post("/getCart", dataReq)
      .then((result) => {
        const items = [...result.data.items];
        const data = items.map((item) => {
          return {
            id: item._id,
            quantity: item.quantity,
            img: item.prodId.img1,
            name: item.prodId.name,
            price: item.prodId.price,
            total: item.quantity * item.prodId.price,
          };
        });
        let totalPrice = 0;
        data.forEach((item) => {
          totalPrice += item.total;
        });
        setTotal(totalPrice);
        setCart(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const navigate = useNavigate();
  //function updated totalprice
  const updateTotal = (arr) => {
    let totalPrice = 0;
    arr.forEach((item) => {
      totalPrice += item.total;
    });
    setTotal(totalPrice);
  };

  //deleted card items
  const deletedHandler = (id) => {
    const dataCart = [...cart];
    const filterCart = dataCart.filter((item) => item.id !== id);

    updateTotal(filterCart);

    setCart(filterCart);
  };

  //increment quantity item
  const incrementHandler = (id) => {
    const dataCart = [...cart];
    const index = cart.findIndex((cartItem) => cartItem.id === id);

    if (dataCart[index].quantity <= 9) {
      dataCart[index].quantity += 1;
      dataCart[index].total += dataCart[index].price;

      updateTotal(dataCart);

      setCart(dataCart);
    }
  };

  //decrement quantity item
  const decrementHandler = (id) => {
    const dataCart = [...cart];
    const index = cart.findIndex((cartItem) => cartItem.id === id);

    if (dataCart[index].quantity > 1) {
      dataCart[index].quantity -= 1;
      dataCart[index].total -= dataCart[index].price;

      updateTotal(dataCart);

      setCart(dataCart);
    }
  };

  const proceedToCheckOut = () => {
    const dataReq = {
      token: cookie.token,
      email: cookie.email,
      data: cart.map((item) => ({
        _id: item.id,
        quantity: item.quantity,
      })),
    };
    axios
      .post("/updateCart", dataReq)
      .then((result) => {
        if (result.status === 201) {
          navigate("/checkout");
        }
      })
      .catch((err) => console.log(err));
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
            {cart.map((list) => {
              return (
                <tr key={list.id} className={classes["cart_list-item"]}>
                  <td>
                    <img
                      className={classes.img}
                      src={list.img}
                      alt={list.name}
                    />
                  </td>
                  <td>{list.name}</td>
                  <td>{`${priceTransform(list.price)}`}</td>
                  <td>
                    <button
                      onClick={() => decrementHandler(list.id)}
                      className={style["btn_quantity"]}
                    >
                      {<FaCaretLeft />}
                    </button>
                    <p>{list.quantity}</p>
                    <button
                      onClick={() => incrementHandler(list.id)}
                      className={style["btn_quantity"]}
                    >
                      {<FaCaretRight />}
                    </button>
                  </td>
                  <td>{priceTransform(list.total)}</td>
                  <td>
                    <button onClick={() => deletedHandler(list.id)}>
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
            SUBTOTAL <span>{total ? priceTransform(total) : 0}</span>
          </h2>
          <h2 className={classes.total}>
            TOTAL <span>{total ? priceTransform(total) : 0}</span>
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
        <button onClick={proceedToCheckOut}>
          {"Proceed to checkout   "} <FaLongArrowAltRight />
        </button>
      </div>
    </div>
  );
};

export default CartList;
