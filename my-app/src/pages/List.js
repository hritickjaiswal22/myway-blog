import React from "react";

import Grid from "../components/Grid";

import "../styles/listpage.scss";

function list() {
  return (
    <article>
      <h1 className="pageHeading">MyWays Blogs</h1>
      <Grid />
    </article>
  );
}

export default list;
