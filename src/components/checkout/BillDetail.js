import { useState, useEffect } from "react";

import { priceTransform } from "../../hooks/useLocalStorage";

import axios from "axios";
import { useCookies } from "react-cookie";
import classes from "./BillDetail.module.css";
import { useNavigate } from "react-router-dom";
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
    fullName:false,
    email:false,
    phone:false,
    address:false
  })
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

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
      setUser(() => ({ ...user, address: value }));
    }
    if (id === "email") {
      setUser(() => ({ ...user, email: value }));
    }
    if (id === "name") {
      setUser(() => ({ ...user, name: value }));
    }
    if (id === "phone") {
      setUser(() => ({ ...user, phone: value }));
    }
  };

// function validate information user
const validate = ()=> {
  
}

  const submitPlaceOderHandler = (e) => {
    e.preventDefault();
    // navigate("/");
    console.log(user);
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
          <input
            id="name"
            type="text"
            defaultValue={user.fullName}
            placeholder="Enter Your Full Name Here!"
          />
          <label>EMAIL:</label>
          <input
            id="email"
            type="email"
            defaultValue={user.email}
            placeholder="Enter Your Email Here!"
          />
          <label>PHONE NUMBER:</label>
          <input
            id="phone"
            type="text"
            defaultValue={user.phone}
            placeholder="Enter Your Phone Number Here!"
          />
          <label>ADDRESS:</label>
          <input
            defaultValue={user.address}
            onChange={inforUserHandler}
            type="text"
            id="address"
            placeholder="Enter Your Address Here!"
          />
          <button>Place order</button>
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
