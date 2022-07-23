import { useState } from "react";

import "./css/filter.css";

const MonthFilter = (props) => {
  const [monthAndYear, setMonthAndYear] = useState({
    month: ("0" + (new Date().getMonth() + 1)).slice(-2),
    year: new Date().getFullYear().toString(),
  });

  const dropdownChangeHandler = (e) => {
    setMonthAndYear({
      month: ("0" + (new Date(e.target.value).getMonth() + 1)).slice(-2),
      year: new Date(e.target.value).getFullYear().toString(),
    });
    props.onChangeFilter(e.target.value);
  };

  return (
    <div className="form">
      <div className="control">
        <label>Month</label>
        <input
          type="month"
          onChange={dropdownChangeHandler}
          value={monthAndYear.year + "-" + monthAndYear.month}
        />
      </div>
    </div>
  );
};

export default MonthFilter;
