import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import { isAuthenticated, signout } from "../auth";
import { remove } from "./userApi";

class DeleteUser extends Component {
  state = {
    redirect: false
  };

  deleteAccount = () => {
    const token = isAuthenticated().token;
    const userId = this.props.userId;

    remove(userId, token).then(data => {
      if (data.error) {
        console.log(data.error);
        return null;
      }

      signout(() => console.log("User deleted!"));
      this.setState({ redirect: true });
    });
  };

  deleteConfirmed = () => {
    let answer = window.confirm("Are you sure about this delete?");

    if (answer) {
      this.deleteAccount();
    }
  };

  render() {
    if (this.state.redirect) return <Redirect to="/" />;

    return (
      <button
        className="btn btn-raised btn-danger"
        onClick={this.deleteConfirmed}
      >
        Delete Profile
      </button>
    );
  }
}

export default DeleteUser;
