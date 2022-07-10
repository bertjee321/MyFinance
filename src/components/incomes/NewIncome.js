import React from "react";
import { useNavigate } from "react-router-dom";
import useInput from "../../hooks/use-input";
import Card from "../UI/Card";
import { addIncome } from "../../lib/api";
import useHttp from "../../hooks/use-http";

import classes from "./css/NewIncome.module.css";

const NewIncome = () => {
  const nav = useNavigate();
  const {
    value: enteredAmount,
    hasError: amountHasError,
    valueIsValid: amountIsValid,
    valueChangeHandler: amountChangeHandler,
    valueResetHandler: amountResetHandler,
    inputBlurHandler: amountBlurHandler,
  } = useInput((value) => value > 0);
  const {
    value: enteredCategory,
    hasError: categoryHasError,
    valueIsValid: categoryIsValid,
    valueChangeHandler: categoryChangeHandler,
    valueResetHandler: categoryResetHandler,
    inputBlurHandler: categoryBlurHandler,
  } = useInput((value) => value.trim() !== "");
  const {
    value: enteredAccount,
    hasError: accountHasError,
    valueIsValid: accountIsValid,
    valueChangeHandler: accountChangeHandler,
    valueResetHandler: accountResetHandler,
    inputBlurHandler: accountBlurHandler,
  } = useInput((value) => value.trim() !== "");
  const {
    value: enteredDate,
    hasError: dateHasError,
    valueIsValid: dateIsValid,
    valueChangeHandler: dateChangeHandler,
    valueResetHandler: dateResetHandler,
    inputBlurHandler: dateBlurHandler,
  } = useInput((value) => value.trim() !== "");
  const {
    value: enteredDescription,
    valueChangeHandler: descriptionChangeHandler,
    valueResetHandler: descriptionResetHandler,
  } = useInput(() => true);

  const { sendRequest } = useHttp(addIncome);

  const submitHandler = (e) => {
    e.preventDefault();

    const inputIsValid =
      amountIsValid && categoryIsValid && accountIsValid && dateIsValid;

    if (inputIsValid) {
      const enteredData = {
        amount: enteredAmount,
        category: enteredCategory,
        account: enteredAccount,
        date: enteredDate,
        description: enteredDescription,
      };
      sendRequest(enteredData);
      amountResetHandler();
      categoryResetHandler();
      accountResetHandler();
      dateResetHandler();
      descriptionResetHandler();
    }
  };

  const cancelHandler = () => {
    nav("/incomes");
  };

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <h2>New Income</h2>
        <div
          className={`${classes.control} ${
            amountHasError && classes["control--error"]
          }`}
        >
          <label htmlFor="amount">Amount (€)</label>
          <input
            type="number"
            id="amount"
            step=".01"
            onChange={amountChangeHandler}
            onBlur={amountBlurHandler}
            value={enteredAmount}
            required
          />
        </div>
        {amountHasError && (
          <p className={classes["error--message"]}>Field is required!</p>
        )}
        <div
          className={`${classes.control} ${
            categoryHasError && classes["control--error"]
          }`}
        >
          <label htmlFor="category">Category</label>
          <select
            id="category"
            onChange={categoryChangeHandler}
            onBlur={categoryBlurHandler}
            value={enteredCategory}
            required
          >
            <option value=" "></option>
            <option value="Salary">Salary</option>
            <option value="Gift">Gift</option>
            <option value="Dividend">Dividend or Interest</option>
            <option value="Inheritance">Inheritance</option>
            <option value="Other">Other</option>
          </select>
        </div>
        {categoryHasError && (
          <p className={classes["error--message"]}>Field is required!</p>
        )}
        <div
          className={`${classes.control} ${
            accountHasError && classes["control--error"]
          }`}
        >
          <label htmlFor="account">Account</label>
          <select
            id="account"
            onChange={accountChangeHandler}
            onBlur={accountBlurHandler}
            value={enteredAccount}
            required
          >
            <option value=" "></option>
            <option value="Joint">Joint account</option>
            <option value="John">John</option>
            <option value="Jane">Jane</option>
          </select>
        </div>
        {accountHasError && (
          <p className={classes["error--message"]}>Field is required!</p>
        )}
        <div
          className={`${classes.control} ${
            dateHasError && classes["control--error"]
          }`}
        >
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            onChange={dateChangeHandler}
            onBlur={dateBlurHandler}
            value={enteredDate}
            required
          />
        </div>
        {dateHasError && (
          <p className={classes["error--message"]}>Field is required!</p>
        )}
        <div className={classes.control}>
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            id="description"
            onChange={descriptionChangeHandler}
            value={enteredDescription}
          />
        </div>
        <div className={classes.actions}>
          <button className="btn">Submit</button>
          <button className="btn--flat" onClick={cancelHandler}>
            Cancel
          </button>
        </div>
      </form>
    </Card>
  );
};

export default NewIncome;
