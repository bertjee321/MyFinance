import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import IncomeList from "../components/incomes/IncomeList";
import { getAllIncomes } from "../lib/api";
import useHttp from "../hooks/use-http";
import LoadingSpinner from "../components/UI/loadingspinner/LoadingSpinner";

const Incomes = () => {
  const {
    sendRequest,
    status,
    data: loadedIncomes,
    error,
  } = useHttp(getAllIncomes, true);

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
    (!loadedIncomes || loadedIncomes.length === 0)
  ) {
    content = <p>No Incomes Found</p>;
  } else {
    content = <IncomeList incomes={loadedIncomes} />;
  }

  return (
    <div className="main">
      <h1>Income</h1>
      <Outlet />
      {content}
    </div>
  );
};

export default Incomes;
