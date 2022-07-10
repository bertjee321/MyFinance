import React from "react";
import { useNavigate } from "react-router-dom";
import useInput from "../../hooks/use-input";
import Card from "../UI/Card";
import { addExpense } from "../../lib/api";
import useHttp from "../../hooks/use-http";

import classes from "./css/NewExpense.module.css";

const NewExpense = () => {
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

  const { sendRequest } = useHttp(addExpense);

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
    nav("/expenses");
  };

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <h2>New Expense</h2>
        <div
          className={`${classes.control} ${
            amountHasError && classes["control--error"]
          }`}
        >
          <label htmlFor="price">Amount (€)</label>
          <input
            type="number"
            id="price"
            step=".01"
            min="0.01"
            onChange={amountChangeHandler}
            onBlur={amountBlurHandler}
            value={enteredAmount}
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
          >
            <option value=" "></option>
            <option value="Housing">Housing</option>
            <option value="Transportation">Transportation</option>
            <option value="Food">Food</option>
            <option value="Utilities">Utilities</option>
            <option value="Insurance">Insurance</option>
            <option value="Medical">Medical and Healthcare</option>
            <option value="Savings/Investing or Debt Payment">
              Saving, Investing and Debt Payments
            </option>
            <option value="Lifestyle">Personal Spendings</option>
            <option value="Recreation">Recreation and Entertainment</option>
            <option value="Miscellaneous">Other</option>
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
            required
            value={enteredAccount}
          >
            <option value=" "></option>
            <option value="Joint account">Joint account</option>
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

export default NewExpense;
