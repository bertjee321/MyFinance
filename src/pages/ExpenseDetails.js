import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import HighlightedExpense from "../components/expenses/HighlightedExpense";
import LoadingSpinner from "../components/UI/loadingspinner/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getSingleExpense } from "../lib/api";

const ExpenseDetails = () => {
  const params = useParams();
  const { expenseId } = params;

  const {
    sendRequest,
    data: loadedExpense,
    error,
    status,
  } = useHttp(getSingleExpense);

  useEffect(() => {
    sendRequest(expenseId);
  }, [sendRequest, expenseId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered">{error}</p>;
  }

  if (!loadedExpense) {
    return <p className="centered">No expense with ID "{expenseId}" Found.</p>;
  }

  return (
    <div className="centered main">
      <h1 style={{margin: '0px'}}>Expense Details</h1>
      <p style={{margin: '0px', marginTop: '5px'}}>Expense ID: {expenseId}</p>
      <HighlightedExpense data={loadedExpense} />
    </div>
  );
};

export default ExpenseDetails;
