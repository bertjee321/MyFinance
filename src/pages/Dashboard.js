import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import DashboardModules from "../components/dashboard/DashboardModules";
import LoadingSpinner from "../components/UI/loadingspinner/LoadingSpinner";
import { getAllTransactions } from "../lib/api";
import useHttp from "../hooks/use-http";

import AuthContext from "../store/auth-context";

const Dashboard = () => {
  const nav = useNavigate();
  const authCtx = useContext(AuthContext);
  const {
    sendRequest,
    data: loadedTrx,
    status,
    error,
  } = useHttp(getAllTransactions);

  useEffect(() => {
    sendRequest(authCtx.token);
  }, [sendRequest, authCtx.token]);

  const navigateHandler = () => {
    nav("/auth");
  };

  let content;
  if (!authCtx.isLoggedIn) {
    content = (
      <div>
        <p>You are not logged in!</p>
        <button
          className="button"
          style={{ margin: "10px 0" }}
          onClick={navigateHandler}
        >
          Click here to login.
        </button>
      </div>
    );
  } else if (status === "pending") {
    content = <LoadingSpinner />;
  } else if (error) {
    content = <p>{error}</p>;
  } else if (status === "completed" && (!loadedTrx || loadedTrx.length === 0)) {
    content = <p>No Transactions Found</p>;
  } else if (loadedTrx) {
    content = <DashboardModules transactions={loadedTrx} />;
  }

  return (
    <div className="main">
      <h1>Dashboard</h1>
      {content}
    </div>
  );
};

export default Dashboard;
