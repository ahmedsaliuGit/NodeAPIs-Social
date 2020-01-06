import React from "react";
import Posts from "../post/Posts";

const Home = () => (
  <div>
    <div className="jumbotron">
      <h1>App frontend</h1>
      <p className="lead">The beginning of the home page</p>
    </div>

    <div className="container">
      <Posts />
    </div>
  </div>
);

export default Home;
