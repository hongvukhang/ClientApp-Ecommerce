import { useState, useEffect } from "react";

import { priceTransform } from "../../hooks/useLocalStorage";

import axios from "axios";
import { useCookies } from "react-cookie";
import classes from "./BillDetail.module.css";
import { useNavigate } from "react-router-dom";

import Alerts from "../../portal/Alerts";
const BillDetail = () => {
  const navigate = useNavigate();
  const [cookie] = useCookies();
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    cart: [],
  });
  const [err, setErr] = useState({
    fullName: false,
    email: false,
    phone: false,
    address: true,
  });
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [notify, setNotify] = useState({
    hidden: false,
    status: false,
    msg: "nothing",
  });

  const closeAlert = () => {
    setNotify(() => ({ ...notify, hidden: false }));
    if (notify.status) {
      navigate("/");
    }
  };

  useEffect(() => {
    const dataReq = {
      token: cookie.token,
      email: cookie.email,
      status: "checkout",
    };
    axios
      .post("/getCart", dataReq)
      .then((result) => {
        let totalPrice = 0;

        result.data.cart.forEach((element) => {
          totalPrice += element.price * element.quantity;
        });
        setTotal(totalPrice);
        setUser({ ...result.data, address: "" });
        setIsLoading(true);
      })
      .catch((err) => console.log(err));
  }, []);

  const inforUserHandler = (e) => {
    const value = e.target.value;
    const id = e.target.id;
    if (id === "address") {
      if (value === "") {
        setErr(() => ({ ...err, address: true }));
      } else {
        setErr(() => ({ ...err, address: false }));
      }
      setUser(() => ({ ...user, address: value }));
    }
    if (id === "email") {
      if (!value.includes("@") || value === "") {
        setErr(() => ({ ...err, email: true }));
      } else {
        setErr(() => ({ ...err, email: false }));
      }
      setUser(() => ({ ...user, email: value }));
    }
    if (id === "name") {
      if (value === "") {
        setErr(() => ({ ...err, fullName: true }));
      } else {
        setErr(() => ({ ...err, fullName: false }));
      }
      setUser(() => ({ ...user, fullName: value }));
    }
    if (id === "phone") {
      if (
        value === "" ||
        !Number(value) ||
        value.length !== 10 ||
        value[0] !== "0"
      ) {
        setErr(() => ({ ...err, phone: true }));
      } else {
        setErr(() => ({ ...err, phone: false }));
      }
      setUser(() => ({ ...user, phone: value }));
    }
  };

  const submitPlaceOderHandler = (e) => {
    e.preventDefault();
    const arrErr = Object.values(err);
    const isErr = arrErr.some((val) => val === true);
    if (!isErr) {
      const dataReq = {
        token: cookie.token,
        email: cookie.email,
        user: user,
      };

      axios
        .post("/sendMailConfirm", dataReq)
        .then((result) => {
          if (result.status === 201) {
            setNotify(() => ({
              hidden: true,
              status: true,
              msg: result.data,
            }));
          } else {
            setNotify(() => ({
              hidden: true,
              status: false,
              msg: result?.data?.err?.msg,
            }));
          }
        })
        .catch((err) => {
          setNotify(() => ({
            hidden: true,
            status: false,
            msg: err,
          }));
        });
    }
  };

  return (
    <div className={classes["bill_container"]}>
      {notify.hidden && (
        <Alerts
          status={notify.status}
          msg={notify.msg}
          closeHandler={closeAlert}
        />
      )}
      <h1>BILLING DETAILS</h1>
      <div className={classes["bill_detail"]}>
        <form
          onSubmit={submitPlaceOderHandler}
          className={classes["bill_form"]}
        >
          <label>FULL NAME:</label>
          <input
            id="name"
            type="text"
            defaultValue={user.fullName}
            className={
              !err.fullName
                ? classes["form_input"]
                : classes["form_input-error"]
            }
            onChange={inforUserHandler}
            placeholder="Enter Your Full Name Here!"
          />
          <label>EMAIL:</label>
          <input
            id="email"
            type="email"
            defaultValue={user.email}
            className={
              !err.email ? classes["form_input"] : classes["form_input-error"]
            }
            onChange={inforUserHandler}
            placeholder="Enter Your Email Here!"
          />
          <label>PHONE NUMBER:</label>
          <input
            id="phone"
            type="text"
            value={user.phone}
            className={
              !err.phone ? classes["form_input"] : classes["form_input-error"]
            }
            onChange={inforUserHandler}
            placeholder="Enter Your Phone Number Here!"
          />
          <label>ADDRESS:</label>
          <input
            id="address"
            type="text"
            value={user.address}
            onChange={inforUserHandler}
            className={
              !err.address ? classes["form_input"] : classes["form_input-error"]
            }
            placeholder="Enter Your Address Here!"
          />
          {!notify.status && <button>Place order</button>}
        </form>
        <div className={classes["bill_total"]}>
          <h1>YOUR ODER</h1>
          {isLoading &&
            user.cart.map((cart) => {
              return (
                <div key={cart.name} className={classes["bill_item"]}>
                  <h4>{cart.name}</h4>
                  <p>{`${cart.price} x ${cart.quantity}`}</p>
                </div>
              );
            })}
          <h3>
            TOTAL <span>{priceTransform(total)}</span>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default BillDetail;
