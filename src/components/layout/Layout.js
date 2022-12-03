import { Fragment } from "react";

import classes from "./Layout.module.css";
const Layout = (props) => {
  return (
    <Fragment>
      <main className={classes.layout}>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
