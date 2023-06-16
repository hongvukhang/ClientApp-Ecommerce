import { useState, useEffect, useRef } from "react";
import classes from "./ProductsList.module.css";
import { useNavigate } from "react-router-dom";
const ProductsList = (props) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [valueInput, setValueInput] = useState("");
  const [counter, setCounter] = useState(true);
  const enteredInput = useRef();

  useEffect(() => {
    if (props.searchItem === "All" && valueInput === "") {
      setItems(props.product);
      setIsLoading(true);
    }
  });

  useEffect(() => {
    if (props.searchItem !== "All") {
      const loadItems = props.product.filter(
        (prod) => prod.category === props.searchItem.toLowerCase()
      );
      if (loadItems.length === 0) {
        setCounter(false);
      } else {
        setCounter(true);
      }
      setItems(loadItems);
      setIsLoading(true);
      setValueInput("");
    }
  }, [props.searchItem]);

  const inputChangeHandler = (event) => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        setValueInput(event.target.value);
        const loadItems = [];
        props.product.map((prod) => {
          const name = prod.name.toLowerCase();
          if (name.includes(event.target.value)) {
            loadItems.push(prod);
          }
        });
        setItems(loadItems);
        setIsLoading(true);
      }
    });
  };

  return (
    <div className={classes["products_list"]}>
      <div className={classes["search-sort"]}>
        <input
          ref={enteredInput}
          onChange={inputChangeHandler}
          type="text"
          placeholder="Enter Search Here"
        />
        <select>
          <option>Default sorting</option>
        </select>
      </div>
      {isLoading && (
        <div>
          <ul className={classes["product_list-items"]}>
            {items.map((prod) => (
              <li
                key={prod._id.$oid}
                onClick={() => {
                  navigate(`/detail/${prod._id}`);
                  document.body.scrollTop = 0;
                  document.documentElement.scrollTop = 0;
                }}
              >
                <img src={prod.img1} alt={prod.name} />
                <p className={classes["item_name"]}>{prod.name}</p>
                <p className={classes["item_price"]}>{prod.price}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className={classes.couterList}>
        <div>
          <button>{`<<`}</button>
          <span className={counter ? classes.counter : classes.counterNone}>
            1
          </span>
          <button>{`>>`}</button>
        </div>
        <p>Showing 1-9 of 9 results</p>
      </div>
    </div>
  );
};

export default ProductsList;
