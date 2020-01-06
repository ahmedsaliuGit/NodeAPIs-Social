import React, { Component } from "react";

import DefaultAvatar from "../images/avatar.png";
import { Link } from "react-router-dom";

class ProfileTabs extends Component {
  render() {
    const { following, followers, posts } = this.props;

    return (
      <div className="row">
        <div className="col-md-4">
          <h2 className="text-primary">Followers</h2>
          <hr />
          {followers.map((person, i) => (
            <div key={i}>
              <Link to={`/user/${person._id}`}>
                <img
                  src={`${process.env.REACT_APP_API_URL}/user/photo/${person._id}`}
                  style={{ borderRadius: "50%", border: "1px solid black" }}
                  width="30px"
                  height="30px"
                  className="float-left mr-2"
                  onError={i => (i.target.src = `${DefaultAvatar}`)}
                  alt={person.name}
                />
                <div>
                  <p className="lead">{person.name}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="col-md-4">
          <h2 className="text-primary">Following</h2>
          <hr />
          {following.map((person, i) => (
            <div key={i}>
              <Link to={`/user/${person._id}`}>
                <img
                  src={`${process.env.REACT_APP_API_URL}/user/photo/${person._id}`}
                  style={{ borderRadius: "50%", border: "1px solid black" }}
                  width="30px"
                  height="30px"
                  className="float-left mr-2"
                  onError={i => (i.target.src = `${DefaultAvatar}`)}
                  alt={person.name}
                />
                <div>
                  <p className="lead">{person.name}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="col-md-4">
          <h3 className="text-primary">Posts</h3>
          <hr />
          {posts.map((post, i) => (
            <div key={i}>
              <Link to={`/post/${post._id}`}>
                <div>
                  <p className="lead">{post.title}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default ProfileTabs;
