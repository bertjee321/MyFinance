import { NavLink } from "react-router-dom";

import classes from "./css/MainNavigation.module.css";

const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>MyFinance</div>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink to="/" className={classes.active}>
              Financial Tool
            </NavLink>
          </li>
          <li>
            <NavLink to='*' className={classes.active} style={{cursor: 'not-allowed'}}>Profile</NavLink>
          </li>
          <li>
            <NavLink to='*' className={classes.active} style={{cursor: 'not-allowed'}}>Login</NavLink>
          </li>
          <li>
            <NavLink to='*' className={classes.active} style={{cursor: 'not-allowed'}}>Logout</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
