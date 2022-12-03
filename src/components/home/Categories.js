import classes from "./Categories.module.css";

const Categories = () => {
  return (
    <div>
      <div className={classes["cate_title"]}>
        <h4>CAREFULLY CREATED COLLECTIONS</h4>
        <h3>BROWSE OUR CATEGORIES</h3>
      </div>
      <div className={classes["cate_list"]}>
        <div className={classes["cate_item"]}>
          <img
            src={process.env.PUBLIC_URL + "/listItem/iphone.png"}
            alt="iphone"
          />
          <img src={process.env.PUBLIC_URL + "/listItem/mac.png"} alt="mac" />
        </div>
        <div className={classes["cate_item"]}>
          <img src={process.env.PUBLIC_URL + "/listItem/ipad.png"} alt="ipad" />
          <img
            src={process.env.PUBLIC_URL + "/listItem/watch.png"}
            alt="watch"
          />
          <img
            src={process.env.PUBLIC_URL + "/listItem/airpods.png"}
            alt="airpods"
          />
        </div>
      </div>
    </div>
  );
};

export default Categories;
