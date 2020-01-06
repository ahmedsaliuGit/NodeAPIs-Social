import React, { Component } from "react";
import { Link } from "react-router-dom";

import { list } from "./apiPost";
import DefaultPhoto from "../images/mountain.jpeg";

class Posts extends Component {
  state = {
    posts: []
  };

  componentDidMount() {
    list().then(data => {
      if (data.error) {
        console.log(data.error);
      }

      this.setState({ posts: data });
    });
  }

  renderPosts = posts => {
    return (
      <div className="row">
        {posts.map((post, i) => {
          const posterIdUrl = post.postedBy ? `/user/${post.postedBy._id}` : "";
          const posterName = post.postedBy ? post.postedBy.name : " Unknown";

          return (
            <div className="col-md-4 card mb-2" key={i}>
              <img
                src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
                alt={post.name}
                className="img-thumbnail mb-3"
                onError={i => (i.target.src = `${DefaultPhoto}`)}
                style={{ height: "200px", width: "100%" }}
              />
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.body.substring(0, 50)}</p>
                <p className="font-italic mark">
                  Posted by <Link to={`${posterIdUrl}`}>{posterName}</Link> on{" "}
                  {new Date(post.created).toDateString()}
                </p>
                <Link
                  to={`/post/${post._id}`}
                  className="btn btn-raised btn-primary"
                >
                  Read more
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    const { posts } = this.state;

    return (
      <div className="container">
        <h1 className="mt-5 mb-5">
          {!posts.length ? "Loading..." : "Recent Posts"}
        </h1>

        {this.renderPosts(posts)}
      </div>
    );
  }
}

export default Posts;
