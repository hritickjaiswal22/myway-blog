import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import Button from "./Button";
import Modal from "./Modal";
import { saveUser } from "../slices/authSlice";

import "../styles/Header.scss";

function Header() {
  const [showModal, setShowModal] = useState(false);
  const [loginState, setLoginState] = useState(false);
  const [signupState, setSignupState] = useState(false);
  const user = useSelector((state) => state.authState);
  const dispatch = useDispatch();

  const modalToggler = () => {
    setShowModal((state) => !state);
  };

  const loginHandler = () => {
    modalToggler();
    setSignupState(false);
    setLoginState(true);
  };

  const signupHandler = () => {
    modalToggler();
    setLoginState(false);
    setSignupState(true);
  };

  const logoutHandler = () => {
    dispatch(
      saveUser({
        val: null,
        username: null,
        userId: null,
        token: null,
      })
    );
  };

  return (
    <header className="header">
      <Modal
        login={loginState}
        signup={signupState}
        showModal={showModal}
        modalToggler={modalToggler}
      />
      <div className="header__wrapper">
        <div className="header__logoBox">
          <h1 className="header__logo">MyWays</h1>
        </div>
        {user.val && user.username ? (
          <nav>
            <Link className="link" to="/createPost">
              Create Post
            </Link>
          </nav>
        ) : (
          ""
        )}
        {user.val && user.username ? (
          <div className="header__buttonBox">
            <Button onClick={logoutHandler} content="log out" />
          </div>
        ) : (
          <div className="header__buttonBox">
            <Button onClick={loginHandler} content="log in" />
            <Button
              onClick={signupHandler}
              content="Register"
              className="green"
            />
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
