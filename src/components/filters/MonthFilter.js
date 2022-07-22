import "./css/filter.css";

const MonthFilter = (props) => {
  const dropdownChangeHandler = (e) => {
    props.onChangeFilter(e.target.value);
  };

  const year = new Date().getFullYear().toString();
  const month = ("0" + (new Date().getMonth() + 1)).slice(-2);

  return (
    <div className="form">
      <div className="control">
        <label>Month</label>
        <input
          type="month"
          onChange={dropdownChangeHandler}
        />
      </div>
    </div>
  );
};

export default MonthFilter;
