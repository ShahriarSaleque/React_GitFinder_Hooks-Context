import React from "react";
import RepoItem from "../repos/RepoItem";

const Repo = ({ repos }) => {
  return (
    <div>
      {repos.map(repo => (
        <RepoItem repo={repo} key={repo.id} />
      ))}
    </div>
  );
};

export default Repo;
