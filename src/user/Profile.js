import React, { Component } from "react";

import { isAuthenticated } from "../auth";

class Profile extends Component {
  state = {
    user: "",
    redirectToSignin: false
  };

  componentDidMount() {
    console.log("user from route param", this.props.match.params.userId);
    const
  }

  render() {
    return (
      <div className="container">
        <h1 className="mt-5 mb-5">Profile</h1>

        <p>Hello {isAuthenticated().user.name}</p>
        <p>Email: {isAuthenticated().user.email}</p>
      </div>
    );
  }
}

export default Profile;
