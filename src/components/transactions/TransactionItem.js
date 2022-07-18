import { useNavigate } from "react-router-dom";

import classes from "./css/TransactionItem.module.css";

const TransactionItem = (props) => {
  const nav = useNavigate();
  const { amount, account, category, date, id } = props.data;
  const newDate = date.toLocaleDateString("nl", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  let itemClass = classes['table-item-1'];
  if (props.index % 2 !== 0 ) {
    itemClass = classes['table-item-2'];
  } 

  return (
    <tr
      className={itemClass}
      onClick={() => {
        nav(`${id}`);
      }}
    >
      <td>{newDate}</td>
      <td>{category}</td>
      <td>{account}</td>
      <td>€ {amount.toFixed(2)}</td>
    </tr>
  );
};

export default TransactionItem;
