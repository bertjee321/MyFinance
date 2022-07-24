import Card from "../UI/Card";
import classes from "./css/HighlightedTransaction.module.css";

const HighlightedTransaction = (props) => {
  const { date, category, description, account, amount } = props.data;
  const month = date.toLocaleString("en-EN", { month: "long" });
  const day = date.toLocaleString("en-EN", { day: "2-digit" });
  const year = date.getFullYear();

  const content = [
    {
      tag: "Category",
      data: category,
    },
    {
      tag: "Date",
      data: day + " " + month + ", " + year,
    },
    {
      tag: "Amount",
      data: "€ " + amount.toFixed(2),
    },
    {
      tag: "From / To",
      data: "Unknown", // This part is not added to application / database yet!
    },
    {
      tag: "Account",
      data: account + " (IBAN?)", // IBAN is not part of database yet
    },
    {
      tag: "Transaction ID",
      data: props.id,
    },
    {
      tag: "Description",
      data: description,
    },
  ];

  return (
    <Card className={classes.item}>
      <header className={classes.head}>
        <div className={classes["head--item"]}>
          <h4 style={{ margin: "0 0 0 1rem" }}>{category}</h4>
          <p style={{ margin: "0 0 0 1rem" }}>
            {day} {month}
          </p>
        </div>
        <div className={classes["head--item"]}>Select (placeholder)</div>
        <div className={classes["head--item"]}>
          <p style={{ margin: "0 1rem 0 0", textAlign: "right" }}>
            €{amount.toFixed(2)}
          </p>
        </div>
      </header>
      <div className={classes.content}>
        <div className={classes["content--graph"]}>Some graph PLACEHOLDER</div>
        <ul className={classes["content--list"]}>
          {content.map((item, index) => (
            <li key={index}>
              <p className={classes["section--left"]}>
                <b>{item.tag}</b>
              </p>
              <p className={classes["section--right"]}>{item.data}</p>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
};

export default HighlightedTransaction;
