import React, { Component } from "react";
import { Link } from "react-router-dom";

import { signup } from "../auth";

class Signup extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    error: "",
    message: ""
  };

  handleChange = name => event => {
    this.setState({ error: "", [name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { name, email, password } = this.state;
    const user = { name, email, password };

    signup(user).then(data => {
      if (data.error) this.setState({ error: data.error });
      else
        this.setState({
          name: "",
          email: "",
          password: "",
          error: "",
          message: data.message
        });
    });
  };

  signupForm = (name, email, password) => (
    <form>
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
        Submit
      </button>
    </form>
  );

  render() {
    const { name, email, password, error, message } = this.state;
    return (
      <div className="container">
        <h1 className="mt-5 mb-5">Sign up</h1>
        <div
          className="alert alert-danger"
          style={{ display: error === "" ? "none" : "" }}
        >
          {error}
        </div>
        <div
          className="alert alert-primary"
          style={{ display: message === "" ? "none" : "" }}
        >
          {`${message} Please,`}
          <Link to="/signin"> log in</Link>
        </div>

        {this.signupForm(name, email, password)}
      </div>
    );
  }
}

export default Signup;
