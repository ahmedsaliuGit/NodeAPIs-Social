import React, { Component } from "react";
import { Link } from "react-router-dom";

import { list } from "./apiPost";
import DefaultPhoto from "../images/mountain.jpeg";

class Posts extends Component {
  state = {
    posts: [],
    page: 1,
    loading: true
  };

  loadPosts = page => {
    list(page).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ posts: data });
      }
    });
  };

  componentDidMount() {
    this.loadPosts(this.state.page);
  }

  loadMore = number => {
    this.setState({ page: this.state.page + number, loading: false });
    this.loadPosts(this.state.page + number);
  };

  loadLess = number => {
    this.setState({ page: this.state.page - number, loading: false });
    this.loadPosts(this.state.page - number);
  };

  renderPosts = (posts, page) => {
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
        {page > 1 ? (
          <button
            className="btn btn-raised btn-warning mr-5 mt-5 mb-5"
            onClick={() => this.loadLess(1)}
          >
            Previous ({page - 1})
          </button>
        ) : (
          ""
        )}

        {posts.length ? (
          <button
            className="btn btn-raised btn-success mt-5 mb-5"
            onClick={() => this.loadMore(1)}
          >
            Next ({page + 1})
          </button>
        ) : (
          ""
        )}
      </div>
    );
  };

  render() {
    const { posts, page, loading } = this.state;

    return (
      <div className="container">
        <h2 className="mt-5 mb-5">
          {!posts.length
            ? loading
              ? "Loading"
              : "No more posts!"
            : "Recent Posts"}
        </h2>

        {this.renderPosts(posts, page)}
      </div>
    );
  }
}

export default Posts;
