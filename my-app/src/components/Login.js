import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

import Button from "./Button";
import { saveUser } from "../slices/authSlice";

import "../styles/Login.scss";

function Login({ modalToggler }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  function validateEmail(elementValue) {
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(elementValue);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if (validateEmail(email) && password.length >= 6) {
      axios
        .post("http://localhost:5000/api/auth/login", {
          email,
          password,
        })
        .then(function (response) {
          const { accessToken } = response.data;
          axios
            .get("http://localhost:5000/api/auth/tokenIsValid", {
              headers: {
                "x-auth-token": accessToken,
              },
            })
            .then((res) =>
              dispatch(
                saveUser({
                  val: res.data.val,
                  username: res.data.username,
                  userId: res.data.userId,
                  token: accessToken,
                })
              )
            );
          modalToggler();
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="container">
      <span onClick={modalToggler} className="close">
        X
      </span>
      <h1 className="container__heading">Login</h1>
      <form onSubmit={submitHandler} className="form">
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Email"
          type="email"
          className="form__input"
        ></input>
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Password"
          type="password"
          className="form__input"
        ></input>
        <Button content="login" className="green fullWidth" />
      </form>
    </div>
  );
}

export default Login;
