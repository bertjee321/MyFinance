import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/UI/loadingspinner/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getSingleExpense } from "../lib/api";
import HighlightedTransaction from "../components/transactions/HighlightedTransaction";

import AuthContext from "../store/auth-context";

const ExpenseDetails = () => {
  const authCtx = useContext(AuthContext);
  const params = useParams();
  const { expenseId } = params;

  const {
    sendRequest,
    data: loadedExpense,
    error,
    status,
  } = useHttp(getSingleExpense);

  useEffect(() => {
    sendRequest({id: expenseId, token: authCtx.token});
  }, [sendRequest, expenseId, authCtx.token]);

  let content;
  if (status === "pending") {
    content = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  } else if (error) {
    content = <p className="centered">{error}</p>;
  } else if (!loadedExpense) {
    content = (
      <p className="centered">No expense with ID "{expenseId}" Found.</p>
    );
  } else if (loadedExpense) {
    content = (
      <div>
        <h1 style={{ margin: "0px" }}>Expense Details</h1>
        <p style={{ margin: "0px", marginTop: "5px" }}>
          Expense ID: {expenseId}
        </p>
        <HighlightedTransaction data={loadedExpense} id={expenseId}/>
      </div>
    );
  }

  return <main className="main">{content}</main>;
};

export default ExpenseDetails;
