import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import classes from "./Trending.module.css";
import axios from "axios";
import TrendingDetail from "./TrendingDetail";

const Trending = () => {
  const isDetail = useSelector((state) => state.toggle);
  const dispatch = useDispatch();

  const [productDetail, setProductDetail] = useState([]);
  const [product, setProduct] = useState([]);

  const priceInit = (price) => {
    let milion = Math.floor(price / 1000000);
    let thousand = Math.floor((price - milion * 1000000) / 1000);
    return `${milion}.${thousand}.000 VND`;
  };

  useEffect(() => {
    axios
      .get("/product/products/all")
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        const loadProducts = [];
        res.map((res) => {
          return loadProducts.push({
            ...res,
            price: priceInit(res.price),
          });
        });
        setProduct(loadProducts);
      })
      .catch((err) => console.log(err));
  }, []);

  const toggleDetailHandler = (prod) => {
    dispatch({ type: "SHOW_POPUP" });
    setProductDetail(prod);
  };

  return (
    <div>
      <div className={classes["trending_title"]}>
        <h4>MADE THE HARD WAY</h4>
        <h2>TOP TRENDING PRODUCTS</h2>
      </div>
      {isDetail && <TrendingDetail detail={productDetail} />}
      <ul className={classes["trending_item"]}>
        {product.map((prod) => (
          <li key={prod._id}>
            <img
              src={prod.img1}
              alt={prod.name}
              onClick={() => toggleDetailHandler(prod)}
            />
            <p className={classes.name}>{prod.name}</p>
            <p className={classes.price}>{prod.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Trending;
