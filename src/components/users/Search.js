import React, { Component } from "react";
import PropTypes from "prop-types";

class Search extends Component {
  //Component-level state is to be here with form
  state = {
    name: ""
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    //console.log(this.state);
    this.setState({ name: "" });
    this.props.searchUser(this.state.name);
    e.preventDefault();
  };

  static propType = {
    searchUsers: PropTypes.func.isRequired
  };

  render() {
    return (
      <div>
        <form className='form' onSubmit={this.onSubmit}>
          <input
            type='text'
            name='name'
            placeholder='Search Users..'
            value={this.state.name}
            onChange={this.onChange}
          />
          <input
            type='submit'
            value='Search'
            className='btn btn-dark btn-block'
          />
        </form>
      </div>
    );
  }
}
export default Search;
