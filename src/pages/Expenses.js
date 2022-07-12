import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import ExpenseList from "../components/expenses/ExpenseList";
import { getAllExpenses } from "../lib/api";
import useHttp from "../hooks/use-http";
import LoadingSpinner from "../components/UI/loadingspinner/LoadingSpinner";

const Expenses = () => {
  const {
    sendRequest,
    status,
    data: loadedExpenses,
    error,
  } = useHttp(getAllExpenses, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);


  let content;
  if (status === "pending") {
    content = <LoadingSpinner />;
  } else if (error) {
    content = <p>{error}</p>;
  } else if (
    status === "completed" &&
    (!loadedExpenses || loadedExpenses.length === 0)
  ) {
    content = <p>No Expenses Found</p>;
  } else {
    content = <ExpenseList expenses={loadedExpenses} />;
  }

  return (
    <div className="main">
      <h1>Expenses</h1>
      <Outlet />
      {content}
    </div>
  );
};

export default Expenses;
