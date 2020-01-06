import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";

import { signin, authenticate } from "../auth";
import SocialLogin from "./SocialLogin";

class Signin extends Component {
  state = {
    email: "",
    password: "",
    error: "",
    redirectToReferer: false,
    loading: false
  };

  handleChange = name => event => {
    this.setState({ error: "", [name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const { email, password } = this.state;
    const user = { email, password };

    signin(user).then(data => {
      if (data.error) {
        this.setState({ error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          this.setState({ redirectToReferer: true, loading: false });
        });
      }
    });
  };

  signinForm = (email, password) => (
    <form>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          type="text"
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
    const { email, password, error, redirectToReferer, loading } = this.state;

    if (redirectToReferer) {
      return <Redirect to="/" />;
    }

    return (
      <div className="container">
        <h1 className="mt-5 mb-5">Sign In</h1>
        <div
          className="alert alert-danger"
          style={{ display: error === "" ? "none" : "" }}
        >
          {error}
        </div>

        {loading ? <div className="jumbotron text-center">Loading</div> : ""}
        <hr />
        <SocialLogin />
        <hr />
        {this.signinForm(email, password)}

        <p>
          <Link to="/forgot-password" className="text-danger">
            {" "}
            Forgot Password
          </Link>
        </p>
      </div>
    );
  }
}

export default Signin;
