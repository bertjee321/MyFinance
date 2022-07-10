import ExpenseItem from "./ExpenseItem";

// SORTING AND FILTERING IN THIS COMPONENT

const ExpenseList = (props) => {
  const sortedExpenses = props.expenses.sort((a, b) => b.date - a.date);

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
        {sortedExpenses.map((item) => (
          <ExpenseItem data={item} key={item.id} />
        ))}
      </tbody>
    </table>
  );
};

export default ExpenseList;
