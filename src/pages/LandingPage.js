import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <main>
      <nav className="main">
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
    </main>
  );
};

export default LandingPage;
