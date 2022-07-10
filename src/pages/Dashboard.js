import React, { useEffect } from "react";
import DashboardModules from "../components/dashboard/DashboardModules";
import LoadingSpinner from "../components/UI/loadingspinner/LoadingSpinner";
import { getAllTransactions } from "../lib/api";
import useHttp from "../hooks/use-http";

const Dashboard = () => {
  const {
    sendRequest,
    data: loadedTrx,
    status,
    error,
  } = useHttp(getAllTransactions);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  let content;
  if (status === "pending") {
    content = <LoadingSpinner />;
  } else if (error) {
    content = <p>{error}</p>;
  } else if (status === "completed" && (!loadedTrx || loadedTrx.length === 0)) {
    content = <p>No Transactions Found</p>;
  } else if (loadedTrx) {
    content = <DashboardModules transactions={loadedTrx} />;
  }

  return (
    <div className="centered main">
      <h1>Dashboard</h1>
      {content}
    </div>
  );
};

export default Dashboard;
