import CartContent from "../cart/CartContent";
import CartList from "../cart/CartList";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const CartPage = () => {
  const isLogin = useSelector((state) => state.isLogin);
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (!isLogin) {
  //     navigate("/login");
  //   }
  // }, []);
  return (
    <div>
      <CartContent />
      {/* <CartList /> */}
    </div>
  );
};

export default CartPage;
