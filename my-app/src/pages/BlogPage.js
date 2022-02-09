import React from "react";

import { useSelector } from "react-redux";

import "../styles/blogpage.scss";

function BlogPage() {
  const post = useSelector((state) => state.selectPostState);
  console.log(useSelector((state) => state.selectPostState));
  return (
    <article className="blogArticle">
      <h1 className="pageHeading">{post.title}</h1>
      <div className="blogArticle__imageBox">
        <img className="blogArticle__image" src={post.image} alt={post.title} />
      </div>
      <p className="blogArticle__description">{post.description}</p>
    </article>
  );
}

export default BlogPage;
