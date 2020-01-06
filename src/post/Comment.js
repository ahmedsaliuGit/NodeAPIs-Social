import React, { Component } from "react";
import { Link } from "react-router-dom";

import DefaultAvatar from "../images/avatar.png";
import { isAuthenticated } from "../auth";
import { comment, uncomment } from "./apiPost";

class Comment extends Component {
  state = {
    text: "",
    error: ""
  };

  handleChange = event => {
    this.setState({ error: "", text: event.target.value });
  };

  isValid = () => {
    const { text } = this.state;

    if (!text.length > 0 || text.length > 150) {
      this.setState({
        error:
          "Comment can not be empty and should not more than 150 character long"
      });
      return false;
    }

    return true;
  };

  addComment = e => {
    e.preventDefault();
    if (!isAuthenticated()) {
      this.setState({ error: "Please, signin to leave a comment" });
      return false;
    }

    if (this.isValid()) {
      const { postId, updateComments } = this.props;
      const userId = isAuthenticated().user._id;
      const token = isAuthenticated().token;

      comment(userId, token, postId, { text: this.state.text }).then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          this.setState({ text: "" });
          updateComments(data.comments);
        }
      });
    }
  };

  confirmedDelete = () => {
    const answer = window.confirm("Are you sure, you want to remove comment");
    return answer;
  };

  deleteComment = comment => {
    if (this.confirmedDelete()) {
      const { postId, updateComments } = this.props;
      const userId = isAuthenticated().user._id;
      const token = isAuthenticated().token;

      uncomment(userId, token, postId, comment).then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          updateComments(data.comments);
        }
      });
    }
  };

  render() {
    const { text, error } = this.state;
    const { comments } = this.props;

    return (
      <div>
        <h2 className="mt-5 mb-5">Leave a comment</h2>

        <form onSubmit={this.addComment}>
          <div className="form-group">
            <input
              className="form-control"
              onChange={this.handleChange}
              value={text}
              placeholder="Leave a comment..."
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-raised btn-success mt-2">
              Add Comment
            </button>
          </div>
        </form>

        <div
          className="alert alert-danger"
          style={{ display: error === "" ? "none" : "" }}
        >
          {error}
        </div>

        <hr />

        <div className="col-md-12">
          <h2 className="text-primary">{comments.length} Comments</h2>

          {comments.map((comment, i) => (
            <div key={i}>
              <Link to={`/user/${comment._id}`}>
                <img
                  src={`${process.env.REACT_APP_API_URL}/user/photo/${comment.postedBy._id}`}
                  style={{ borderRadius: "50%", border: "1px solid black" }}
                  width="30px"
                  height="30px"
                  className="float-left mr-2"
                  onError={i => (i.target.src = `${DefaultAvatar}`)}
                  alt={comment.postedBy.name}
                />
              </Link>
              <div>
                <p className="lead">{comment.text}</p>
                <p className="font-italic mark">
                  Posted by{" "}
                  <Link to={`/user/${comment.postedBy._id}`}>
                    {comment.postedBy.name}
                  </Link>{" "}
                  on {new Date(comment.created).toDateString()}
                  {isAuthenticated().user &&
                    isAuthenticated().user._id === comment.postedBy._id && (
                      <>
                        <span
                          onClick={() => this.deleteComment(comment)}
                          className="text-danger float-right"
                          style={{ cursor: "pointer" }}
                        >
                          Remove
                        </span>
                      </>
                    )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Comment;
