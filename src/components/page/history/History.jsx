import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

import style from "../../cart/CartContent.module.css";
import classes from "./History.module.css";
export default function History() {
  const [history, setHistory] = useState([]);
  const [showTrans, setShowTrans] = useState({ isShow: false, id: "" });
  const [cookie] = useCookies();

  useEffect(() => {
    const dataReq = {
      token: cookie.token,
      email: cookie.email,
    };
    axios.post("/history", dataReq).then((his) => {
      his.status === 200 && setHistory(his.data);
    });
  }, []);

  return (
    <div>
      <div className={style.content}>
        <h1>HISTORY</h1>
        <h5>HISTORY</h5>
      </div>
      <div className={classes["table-container"]}>
        <table>
          <thead className={classes["table-header"]}>
            <tr>
              <td>ID ORDER</td>
              <td>ID USER</td>
              <td>NAME</td>
              <td>PHONE</td>
              <td>ADDRESS</td>
              <td>TOTAL</td>
              <td>DELIVERY</td>
              <td>STATUS</td>
              <td>DETAIL</td>
            </tr>
          </thead>
          <tbody>
            {history.map((his) => (
              <tr key={his._id} className={classes["table-body_item"]}>
                <td>{his._id}</td>
                <td>{his.userId}</td>
                <td>{his.name}</td>
                <td>{his.phone}</td>
                <td>
                  <p className={classes.address}>{his.address}</p>
                </td>
                <td>{his.total}</td>
                <td>{his.delivery}</td>
                <td>{his.status}</td>
                <td>
                  <button
                    onClick={() => {
                      if (showTrans.isShow && showTrans.id === his._id) {
                        setShowTrans({ isShow: false, id: his._id });
                      } else {
                        setShowTrans({ isShow: true, id: his._id });
                      }
                    }}
                    className={classes["view-btn"]}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showTrans.isShow &&
        history
          .filter((trans) => trans._id.toString() === showTrans.id.toString())
          .map((item) => {
            return (
              <div key={item._id}>
                <div className={classes["information-user"]}>
                  <h1>INFORMATION ORDER</h1>
                  <p>ID User: {item.userId}</p>
                  <p>Full Name: {item.name}</p>
                  <p>Phone: {item.phone} </p>
                  <p>Address: {item.address}</p>
                  <p>Total: {item.total}</p>
                </div>
                <div className={classes["table-container"]}>
                  <table>
                    <thead className={classes["table-header"]}>
                      <tr>
                        <td>ID PRODUCT</td>
                        <td>IMAGE</td>
                        <td>NAME</td>
                        <td>PRICE</td>
                        <td>COUNT</td>
                      </tr>
                    </thead>
                    <tbody>
                      {item.product.map((product) => (
                        <tr
                          key={product.id}
                          className={classes["table-body_item"]}
                        >
                          <td>{product.id}</td>
                          <td>
                            <img width="150px" src={product.img} />
                          </td>
                          <td>{product.name}</td>
                          <td>{product.price}</td>
                          <td>{product.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
    </div>
  );
}
