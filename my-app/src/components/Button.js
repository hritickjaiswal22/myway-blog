import React from "react";

import "../styles/Button.scss";

function Button({ content, className, onClick }) {
  let classes = className ? `btn btn--${className}` : "btn";
  return (
    <button onClick={onClick} className={classes}>
      {content}
    </button>
  );
}

export default Button;
