import { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Modal from "../UI/Modal/Modal";

import AuthContext from "../../store/auth-context";

import classes from "./css/MainNavigation.module.css";

const MainNavigation = () => {
  const [showLogoutScreen, setShowLogoutScreen] = useState(false);
  const nav = useNavigate();
  const authCtx = useContext(AuthContext);

  const logoutScreenHandler = () => {
    setShowLogoutScreen((prevState) => !prevState);
  };

  const logoutHandler = () => {
    authCtx.logout();
    setShowLogoutScreen(false);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand>
          <NavLink to="/" className={classes.logo}>
            MyFinance
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {authCtx.isLoggedIn ? (
            <Nav className={`me-auto ${classes.nav}`}>
              <NavLink to="dashboard" className={classes.link}>
                Dashboard
              </NavLink>
              <NavLink to="incomes" className={classes.link}>
                Incomes
              </NavLink>
              <NavLink to="expenses" className={classes.link}>
                Expenses
              </NavLink>
              <NavDropdown.Divider className={classes.divider} />
            </Nav>
          ) : (
            <Nav className={`me-auto ${classes.nav}`}></Nav>
          )}

          {!authCtx.isLoggedIn ? (
            <Nav className={`re-auto ${classes.nav}`}>
              <NavLink to="auth" className={classes.link}>
                Login
              </NavLink>
            </Nav>
          ) : (
            <Nav>
              <NavDropdown title="Menu" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => {nav('incomes')}}>Incomes</NavDropdown.Item>
                <NavDropdown.Item onClick={() => {nav('expenses')}}>Expenses</NavDropdown.Item>
                <NavDropdown.Item onClick={() => {nav('investings')}}>Investing</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => {nav('settings')}}>Settings</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logoutScreenHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
      {showLogoutScreen && (
        <Modal onClose={logoutScreenHandler}>
          <div className={classes.modal}>
            <h2>Logout</h2>
            <p>Are you sure you want to log out?</p>
            <div className={classes["modal--actions"]}>
              <button className="button" onClick={logoutHandler}>
                Logout
              </button>
              <button className="button--flat" onClick={logoutScreenHandler}>
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
    </Navbar>
  );
};

export default MainNavigation;
