import CheckOutContent from "../checkout/CheckOutContent";
import BillDetail from "../checkout/BillDetail";
import { useEffect } from "react";

import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
const CheckoutPage = () => {
  const isLogin = useSelector((state) => state.isLogin);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  }, []);
  return (
    <div>
      <CheckOutContent />
      <BillDetail />
    </div>
  );
};

export default CheckoutPage;
