import React, { useContext } from "react";
import UserItem from "./UserItem";
import Spinner from "../layout/Spinner";
import PropTypes from "prop-types";

import GithubContext from "../../context/github/githubContext";

const User = () => {
  const gitContext = useContext(GithubContext);

  const { users, loading } = gitContext;
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

const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3,1fr)",
  gridGap: "1rem"
};

export default User;
