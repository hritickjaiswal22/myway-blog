import React from "react";

import Editor from "../components/Editor";

function CreatePost() {
  return (
    <article className="article">
      <h1 className="pageHeading">Create a Blog Post</h1>
      <Editor />
    </article>
  );
}

export default CreatePost;
