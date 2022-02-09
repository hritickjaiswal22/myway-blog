import React from "react";

import Login from "./Login";
import Signup from "./Signup";

import "../styles/Modal.scss";

function Modal({ showModal, modalToggler, login, signup }) {
  const classes = showModal ? `modal modal--visible` : `modal`;
  return (
    <aside className={classes}>
      {login ? (
        <Login modalToggler={modalToggler} />
      ) : (
        <Signup modalToggler={modalToggler} />
      )}
    </aside>
  );
}

export default Modal;
