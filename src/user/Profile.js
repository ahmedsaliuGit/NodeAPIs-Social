import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";

import { isAuthenticated } from "../auth";
import { read } from "./userApi";
import DefaultAvatar from "../images/avatar.png";
import DeleteUser from "./DeleteUser";
import FollowProfileButton from "./FollowProfileButton";
import ProfileTabs from "./ProfileTabs";
import { listByUser } from "../post/apiPost";

class Profile extends Component {
  state = {
    user: { following: [], followers: [] },
    redirectToSignin: false,
    following: false,
    posts: []
  };

  checkFollow = user => {
    const jwt = isAuthenticated();
    const match = user.followers.find(follower => {
      return follower._id === jwt.user._id;
    });

    return match;
  };

  clickFollowButton = callApi => {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;

    callApi(userId, token, this.state.user._id).then(data => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        this.setState({ user: data, following: !this.state.following });
      }
    });
  };

  init = userId => {
    read(userId, isAuthenticated().token).then(data => {
      if (data.error) {
        this.setState({ redirectToSignin: true });
      } else {
        let following = this.checkFollow(data);
        this.setState({ user: data, following });
        this.loadPosts(userId);
      }
    });
  };

  loadPosts = userId => {
    const token = isAuthenticated().token;

    listByUser(userId, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ posts: data });
      }
    });
  };

  componentDidMount() {
    const userId = this.props.match.params.userId;

    this.init(userId);
  }

  UNSAFE_componentWillReceiveProps(props) {
    const userId = props.match.params.userId;

    this.init(userId);
  }

  render() {
    const { user, redirectToSignin, following, posts } = this.state;

    if (redirectToSignin) return <Redirect to="/signin" />;

    const photoUrl = user._id
      ? `${process.env.REACT_APP_API_URL}/user/photo/${user._id}?{new Date().getTime()}`
      : DefaultAvatar;

    return (
      <div className="container">
        <h1 className="mt-5 mb-5">Profile</h1>
        <div className="row">
          <div className="col-md-4">
            <img
              src={photoUrl}
              alt={user.name}
              className="img-thumbnail"
              onError={i => (i.target.src = `${DefaultAvatar}`)}
              style={{ height: "200px", width: "auto" }}
            />
          </div>

          <div className="col-md-8">
            <div className="lead mt-2">
              <p className="card-title">Hello {user.name}</p>
              <p className="card-text">Email: {user.email}</p>
              <p>
                {`Joined ${
                  user.created === undefined
                    ? `Joined date loading`
                    : new Date(user.created).toDateString()
                }`}
              </p>
            </div>
            {isAuthenticated().user &&
            isAuthenticated().user._id === user._id ? (
              <div className="d-inline-block">
                <Link
                  to={`/post/create`}
                  className="btn btn-raised btn-info mr-5"
                >
                  Create Post
                </Link>

                <Link
                  to={`/user/edit/${user._id}`}
                  className="btn btn-raised btn-success mr-5"
                >
                  Edit Profile
                </Link>

                <DeleteUser userId={user._id} />
              </div>
            ) : (
              <FollowProfileButton
                onButtonClick={this.clickFollowButton}
                following={following}
              />
            )}
            <div>
              {isAuthenticated().user &&
                isAuthenticated().user.role === "admin" && (
                  <div className="card mt-5">
                    <div className="card-body">
                      <h5 className="card-title">Admin</h5>
                      <p className="mb-2 text-danger">
                        Edit/Delete as an Admin
                      </p>
                      <Link
                        className="btn btn-raised btn-success mr-5"
                        to={`/user/edit/${user._id}`}
                      >
                        Edit Profile
                      </Link>
                      <DeleteUser userId={user._id} />
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 mt-5 mb-5">
            <hr />
            <p className="lead">{user.about}</p>
            <hr />
            <ProfileTabs
              following={user.following}
              followers={user.followers}
              posts={posts}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
