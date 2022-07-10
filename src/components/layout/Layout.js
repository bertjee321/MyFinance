import { Fragment } from "react";

import classes from "./css/Layout.module.css";

import MainNavigation from "./MainNavigation";

const Layout = (props) => {
  return (
    <Fragment>
      <MainNavigation />
      <main className={classes.main}>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
