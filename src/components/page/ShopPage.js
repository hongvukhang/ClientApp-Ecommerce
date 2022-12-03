import { useState, useEffect, useCallback } from "react";

import NavShop from "../shop/NavShop";
import ProductsList from "../shop/ProductsList";
import classes from "./ShopPage.module.css";
const ShopPage = () => {
  const [search, setSearch] = useState("All");

  const [product, setProduct] = useState([]);

  const priceInit = (price) => {
    let milion = Math.floor(price / 1000000);
    let thousand = Math.floor((price - milion * 1000000) / 1000);
    return `${milion}.${thousand}.000 VND`;
  };

  const productFetch = async () => {
    try {
      const respone = await fetch(
        "https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74"
      );
      const data = await respone.json();

      const loadProducts = [];
      data.map((res) => {
        return loadProducts.push({
          ...res,
          price: priceInit(res.price),
        });
      });
      setProduct(loadProducts);
    } catch (error) {}
  };

  useEffect(() => {
    productFetch();
  }, [productFetch]);

  const searchingHandler = (item) => {
    setSearch(item);
  };

  return (
    <div className={classes.shop}>
      <NavShop onSearch={searchingHandler} />
      <ProductsList product={product} searchItem={search} />
    </div>
  );
};

export default ShopPage;
