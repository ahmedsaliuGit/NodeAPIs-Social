import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import { create } from "./apiPost";
import { isAuthenticated } from "../auth";

class NewPost extends Component {
  constructor() {
    super();

    this.state = {
      title: "",
      body: "",
      photo: "",
      redirectToProfile: false,
      error: "",
      fileSize: 0,
      loading: false,
      user: {}
    };
  }

  componentDidMount() {
    this.postData = new FormData();

    this.setState({ user: isAuthenticated().user });
  }

  isValid = () => {
    const { title, body, fileSize } = this.state;

    if (fileSize > 100000) {
      this.setState({
        error: "Image size should not more than 100kb.",
        loading: false
      });
      return false;
    }

    if (title.length === 0 || body.length === 0) {
      this.setState({ error: "All fields are required.", loading: false });
      return false;
    }

    return true;
  };

  handleChange = name => event => {
    this.setState({ error: "" });
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    const fileSize = name === "photo" ? event.target.files[0].size : 0;

    this.postData.set(name, value);
    this.setState({ [name]: value, fileSize });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });

    if (this.isValid()) {
      const userId = isAuthenticated().user._id;

      create(userId, isAuthenticated().token, this.postData).then(data => {
        if (data.error) {
          this.setState({
            error: data.error
          });
        } else {
          this.setState({ loading: false, redirectToProfile: true });
        }
      });
    }
  };

  postForm = (title, body) => (
    <form>
      <div className="form-group">
        <label className="text-muted">Post Photo</label>
        <input
          type="file"
          accept="image/*"
          className="form-control"
          onChange={this.handleChange("photo")}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Title</label>
        <input
          type="text"
          className="form-control"
          onChange={this.handleChange("title")}
          value={title}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Body</label>
        <textarea
          type="text"
          className="form-control"
          onChange={this.handleChange("body")}
          value={body}
        />
      </div>

      <button
        className="btn btn-raised btn-primary"
        onClick={this.handleSubmit}
      >
        Create Post
      </button>
    </form>
  );

  render() {
    const { title, body, user, redirectToProfile, error, loading } = this.state;

    if (redirectToProfile) return <Redirect to={`/user/${user._id}`} />;

    // const photoUrl = id
    //   ? `${process.env.REACT_APP_API_URL}/user/photo/${id}?{new Date().getTime()}`
    //   : DefaultAvatar;

    return (
      <div className="container">
        <h1 className="mt-5 mb-5">Create new post</h1>

        <div
          className="alert alert-danger"
          style={{ display: error === "" ? "none" : "" }}
        >
          {error}
        </div>

        {loading ? <div className="jumbotron text-center">Loading</div> : ""}

        {this.postForm(title, body)}
      </div>
    );
  }
}

export default NewPost;
