import React, { Component } from "react";
import { Link } from "react-router-dom";

import { findPeople, follow } from "./userApi";
import DefaultAvatar from "../images/avatar.png";

import { isAuthenticated } from "../auth";

class FindPeople extends Component {
  state = {
    users: [],
    error: "",
    open: false,
    followMessage: ""
  };

  componentDidMount() {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;

    findPeople(userId, token).then(data => {
      if (data.error) {
        console.log(data.error);
      }

      this.setState({ users: data });
    });
  }

  clickFollow = (user, i) => {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;

    follow(userId, token, user._id).then(data => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        let toFollow = this.state.users;
        toFollow.splice(i, 1);
        this.setState({
          users: toFollow,
          open: true,
          followMessage: `Following ${user.name}`
        });
      }
    });
  };

  renderUsers = users => (
    <div className="row">
      {users.map((user, i) => (
        <div className="col-md-4 card mb-2" key={i}>
          <img
            src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}?{new Date().getTime()}`}
            alt={user.name}
            className="img-thumbnail"
            onError={i => (i.target.src = `${DefaultAvatar}`)}
            style={{ height: "200px", width: "auto" }}
          />
          <div className="card-body">
            <h5 className="card-title">{user.name}</h5>
            <p className="card-text">{user.email}</p>
            <Link
              to={`/user/${user._id}`}
              className="btn btn-raised btn-primary btn-sm"
            >
              View Profile
            </Link>

            <button
              onClick={() => this.clickFollow(user, i)}
              className="btn btn-sm btn-raised btn-info float-right"
            >
              Follow
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  render() {
    const { users, open, followMessage } = this.state;

    return (
      <div className="container">
        <h1 className="mt-5 mb-5">Find People</h1>

        {open && (
          <div className="alert alert-success">
            <p>{followMessage}</p>
          </div>
        )}

        {this.renderUsers(users)}
      </div>
    );
  }
}

export default FindPeople;
