import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Related.module.css";
import axios from "axios";

const Related = (props) => {
  const navigate = useNavigate();
  const product = props.product;
  const [related, setRelated] = useState([]);
  useEffect(() => {
    axios
      .get(`/product/prodCate/${product.category}?id=${product.params}`)
      .then((res) => {
        setRelated(res.data);
      });
  }, [product]);

  return (
    <div className={classes["detail_related"]}>
      <h2>RELARED PRODUCTS</h2>
      <ul className={classes["product_list"]}>
        {related.map((rel) => {
          return (
            <li
              key={rel._id}
              onClick={() => {
                navigate(`/detail/${rel._id}`);
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
              }}
            >
              <img src={rel.img1} alt={rel.name} />
              <p className={classes["item_name"]}>{rel.name}</p>
              <p className={classes["item_price"]}>{rel.price}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Related;
