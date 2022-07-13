import Card from "../UI/Card";
import classes from "./css/HighlightedTransaction.module.css";

const HighlightedTransaction = (props) => {
  const { date, category, description, account, amount } = props.data;
  const month = date.toLocaleString("en-EN", { month: "long" });
  const day = date.toLocaleString("en-EN", { day: "2-digit" });
  const year = date.getFullYear();

  return (
    <Card className={classes.item}>
      <div className={classes.left}>
        <p className={classes["item__amount"]}>€ {amount.toFixed(2)}</p>
        <div className={classes.date}>
          <p className={classes["date__month"]}>{month}</p>
          <p className={classes["date__year"]}>{year}</p>
          <p className={classes["date__day"]}>{day}</p>
        </div>
      </div>
      <div className={classes["item__description"]}>
        <h2>{category}</h2>

        <h4>Description</h4>
        <p>
          {description ? description : "n/a"}
        </p>
        <h4>Account</h4>
        <p>{account}</p>
      </div>
    </Card>
  );
};

export default HighlightedTransaction;
