import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import style from "./DetailTop.module.css";

import axios from "axios";

import Alerts from "../../portal/Alerts";
const DetailTop = (props) => {
  const navigate = useNavigate();
  const [cookie] = useCookies();

  const parId = props.detail;

  const [imgItem, setImgItem] = useState(parId.img1);
  const [counter, setCounter] = useState(1);

  const [alert, setAlert] = useState({ isHidden: false, status: "", msg: "" });

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
    const dataReq = {
      token: cookie.token,
      email: cookie.email,
      prodId: parId._id,
      quantity: counter,
    };

    axios
      .post("/addToCart", dataReq)
      .then((result) => {
        if (result.status === 203) {
          return navigate("/login");
        }
        if (result.status === 200) {
          setAlert({
            isHidden: true,
            status: false,
            msg: "The product is not enough or out of stock",
          });
        }
        if (result.status === 201) {
          setAlert({
            isHidden: true,
            status: true,
            msg: "Add to cart success",
          });
        }
      })
      .catch((err) => {
        setAlert({
          isHidden: true,
          status: false,
          msg: "Something wrong!",
        });
      });
  };

  const closeAlertHandler = () => {
    setAlert({ isHidden: false, status: "", msg: "" });
  };

  return (
    <>
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
          <div className={style["detail_img"]}>
            <img src={imgItem ? imgItem : parId.img1} alt="list_img" />
          </div>
        </div>
        <div className={style["detail_top-right"]}>
          <h1>{parId.name}</h1>
          <h2>{parId.price}</h2>
          <p>{parId.short_desc}</p>
          <h3>
            CATEGORY: <span>{parId.category}</span>
          </h3>
          <h3>
            The remaining product: <span>{parId.amount}</span>
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
      {alert.isHidden && (
        <Alerts
          status={alert.status}
          msg={alert.msg}
          closeHandler={closeAlertHandler}
        />
      )}
    </>
  );
};

export default DetailTop;
