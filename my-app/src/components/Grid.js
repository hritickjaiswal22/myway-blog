import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import Card from "./Card";
import { selectPost } from "../slices/selectSlice";

import "../styles/Grid.scss";

function Grid() {
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/post/")
      .then((res) => setPosts(res.data));
  }, []);

  const clickHandler = (e) => {
    if (e.target.innerText === "READ MORE") {
      const postId = e.target.parentElement.dataset.id;

      if (postId) {
        const post = posts.find((post) => post._id === postId);
        dispatch(
          selectPost({
            id: post._id,
            image: post.photo,
            title: post.title,
            description: post.description,
            username: post.username,
          })
        );
        history.push("/blogPost");
      }
    }
  };

  return (
    <main onClick={clickHandler} className="grid">
      {posts.length > 0
        ? posts.map(({ _id, title, description, photo }) => {
            const trimmedDescription = description.substring(0, 90) + " ...";
            return (
              <Card
                id={_id}
                title={title}
                description={trimmedDescription}
                photo={photo}
                key={_id}
              />
            );
          })
        : ""}
    </main>
  );
}

export default Grid;
