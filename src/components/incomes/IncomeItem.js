import { useNavigate } from "react-router-dom";

const IncomeItem = (props) => {
  const nav = useNavigate();
  const { amount, account, category, date, id } = props.data;
  const newDate = date.toLocaleDateString("nl", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const showDetailHandler = () => {
    nav(`${id}`);
  }

  return (
    <tr className="table-item" onClick={showDetailHandler}>
      <td>{newDate}</td>
      <td>{category}</td>
      <td>{account}</td>
      <td>€ {amount.toFixed(2)}</td>
    </tr>
  );
};

export default IncomeItem;
