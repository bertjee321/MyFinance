import TransactionItem from "./TransactionItem";

//SORTING AND FILTERING IN THIS COMPONENT

const TransactionList = (props) => {
  const sortedTrx = props.transactions.sort((a, b) => b.date - a.date);

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
        {sortedTrx.map((item) => (
          <TransactionItem data={item} key={item.id} />
        ))}
      </tbody>
    </table>
  );
};

export default TransactionList;
