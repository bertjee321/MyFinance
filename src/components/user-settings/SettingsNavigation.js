import { NavLink } from "react-router-dom";

import classes from "./css/SettingsNavigation.module.css";

const SettingsNavigation = () => {
  return (
    <nav className={classes.navlist}>
      <NavLink to="profile-settings">Profile</NavLink>
      <NavLink to="dashboard-settings">Dashboard</NavLink>
      <NavLink to="investment-settings">Investments</NavLink>
      <NavLink to="account-settings">Manage Accounts</NavLink>
      <NavLink to="category-settings">
        Transaction Categories
      </NavLink>
    </nav>
  );
};

export default SettingsNavigation;
