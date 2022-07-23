import Card from "../UI/Card";
import classes from "./css/HighlightedTransaction.module.css";

const HighlightedTransaction = (props) => {
  const { date, category, description, account, amount } = props.data;
  const month = date.toLocaleString("en-EN", { month: "long" });
  const day = date.toLocaleString("en-EN", { day: "2-digit" });
  const year = date.getFullYear();

  return (
    <Card className={classes.item}>
      <header className={classes.head}>
        <div className={classes["head--item"]}>
          <h4>{category}</h4>
          <p>{day} {month}</p>
        </div>
        <div className={classes["head--item"]}>Select option (placeholder)</div>
        <div className={classes["head--item"]}>
          <p>€{amount.toFixed(2)}</p>
        </div>
      </header>
      <content className={classes.content}>
        <div className={classes["content--graph"]}>Some graph PLACEHOLDER</div>
        <div className={classes["content--info"]}>
          <section>
            <p className={classes["section--left"]}>
              <b>Category</b>
            </p>
            <p className={classes["section--right"]}>{category}</p>
          </section>
          <section>
            <p className={classes["section--left"]}>
              <b>Date</b>
            </p>
            <p className={classes["section--right"]}>
              {day} {month}, {year}{" "}
            </p>
          </section>
          <section>
            <p className={classes["section--left"]}>
              <b>From / To</b>
            </p>
            <p className={classes["section--right"]}>Unknown</p>
          </section>
          <section>
            <p className={classes["section--left"]}>
              <b>Account</b>
            </p>
            <p className={classes["section--right"]}>{account}</p>
          </section>
          <section>
            <p className={classes["section--left"]}>
              <b>ID</b>
            </p>
            <p className={classes["section--right"]}>
              {props.id}
            </p>
          </section>
          <section>
            <p className={classes["section--left"]}>
              <b>Description</b>
            </p>
            <p className={classes["section--right"]}>
              {description}
            </p>
          </section>
        </div>
      </content>
    </Card>
  );
};

export default HighlightedTransaction;
