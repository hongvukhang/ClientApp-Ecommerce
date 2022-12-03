import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import style from "./DetailTop.module.css";

import { FaCaretLeft, FaCaretRight } from "react-icons/fa";

import {
  useGetLocalStorage,
  updateLocalStorage,
} from "../../hooks/useLocalStorage";

const DetailTop = (props) => {
  const isLogin = useSelector((state) => state.isLogin);
  const navigate = useNavigate();
  const parId = props.detail;
  const [imgItem, setImgItem] = useState(parId.img1);
  const [counter, setCounter] = useState(1);

  const { user, users } = useGetLocalStorage();
  useEffect(() => {
    setCounter(1);
  }, [parId]);

  const [accountCurrent, setAccountCurrent] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [resetStorage, setResetStorage] = useState(1);
  const [cartUser, setCartUser] = useState([]);

  //get data from localstorage
  useEffect(() => {
    setAccountCurrent(user);
    if (isLogin) {
      setCartUser((cart) => user.cart);
    }
    setAccounts(users);
  }, [resetStorage]);

  //increment quantity
  const increHandler = () => {
    setCounter((counter) => counter + 1);
  };
  //decrement quantity
  const decreHandler = () => {
    setCounter((counter) => {
      if (counter === 1) {
        return (counter = 1);
      } else {
        return counter - 1;
      }
    });
  };
  //add item to card
  const addCartHandler = () => {
    if (isLogin) {
      let check = false;
      let cartPlus;
      if (cartUser.length > 0) {
        cartPlus = cartUser.map((cart) => {
          if (cart.idProducts === parId._id.$oid) {
            check = true;

            const quantity = cart.quantity + counter;
            return { ...cart, quantity: quantity };
          } else {
            return cart;
          }
        });
      }
      if (check === false) {
        cartUser.push({
          idProducts: parId._id.$oid,
          img: parId.img1,
          name: parId.name,
          price: parId.price,
          quantity: counter,
          priceInit: parId.priceInit,
        });
      }
      const updateCart = check ? cartPlus : cartUser;

      updateLocalStorage(accountCurrent, accounts, updateCart);
      setResetStorage((reset) => (reset === 1 ? 2 : 1));
    } else {
      navigate("/login");
    }
  };
  return (
    <div className={style["detail_top"]}>
      <div className={style["detail_top-left"]}>
        <ul className={style["detail_list-img"]}>
          <li>
            <img
              className={style["items_img"]}
              src={parId.img1}
              alt="list_img"
              onClick={(event) => {
                setImgItem(event.target.src);
              }}
            />
          </li>
          <li>
            <img
              className={style["items_img"]}
              src={parId.img2}
              alt="list_img"
              onClick={(event) => {
                setImgItem(event.target.src);
              }}
            />
          </li>
          <li>
            <img
              className={style["items_img"]}
              src={parId.img3}
              alt="list_img"
              onClick={(event) => {
                setImgItem(event.target.src);
              }}
            />
          </li>
          <li>
            <img
              className={style["items_img"]}
              src={parId.img4}
              alt="list_img"
              onClick={(event) => {
                setImgItem(event.target.src);
              }}
            />
          </li>
        </ul>
        <img
          className={style["detail_img"]}
          src={imgItem ? imgItem : parId.img1}
          alt="list_img"
        />
      </div>
      <div className={style["detail_top-right"]}>
        <h1>{parId.name}</h1>
        <h2>{parId.price}</h2>
        <p>{parId.short_desc}</p>
        <h3>
          CATEGORY: <span>{parId.category}</span>
        </h3>
        <div className={style["item_quantity"]}>
          <h4>QUANTITY</h4>
          <div>
            <button onClick={decreHandler} className={style["btn_quantity"]}>
              {<FaCaretLeft />}
            </button>
            <p>{counter}</p>
            <button onClick={increHandler} className={style["btn_quantity"]}>
              {<FaCaretRight />}
            </button>
          </div>
          <button onClick={addCartHandler} className={style["btn_add"]}>
            Add to card
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailTop;
