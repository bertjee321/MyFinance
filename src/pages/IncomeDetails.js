import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/UI/loadingspinner/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getSingleIncome } from "../lib/api";
import HighlightedTransaction from "../components/transactions/HighlightedTransaction";

import AuthContext from "../store/auth-context";

const IncomeDetails = () => {
  const authCtx = useContext(AuthContext);
  const params = useParams();
  const { incomeId } = params;

  const {
    sendRequest,
    data: loadedIncome,
    error,
    status,
  } = useHttp(getSingleIncome);

  useEffect(() => {
    sendRequest(incomeId, authCtx.token);
  }, [sendRequest, incomeId, authCtx.token]);

  let content;
  if (status === "pending") {
    content = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  } else if (error) {
    content = <p className="centered">{error}</p>;
  } else if (!loadedIncome) {
    content = <p className="centered">No income with ID "{incomeId}" Found.</p>;
  } else if (loadedIncome) {
    content = (
      <div>
        <h1 style={{ margin: "0px" }}>Income Details</h1>
        <p style={{ margin: "0px", marginTop: "5px" }}>Income ID: {incomeId}</p>
        <HighlightedTransaction data={loadedIncome} id={incomeId}/>
      </div>
    );
  }

  return <div className="main">{content}</div>;
};

export default IncomeDetails;
