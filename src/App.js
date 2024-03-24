import { Routes, Route } from "react-router-dom";
import React from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import "./App.css";
import LiveChat from "./components/layout/LiveChat";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Layout from "./components/layout/Layout";

import HomePage from "./components/page/HomePage";
import ShopPage from "./components/page/ShopPage";
import DetailPage from "./components/page/DetailPage";
import CartPage from "./components/page/CartPage";
import LoginPage from "./components/page/LoginPage";
import RegisterPage from "./components/register/Register";
import CheckoutPage from "./components/page/CheckoutPage";
import HistoryPage from "./components/page/history/History";
function App() {
  const [cookie] = useCookies();
  axios.defaults.baseURL = "https://web-ecommerce-xzk6.onrender.com";
  return (
    <>
      <Navbar />
      {cookie.token && <LiveChat />}

      <Layout>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Layout>
      <Footer />
    </>
  );
}

export default App;
