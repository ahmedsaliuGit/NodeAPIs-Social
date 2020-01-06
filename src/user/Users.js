import React, { Component } from "react";
import { Link } from "react-router-dom";

import { list } from "./userApi";
import DefaultAvatar from "../images/avatar.png";

class Users extends Component {
  state = {
    users: []
  };

  componentDidMount() {
    list().then(data => {
      if (data.error) {
        console.log(data.error);
      }

      this.setState({ users: data });
    });
  }

  renderUsers = users => (
    <div className="row">
      {users.map((user, i) => (
        <div className="col-md-4 card mb-2" key={i}>
          <img
            src={`${process.env.REACT_APP_API_URL}/user/photo/${
              user._id
            }?${new Date().getTime()}`}
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
              className="btn btn-raised btn-primary"
            >
              View Profile
            </Link>
          </div>
        </div>
      ))}
    </div>
  );

  render() {
    const { users } = this.state;

    return (
      <div className="container">
        <h1 className="mt-5 mb-5">Users</h1>

        {this.renderUsers(users)}
      </div>
    );
  }
}

export default Users;
