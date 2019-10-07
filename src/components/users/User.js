import React from "react";
import UserItem from "./UserItem";
import Spinner from "../layout/Spinner";
import PropTypes from "prop-types";

const User = ({ users, loading, search, searchName }) => {
  const userArr = Array.from(users);

  if (search) {
    return (
      <div>
        <h1>{`Search results for ${searchName}`}</h1>
        <div style={userStyle}>
          {userArr.map(user => (
            <UserItem key={user.id} title={user} />
          ))}
        </div>
      </div>
    );
  }

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div style={userStyle}>
        {userArr.map(user => (
          <UserItem key={user.id} title={user} />
        ))}
      </div>
    );
  }
};

User.propTypes = {
  loading: PropTypes.bool.isRequired
};

const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3,1fr)",
  gridGap: "1rem"
};

export default User;
