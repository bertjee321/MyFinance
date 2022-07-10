import classes from "./Card.module.css";

const NavButton = (props) => {
  return (
    <div className={`${classes.card} ${props.className}`}>{props.children}</div>
  );
};

export default NavButton;
