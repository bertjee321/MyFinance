import { useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../UI/Card";
import AuthContext from "../../store/auth-context";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const nav = useNavigate();
  const authCtx = useContext(AuthContext);

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAElRyMP0NHRfJyOvNaMXPjJW38hbU3rXo",
      {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "Application/json",
        },
      }
    )
      .then((response) => {
        //setloading?
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((data) => {
            let errorMessage = "Authentication failed!";
            if (data.error.message) {
              errorMessage = data.error.message;
            }

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        authCtx.login(data.idToken, expirationTime.toISOString());
        nav("/");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const cancelHandler = () => {
    nav("/");
  };

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <h2>Login</h2>
        <div className={classes.control}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" required ref={emailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" required ref={passwordRef} />
        </div>
        <div className={classes.actions}>
          <button className="button">Login</button>
          <button className="button--flat" onClick={cancelHandler}>
            Cancel
          </button>
        </div>
      </form>
    </Card>
  );
};

export default AuthForm;
