import React from "react";
import UserItem from "./UserItem";
import Spinner from "../layout/Spinner";
import PropTypes from "prop-types";

const User = ({ users, loading }) => {
  const userArr = Array.from(users);

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
