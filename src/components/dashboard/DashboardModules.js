import React from "react";
import Card from "../UI/Card";
import MonthChart from "./MonthChart";
import ExpensePieChart from "./ExpensePieChart";
import TransactionLineChart from "./TransactionLineChart";

import classes from "./css/DashboardModules.module.css";

const DashboardModules = (props) => {
  const { expenseList, incomeList } = props.transactions;

  return (
    <div className={classes.dashboard}>
      <Card className={classes.item}>
        <h3>Expenses distributed / month</h3>
        <MonthChart expenses={expenseList} />
      </Card>
      <Card className={classes.item}>
        <h3>Income versus Expenses</h3>
        <TransactionLineChart expenses={expenseList} incomes={incomeList} />
      </Card>
      <Card>
        <h3>Expense Chart</h3>
        <ExpensePieChart expenses={expenseList} />
      </Card>
    </div>
  );
};

export default DashboardModules;
