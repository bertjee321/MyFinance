import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import LoadingSpinner from "../components/UI/loadingspinner/LoadingSpinner";
import { getAllTransactions } from "../lib/api";
import useHttp from "../hooks/use-http";
import TransactionList from "../components/transactions/TransactionList";

const Transactions = (props) => {
  const {
    sendRequest,
    data: loadedTrx,
    status,
    error,
  } = useHttp(getAllTransactions);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  const refreshHandler = () => {
    sendRequest();
  };

  let content;
  if (status === "pending") {
    content = <LoadingSpinner />;
  } else if (error) {
    content = <p>{error}</p>;
  } else if (status === "completed" && (!loadedTrx || loadedTrx.length === 0)) {
    content = <p>No Transactions Found</p>;
  } else if (loadedTrx) {
    const data =
      props.type === "Expenses"
        ? [...loadedTrx.expenseList]
        : props.type === "Incomes"
        ? [...loadedTrx.incomeList]
        : null;
    content = <TransactionList transactions={data} onRefresh={refreshHandler}/>;
  }

  return (
    <div className="main">
      <h1>{props.type}</h1>
      <Outlet />
      {content}
    </div>
  );
};

export default Transactions;
