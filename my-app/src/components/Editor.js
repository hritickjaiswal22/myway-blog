import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import Button from "./Button";

import "../styles/Editor.scss";

function Editor() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const { username, token } = useSelector((state) => state.authState);

  const submitHandler = () => {
    if (title.length > 0 && description.length > 0) {
      axios
        .post("http://localhost:5000/api/post/", {
          title,
          description,
          token,
          username: JSON.stringify(username),
          photo: image,
        })
        .then(() => {
          setTitle("");
          setDescription("");
          setImage("");
        });
    }
  };

  return (
    <div className="editorWrapper">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Your Title here"
        className="editorWrapper__input"
        type="text"
      />
      <input
        value={image}
        onChange={(e) => setImage(e.target.value)}
        placeholder="Image Link"
        className="editorWrapper__input"
        type="text"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Add Content here..."
        className="editorWrapper__textArea"
        rows="10"
        cols="50"
      />
      <Button onClick={submitHandler} content="Publish" className="green" />
    </div>
  );
}

export default Editor;
