import classes from "./OtherInformation.module.css";

const OtherInformation = () => {
  return (
    <div>
      <div className={classes["other_infor"]}>
        <div>
          <h2>FREE SHIPPING</h2>
          <p>Free shipping worlwide</p>
        </div>
        <div>
          <h2>24 X 7 SERVICE</h2>
          <p>Free shipping worlwide</p>
        </div>
        <div>
          <h2>FESTIVAL OFFER</h2>
          <p>Free shipping worlwide</p>
        </div>
      </div>
      <div className={classes["infor_input"]}>
        <div>
          <h2>LET'S BE FRIENDS!</h2>
          <p>Nisi nisi tempor consequat laboris nisi.</p>
        </div>
        <div className={classes["infor_input-submit"]}>
          <input type="text" placeholder="Enter your email address" />
          <button>Subscribe</button>
        </div>
      </div>
    </div>
  );
};

export default OtherInformation;
