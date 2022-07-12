import classes from "./css/Layout.module.css";

import MainNavigation from "./MainNavigation";

const Layout = (props) => {
  return (
    <div className={classes.container}>
      <MainNavigation />
      <main>{props.children}</main>
    </div>
  );
};

export default Layout;
