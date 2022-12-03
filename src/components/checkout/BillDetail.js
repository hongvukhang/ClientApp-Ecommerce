import { useState, useEffect } from "react";

import {
  useGetLocalStorage,
  priceTransform,
  updateLocalStorage,
} from "../../hooks/useLocalStorage";

import classes from "./BillDetail.module.css";
import { useNavigate } from "react-router-dom";
const BillDetail = () => {
  const navigate = useNavigate();
  const { user, users } = useGetLocalStorage();
  const [accountCurrent, setAccountCurrent] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [cartUser, setCartUser] = useState([]);
  const [total, setTotal] = useState();

  useEffect(() => {
    setAccountCurrent(user);
    setCartUser((cart) => user.cart);
    setAccounts(users);
  }, []);

  useEffect(() => {
    let total = 0;
    cartUser.map((cart) => {
      total += cart.priceInit * cart.quantity;
    });
    setTotal(priceTransform(total));
  }, [cartUser]);

  const submitPlaceOderHandler = (e) => {
    e.preventDefault();
    updateLocalStorage(accountCurrent, accounts, []);
    navigate("/");
  };

  return (
    <div className={classes["bill_container"]}>
      <h1>BILLING DETAILS</h1>
      <div className={classes["bill_detail"]}>
        <form
          onSubmit={submitPlaceOderHandler}
          className={classes["bill_form"]}
        >
          <label>FULL NAME:</label>
          <input type="text" placeholder="Enter Your Full Name Here!" />
          <label>EMAIL:</label>
          <input type="email" placeholder="Enter Your Email Here!" />
          <label>PHONE NUMBER:</label>
          <input type="number" placeholder="Enter Your Phone Number Here!" />
          <label>ADDRESS:</label>
          <input type="text" placeholder="Enter Your Address Here!" />
          <button>Place order</button>
        </form>
        <div className={classes["bill_total"]}>
          <h1>YOUR ODER</h1>
          {cartUser.map((cart) => {
            return (
              <div key={cart.idProducts} className={classes["bill_item"]}>
                <h4>{cart.name}</h4>
                <p>{`${cart.price} x ${cart.quantity}`}</p>
              </div>
            );
          })}
          <h3>
            TOTAL <span>{total}</span>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default BillDetail;
