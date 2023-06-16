import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

import style from "../../cart/CartContent.module.css";
import classes from "./History.module.css";
export default function History() {
  const [history, setHistory] = useState([]);

  const [cookie] = useCookies();

  useEffect(() => {
    const dataReq = {
      token: cookie.token,
      email: cookie.email,
    };
    axios.post("/history", dataReq).then((his) => {
      console.log(his);
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
                  <button className={classes["view-btn"]}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <div className={classes["information-user"]}>
          <h1>INFORMATION ORDER</h1>
          <p>ID User: {History[0]?.userId}</p>
          <p>Full Name: {History[0]?.name}</p>
          <p>Phone: {History[0]?.phone} </p>
          <p>Address: {History[0]?.address}</p>
          <p>Total:</p>
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
              {history.map((his) => (
                <tr key={his._id} className={classes["table-body_item"]}>
                  <td>{his._id}</td>
                  <td>
                    <img
                      width="150px"
                      src="https://firebasestorage.googleapis.com/v0/b/funix-way.appspot.com/o/xSeries%2FCCDN%2FReactJS%2FAssignment_Images%2FASM03_Resources%2Fiphone_13_4.jpeg?alt=media&token=dc72dde3-cfa4-4710-9493-ac2aa0ecf249"
                    />
                  </td>
                  <td>{his.name}</td>
                  <td>{his.phone}</td>
                  <td>3</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
