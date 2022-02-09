import React from "react";

import Button from "./Button";

import "../styles/Card.scss";

function Card({ id, title, description, photo }) {
  return (
    <div key={id} data-id={id} className="card">
      <div className="card__imageBox">
        <img className="card__image" src={photo} alt={title} />
      </div>
      <div className="card__descriptionBox">
        <h1 className="card__title">{title}</h1>
        <p className="card__description">{description}</p>
      </div>
      <Button content="Read More" className="small" />
    </div>
  );
}

export default Card;
