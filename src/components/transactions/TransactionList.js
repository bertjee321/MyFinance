import React, { useState } from "react";
import { BiRefresh } from "react-icons/bi";

import TransactionItem from "./TransactionItem";
import MonthFilter from "../filters/MonthFilter";
import AccountFilter from "../filters/AccountFilter";

import classes from "./css/TransactionList.module.css";

const TransactionList = (props) => {
  const sortedTrx = props.transactions.sort((a, b) => b.date - a.date);
  const [filteredAccount, setFilteredAccount] = useState("All");
  const [filteredMonth, setFilteredMonth] = useState({
    month: new Date().getMonth().toString(),
    year: new Date().getFullYear().toString(),
  });

  let filteredTrx;
  if (filteredAccount !== "All") {
    filteredTrx = sortedTrx.filter((transaction) => {
      return (
        transaction.date.getFullYear().toString() === filteredMonth.year &&
        transaction.date.getMonth().toString() === filteredMonth.month &&
        transaction.account === filteredAccount
      );
    });
  } else {
    filteredTrx = sortedTrx.filter((transaction) => {
      return (
        transaction.date.getFullYear().toString() === filteredMonth.year &&
        transaction.date.getMonth().toString() === filteredMonth.month
      );
    });
  }

  return (
    <React.Fragment>
      <div className={classes.menu}>
        <BiRefresh
          className={classes.refreshButton}
          onClick={props.onRefresh}
        />
        <div className={classes.filters}>
          <AccountFilter
            selectedAccount={filteredAccount}
            onChangeFilter={(selectedAccount) =>
              setFilteredAccount(selectedAccount)
            }
          />
          <MonthFilter
            onChangeFilter={(selectedMonth) =>
              setFilteredMonth({
                month: new Date(selectedMonth).getMonth().toString(),
                year: new Date(selectedMonth).getFullYear().toString(),
              })
            }
          />
        </div>
      </div>
      <table className={classes.table}>
        <thead>
          <tr>
            <th>Date up / down</th>
            <th>Category</th>
            <th>Account</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {filteredTrx.map((item, index) => (
            <TransactionItem data={item} key={item.id} index={index} />
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default TransactionList;
