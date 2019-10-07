import React, { Component } from "react";
import PropTypes from "prop-types";

class Search extends Component {
  //Component-level state is to be here with form
  state = {
    name: "",
    searchName: ""
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    if (this.state.name === "") {
      this.props.setAlert("Enter a name", "light");
    } else {
      //console.log(this.state);
      this.setState({ name: "" });
      this.props.searchUser(this.state.name);
    }
  };

  static propType = {
    searchUsers: PropTypes.func.isRequired,
    clearUser: PropTypes.func.isRequired,
    search: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired
  };

  render() {
    const { clearUser, search } = this.props;
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
        {search && (
          <button className='btn btn-light btn-block' onClick={clearUser}>
            Clear
          </button>
        )}
      </div>
    );
  }
}
export default Search;
