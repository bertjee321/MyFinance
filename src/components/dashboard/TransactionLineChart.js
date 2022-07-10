import React, { useState } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
import AccountFilter from "../filters/AccountFilter";
import YearFilter from "../filters/YearFilter";

import"./css/main-modules.css";

const TransactionLineChart = (props) => {
  const [filteredYear, setFilteredYear] = useState(
    new Date().getFullYear().toString()
  );
  const [filteredAccount, setFilteredAccount] = useState("All");
  const { expenses, incomes } = props;

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

  let filteredIncomes;
  if (filteredAccount !== "All") {
    filteredIncomes = incomes.filter((income) => {
      return (
        income.date.getFullYear().toString() === filteredYear &&
        income.account === filteredAccount
      );
    });
  } else {
    filteredIncomes = incomes.filter((income) => {
      return income.date.getFullYear().toString() === filteredYear;
    });
  }

  const chartDataPoints = [
    { label: "Jan", in: null, out: null },
    { label: "Feb", in: null, out: null },
    { label: "Mar", in: null, out: null },
    { label: "Apr", in: null, out: null },
    { label: "May", in: null, out: null },
    { label: "Jun", in: null, out: null },
    { label: "Jul", in: null, out: null },
    { label: "Aug", in: null, out: null },
    { label: "Sep", in: null, out: null },
    { label: "Oct", in: null, out: null },
    { label: "Nov", in: null, out: null },
    { label: "Dec", in: null, out: null },
  ];

  for (const expense in filteredExpenses) {
    const expenseMonth = filteredExpenses[expense].date.getMonth();
    chartDataPoints[expenseMonth].out += filteredExpenses[expense].amount;
  }

  for (const income in filteredIncomes) {
    const incomeMonth = filteredIncomes[income].date.getMonth();
    chartDataPoints[incomeMonth].in += filteredIncomes[income].amount;
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
      <LineChart width={750} height={300} data={chartDataPoints}>
        <Line
          type="linear"
          dataKey="in"
          stroke="green"
          strokeWidth={2}
          dot={true}
        />
        <Line
          type="linear"
          dataKey="out"
          stroke="red"
          strokeWidth={2}
          dot={true}
        />
        <CartesianGrid stroke="#ccc" strokeDasharray="7 7 " />
        <XAxis dataKey="label" />
        <YAxis />
      </LineChart>
    </React.Fragment>
  );
};

export default TransactionLineChart;
