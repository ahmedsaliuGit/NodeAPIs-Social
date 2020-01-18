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
    loading: false,
    recaptcha: false
  };

  handleChange = name => event => {
    this.setState({ error: "", [name]: event.target.value });
  };

  recaptchaHandler = e => {
    this.setState({ error: "" });
    let userDay = e.target.value.toLowerCase();
    let dayCount;

    if (userDay === "sunday") {
      dayCount = 0;
    } else if (userDay === "monday") {
      dayCount = 1;
    } else if (userDay === "tuesday") {
      dayCount = 2;
    } else if (userDay === "wednesday") {
      dayCount = 3;
    } else if (userDay === "thursday") {
      dayCount = 4;
    } else if (userDay === "friday") {
      dayCount = 5;
    } else if (userDay === "saturday") {
      dayCount = 6;
    }

    if (dayCount === new Date().getDay()) {
      this.setState({ recaptcha: true });
      return true;
    } else {
      this.setState({
        recaptcha: false
      });
      return false;
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const { email, password } = this.state;
    const user = { email, password };

    if (this.state.recaptcha) {
      signin(user).then(data => {
        if (data.error) {
          this.setState({ error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            this.setState({ redirectToReferer: true });
          });
        }
      });
    } else {
      this.setState({
        loading: false,
        error: "What day is today? Please write a correct answer!"
      });
    }
  };

  signinForm = (email, password, recaptcha) => (
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

      <div className="form-group">
        <label className="text-muted">
          {recaptcha ? "Thanks. You got it!" : "What day is today?"}
        </label>

        <input
          onChange={this.recaptchaHandler}
          type="text"
          className="form-control"
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
    const {
      email,
      password,
      error,
      redirectToReferer,
      loading,
      recaptcha
    } = this.state;

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
        {this.signinForm(email, password, recaptcha)}

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
