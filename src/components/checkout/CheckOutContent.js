import classes from "../cart/CartContent.module.css";
import { useNavigate } from "react-router-dom";
const CheckOutContent = () => {
  const navigate = useNavigate();

  return (
    <div className={classes.content}>
      <h1>CHECKOUT</h1>
      <div>
        <h5 onClick={() => navigate("/")}>HOME&ensp;/&ensp;</h5>
        <h5 onClick={() => navigate("/cart")}>CART&ensp;/&ensp;</h5>
        <h5>CHECKOUT</h5>
      </div>
    </div>
  );
};

export default CheckOutContent;
