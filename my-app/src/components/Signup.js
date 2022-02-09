import React, { useState } from "react";

import Button from "./Button";

import "../styles/Signup.scss";
import axios from "axios";

function Signup({ modalToggler }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function validateEmail(elementValue) {
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(elementValue);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      validateEmail(email) &&
      password.length >= 6 &&
      password === confirmPassword &&
      fullName.length > 0
    ) {
      axios
        .post("http://localhost:5000/api/auth/register", {
          email,
          password,
          phoneNumber,
          username: fullName,
        })
        .then((response) => {
          console.log(response);
          setFullName("");
          setEmail("");
          setPhoneNumber("");
          setPassword("");
          setConfirmPassword("");
          modalToggler();
        })
        .catch((error) => {
          console.log(error);
          setFullName("");
          setEmail("");
          setPhoneNumber("");
          setPassword("");
          setConfirmPassword("");
          modalToggler();
        });
    }
  };

  return (
    <div className="container">
      <span onClick={modalToggler} className="close">
        X
      </span>
      <h1 className="container__heading">Sign Up</h1>
      <form onSubmit={submitHandler} className="form">
        <input
          onChange={(e) => setFullName(e.target.value)}
          value={fullName}
          placeholder="Full Name"
          type="text"
          className="form__input"
        />
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Email"
          type="email"
          className="form__input"
        />
        <input
          onChange={(e) => setPhoneNumber(e.target.value)}
          value={phoneNumber}
          placeholder="Phone Number"
          type="number"
          className="form__input"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Password"
          type="password"
          className="form__input"
        />
        <input
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          placeholder="Confirm Password"
          type="password"
          className="form__input"
        />
        <Button content="Signup" className="green fullWidth" />
      </form>
    </div>
  );
}

export default Signup;
