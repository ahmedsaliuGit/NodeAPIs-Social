import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import { read, update, updateUser } from "./userApi";
import { isAuthenticated } from "../auth";
import DefaultAvatar from "../images/avatar.png";

class EditProfile extends Component {
  constructor() {
    super();

    this.state = {
      id: "",
      name: "",
      email: "",
      password: "",
      redirectToProfile: false,
      error: "",
      fileSize: 0,
      loading: false,
      about: ""
    };
  }

  init = userId => {
    read(userId, isAuthenticated().token).then(data => {
      if (data.error) {
        this.setState({ redirectToProfile: true });
      }

      this.setState({
        id: data._id,
        email: data.email,
        name: data.name,
        about: data.about
      });
    });
  };

  componentDidMount() {
    const userId = this.props.match.params.userId;
    this.userData = new FormData();

    this.init(userId);
  }

  isValid = () => {
    const { name, email, password, fileSize } = this.state;

    if (fileSize > 100000) {
      this.setState({
        error: "Image size should not more than 100kb.",
        loading: false
      });
      return false;
    }

    if (name.length === 0) {
      this.setState({ error: "Name is required.", loading: false });
      return false;
    }

    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      this.setState({ error: "Valid email is required.", loading: false });
      return false;
    }

    if (password.length >= 1 && password.length <= 5) {
      this.setState({
        error:
          "Password is required. And can't be less 6 characters and must contain number(s)",
        loading: false
      });
      return false;
    }

    return true;
  };

  handleChange = name => event => {
    this.setState({ error: "" });
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    const fileSize = name === "photo" ? event.target.files[0].size : 0;

    this.userData.set(name, value);
    this.setState({ [name]: value, fileSize });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });

    if (this.isValid()) {
      const userId = this.props.match.params.userId;

      update(userId, isAuthenticated().token, this.userData).then(data => {
        if (data.error) {
          this.setState({
            error: data.error
          });
        } else if (isAuthenticated().user.role === "admin") {
          this.setState({
            redirectToProfile: true
          });
        } else {
          updateUser(data, () => {
            this.setState({
              redirectToProfile: true
            });
          });
        }
      });
    }
  };

  updateForm = (name, email, password, about) => (
    <form>
      <div className="form-group">
        <label className="text-muted">Profile Photo</label>
        <input
          type="file"
          accept="image/*"
          className="form-control"
          onChange={this.handleChange("photo")}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          className="form-control"
          onChange={this.handleChange("name")}
          value={name}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          type="email"
          className="form-control"
          onChange={this.handleChange("email")}
          value={email}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">About</label>
        <textarea
          type="text"
          className="form-control"
          onChange={this.handleChange("about")}
          value={about}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          type="password"
          className="form-control"
          onChange={this.handleChange("password")}
          value={password}
        />
      </div>

      <button
        className="btn btn-raised btn-primary"
        onClick={this.handleSubmit}
      >
        Update
      </button>
    </form>
  );

  render() {
    const {
      id,
      name,
      email,
      password,
      redirectToProfile,
      error,
      loading,
      about
    } = this.state;

    if (redirectToProfile) return <Redirect to={`/user/${id}`} />;

    const photoUrl = id
      ? `${
          process.env.REACT_APP_API_URL
        }/user/photo/${id}?${new Date().getTime()}`
      : DefaultAvatar;

    return (
      <div className="container">
        <h1 className="mt-5 mb-5">Profile Edit</h1>

        <div
          className="alert alert-danger"
          style={{ display: error === "" ? "none" : "" }}
        >
          {error}
        </div>

        {loading ? <div className="jumbotron text-center">Loading</div> : ""}

        <img
          src={photoUrl}
          alt={name}
          className="img-thumbnail"
          onError={i => (i.target.src = `${DefaultAvatar}`)}
          style={{ height: "200px", width: "auto" }}
        />

        {(isAuthenticated().user.role === "admin" ||
          isAuthenticated().user._id === id) &&
          this.updateForm(name, email, password, about)}
      </div>
    );
  }
}

export default EditProfile;
