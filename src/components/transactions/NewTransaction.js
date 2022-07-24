import React, { useEffect, useContext } from "react";
import Card from "../UI/Card";
import { addTransaction, getCategories, getAccounts } from "../../lib/api";
import useHttp from "../../hooks/use-http";
import NewTransactionForm from "./NewTransactionForm";

import AuthContext from "../../store/auth-context";

const NewTransaction = (props) => {
  const authCtx = useContext(AuthContext);
  const type = props.type.toLowerCase();
  const { sendRequest: addNewTransaction } = useHttp(addTransaction);
  const { sendRequest: getAllCategories, data: categoryList } =
    useHttp(getCategories);
  const { sendRequest: getAllAccounts, data: accountList } =
    useHttp(getAccounts);

  useEffect(() => {
    getAllCategories({type, token: authCtx.token});
    getAllAccounts({token: authCtx.token});
  }, [getAllCategories, type, getAllAccounts, authCtx.token]);

  const submitHandler = (data) => {
    addNewTransaction({requestData: data, type, token: authCtx.token});
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
