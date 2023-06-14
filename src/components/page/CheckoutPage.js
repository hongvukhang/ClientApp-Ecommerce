import CheckOutContent from "../checkout/CheckOutContent";
import BillDetail from "../checkout/BillDetail";
import { useEffect } from "react";

import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
const CheckoutPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <CheckOutContent />
      <BillDetail />
    </div>
  );
};

export default CheckoutPage;
