//Refactor into a functional component as it does not have a state
import React from "react";
import PropTypes from "prop-types";

const UserItem = props => {
  //Destructuring pulls stuff that is necessary out of the object
  const { login, avatar_url, html_url } = props.title;
  return (
    <div className='card text-center'>
      <img
        src={avatar_url}
        alt=''
        className='round-img'
        style={{ width: "60px" }}
      />
      <h3>{login}</h3>
      <div>
        <a href={html_url} className='btn btn-dark btn-sm my-1'>
          More
        </a>
      </div>
    </div>
  );
};

UserItem.propType = {
  title: PropTypes.object.isRequired
};

export default UserItem;
