import { useEffect, useContext } from "react";
import { getAccounts } from "../../lib/api";
import useHttp from "../../hooks/use-http";

import AuthContext from "../../store/auth-context";

import "./css/filter.css";

const AccountFilter = (props) => {
  const authCtx = useContext(AuthContext);
  const { sendRequest, data } = useHttp(getAccounts);

  useEffect(() => {
    sendRequest({token: authCtx.token});
  }, [sendRequest, authCtx.token]);

  const dropdownChangeHandler = (e) => {
    props.onChangeFilter(e.target.value);
  };

  if (data) {
    return (
      <div className="form">
        <div className="control">
          <label>Account</label>
          <select
            value={props.selectedAccount}
            onChange={dropdownChangeHandler}
          >
            {data.map((account, key) => {
              return (
                <option key={key} value={account}>
                  {account}
                </option>
              );
            })}
            <option value="All">All Accounts</option>
          </select>
        </div>
      </div>
    );
  }

  return <p>loading...</p>;
};

export default AccountFilter;
