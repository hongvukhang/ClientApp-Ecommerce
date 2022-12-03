import classes from "./Banner.module.css";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div className={classes.banner}>
      <div className={classes["banner_title"]}>
        <h4>NEW INSPIRATION 2020</h4>
        <h1>20% OFF ON NEW SEASON</h1>
        <button
          onClick={() => {
            navigate("/shop");
          }}
        >
          Browe collections
        </button>
      </div>
      <img
        className={classes["banner_logo"]}
        src={process.env.PUBLIC_URL + "/img/logo_lock.png"}
        alt="logo"
      />
    </div>
  );
};

export default Banner;
