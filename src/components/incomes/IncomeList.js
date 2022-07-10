import IncomeItem from "./IncomeItem";

//SORTING AND FILTERING IN THIS COMPONENT

const IncomeList = (props) => {
  const sortedIncomes = props.incomes.sort((a, b) => b.date - a.date);

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Category</th>
          <th>Account</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {sortedIncomes.map((item) => (
          <IncomeItem data={item} key={item.id} />
        ))}
      </tbody>
    </table>
  );
};

export default IncomeList;
