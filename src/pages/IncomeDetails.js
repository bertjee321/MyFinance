import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/UI/loadingspinner/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getSingleIncome } from "../lib/api";
import HighlightedTransaction from "../components/transactions/HighlightedTransaction";

const IncomeDetails = () => {
  const params = useParams();
  const { incomeId } = params;

  const {
    sendRequest,
    data: loadedIncome,
    error,
    status,
  } = useHttp(getSingleIncome);

  useEffect(() => {
    sendRequest(incomeId);
  }, [sendRequest, incomeId]);

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

  if (!loadedIncome) {
    return <p className="centered">No income with ID "{incomeId}" Found.</p>;
  }

  return (
    <div className="main">
      <h1 style={{ margin: "0px" }}>Income Details</h1>
      <p style={{ margin: "0px", marginTop: "5px" }}>Income ID: {incomeId}</p>

      <HighlightedTransaction data={loadedIncome} />
    </div>
  );
};

export default IncomeDetails;
