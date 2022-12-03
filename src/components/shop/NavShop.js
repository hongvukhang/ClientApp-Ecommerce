import { useState } from "react";
import classes from "./NavShop.module.css";

const initial = [
  {
    title: "APPLE",
    items: [{ item: "All", active: true }],
  },
  {
    title: "IPHONE & MAC",
    items: [
      { item: "iPhone", active: false },
      { item: "iPad", active: false },
      { item: "MacBook", active: false },
    ],
  },
  {
    title: "WIRELESS",
    items: [
      { item: "Airpod", active: false },
      { item: "Watch", active: false },
    ],
  },
  {
    title: "OTHER",
    items: [
      { item: "Mouse", active: false },
      { item: "Keyboard", active: false },
      { item: "Other", active: false },
    ],
  },
];

const NavShop = (props) => {
  const [productList, setProductList] = useState(initial);
  const searchingHandler = (item) => {
    props.onSearch(item.item);

    const test = productList.map((li) => ({
      title: li.title,
      items: li.items.map((it) => ({
        item: it.item,
        active: item.item === it.item ? true : false,
      })),
    }));
    setProductList(test);
  };

  return (
    <div className={classes.navbar}>
      <h2>CATEGORIES</h2>
      <nav className={classes["navbar_list"]}>
        {productList.map((li) => {
          return (
            <div key={li.title}>
              <h4
                className={
                  li.title !== "APPLE"
                    ? classes["navbar_list-title"]
                    : classes["navbar_list-apple"]
                }
              >
                {li.title}
              </h4>
              <ul className={classes["navbar_list-items"]}>
                {li.items.map((item) => {
                  return (
                    <li
                      onClick={() => searchingHandler(item)}
                      key={item.item}
                      className={item.active ? classes.active : ""}
                    >
                      {item.item}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default NavShop;
