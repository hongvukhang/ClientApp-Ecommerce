import CartContent from "../cart/CartContent";
import CartList from "../cart/CartList";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const CartPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <CartContent />
      <CartList />
    </div>
  );
};

export default CartPage;
