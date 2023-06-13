import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import style from "./DetailTop.module.css";

import axios from "axios";
import Alerts from "../alert/Alerts";

const DetailTop = (props) => {
  const navigate = useNavigate();
  const [cookie] = useCookies();

  const parId = props.detail;
  const [imgItem, setImgItem] = useState(parId.img1);
  const [counter, setCounter] = useState(1);

  const [notify, setNotify] = useState("");

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
      isLogin: cookie.login,
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
        setNotify("Success");
      })
      .catch((err) => {
        setNotify("Error");
      });
  };

  const closeAlertHandler = (alert) => {
    setNotify(alert);
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
      {notify && <Alerts status={notify} close={closeAlertHandler} />}
    </>
  );
};

export default DetailTop;
