import React, { Component } from "react";

class UserInfo extends Component {
  state = {
    user: {}
  };
  async componentDidMount() {
    const a = await this.props.getUser(this.props.match.params.login);
    this.setState({ user: this.props.user });
  }

  render() {
    const {
      name,
      avatar_url,
      location,
      bio,
      blog,
      login,
      html_url,
      followers,
      following,
      public_repos,
      public_gists,
      hireable
    } = this.state.user;

    return <div>{name}</div>;
  }
}

export default UserInfo;
