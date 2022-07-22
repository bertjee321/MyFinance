import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthContext from "../store/auth-context";

const LandingPage = () => {
  const nav = useNavigate();
  const authCtx = useContext(AuthContext);

  const navigateHandler = () => {
    nav("/auth");
  };

  return (
    <main className="main">
      {!authCtx.isLoggedIn ? (
        <div>
          <h2>MyFinance</h2>
          <p>Welcome to your MyFinance page.</p>{" "}
          <p>Please login first to view your financials.</p>
          <button
            className="button"
            style={{ margin: "10px 0" }}
            onClick={navigateHandler}
          >
            Click here to login.
          </button>
        </div>
      ) : (
        <nav>
          <Link to="dashboard" className="navbutton">
            Dashboard
          </Link>
          <Link to="incomes" className="navbutton">
            Incomes
          </Link>
          <Link to="expenses" className="navbutton">
            Expenses
          </Link>
        </nav>
      )}
    </main>
  );
};

export default LandingPage;
