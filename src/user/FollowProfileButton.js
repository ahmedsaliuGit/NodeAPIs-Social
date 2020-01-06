import React, { Component } from "react";

import { follow, unfollow } from "./userApi";

class FollowProfileButton extends Component {
  followClick = () => {
    this.props.onButtonClick(follow);
  };

  unfollowClick = () => {
    this.props.onButtonClick(unfollow);
  };

  render() {
    const { following } = this.props;
    return (
      <div className="d-inline-block">
        {!following ? (
          <button
            onClick={this.followClick}
            className="btn btn-raised btn-success mr-5"
          >
            Follow
          </button>
        ) : (
          <button
            className="btn btn-raised btn-warning"
            onClick={this.unfollowClick}
          >
            Unfollow
          </button>
        )}
      </div>
    );
  }
}

export default FollowProfileButton;
