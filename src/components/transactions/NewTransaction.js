import React, { useEffect } from "react";
import Card from "../UI/Card";
import { addTransaction, getCategories, getAccounts } from "../../lib/api";
import useHttp from "../../hooks/use-http";
import NewTransactionForm from "./NewTransactionForm";

const NewTransaction = (props) => {
  const type = props.type.toLowerCase();
  const { sendRequest: addNewTransaction } = useHttp(addTransaction);
  const { sendRequest: getAllCategories, data: categoryList } =
    useHttp(getCategories);
  const { sendRequest: getAllAccounts, data: accountList } =
    useHttp(getAccounts);

  useEffect(() => {
    getAllCategories(undefined, type);
    getAllAccounts();
  }, [getAllCategories, type, getAllAccounts]);

  const submitHandler = (data) => {
    addNewTransaction(data, type);
  };

  return (
    <Card>
      <NewTransactionForm
        categories={categoryList}
        accounts={accountList}
        transactionType={type}
        formSubmitHandler={submitHandler}
      />
    </Card>
  );
};

export default NewTransaction;
