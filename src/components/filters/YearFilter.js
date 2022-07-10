import "./css/filter.css";

const YearFilter = (props) => {
  const dropdownChangeHandler = (e) => {
    props.onChangeFilter(e.target.value);
  };

  return (
    <div className='form'>
      <div className='control'>
        <label>Year</label>
        <select value={props.selectedYear} onChange={dropdownChangeHandler}>
          {props.yearList.map((year) => {
            return (
              <option key={year} value={year}>
                {year}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default YearFilter;
