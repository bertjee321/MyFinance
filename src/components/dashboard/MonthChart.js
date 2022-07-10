import React, { useState } from "react";
import AccountFilter from "../filters/AccountFilter";
import YearFilter from "../filters/YearFilter";
import Chart from "./charts/Chart";

import"./css/main-modules.css";

const MonthChart = (props) => {
  const [filteredYear, setFilteredYear] = useState(
    new Date().getFullYear().toString()
  );
  const [filteredAccount, setFilteredAccount] = useState("All");
  const { expenses } = props;

  const yearList = [
    ...new Set(
      expenses.map((expense) => expense.date.getFullYear().toString())
    ),
  ];

  const filterYearChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };

  const filterAccountChangeHandler = (selectedAccount) => {
    setFilteredAccount(selectedAccount);
  };

  let filteredExpenses;
  if (filteredAccount !== "All") {
    filteredExpenses = expenses.filter((expense) => {
      return (
        expense.date.getFullYear().toString() === filteredYear &&
        expense.account === filteredAccount
      );
    });
  } else {
    filteredExpenses = expenses.filter((expense) => {
      return expense.date.getFullYear().toString() === filteredYear;
    });
  }

  const chartDataPoints = [
    { label: "Jan", value: 0 },
    { label: "Feb", value: 0 },
    { label: "Mar", value: 0 },
    { label: "Apr", value: 0 },
    { label: "May", value: 0 },
    { label: "Jun", value: 0 },
    { label: "Jul", value: 0 },
    { label: "Aug", value: 0 },
    { label: "Sep", value: 0 },
    { label: "Oct", value: 0 },
    { label: "Nov", value: 0 },
    { label: "Dec", value: 0 },
  ];

  for (const expense in filteredExpenses) {
    const expenseMonth = filteredExpenses[expense].date.getMonth();
    chartDataPoints[expenseMonth].value += filteredExpenses[expense].amount;
  }

  return (
    <React.Fragment>
      <div className='filter'>
        <AccountFilter
          selectedAccount={filteredAccount}
          onChangeFilter={filterAccountChangeHandler}
        />
        <YearFilter
          yearList={yearList}
          selectedYear={filteredYear}
          onChangeFilter={filterYearChangeHandler}
        />
      </div>
      <Chart dataPoints={chartDataPoints} />
    </React.Fragment>
  );
};

export default MonthChart;
