import React from "react";
import { Link, withRouter } from "react-router-dom";

import { isAuthenticated, signout } from "../auth";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#ff99dd", borderBottom: "2px solid #ff99dd" };
  } else {
    return { color: "#ffffff" };
  }
};

const Menu = ({ history }) => (
  <div>
    <ul className="nav nav-tabs bg-primary">
      <li className="nav-item">
        <Link className="nav-link" to="/" style={isActive(history, "/")}>
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className="nav-link"
          to="/users"
          style={isActive(history, "/users")}
        >
          Users
        </Link>
      </li>
      {!isAuthenticated() && (
        <>
          <li className="nav-item">
            <Link
              to={`/post/create`}
              className="nav-link"
              style={isActive(history, `/post/create`)}
            >
              Create Post
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link"
              to="/signin"
              style={isActive(history, "/signin")}
            >
              Signin
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/signup"
              style={isActive(history, "/signup")}
            >
              Signup
            </Link>
          </li>
        </>
      )}

      {isAuthenticated() && (
        <>
          <li className="nav-item">
            <Link
              to={`/user/findpeople`}
              className="nav-link"
              style={isActive(history, `/user/findpeople`)}
            >
              Find People
            </Link>
          </li>

          <li className="nav-item">
            <Link
              to={`/post/create`}
              className="nav-link"
              style={isActive(history, `/post/create`)}
            >
              Create Post
            </Link>
          </li>

          <li className="nav-item">
            <Link
              to={`/user/${isAuthenticated().user._id}`}
              className="nav-link"
              style={isActive(history, `/user/${isAuthenticated().user._id}`)}
            >
              {`${isAuthenticated().user.name}'s Profile`}
            </Link>
          </li>

          <li className="nav-item">
            <span
              className="nav-link bg-primary"
              style={
                (isActive(history, "/signup"),
                { cursor: "pointer", color: "#fff", borderBottom: "0px" })
              }
              onClick={() => signout(() => history.push("/"))}
            >
              Signout
            </span>
          </li>
        </>
      )}
    </ul>
  </div>
);

export default withRouter(Menu);
