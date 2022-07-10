import Card from "../UI/Card";

import classes from "./css/HighlightedExpense.module.css";

const HighlightedExpense = (props) => {
  const { date, category, description, account, amount } = props.data;
  const month = date.toLocaleString("nl-NL", { month: "long" });
  const day = date.toLocaleString("nl-NL", { day: "2-digit" });
  const year = date.getFullYear();

  return (
    <Card className={classes.item}>
      <div className={classes.date}>
        <div className={classes["date__month"]}>{month}</div>
        <div className={classes["date__year"]}>{year}</div>
        <div className={classes["date__day"]}>{day}</div>
      </div>
      <div className={classes["item__description"]}>
        <h2>{category}</h2>
        <p>{description ? description : "No description"}</p>
        <p>{account}</p>
      </div>
      <div className={classes["item__amount"]}>€ {amount.toFixed(2)}</div>
      
    </Card>
  );
};

export default HighlightedExpense;
