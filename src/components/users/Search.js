import React, { useState, useContext } from "react";
import PropTypes from "prop-types";

import GithubContext from "../../context/github/githubContext";
import AlertContext from "../../context/alert/alertContext";

const Search = () => {
  const gitContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);

  const { searchUsers, clearUser } = gitContext;
  const { setAlert } = alertContext;

  const [name, setName] = useState("");
  const onChange = e => setName(e.target.value);

  const onSubmit = e => {
    e.preventDefault();
    if (name === "") {
      setAlert("Enter a name", "light");
    } else {
      setName("");
      gitContext.searchUsers(name);
    }
  };

  return (
    <div>
      <form className='form' onSubmit={onSubmit}>
        <input
          type='text'
          name='name'
          placeholder='Search Users..'
          value={name}
          onChange={onChange}
        />

        <input
          type='submit'
          value='Search'
          className='btn btn-dark btn-block'
        />
      </form>
      {searchUsers && (
        <button className='btn btn-light btn-block' onClick={clearUser}>
          Clear
        </button>
      )}
    </div>
  );
};

Search.propType = {
  clearUser: PropTypes.func.isRequired,
  search: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired
};
export default Search;
