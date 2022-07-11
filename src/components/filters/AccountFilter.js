import { getAccounts } from "../../lib/api";
import useHttp from "../../hooks/use-http";

import "./css/filter.css";
import { useEffect } from "react";

const AccountFilter = (props) => {
  const { sendRequest, data } = useHttp(getAccounts);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

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

  return <p>ACCOUNT FILTER</p>;
};

export default AccountFilter;
