import React, { useState } from "react";
import PropTypes from "prop-types";

const Search = ({ clearUser, search, setAlert, searchUser }) => {
  //Component-level state is to be here with form
  const [name, setName] = useState("");
  const onChange = e => setName(e.target.value);

  const onSubmit = e => {
    e.preventDefault();
    if (name === "") {
      setAlert("Enter a name", "light");
    } else {
      //console.log(this.state);
      setName("");
      searchUser(name);
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
      {search && (
        <button className='btn btn-light btn-block' onClick={clearUser}>
          Clear
        </button>
      )}
    </div>
  );
};

Search.propType = {
  searchUsers: PropTypes.func.isRequired,
  clearUser: PropTypes.func.isRequired,
  search: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired
};
export default Search;
