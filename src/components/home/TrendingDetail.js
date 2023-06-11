import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import classes from "./TrendingDetail.module.css";

const TrendingDetail = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const detail = props.detail;
  const hiddenHandler = () => {
    dispatch({ type: "HIDDEN_POPUP" });
  };

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      dispatch({ type: "HIDDEN_POPUP" });
    }
  });

  return (
    <div className={classes["detail-background"]}>
      <div className={classes["detail-form"]}>
        <div className={classes["detail_img"]}>
          <img src={detail.img1} alt={detail.name} />
        </div>
        <div className={classes.detail}>
          <button
            onClick={hiddenHandler}
            className={classes["btn__detail-close"]}
          >
            X
          </button>
          <h2>{detail.name}</h2>
          <p>{detail.price}</p>
          <span>{detail.long_desc}</span>
          <br />
          <button
            className={classes["btn__detail-view"]}
            onClick={() => {
              navigate(`/detail/${detail._id}`);
              dispatch({ type: "HIDDEN_POPUP" });
              document.body.scrollTop = 0;
              document.documentElement.scrollTop = 0;
            }}
          >
            <FaShoppingCart />
            View Detail
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrendingDetail;
