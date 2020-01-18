import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

import { singlePost, remove, like, unlike } from "./apiPost";
import DefaultPhoto from "../images/mountain.jpeg";
import { isAuthenticated } from "../auth";
import Comment from "./Comment";

class Post extends Component {
  state = {
    post: "",
    redirectToHome: false,
    redirectToSignin: false,
    like: false,
    likes: 0,
    comments: []
  };

  componentDidMount() {
    const postId = this.props.match.params.postId;

    singlePost(postId).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({
          post: data,
          likes: data.likes.length,
          like: this.checkLike(data.likes),
          comments: data.comments
        });
      }
    });
  }

  checkLike(likes) {
    const userId = isAuthenticated() && isAuthenticated().user._id;
    const match = likes.indexOf(userId) !== -1;
    return match;
  }

  confirmedDelete = () => {
    const answer = window.confirm("Are you sure");
    return answer;
  };

  deletePost = () => {
    if (this.confirmedDelete()) {
      const userId = this.props.match.params.postId;

      const token = isAuthenticated().token;

      remove(userId, token).then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          this.setState({ redirectToHome: true });
        }
      });
    }
  };

  likeToggle = () => {
    if (!isAuthenticated()) {
      this.setState({ redirectToSignin: true });
      return false;
    }
    let callApi = this.state.like ? unlike : like;
    const userId = isAuthenticated().user._id;
    const postId = this.props.match.params.postId;
    const token = isAuthenticated().token;

    callApi(userId, token, postId).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ like: !this.state.like, likes: data.likes.length });
      }
    });
  };

  updateComments = comments => {
    this.setState({ comments });
  };

  adminControl = post => (
    <div>
      {isAuthenticated().user && isAuthenticated().user.role === "admin" && (
        <div className="card mt-5">
          <div className="card-body">
            <h5 className="card-title">Admin</h5>
            <p className="mb-2 text-danger">Edit/Delete as an Admin</p>
            <Link
              to={`/post/edit/${post._id}`}
              className="btn btn-raised btn-warning btn-sm mr-5"
            >
              Update Post
            </Link>
            <button
              onClick={this.deletePost}
              className="btn btn-raised btn-danger"
            >
              Delete Post
            </button>
          </div>
        </div>
      )}
    </div>
  );

  renderPost = (post, likes, like) => {
    const posterIdUrl = post.postedBy ? `/user/${post.postedBy._id}` : "";
    const posterName = post.postedBy ? post.postedBy.name : " Unknown";

    return (
      <div className="card mt-5 mb-d">
        <div className="card-body">
          <img
            src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
            alt={post.name}
            className="img-thumbnail mb-3"
            onError={i => (i.target.src = `${DefaultPhoto}`)}
            style={{ height: "300px", width: "100%", objectFit: "center" }}
          />
          {like ? (
            <h4 onClick={this.likeToggle} style={{ cursor: "pointer" }}>
              <i
                className="fa fa-thumbs-up mr-3 text-success bg-dark"
                style={{ padding: "20px", borderRadius: "50%" }}
              />
              {likes} likes
            </h4>
          ) : (
            <h4 onClick={this.likeToggle} style={{ cursor: "pointer" }}>
              <i
                className="fa fa-thumbs-up mr-3 text-warning bg-dark"
                style={{ padding: "20px", borderRadius: "50%" }}
              />
              {likes} likes
            </h4>
          )}
          <h5 className="card-title">{post.title}</h5>
          <p className="card-text">{post.body}</p>
          <p className="font-italic mark">
            Posted by <Link to={`${posterIdUrl}`}>{posterName}</Link> on{" "}
            {new Date(post.created).toDateString()}
          </p>
          <div className="d-inline">
            <Link to="/" className="btn btn-raised btn-primary mr-5">
              Back to posts
            </Link>

            {isAuthenticated().user &&
              isAuthenticated().user._id === post.postedBy._id && (
                <>
                  <Link
                    to={`/post/edit/${post._id}`}
                    className="btn btn-raised btn-warning mr-5"
                  >
                    Update Post
                  </Link>
                  <button
                    onClick={this.deletePost}
                    className="btn btn-raised btn-danger"
                  >
                    Delete Post
                  </button>
                </>
              )}
            {this.adminControl(post)}
          </div>
        </div>
      </div>
    );
  };

  render() {
    const {
      post,
      redirectToHome,
      redirectToSignin,
      likes,
      like,
      comments
    } = this.state;

    if (redirectToHome) {
      return <Redirect to="/" />;
    } else if (redirectToSignin) {
      return <Redirect to="/signin" />;
    }

    return (
      <div className="container">
        {!post ? (
          <div className="jumbotron text-center">Loading</div>
        ) : (
          <>
            <h3 className="display-2 mt-5 mb-5">Post's Title: {post.title}</h3>
            {this.renderPost(post, likes, like)}
          </>
        )}

        <Comment
          postId={post._id}
          comments={comments.reverse()}
          updateComments={this.updateComments}
        />
      </div>
    );
  }
}

export default Post;
